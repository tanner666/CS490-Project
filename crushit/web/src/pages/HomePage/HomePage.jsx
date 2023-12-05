import { Link, routes } from '@redwoodjs/router';
import { MetaTags } from '@redwoodjs/web';
import ToDoAndAppts from 'src/components/ToDoAndAppts/ToDoAndAppts';
import FocusTime from 'src/components/FocusTime/FocusTime';
import AuthorizeCell from 'src/components/AuthorizeCell/AuthorizeCell'
import ThemeToggle from 'src/components/ThemeToggle/ThemeToggle';
import { useEffect, useState } from 'react';
import { getUserUid, useAuth } from 'src/auth';
import AppointmentCell from 'src/components/AppointmentCell';

const HomePage = () => {
  const [uid, setUID] = useState('');
  const [showEvents, setShowEvents] = useState(false)
  const [showFocusTime, setShowFocusTime] = useState(true);
  const queryParams = new URLSearchParams(window.location.search)
  const code = queryParams.get('code')
  console.log("code: ", code);

  if (code === null) {
    return <AuthorizeCell></AuthorizeCell>
  }

  //change these to retrieve the current values in the navigation bar
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Month is 0-indexed
  const year = currentDate.getFullYear();
  const formattedMonth = month.toString().padStart(2,'0');
  const formattedDay = day.toString().padStart(2, '0');

  //once other issue is fixed, use these values below
  //const start = `${year}-${formattedMonth}-${formattedDay}T12:00:00Z`;
  //const end = `${year}-${formattedMonth}-${formattedDay}T12:00:00Z`;
  const start = '2023-12-04T12:00:00Z'
  const end = '2023-12-05T12:00:00Z'

  useEffect(() => {
    getUserUid()
      .then((uid) => {
        setUID(uid);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleClose = () => {
    setShowFocusTime(false); // This function will close the FocusTime component
  };

  const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.3)', // Adjust the alpha channel for transparency
    zIndex: 1000, // Make sure it's above other elements
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  console.log("Values: ", start, end, code, "UID: ", uid);

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <div className="border rounded-lg p-4 max-w-md border-gray-200">
          <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowEvents(true)}
          >
              Appointments
          </button>
      </div>

      {showEvents ? (
        <AppointmentCell
          start={start}
          end={end}
          code={code}
          uid={uid}
        ></AppointmentCell>
      ) : (
        <div></div>
      )}

      <div>
        {uid ? (
          <>
            <ToDoAndAppts userId={uid} day={day} month={month} year={year} start={start} end={end} code={code}/>
            {showFocusTime && (
            <>
               <div style={overlayStyles}>
                 <FocusTime onClose={handleClose} />
               </div>
            </>
          )}
            </>
         ) : (
           <p>Loading or no UID available...</p>
         )}
      </div>
    </>
  );
};

export default HomePage;