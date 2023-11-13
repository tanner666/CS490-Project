// DateNavigation.jsx

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

  const [formVisibility, setFormVisibility] = useState(false);
  const toggleFormVisibility = () => {
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
          <DateNavigation/>
        </div>
        <div className="pt-12 pl-6">
          <div className="flex items-center justify-start">
            <h2 className={`text-[30px] font-dm font-bold mt-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Tasks</h2>
            <button className="pl-4" onClick={toggleFormVisibility}>
              {/*Insert + image here */}Add Task
            </button>
          </div>
          <ToDo userId={userId} day={day} month={month} year={year} formVisibility={formVisibility}/>
        </div>
      </div>
    </div>
  );
};

export default ToDoAndAppts;
