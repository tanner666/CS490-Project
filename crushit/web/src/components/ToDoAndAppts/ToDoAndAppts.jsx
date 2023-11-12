// DateNavigation.jsx

import React from 'react';
import { useTheme } from '../ThemeContext/ThemeContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { navigate } from '@redwoodjs/router';
import DateNavigation from '../DateNavigation/DateNavigation';
import PlanDay from '../PlanDay/PlanDay';

const ToDoAndAppts = () => {
  const { theme } = useTheme();

  // Get today's date
  const today = new Date();
  let [selectedDay, setSelectedDay] = React.useState(today.getDate());
  let [selectedMonth, setSelectedMonth] = React.useState(today.getMonth() + 1); // Using the month index
  let [selectedYear, setSelectedYear] = React.useState(today.getFullYear());

  const handleLogout = async () => {
    // Your logout logic here
    navigate('/');
  };

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
    border: `1px solid rgba(98, 132, 255, 1)`, // Slightly darker blue border
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

  const DropdownBox = (options, selectedValue, onChange, testId) => (
    <div style={roundedBoxStyle}>
      <select
        className="ml-2"
        style={{ background: 'transparent', border: 'none', outline: 'none' }}
        value={selectedValue}
        onChange={onChange}
        data-testid={testId} // Assign the data-testid here
      >
        {options.map((option, index) => (
          <option key={index + 1} value={index + 1}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className={`flex ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-light-gray text-gray-900'}`}>
      <PlanDay/>
      <DateNavigation/>
    </div>
  );
};

export default ToDoAndAppts;

