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
    setSelectedDay(parseInt(event.target.value, 10));
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value, 10));
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value, 10));
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

  const roundedBoxStyle = {
    backgroundColor: 'transparent',
    color: theme === 'dark' ? '#FFFFFF' : '#333333',
    padding: '8px',
    margin: '0 5px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    border: `1px solid rgba(98, 132, 255, 1)`, 
  };

  const ImageBox = (imageUrl) => (
    <div style={roundedBoxStyle}>
      <img
        src={imageUrl}
        alt="Arrow"
        style={{ width: '100%', height: '100%', borderRadius: '50%' }}
      />
    </div>
  );

  const DropdownBox = (options, selectedValue, onChange, testId) => {
    const handleWheel = (event) => {
      event.preventDefault();
      const delta = Math.sign(event.deltaY);
      if (delta === 1 && selectedValue < options.length) {
        onChange({ target: { value: selectedValue + 1 } });
      } else if (delta === -1 && selectedValue > 1) {
        onChange({ target: { value: selectedValue - 1 } });
      }
    };
    return (
      <div style={roundedBoxStyle}>
        <select
          className="ml-2"
          style={{ background: 'transparent', border: 'none', outline: 'none' }}
          value={selectedValue}
          onChange={onChange}
          data-testid={testId}
        >
          {options.map((option, index) => (
            <option key={index + 1} value={index + 1}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  };
  return (
      <div className="w-full p-4 relative">
        <div style={blueBoxStyle}>
          <div style={dateBoxContainerStyle}>
            {ImageBox("https://drive.google.com/uc?id=1yvUV6NAFgWMWYrNoDOUuHZ92uiHXwyyA")}
            {DropdownBox(
              [
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
              ],
              selectedMonth,
              handleMonthChange,
              'monthDropdown'
            )}
            {ImageBox("https://drive.google.com/uc?id=11WQmToUHDMwNKwAMmdrmgbsXWdPvkJmX")}
            {ImageBox("https://drive.google.com/uc?id=1yvUV6NAFgWMWYrNoDOUuHZ92uiHXwyyA")}
            {DropdownBox(Array.from({ length: 31 }, (_, i) => i + 1), selectedDay, handleDayChange, 'dayDropdown')}
            {ImageBox("https://drive.google.com/uc?id=11WQmToUHDMwNKwAMmdrmgbsXWdPvkJmX")}
            {ImageBox("https://drive.google.com/uc?id=1yvUV6NAFgWMWYrNoDOUuHZ92uiHXwyyA")}
            {DropdownBox(Array.from({ length: 50 }, (_, i) => today.getFullYear() - i), selectedYear, handleYearChange, 'yearDropdown')}
            {ImageBox("https://drive.google.com/uc?id=11WQmToUHDMwNKwAMmdrmgbsXWdPvkJmX")}
          </div>
        </div>
      </div>
  );
};

export default DateNavigation;

