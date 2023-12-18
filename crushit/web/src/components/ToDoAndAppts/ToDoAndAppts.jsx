//ToDoAndAppts

import React from 'react';
import {useQuery } from '@redwoodjs/web';
import { useState } from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { navigate } from '@redwoodjs/router';
import DateNavigation from '../DateNavigation/DateNavigation';
import PlanDay from '../PlanDay/PlanDay';
import ToDo from '../ToDo/ToDo';
import Appointments from '../Appointments/Appointments';
import { useTheme } from '../ThemeContext/ThemeContext';

const ToDoAndAppts = ({userId, day, month, year, start, end, toggleFocusTime, setFocusTask}) => {
  const {theme} = useTheme();

  const today = new Date();
  let [selectedDay, setSelectedDay] = React.useState(today.getDate());
  let [selectedMonth, setSelectedMonth] = React.useState(today.getMonth() + 1); // Using the month index
  let [selectedYear, setSelectedYear] = React.useState(today.getFullYear());
  const formattedMonth = selectedMonth.toString().padStart(2,'0');
  const formattedDay = selectedDay.toString().padStart(2, '0');
  let selectedStart = `${selectedYear}-${formattedMonth}-${formattedDay}T00:00:00Z`;
  let selectedEnd = `${selectedYear}-${formattedMonth}-${formattedDay}T23:59:59Z`;

  const handleTimeChange = () => {
    selectedStart = `${selectedYear}-${formattedMonth}-${formattedDay}T00:00:00Z`;
    let selectedEnd = `${selectedYear}-${formattedMonth}-${formattedDay}T23:59:59Z`;
  }
  const handleDayChange = (event) => {
    const newDay = parseInt(event.target.value, 10);
    const daysInNewMonth = daysInMonth(selectedYear, selectedMonth);

    // Update the selected day if it's inappropriate for the selected month
    if (newDay > daysInNewMonth) {
      setSelectedDay(daysInNewMonth);
    } else {
      setSelectedDay(newDay);
    }
    handleTimeChange();
  };

  const handleMonthChange = (event) => {
    const newMonth = parseInt(event.target.value, 10);
    const daysInNewMonth = daysInMonth(selectedYear, newMonth);

    setSelectedMonth(newMonth);

    // Update the selected day if it's greater than the days in the new month
    if (selectedDay > daysInNewMonth) {
      setSelectedDay(daysInNewMonth);
    }
    handleTimeChange();
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
    handleTimeChange();
  };

  const handlePrevMonth = () => {
    setSelectedMonth((prevMonth) => (prevMonth === 1 ? 12 : prevMonth - 1));
    // Check if the previous day is in the previous month
    const isPrevDayInPrevMonth = selectedDay === 1;
    if (isPrevDayInPrevMonth) {
      handlePrevDay();
    }
    handleTimeChange();
  };

  const handleNextMonth = () => {
    setSelectedMonth((prevMonth) => (prevMonth === 12 ? 1 : prevMonth + 1));
    // Check if the next day is in the next month
    const isNextDayInNextMonth = selectedDay === daysInMonth(selectedYear, selectedMonth);
    if (isNextDayInNextMonth) {
      handleNextDay();
    }
    handleTimeChange();
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
      handleTimeChange();

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
    handleTimeChange();

  };

  const handlePrevYear = () => {
    setSelectedYear((prevYear) => prevYear - 1);
    handleTimeChange();

  };

  const handleNextYear = () => {
    setSelectedYear((prevYear) => prevYear + 1);
    handleTimeChange();

  };

  const daysInMonth = (year, month) => new Date(year, month, 0).getDate();

  const [formVisibility, setFormVisibility] = useState(false);
  const toggleFormVisibility = () => {
    console.log('toggleFormVisibility', formVisibility);
    setFormVisibility(prevState => !prevState);
  };


  return (
    <div className={`flex ${theme === 'dark' ? 'bg-gray-800 text-white' : (theme === 'winter' ? "bg-[url('/snow_background.jpeg')] bg-cover text-white": 'bg-light-gray text-gray-900')}`}>
      <PlanDay userId={userId} />
      <div className="w-full">
        {/* Home Bar Top page */}
        <div className={`flex pt-1 pb-1 w-full mx-auto shadow-sm ${(theme === 'dark' || theme === 'winter')? 'bg-gray-700' : 'bg-white'}`}>
          <h2 className={`text-2xl font-dm font-bold mt-2 mb-2 ml-[3%] ${(theme === 'dark' || theme === 'winter')? 'text-white' : 'text-gray-900'}`}>Home</h2>
          <p className="ml-[84%]">
            <a href="/settings" className="text-blue-500 hover:underline">Settings</a>
          </p>
        </div>
        {/* Date Nav Bar */}
        <div className="flex pt-2 justify-between items-center">
          <DateNavigation
            selectedDay={selectedDay}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            handleDayChange={handleDayChange}
            handleMonthChange={handleMonthChange}
            handleYearChange={handleYearChange}
            handlePrevMonth={handlePrevMonth}
            handleNextMonth={handleNextMonth}
            handlePrevDay={handlePrevDay}
            handleNextDay={handleNextDay}
            handlePrevYear={handlePrevYear}
            handleNextYear={handleNextYear}
            theme={theme}
          />
        </div>
        <div className="pt-12 pl-6 flex"> {/* Add flex here to create a flex container */}
          {/* Tasks Section */}
          <div style={{ flex: 1, maxHeight: '79vh'}} className="custom-scrollbar"> {/* Adjusted to share space */}
            <div className="flex items-center justify-start">
              <h2 className={`text-[30px] font-dm font-bold mt-1 ${theme === 'dark' ? 'bg-gray-800 text-white' : (theme === 'winter' ? 'bg-transparent text-white': 'text-gray-900')}`}>Tasks</h2>
              <button className="pl-4" onClick={toggleFormVisibility}>
                <img src="https://drive.google.com/uc?export=view&id=1psd6NBXctlxs7lN-5CJpXSCylzaWHVg1"/>
              </button>
            </div>
            <ToDo userId={userId} day={selectedDay} month={selectedMonth} year={selectedYear} formVisibility={formVisibility} toggleFormVisibility={toggleFormVisibility} toggleFocusTime={toggleFocusTime} setFocusTask={setFocusTask} theme={theme}/>
          </div>

          {/* Appointments Section */}
          <div style={{ flex: 1, maxHeight: '70vh'}} className="custom-scrollbar"> {/* Adjusted to share space */}
            <Appointments start={selectedStart} end={selectedEnd} uid={userId} theme={theme}/>
          </div>
        </div>
      </div>
    </div>
  );

};

export default ToDoAndAppts;
