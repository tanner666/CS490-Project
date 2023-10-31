import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import SettingsForm from '../../components/SettingsForm/SettingsForm';
import ThemeToggle from 'src/components/ThemeToggle/ThemeToggle';
import { useEffect, useState } from 'react';
import { getUserUid, useAuth } from 'src/auth';

const SettingsPage = () => {
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
      <MetaTags title="Settings" description="Settings page" />
      <div>
      {uid ? (
          <SettingsForm userId={uid} />
        ) : (
          <p>Loading or no UID available...</p>
        )}      </div>
    </>
  )
}

export default SettingsPage
