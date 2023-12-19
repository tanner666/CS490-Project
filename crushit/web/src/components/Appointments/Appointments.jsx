import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@redwoodjs/web';
import { parseISO, format } from 'date-fns';
import { useTheme } from '../ThemeContext/ThemeContext';

// Define the GraphQL query
const GET_EVENTS_QUERY = gql`
  query calendar_demo($start: String!, $end: String!, $code: String, $uid: String!) {
    getEvents(start: $start, end: $end, code: $code, uid: $uid) {
      events {
        summary
        description
        start
        end
      }
    }
  }
`;



const Appointments = ({start, end, uid, tasks}) => {
  const {theme} = useTheme();

  const date = new Date(start);
  console.log("DAte: ", date);
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  let taskIndices = {
    TopPriority: 0,
    Important: 0,
    Other: 0
  };

    if (typeof window === "undefined") {
      // If window is undefined, return null or handle appropriately
      console.log("window is not defined, this code is running server-side");
      return null;
    }

    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');
    console.log("Code in services file: ", code);


   // Execute the query
   console.log("REal code: ", code);
   const { data, loading, error } = useQuery(GET_EVENTS_QUERY, {
    variables: { start, end, code, uid },
  });

  const formatEventTime = (dateTimeString) => {
    const date = parseISO(dateTimeString);
    return format(date, 'h a'); // Formats to 'X AM/PM'
  };

  const formatDescriptionTime = (dateTimeString) => {
    const date = parseISO(dateTimeString);
    return format(date, 'h:mm a'); // Formats to 'X AM/PM'
  };
  const events = data?.getEvents?.events || [];
  const access_tok = data?.getEvents?.access_tok || '';
  console.log("Appointments access token", access_tok);

  // Example appointment times
  const times = [
    '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM',
    '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM',
  ];

  const [showPopup, setShowPopup] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedEventSummary, setSelectedEventSummary] = useState(null);


  const handleDescription = (start, eventSummary, end) => {
    setSelectedTime(formatDescriptionTime(start));
    setEndTime(formatDescriptionTime(end));
    setSelectedEventSummary(eventSummary);
    setShowPopup(true);
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
      console.log("Map: StartTimes: ", startTime);
    });
    return eventMap;
  };

  const eventMap = mapEventsToTimes(events);
  console.log("EventMap: ", eventMap);

  // Function to parse a time string like "5 AM" or "5 PM"
  const parseTimeString = (timeString, extra) => {
    const [time, modifier] = timeString.split(' ');
    let [hours] = time.split(':');
    hours = parseInt(hours, 10);

    // Convert to 24-hour time if necessary
    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0; // Midnight is 00:00 in 24-hour time
    }

    // Create a Date object for today with the specified time
    const date = new Date();
    date.setHours(hours + extra, 0, 0, 0); // sets minutes, seconds, and milliseconds to 0
    return date;
  };

  function compareTime (s, e) {
    const currentTime = new Date();
    const start = new Date(s);
    const end = new Date(e);
    if (currentTime >= start && currentTime <= end){
      return true;
    }
    return false;
  }

  const getNextTask = () => {
    let nextTask = null;
    if (taskIndices.TopPriority < tasks.TopPriority.length) {
      nextTask = tasks.TopPriority[taskIndices.TopPriority];
      taskIndices.TopPriority = taskIndices.TopPriority + 1;
    } else if (taskIndices.Important < tasks.Important.length) {
      nextTask = tasks.Important[taskIndices.Important];
      taskIndices.Important = taskIndices.Important + 1;
    } else if (taskIndices.Other < tasks.Other.length) {
      nextTask = tasks.Other[taskIndices.Other];
      taskIndices.Other = taskIndices.Other + 1;
    }

    return nextTask;
  };

  return (
    <div className="ml-1">
      <h2 className={`text-[30px] font-bold font-dm mb-3 ${theme === 'dark' ? 'bg-gray-800 text-white' : (theme === 'winter' ? 'bg-transparent' : 'bg-light-gray text-gray-900')}`}>Appointments</h2>
      <div className={` ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100`} style={{ height: "72vh" }}>
        {times.map((time, index) => (
          // Container for the time and task description
          <div key={index} className="flex flex-col sm:flex-row items-start px-1 py-2">
            {/**Time label */}
            <div className={`min-w-[39px] ${compareTime(parseTimeString(time, 0), parseTimeString(time, 1)) ? 'text-task-blue border-2 p-1 ml-[-6px] mt-[-7px] mb-[-9px] mr-[11px] border-task-blue rounded-md' : (theme === 'dark' ? 'text-white' : 'text-task-black') && 'mr-4'}  text-sm font-semibold`}>{time}</div>

            {/**Event Container */}
            <div className="flex-grow">
              {eventMap[time] ?
               eventMap[time].map((event, eventIndex) => (
                <div key={eventIndex} className={`${compareTime(event.start, event.end) ? 'bg-transparent-blue' : 'bg-white'} border-2 border-bar-grey ${eventIndex > 0 ? 'mt-0' : 'mt-2'} ${eventIndex == eventMap[time].length-1 ? 'mb-[-25px]' :'mb-0'}`}>
                  <button
                    onClick={() => { setSelectedTask(event.description); handleDescription(event.start, event.summary, event.end); }}
                    className="text-task-black font-semibold text-sm px-2 py-1 focus:outline-none focus:ring focus:border-blue-300 my-1"
                  >
                    {event.summary}
                  </button>
                </div>
              )) :
              (
                (() => {
                  const task = getNextTask();
                  console.log(task);
                  if (task) {
                    return (
                      <div className={`${compareTime(parseTimeString(time, 0), parseTimeString(time, 1)) ? 'bg-transparent-blue' : 'bg-white'} border-2 border-bar-grey mt-2 mb-[-25px] p-2}`}>
                        <button
                          onClick={() => { setSelectedTask(task.taskName); }}
                          className="text-task-black font-semibold text-sm px-2 py-1 focus:outline-none focus:ring focus:border-blue-300 my-1"
                        >
                          {task.taskName}
                        </button>
                      </div>
                    );
                  }
                })()
              )}
            </div>
          </div>
        ))}
      </div>
      {showPopup && <TaskDescriptionPopup/>}
    </div>
  );


};
export default Appointments;