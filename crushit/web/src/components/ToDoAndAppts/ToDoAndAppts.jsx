//ToDoAndAppts

import React from 'react';
import { useState } from 'react';
import { useTheme } from '../ThemeContext/ThemeContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { navigate } from '@redwoodjs/router';
import DateNavigation from '../DateNavigation/DateNavigation';
import PlanDay from '../PlanDay/PlanDay';
import ToDo from '../ToDo/ToDo';

const ToDoAndAppts = ({userId, day, month, year}) => {
  const { theme } = useTheme();

  const today = new Date();
  let [selectedDay, setSelectedDay] = React.useState(today.getDate());
  let [selectedMonth, setSelectedMonth] = React.useState(today.getMonth() + 1); // Using the month index
  let [selectedYear, setSelectedYear] = React.useState(today.getFullYear());

  const handleDayChange = (event) => {
    const newDay = parseInt(event.target.value, 10);
    const daysInNewMonth = daysInMonth(selectedYear, selectedMonth);

    // Update the selected day if it's inappropriate for the selected month
    if (newDay > daysInNewMonth) {
      setSelectedDay(daysInNewMonth);
    } else {
      setSelectedDay(newDay);
    }
  };

  const handleMonthChange = (event) => {
    const newMonth = parseInt(event.target.value, 10);
    const daysInNewMonth = daysInMonth(selectedYear, newMonth);

    setSelectedMonth(newMonth);

    // Update the selected day if it's greater than the days in the new month
    if (selectedDay > daysInNewMonth) {
      setSelectedDay(daysInNewMonth);
    }
  };

  const handleYearChange = (event) => {
    const newYear = parseInt(event.target.value, 10);
    const daysInCurrentMonth = daysInMonth(selectedYear, selectedMonth);
    const daysInNewMonth = daysInMonth(newYear, selectedMonth);

    setSelectedYear(newYear);

    // Update the selected day if it's greater than the days in the new month
    if (selectedDay > Math.min(daysInCurrentMonth, daysInNewMonth)) {
      setSelectedDay(Math.min(daysInCurrentMonth, daysInNewMonth));
    }
  };

  const handlePrevMonth = () => {
    setSelectedMonth((prevMonth) => (prevMonth === 1 ? 12 : prevMonth - 1));
    // Check if the previous day is in the previous month
    const isPrevDayInPrevMonth = selectedDay === 1;
    if (isPrevDayInPrevMonth) {
      handlePrevDay();
    }
  };

  const handleNextMonth = () => {
    setSelectedMonth((prevMonth) => (prevMonth === 12 ? 1 : prevMonth + 1));
    // Check if the next day is in the next month
    const isNextDayInNextMonth = selectedDay === daysInMonth(selectedYear, selectedMonth);
    if (isNextDayInNextMonth) {
      handleNextDay();
    }
  };

  const handlePrevDay = () => {
      const prevDay = selectedDay - 1;

      // Check if the previous day is in the previous month
      const isPrevDayInPrevMonth = prevDay === 0;
      if (isPrevDayInPrevMonth) {
        const prevMonth = selectedMonth === 1 ? 12 : selectedMonth - 1;
        const prevYear = selectedMonth === 1 ? selectedYear - 1 : selectedYear;
        const lastDayOfPrevMonth = daysInMonth(prevYear, prevMonth);
        setSelectedMonth(prevMonth);
        setSelectedYear(prevYear);
        setSelectedDay(lastDayOfPrevMonth);
      } else {
        setSelectedDay(prevDay);
      }
  };

  const handleNextDay = () => {
    const nextDay = selectedDay + 1;
    const daysInCurrentMonth = daysInMonth(selectedYear, selectedMonth);

    // Check if the next day is in the next month
    const isNextDayInNextMonth = nextDay > daysInCurrentMonth;
    if (isNextDayInNextMonth) {
      const nextMonth = selectedMonth === 12 ? 1 : selectedMonth + 1;
      const nextYear = selectedMonth === 12 ? selectedYear + 1 : selectedYear;
      setSelectedMonth(nextMonth);
      setSelectedYear(nextYear);
      setSelectedDay(1);
    } else {
      setSelectedDay(nextDay);
    }
  };

  const handlePrevYear = () => {
    setSelectedYear((prevYear) => prevYear - 1);
  };

  const handleNextYear = () => {
    setSelectedYear((prevYear) => prevYear + 1);
  };
  
  const daysInMonth = (year, month) => new Date(year, month, 0).getDate();

  const [formVisibility, setFormVisibility] = useState(false);
  const toggleFormVisibility = () => {
    console.log('toggleFormVisibility', formVisibility);
    setFormVisibility(prevState => !prevState);
  };

  return (
    <div className={`flex ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-light-gray text-gray-900'}`}>
      <PlanDay/>
      <div className="w-full">
        {/*Home Bar Top page */}
        <div className={`pt-1 pb-1 w-full mx-auto shadow-sm ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
          <h2 className={`text-2xl font-dm font-bold mt-2 mb-2 ml-[3%] ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Home</h2>
        </div>
        {/*Date Nav Bar */}
        <div className="flex pt-2 justify-between items-center">
          <DateNavigation selectedDay={selectedDay} selectedMonth={selectedMonth} selectedYear={selectedYear} handleDayChange={handleDayChange} handleMonthChange={handleMonthChange} handleYearChange={handleYearChange} handlePrevMonth={handlePrevMonth} handleNextMonth={handleNextMonth} handlePrevDay={handlePrevDay} handleNextDay={handleNextDay} handlePrevYear={handlePrevYear} handleNextYear={handleNextYear}/>
        </div>
        <div className="pt-12 pl-6">
          <div className="flex items-center justify-start">
            <h2 className={`text-[30px] font-dm font-bold mt-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Tasks</h2>
            <button className="pl-4" onClick={toggleFormVisibility}>
              <img src="https://drive.google.com/uc?export=view&id=1psd6NBXctlxs7lN-5CJpXSCylzaWHVg1"/>
            </button>
          </div>
          <button className='w-6 h-6'onClick={() => onStatusChange(task.id, !task.completed)}>
          <img src="https://drive.google.com/uc?export=view&id=1JbmEUFBK5MHBXKQNh0MvHDI8eSG8z1sP"/>
          </button>
          <div style={{ maxHeight: '75vh', overflowY: 'auto' }} className="custom-scrollbar">
            <ToDo userId={userId} day={selectedDay} month={selectedMonth} year={selectedYear} formVisibility={formVisibility} toggleFormVisibility={toggleFormVisibility}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoAndAppts;