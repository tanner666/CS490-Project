import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import ToDoAndAppts from 'src/components/ToDoAndAppts/ToDoAndAppts';
import ThemeToggle from 'src/components/ThemeToggle/ThemeToggle';
import { useEffect, useState } from 'react';
import { getUserUid, useAuth } from 'src/auth';


const HomePage = () => {
  const [uid, setUID] = useState('')
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
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <div>
      {uid ? (
          <ToDoAndAppts userId={uid} />
        ) : (
          <p>Loading or no UID available...</p>
        )} 
      </div>
    </>
  )
}

export default HomePage
