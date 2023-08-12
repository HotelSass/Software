'use client'
import React, { useEffect, useState } from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import Calendar from 'reactjs-availability-calendar';
const getCurrentMonthAndYear = () => {
  const currentDate = new Date();
  const monthNumber = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Convert to string and pad with '0' if needed
  const monthName = currentDate.toLocaleString('default', { month: 'long' }); // Get the full month name
  const year = currentDate.getFullYear(); // Get the current year

  return {
    monthNumber,
    monthName,
    year,
  };
};
const bookings = [
  {
    from: new Date('2023-08-03'),
    to: new Date('2023-09-03'),
    middayCheckout: true,
  },
  {
    from: '2022-04-08',
    to: '2022-04-13',
    middayCheckout: true,
  },
  {
    from: '2022-09-03T19:20:35.593Z',
    to: '2022-09-22T19:20:35.593Z',
    middayCheckout: false,
  },
]
const getDaysInMonth = (year: any, month: any) => {
  return new Date(year, month, 0).getDate();
};

const Calender = ({ data }: any) => {
  return (
    <div className=''>
      
      
      <Calendar bookings={bookings} />

    </div>
  )
}

export default Calender
