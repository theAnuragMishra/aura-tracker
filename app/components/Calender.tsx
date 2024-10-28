// Add this directive at the top of the file
"use client";

import { FC, useState } from "react";

const Calendar: FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const days = Array.from(
    { length: daysInMonth(currentMonth, currentYear) },
    (_, i) => i + 1
  );

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePreviousMonth} className="bg-purple-600 p-2 rounded-md">
          Previous
        </button>
        <span className="text-xl font-bold">
          {new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(currentYear, currentMonth))} {currentYear}
        </span>
        <button onClick={handleNextMonth} className="bg-purple-600 p-3 rounded-md">
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => (
          <div
            key={day}
            className="relative border border-gray-600 bg-gray-600 bg-opacity-70  p-4 text-center rounded-md h-20"
          >
            <span className="text-xl">{day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
