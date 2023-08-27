import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

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
      },
    });
    const data = await response.json();
    setDates(data.result.map((date: any) => date.split('T')[0]));
  };
  return (
    <>
      <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)}/>
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
