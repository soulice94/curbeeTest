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
  previosCursor: string;
  nextCursor: string;
}

const size = 20;

const MainApiCall = async (_page: number, _size: number) => {
  const response = await fetch(`/api/appointments?page=${_page}&size=${_size}`, {
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

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [page, setPage] = useState(0);
  const [metadata, setMetadata] = useState({
    hasNextPage: false,
    hasPreviousPage: false,
    previosCursor: '',
    nextCursor: '',
  } as PageInfo);

  useEffect(() => {
      const getInitAppointments = async () => {
      const data = await MainApiCall(page, size);
      const fetchedAppointments = data.result.edges.map((edge: any) => edge.node);
      setAppointments(fetchedAppointments);
      setMetadata(data.result.pageInfo);
      return;
    };
    getInitAppointments();
  }, []);
  return (
    <>
      <h1 className={lexend.className} style={{color: 'red'}}>Appointments</h1>
      {appointments && appointments.length > 0 && (
        <ul>
          {appointments.map((appointment: Appointment, index: number) => (<li key={index}>{appointment.workOrder.service}</li>))}
        </ul>
      )}
    </>
  );  
};

export default Appointments;
