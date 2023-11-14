const Appointments = () => {
  // Example appointment times
  const times = [
    '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM',
    '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM',
    '12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM',
  ];

  // Styles as variables
  const containerStyle = {
    height: "60vh", // Adjust as needed
  };
  
  const appointmentItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'between',
    padding: '12px', // px-3 py-2 in Tailwind
    borderBottom: '1px solid #E2E8F0', // border-b border-gray-200 in Tailwind
  };

  const timeStyle = {
    fontSize: '0.875rem', // text-sm in Tailwind
    color: '#4B5563', // text-gray-700 in Tailwind
    fontWeight: 'medium', // font-medium in Tailwind
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold text-gray-600 mb-3">Appointments</h2>
      <div className="overflow-y-auto" style={containerStyle}>
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
  );
};

export default Appointments;
