import React, { useState } from 'react';
import AppointmentCell from 'src/components/AppointmentCell';
import { gql, useQuery } from '@redwoodjs/web';

// Define the GraphQL query
const GET_EVENTS_QUERY = gql`
  query calendar_demo($start: String!, $end: String!, $code: String!, $uid: String!) {
    getEvents(start: $start, end: $end, code: $code, uid: $uid) {
      code
      events {
        summary
        description
        start
        end
      }
    }
  }
`;

const Appointments = ({start, end, code, uid}) => {

   // Execute the query
   const { data, loading, error } = useQuery(GET_EVENTS_QUERY, {
    variables: { start, end, code, uid },
  });

  //if (loading){ return <div>Loading...</div>;};
  //if (error) return <div>Error: {error.message}</div>;

  const events = data?.getEvents?.events || [];

  // Example appointment times
  const times = [
    '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM',
    '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM',
    '12 AM', '1 AM', '2 AM', '3 AM', '4 AM',
  ];

  const [showPopup, setShowPopup] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);


  const handleDescription = (time) => {
    setSelectedTime(time);
    setShowPopup(true);
  };

  const tasks = {
    // examples
    // '7 AM': 'Focus Time • Assign Leader for Task 1',
    // '8 AM': 'Meeting with Counselor',
    // '9 AM': 'Focus Time • Assign Leader for Task 1',
    // ... add additional tasks as needed
  };
  const TaskDescriptionPopup = () => (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <h3 className="font-bold text-lg mb-4">Task Details for {selectedTime}</h3>
        {/* Display the selected task detail */}
        <p>{selectedTask}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={() => setShowPopup(false)}
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <h2 className="text-[30px] font-bold font-dm text-gray-900 mb-3">Appointments</h2>
      <div className="bg-white rounded-lg shadow p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100" style={{ height: "72vh" }}>
        {times.map((time) => (
          <div key={time} className="flex items-center justify-between px-4 py-2">
            <span className="text-lg text-gray-700 font-semibold">{time}</span>
            {tasks[time] ? (
              <button
                onClick={() => handleDescription(time)}
                className="ml-4 bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-md shadow focus:outline-none focus:ring focus:border-blue-300"
              >
                {tasks[time]}
              </button>
            ) : (
              // Render an empty space if there's no task for the time slot
              <span className="ml-4 text-sm px-2 py-1"></span>
            )}
          </div>
        ))}
      </div>
      {showPopup && <TaskDescriptionPopup />}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.summary}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.start}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.end}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
};
export default Appointments;
