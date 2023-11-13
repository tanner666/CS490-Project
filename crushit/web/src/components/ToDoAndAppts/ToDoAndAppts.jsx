// DateNavigation.jsx

import React from 'react';
import { useTheme } from '../ThemeContext/ThemeContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { navigate } from '@redwoodjs/router';
import DateNavigation from '../DateNavigation/DateNavigation';
import PlanDay from '../PlanDay/PlanDay';
import ToDo from '../ToDo/ToDo';

const ToDoAndAppts = ({userId, day, month, year}) => {
  const { theme } = useTheme();

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
          <DateNavigation/>
        </div>
        <div className="p-12">
          <h2 className={`text-[30px] font-dm font-bold mt-2 mb-2 ml-[3%] ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Tasks</h2>
          <ToDo userId={userId} day={day} month={month} year={year}/>
        </div>
      </div>
    </div>
  );
};

export default ToDoAndAppts;
