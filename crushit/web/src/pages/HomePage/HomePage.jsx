import { Link, routes } from '@redwoodjs/router';
import { MetaTags } from '@redwoodjs/web';
import ToDoAndAppts from 'src/components/ToDoAndAppts/ToDoAndAppts';
import FocusTime from 'src/components/FocusTime/FocusTime';
import AuthorizeCell from 'src/components/AuthorizeCell/AuthorizeCell'
import ThemeToggle from 'src/components/ThemeToggle/ThemeToggle';
import { useEffect, useState } from 'react';
import { getUserUid, useAuth } from 'src/auth';

const HomePage = () => {
  const [uid, setUID] = useState('');
  const [showFocusTime, setShowFocusTime] = useState(true);
  const queryParams = new URLSearchParams(window.location.search)
  const code = queryParams.get('code')

  const start = '2023-05-01T12:00:00Z'
  const end = '2023-06-01T12:00:00Z'

  if (code === null) {
    return <AuthorizeCell></AuthorizeCell>
  }

  //change these to retrieve the current values in the navigation bar
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Month is 0-indexed
  const year = currentDate.getFullYear();

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

  return (
    <>
    {/*<Box borderRadius="lg" p={4} maxW="md" borderWidth="1px">
        <Button onClick={() => setShowEvents(true)}>Appointments</Button>
      </Box>
      {showEvents ? (
        <Appointments
          start={start}
          end={end}
          code={code}
        ></Appointments>
      ) : (
        <div></div>
      )} */}

      <MetaTags title="Home" description="Home page" />
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