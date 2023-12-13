import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useQuery, useMutation } from '@redwoodjs/web'
import SettingsForm from '../../components/SettingsForm/SettingsForm';
import { useEffect, useState } from 'react';
import { getUserUid, useAuth } from 'src/auth';

const UPDATE_THEME_MUTATION = gql`
  mutation updateTheme($firebaseUid: String!, $darkMode: Boolean!) {
    updateTheme(firebaseUid: $firebaseUid, darkMode: $darkMode) {
      darkMode
    }
  }
`

const GET_USER_THEME_QUERY = gql`
  query GetUserTheme($firebaseUid: String!) {
    userTheme(firebaseUid: $firebaseUid)
  }
`;

const SettingsPage = () => {
  const [updateTheme] = useMutation(UPDATE_THEME_MUTATION)
  const [uid, setUID] = useState('');
  useEffect(() => {
    getUserUid()
      .then((uid) => {
          console.log(uid)
          setUID(uid)
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }, []);

  const { loading, error, data, refetch } = useQuery(GET_USER_THEME_QUERY, {
    variables: { firebaseUid: uid },
  });

  let darkMode = data?.userTheme ? 'dark' : 'light';
  console.log("SEttings dark mode: ",darkMode);

  const handleToggle = async () => {
    console.log("HandleToggle start");
    try {
        // Here you call your updateUser mutation and password, and podomoro timer
        // Replace `updateUserAPI` with the actual function you would use to call your API
        await updateTheme({
            variables: {
                firebaseUid: uid,
                darkMode: !data?.userTheme,
            },
        });
        refetch();
      }
      catch (error) {
        console.error('Error updating Theme:', error);
        alert('Failed to update theme.');
    }
  };

  return (
    <>
      <MetaTags title="Settings" description="Settings page" />
      <div>
      {uid ? (
          <SettingsForm userId={uid} theme={darkMode} handleToggle={handleToggle}/>
        ) : (
          <p>Loading or no UID available...</p>
        )}      </div>
    </>
  )
}

export default SettingsPage
