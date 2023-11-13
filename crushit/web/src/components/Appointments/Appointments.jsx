const Appointments = () => {
  // Example appointment times
  const times = [
    '12 AM','1 AM', '2 AM', '3 AM','4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', 
    '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', 
    '5 PM', '6 PM', '7 PM', '8 PM', '9 PM' ,'10 PM', '11 PM' 
  ];

  // Adjust the height as needed to fit the content and enable scrolling
  const containerHeight = "60vh"; // Example fixed height

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold text-gray-600 mb-3">Appointments</h2>
      <div className="overflow-y-auto" style={{ height: containerHeight }}>
        {times.map((time, index) => (
          <div key={index} className="flex items-center justify-between px-3 py-2 border-b border-gray-200">
            <span className="text-sm text-gray-700 font-medium">{time}</span>
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
