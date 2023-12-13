import React from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { navigate } from '@redwoodjs/router';
import { Link } from '@redwoodjs/router';

const handleLogout = async () => {
  // Your logout logic here
  navigate('/');
};

const PlanDay = () => {
  return (
    <div className="bg-custom-gray flex-grow h-screen flex flex-col items-center relative" style={{ flex: '1', maxWidth: '14vw', minWidth: '14vw' }}>
        <div className="text-white mt-10">
          <Link to="/home" className="font-normal leading-none font-fredoka" style={{ fontSize: '2vw' }}>Crush It</Link>
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
  )
}

export default PlanDay
