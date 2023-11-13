// DateNavigation.jsx

import React from 'react';
import { useTheme } from '../ThemeContext/ThemeContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { navigate } from '@redwoodjs/router';

const DateNavigation = () => {
  const { theme } = useTheme();

  // Get today's date
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

  const blueBoxStyle = {
    backgroundColor: 'rgba(98, 132, 255, 0.15)',
    width: '1020px',
    height: '60px',
    top: '94px',
    left: '20px',
    borderRadius: '10px',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const dateBoxContainerStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const navigationButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
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

  const roundedBoxStyle = {
    backgroundColor: 'transparent',
    color: theme === 'dark' ? '#FFFFFF' : '#333333',
    padding: '8px',
    margin: '0 5px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    border: `1px solid rgba(98, 132, 255, 1)`, // Slightly darker blue border
    cursor: 'pointer',
  };

  const ImageBox = (imageUrl, onClick, altText) => (
    <div style={roundedBoxStyle} onClick={onClick}>
      <img
        src={imageUrl}
        alt={altText}
        style={{ width: '100%', height: '100%', borderRadius: '50%' }}
      />
    </div>
  );

  const MonthDropdownBox = ({ selectedValue, onChange }) => (
    <div style={roundedBoxStyle}>
      <select
        className="ml-2"
        style={{ background: 'transparent', border: 'none', outline: 'none' }}
        value={selectedValue}
        onChange={onChange}
        data-testid="monthDropdown" // Assign the data-testid here
      >
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {[
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ][i]}
          </option>
        ))}
      </select>
    </div>
  );

  const DayDropdownBox = ({ selectedValue, onChange }) => (
    <div style={roundedBoxStyle}>
      <select
        className="ml-2"
        style={{ background: 'transparent', border: 'none', outline: 'none' }}
        value={selectedValue}
        onChange={onChange}
        data-testid="dayDropdown" // Assign the data-testid here
      >
        {Array.from({ length: 31 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
    </div>
  );

  const YearDropdownBox = ({ selectedValue, onChange }) => (
    <div style={roundedBoxStyle}>
      <select
        className="ml-2"
        style={{ background: 'transparent', border: 'none', outline: 'none' }}
        value={selectedValue}
        onChange={onChange}
        data-testid="yearDropdown" // Assign the data-testid here
      >
        {Array.from({ length: 100 }, (_, i) => today.getFullYear() - 50 + i).map((year, index) => (
          <option key={index + 1} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );

  return (
      <div className="w-full p-4 relative">
        <div style={blueBoxStyle}>
          <div style={dateBoxContainerStyle}>
            {ImageBox("https://drive.google.com/uc?id=1yvUV6NAFgWMWYrNoDOUuHZ92uiHXwyyA", handlePrevMonth, 'Previous Month')}
            {/* Using MonthDropdownBox for the month */}
            <MonthDropdownBox selectedValue={selectedMonth} onChange={handleMonthChange} />
            {ImageBox("https://drive.google.com/uc?id=11WQmToUHDMwNKwAMmdrmgbsXWdPvkJmX", handleNextMonth, 'Next Month')}
            {ImageBox("https://drive.google.com/uc?id=1yvUV6NAFgWMWYrNoDOUuHZ92uiHXwyyA", handlePrevDay, 'Previous Day')}
            {/* Using DayDropdownBox for the day */}
            <DayDropdownBox selectedValue={selectedDay} onChange={handleDayChange} />
            {ImageBox("https://drive.google.com/uc?id=11WQmToUHDMwNKwAMmdrmgbsXWdPvkJmX", handleNextDay, 'Next Day')}
            {ImageBox("https://drive.google.com/uc?id=1yvUV6NAFgWMWYrNoDOUuHZ92uiHXwyyA", handlePrevYear, 'Previous Year')}
            {/* Using YearDropdownBox for the year */}
            <YearDropdownBox selectedValue={selectedYear} onChange={handleYearChange} />
            {ImageBox("https://drive.google.com/uc?id=11WQmToUHDMwNKwAMmdrmgbsXWdPvkJmX", handleNextYear, 'Next Year')}
          </div>
        </div>
      </div>
  );
};

export default DateNavigation;
