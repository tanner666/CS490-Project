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

  const DropdownBox = (options, selectedValue, onChange) => (
    <div style={roundedBoxStyle}>
      <select
        className="ml-2"
        style={{ background: 'transparent', border: 'none', outline: 'none' }}
        value={selectedValue}
        onChange={onChange}
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
      <div className="bg-custom-gray flex-grow h-screen flex flex-col items-center relative" style={{ flex: '1', maxWidth: '14vw', minWidth: '14vw' }}>
        <div className="text-white mt-10">
          <h2 className="font-normal leading-none font-fredoka" style={{ fontSize: '2vw' }}>Crush It</h2>
        </div>
        <div className="mt-10 h-0.5 w-[80%] bg-dark-gray"></div>
        <div className="mt-10 flex items-center justify-center">
          <img
            src="https://drive.google.com/uc?id=16-VMhr8wY_qwKfeaHduWZTeB3oFuTc4b"
            alt="Plan your day illustration"
            className="w-[63.76%] mb-8"
          />
        </div>
        <div className="text-white mb-8">
          <p className="font-normal leading-none font-fredoka text-center" style={{ fontSize: '1vw' }}>It's time to<br />plan your day!</p>
        </div>
        <div className="mb-12">
          <button className="bg-custom-gray text-white py-3 px-10 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 border border-white">
            Plan Day
          </button>
        </div>
        <div className="mb-12 absolute bottom-8">
          <button onClick={handleLogout} className="bg-custom-gray text-xs text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 border border-white">
            Log Out
          </button>
        </div>
      </div>
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
              handleMonthChange
            )}
            {ImageBox("https://drive.google.com/uc?id=11WQmToUHDMwNKwAMmdrmgbsXWdPvkJmX")}
            {ImageBox("https://drive.google.com/uc?id=1yvUV6NAFgWMWYrNoDOUuHZ92uiHXwyyA")}
            {DropdownBox(Array.from({ length: 31 }, (_, i) => i + 1), selectedDay, handleDayChange)}
            {ImageBox("https://drive.google.com/uc?id=11WQmToUHDMwNKwAMmdrmgbsXWdPvkJmX")}
            {ImageBox("https://drive.google.com/uc?id=1yvUV6NAFgWMWYrNoDOUuHZ92uiHXwyyA")}
            {DropdownBox(Array.from({ length: 50 }, (_, i) => today.getFullYear() - i), selectedYear, handleYearChange)}
            {ImageBox("https://drive.google.com/uc?id=11WQmToUHDMwNKwAMmdrmgbsXWdPvkJmX")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateNavigation;

