import React from 'react';

const Appointments = () => {
  // Example appointment times
  const times = [
    '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM',
    '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM',
    '12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM',
  ];

  // Styles as variables
  const containerStyle = {
    width: '460px',
    height: '390px',
    top: '200px',
    left: '750px',
    position: 'absolute',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 1)',
    boxShadow: '2px 5px 50px 0px rgba(36, 37, 40, 0.1)',
    padding: '10px',
    overflow: 'hidden', // Add overflow property to hide overflowing content
  };

  const scrollContainerStyle = {
    maxHeight: '360px', // Set max height for the scrollable area
    overflowY: 'auto', // Enable vertical scrolling
    marginTop: '10px',
  };

  const appointmentItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    paddingLeft: '0px',
    borderBottom: '1px solid #E2E8F0',
  };

  const timeStyle = {
    fontFamily: 'DM Sans',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: '0em',
    textAlign: 'left',
    color: '#4B5563',
  };

  const titleStyle = {
    fontFamily: 'DM Sans',
    fontSize: '30px',
    fontWeight: 700,
    lineHeight: '39px',
    letterSpacing: '0em',
    textAlign: 'left',
    color: '#2D3748',
    marginBottom: '1rem',
    position: 'absolute',
    top: '150px', // Adjust the distance from the top
    left: '750px',
  };

  return (
    <>
      <h2 style={titleStyle}>
        Appointments
      </h2>
      <div style={containerStyle}>
        <div className="bg-white rounded-lg shadow p-4" style={{ marginTop: '40px', ...scrollContainerStyle }}>
          <div className="overflow-y-auto">
            {times.map((time, index) => (
              <div key={index} style={appointmentItemStyle}>
                <span style={timeStyle}>{time}</span>
                <div className="flex items-center">
                  {/* Placeholder for appointment tasks, if any */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;

