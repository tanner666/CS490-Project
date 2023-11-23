import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import ToDoAndAppts from 'src/components/ToDoAndAppts/ToDoAndAppts';
import FocusTime from 'src/components/FocusTime/FocusTime';
import ThemeToggle from 'src/components/ThemeToggle/ThemeToggle';
import { useEffect, useState } from 'react';
import { getUserUid, useAuth } from 'src/auth';


const HomePage = () => {
  const [uid, setUID] = useState('');
  //change these to retreive the current values in the navigation bar
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; //MOnth is 0-indexed 
  const year = currentDate.getFullYear();

  useEffect(() => {
    getUserUid()
      .then((uid) => {
        // console.log(uid)
          setUID(uid)
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }, []);
  
  //passes the current date when initially loading page
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <div>
       {uid ? (
          <>
            <ToDoAndAppts userId={uid} day={day} month={month} year={year} />
            <FocusTime />
          </>
        ) : (
          <p>Loading or no UID available...</p>
       )} 
      </div>
    </>
  )
}

export default HomePage