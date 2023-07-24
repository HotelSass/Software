"use client";
import React, { useEffect, useRef, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
//Get Data of only the selected month
const bookingData = {
  0: [
    {},
    {},
    {
      startDate: new Date("2023-06-03"),
      endDate: new Date("2023-06-08"),
      span: 4,
      id: "12345",
      name: "Girban Raj Ghimire",
      phoneNo: "9844442363",
      type: "reservation",
    },
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {
      startDate: new Date("2023-06-03"),
      endDate: new Date("2023-06-08"),
      span: 4,
      id: "12345",
      name: "Girban Raj Ghimire",
      phoneNo: "9844442363",
      type: "booked",
    },
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ],
  1: [
    {},
    {},

    {},
    {},
    {},
    {
      startDate: new Date("2023-06-03"),
      endDate: new Date("2023-06-08"),
      span: 5,
      id: "12345",
      name: "Girban Raj Ghimires",
      phoneNo: "9844442363",
      type: "booked",
    },
    {},
    {},
    {},
    {},
    {},
    {},

    {},
    {},
    {},
    {},
    {},
    {
      startDate: new Date("2023-06-22"),
      endDate: new Date("2023-06-32"),
      span: 4,
      id: "12345",
      name: "Girban Raj Ghimire",
      phoneNo: "9844442363",
      type: "reservation",
    },
    {},
    {},
    {},
    {},
    {},
  ],

  // Rest of the booking data...
};
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const Calender = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const [currentFullDate, setCurrentFullDate] = useState<Date>(new Date());

  const currentDate = new Date();
  const noOfDays = new Date(currentYear, currentMonth + 1, 0).getDate();
  const roomList = Array.from(
    { length: Object.values(bookingData).length },
    (_, i) => i + 1
  );

  const daysOfMonth = Array.from({ length: noOfDays }, (_, i) => {
    const date = i + 1;
    const day = new Date(currentYear, currentMonth, date).toLocaleDateString(
      "en-US",
      { weekday: "short" }
    );

    return { date, day };
  });

  useEffect(() => {
    if (sectionRef.current) {
      // Scroll to the section when the component mounts
      sectionRef.current.scrollTo({
        left: 90 * currentDate.getDate() + 1,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    setCurrentFullDate(new Date(currentYear, currentMonth));
  }, [currentMonth, currentYear]);

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11; // December
      }
      return prevMonth - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0; // January
      }
      return prevMonth + 1;
    });
  };

  function checkInRange(startDate, endDate, date) {
    const checkDate = new Date(currentYear, currentMonth, date + 1);

    if (checkDate >= startDate && checkDate <= endDate) {
      return true;
    }
    return false;
  }

  return (
    <div className="">
      <div className="inline-flex bg-slate-500 p-3 space-x-4 rounded-lg mb-4">
        <button onClick={handlePrevMonth}>
          <BiChevronLeft size={20} color="#fff" />
        </button>
        <button onClick={handleNextMonth}>
          <BiChevronRight size={20} color="#fff" />
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg" ref={sectionRef}>
        <table className="min-w-full">
          <thead className="rounded-t-md">
            <tr className="rounded-t-md">
              <th className="p-7 px-10 bg-gray-300 sticky left-0 font-thin text-[24px] ">
                <p>
                  {monthNames[currentMonth]} {currentYear}
                </p>
              </th>
              {daysOfMonth.map((d1, index) => (
                <>
                  {currentMonth === currentDate.getMonth() &&
                  currentYear === currentDate.getFullYear() &&
                  d1.date == currentDate.getDate() ? (
                    <th
                      key={index}
                      className="p-6 bg-green-700 px-8 border-r-white"
                    >
                      <div className="flex flex-col">
                        <div className="text-[12px] font-light text-white">
                          {d1.day}
                        </div>
                        <p className="text-xl font-light text-white">
                          {d1.date}
                        </p>
                      </div>
                    </th>
                  ) : (
                    <th
                      key={index}
                      className="p-6 bg-gray-600 px-8 border-r-white"
                    >
                      <div className="flex flex-col">
                        <div className="text-[12px] font-light text-white">
                          {d1.day}
                        </div>
                        <p className="text-xl font-light text-white">
                          {d1.date}
                        </p>
                      </div>
                    </th>
                  )}
                </>
              ))}
            </tr>
          </thead>
          <tbody>
            {roomList.map((data) => (
              <tr key={data} className="border-b">
                <td className="sticky left-0 px-10 bg-gray-500 border-b py-7 text-white text-center">
                  <div className="text-[10px]">Room</div>
                  <div className="text-[20px]">{data}</div>
                </td>

                {bookingData[data - 1].map((data, index) => (
                  <>
                    {Object.values(data).length == 0 ? (
                      <td
                        key={index}
                        className={
                          "p-0 bg-gray-300 font-light px-12 text-center"
                        }
                      ></td>
                    ) : (
                      <td
                        colSpan={data.span}
                        key={index}
                        className={
                          data.type == "reservation"
                            ? "p-0 bg-orange-600 font-thin px-12 text-left text-white"
                            : data.type == "booked"
                            ? "p-0 bg-green-600 font-thin px-12 text-left text-white"
                            : "p-0 bg-gray-200 font-thin px-12 text-left text-white"
                        }
                      >
                        <div className="text-[14px]">{data.name}</div>
                        <div className=" text-[10px]">{data.phoneNo}</div>
                      </td>
                    )}
                  </>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calender;
