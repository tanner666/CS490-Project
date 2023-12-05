import React, { useState } from 'react';
import AppointmentCell from 'src/components/AppointmentCell';
import { gql, useQuery } from '@redwoodjs/web';
import { parseISO, format } from 'date-fns';

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

  const formatEventTime = (dateTimeString) => {
    const date = parseISO(dateTimeString);
    return format(date, 'h a'); // Formats to 'X AM/PM'
  };

  const events = data?.getEvents?.events || [];

  // Example appointment times
  const times = [
    '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM',
    '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM',
    '12 AM', '1 AM', '2 AM', '3 AM', '4 AM',
  ];

  const [showPopup, setShowPopup] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedEventSummary, setSelectedEventSummary] = useState(null);


  const handleDescription = (time, eventSummary, end) => {
    setSelectedTime(time);
    setEndTime(formatEventTime(end));
    setSelectedEventSummary(eventSummary);
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
        <h3 className="font-bold text-lg mb-2">{selectedEventSummary}</h3>
        {/* Display the selected task detail */}
        <p>Time: {selectedTime} - {endTime}</p>
        <p>Description: {selectedTask}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={() => setShowPopup(false)}
        >
          Close
        </button>
      </div>
    </div>
  );

  const mapEventsToTimes = (events) => {
    const eventMap = {};
    events.forEach(event => {
      const startTime = formatEventTime(event.start);
      if (!eventMap[startTime]) {
        eventMap[startTime] = [];
      }
      eventMap[startTime].push(event);
    });
    return eventMap;
  };

  const eventMap = mapEventsToTimes(events);

  return (
    <div>
      <h2 className="text-[30px] font-bold font-dm text-gray-900 mb-3">Appointments</h2>
      <div className="bg-white rounded-lg shadow p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100" style={{ height: "72vh" }}>
        {times.map((time, index) => (
          // Container for the time and task description
          <div key={index} className="relative px-4 py-2">
            <span className="text-sm text-task-black font-semibold">{time}</span>
            {eventMap[time] && eventMap[time].map((event, eventIndex) => (
              <div key={eventIndex} className="absolute top-6 right-0 w-[86%] h-[101%] border-2 border-bar-grey">
                <button
                  onClick={() => { setSelectedTask(event.description); handleDescription(time, event.summary, event.end); }}
                  className="text-task-black font-semibold text-sm px-2 py-1 focus:outline-none focus:ring focus:border-blue-300 my-1"
                >
                  {event.summary}
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
      {showPopup && <TaskDescriptionPopup/>}
    </div>
  );


};
export default Appointments;
