import { Link, routes } from '@redwoodjs/router';
import { MetaTags } from '@redwoodjs/web';
import ToDoAndAppts from 'src/components/ToDoAndAppts/ToDoAndAppts';
import FocusTime from 'src/components/FocusTime/FocusTime';
import Appointments from 'src/components/Appointments/Appointments';
import ThemeToggle from 'src/components/ThemeToggle/ThemeToggle';
import { useEffect, useState } from 'react';
import { getUserUid, useAuth } from 'src/auth';

const HomePage = () => {
  const [uid, setUID] = useState('');
  const [showFocusTime, setShowFocusTime] = useState(true);

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
      <MetaTags title="Home" description="Home page" />
      <div>
        {uid ? (
          <>
            <ToDoAndAppts userId={uid} day={day} month={month} year={year} />
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