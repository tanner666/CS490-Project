// DateNavigation.jsx

import React from 'react';
import { navigate } from '@redwoodjs/router';

const DateNavigation = ({selectedDay, selectedMonth, selectedYear, handleDayChange, handleMonthChange, handleYearChange, handlePrevMonth, handleNextMonth, handlePrevDay, handleNextDay, handlePrevYear, handleNextYear, theme}) => {
  // Get today's date
  const today = new Date();


  const blueBoxStyle = {
    backgroundColor: 'rgba(98, 132, 255, 0.15)',
    width: '82.5vw',
    height: '60px',
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



  const daysInMonth = (selectedYear, selectedMonth) => new Date(selectedYear, selectedMonth, 0).getDate();

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
        style={{ background:'transparent', border: 'none', outline: 'none' }}
        value={selectedValue}
        onChange={onChange}
        data-testid="monthDropdown" // Assign the data-testid here
      >
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={i + 1} className="text-[#333333]">
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
        {Array.from({ length: daysInMonth(selectedYear, selectedMonth) }, (_, i) => (
          <option key={i + 1} value={i + 1} className="text-[#333333]">
            {i + 1}
          </option>
        ))}
      </select>
    </div>
  );

  const YearDropdownBox = ({ selectedValue, onChange }) => (
    <div style={roundedBoxStyle}>
      <select
        className="bg-transparent ml-2"
        style={{ border: 'none', outline: 'none' }}
        value={selectedValue}
        onChange={onChange}
        data-testid="yearDropdown" // Assign the data-testid here
      >
        {Array.from({ length: 100 }, (_, i) => today.getFullYear() - 50 + i).map((year, index) => (
          <option key={index + 1} value={year} className="text-[#333333] ml-2">
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
