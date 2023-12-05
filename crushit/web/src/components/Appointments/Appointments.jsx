import React, { useState } from 'react';
import AppointmentDetails from '../AppointmentDetails/AppointmentDetails';

const Appointments = () => {
  const times = [
    '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', 
    '12 PM', '1 PM', '2 PM', '3 PM', '4 PM',
    '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM',
    '12 AM', '1 AM', '2 AM', '3 AM', '4 AM',
    //...times list
  ];

  const [showTaskDetailForTime, setShowTaskDetailForTime] = useState(null);

  const handleToggleDescription = (time) => {
    if (showTaskDetailForTime === time) {
      setShowTaskDetailForTime(null); // Close if the same time is clicked
    } else {
      setShowTaskDetailForTime(time); // Show for the clicked time
    }
  };

  const tasks = {
    // examples        
    //'7 AM': 'Focus Time • Assign Leader for Task 1',
    //'8 AM': 'Meeting with Counselor',
    //'9 AM': 'Focus Time • Assign Leader for Task 1',
    //...tasks object
  };

  return (
    <div>
      <h2 className="text-[30px] font-bold font-dm text-gray-900 mb-3">Appointments</h2>
      <div className="bg-white rounded-lg shadow p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100" style={{ height: "72vh" }}>
        {times.map((time) => (
          <div key={time} className="flex flex-col items-start justify-between px-4 py-2">
            <div className="flex items-center w-full">
              <span className="text-lg text-gray-700 font-semibold">{time}</span>
              {tasks[time] && (
                <button
                  onClick={() => handleToggleDescription(time)}
                  className="ml-4 bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-md shadow focus:outline-none focus:ring focus:border-blue-300"
                >
                  {tasks[time]}
                </button>
              )}
            </div>
            {showTaskDetailForTime === time && (
              <AppointmentDetails
                task={{ time, detail: tasks[time] }} 
                onClose={() => setShowTaskDetailForTime(null)} // Pass the close function as a prop
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
