import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const buildDates = (dates: string[]) => {
  return dates.map((date: string) => {
    const firstPart = date.split('T')[0];
    const secondPart = date.split('T')[1];
    const realSecondPart = secondPart.split('.000')[0];
    return `${firstPart} at ${realSecondPart}`;
  });
};

const FreeDates = () => {
  const [startDate, setStartDate] = useState(tomorrow);
  const [dates, setDates] = useState([]);
  const searchDates = async () => {
    const startDateString = startDate.toISOString().split('T')[0];
    const response = await fetch(`/api/availability/${startDateString}`, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Authentication': `Bearer ${localStorage.getItem('token')}`
      },
    });
    const data = await response.json();
    if (data && data.result && data.result.length > 0) {
      // @ts-ignore
      setDates(buildDates(data.result));
    }
  };
  return (
    <>
      <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} minDate={tomorrow}/>
      <button onClick={() => searchDates()}>Search</button>
      {dates && dates.length> 0 && (
        <ul>
          {dates.map((date: any, index: number) => (<li key={index}>{date}</li>))}
        </ul>
      )}
    </>
  );
};


export default FreeDates;
