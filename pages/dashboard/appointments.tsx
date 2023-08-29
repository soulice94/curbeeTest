import { useEffect, useState } from "react";
import styled from "styled-components";
import { Lexend } from 'next/font/google';

const lexend = Lexend({ subsets: ['latin'] });

interface Appointment {
  id: string;
  paymentId: string;
  userId: string;
  duration: number;
  scheduledTime: string;
  status: string;
  workOrder: {
    service: string;
  }
}

interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  previousCursor: string;
  nextCursor: string;
}

const size = 20;

const MainApiCall = async (cursor: string, _size: number, mode?: string) => {
  let URL = `/api/appointments?size=${_size}`;
  if (mode === 'after') URL += `&after=${cursor}`;
  if (mode === 'before') URL += `&before=${cursor}`;
  const response = await fetch(URL, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'Authentication': `Bearer ${localStorage.getItem('carbeeToken')}`
    },
  });
  const data = await response.json();
  return data;
}

const formatDateAMPM = (date: string) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month: string | number = addZero(dateObj.getMonth() + 1);
  const day: string | number = addZero(dateObj.getDate());
  return `${year}/${month}/${day} at ${dateObj.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
};

const factoryCompletedTime = (appointment: Appointment) => {
  if (appointment.status !== 'COMPLETE') return '-';
  const date = new Date(appointment.scheduledTime);
  date.setMinutes(date.getMinutes() + appointment.duration);
  return formatDateAMPM(date.toISOString());
};

const addZero = (number: number) => {
  if (number < 10) return `0${number}`;
  return number;
};

const formatDate = (date: string) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month: string | number = addZero(dateObj.getMonth() + 1);
  const day: string | number = addZero(dateObj.getDate());
  const hours: string | number = addZero(dateObj.getHours());
  const minutes: string | number = addZero(dateObj.getMinutes());
  const seconds: string | number = addZero(dateObj.getSeconds());
  return `${year}/${month}/${day} at ${hours}:${minutes}:${seconds}`;
};

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(Number.MAX_SAFE_INTEGER);
  const [cursor, setCursor] = useState('');
  const [mode, setMode] = useState('');
  const [metadata, setMetadata] = useState({
    hasNextPage: false,
    hasPreviousPage: false,
    previousCursor: '',
    nextCursor: '',
  } as PageInfo);

  const getAppointments = async () => {
    const data = await MainApiCall(cursor, size, mode);
    const { result } = data;
    const { message } = result;
    if (!message) {
      const fetchedAppointments = result.edges.map((edge: any) => edge.node);
      setAppointments(fetchedAppointments);
      setMetadata({
        ...data.result.pageInfo,
        hasNextPage: true,
        hasPreviousPage: true,
      });
    } else {
      setMetadata((prev) => ({ ...prev, hasNextPage: false, hasPreviousPage: true }));
      setLastPage(page - 1);
    }
  };

  useEffect(() => {
    getAppointments();
  }, [page]);

  const nextClick = () => {
    setMode('after');
    setCursor(metadata.nextCursor);
    setPage(page + 1);
  };

  const previousClick = () => {
    setMode('before');
    setCursor(metadata.previousCursor);
    setPage(page - 1);
  }

  return (
    <>
      <h1 className={lexend.className} style={{color: 'red'}}>Appointments</h1>
      {appointments && appointments.length > 0 && (
        <>
          {page <= lastPage && (
            <table className="tableStyled">
              <thead>
                <tr className="trackHead">
                  <th className="cell">Status</th>
                  <th className="cell">Start Time</th>
                  <th className="cell">Duration</th>
                  <th className="cell">Completed Time</th>
                  <th className="cell">Service</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment: Appointment, index: number) => (
                  <tr className="trRow" key={appointment.id}>
                    <td className="cell"><strong>{appointment.status}</strong></td>
                    <td className="cell">{formatDate(appointment.scheduledTime)}</td>
                    <td className="cell">{appointment.duration} min</td>
                    <td className="cell">{factoryCompletedTime(appointment)}</td>
                    <td className="cell">{appointment.workOrder.service}</td>
                  </tr>
                  ))}
              </tbody>
            </table>
          )}
          {page > lastPage && (
            <div className="noInfo">
              <h1>
                No more info to show {`😅`}
              </h1>
            </div>
          )}
          <div className="pagination">
            <button className="button" disabled={page === 0} onClick={previousClick}>Previous</button>
            <label className="paginationLabel">Page: {page + 1} of {lastPage < Number.MAX_SAFE_INTEGER ? (lastPage + 1) : 'many'}</label>
            <button className="button" disabled={page > lastPage} onClick={nextClick}>Next</button>
          </div>
        </>
      )}
    </>
  );  
};

export default Appointments;
