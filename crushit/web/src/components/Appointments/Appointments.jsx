import React, { useState } from 'react';

const Appointments = () => {
  // Example appointment times
  const times = [
    '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM',
    '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM',
    '12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM',
  ];

  const [showPopup, setShowPopup] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    setShowPopup(true);
  };

  const TaskSelectionPopup = () => (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <h3 className="font-bold text-lg mb-4">Select Task for {selectedTime}</h3>
        {/* Placeholder for task selection logic */}
        <p>Select your task here</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={() => setShowPopup(false)}>Close</button>
      </div>
    </div>
  );

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-600 mb-3">Appointments</h2>
      <div className="bg-white rounded-lg shadow p-4 overflow-y-auto" style={{ height: "60vh" }}>
        {times.map((time, index) => (
          <button
            key={index}
            className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 font-medium hover:bg-gray-100"
            onClick={() => handleTimeClick(time)}
          >
            {time}
          </button>
        ))}
      </div>
      {showPopup && <TaskSelectionPopup />}
    </div>
  );
};

export default Appointments;
