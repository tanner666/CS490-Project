import React, { useState, useEffect, useContext, createContext } from 'react';
import { useQuery, useMutation } from '@redwoodjs/web';
import { getUserUid, useAuth } from 'src/auth';

const ThemeContext = createContext();

const UPDATE_THEME_MUTATION = gql`
  mutation updateTheme($firebaseUid: String!, $darkMode: Boolean!) {
    updateTheme(firebaseUid: $firebaseUid, darkMode: $darkMode) {
      darkMode
    }
  }
`

const GET_USER_QUERY = gql`
  query user($firebaseUid: String!) {
    user(firebaseUid: $firebaseUid) {
      id
      firebaseUid
      name
      username
      email
      pomodoroLength
      pomodoroShort
      pomodoroLong
      darkMode
    }
  }
`;

export const ThemeProvider = ({ children }) => {
  const userId = "sozLOGRVyWMBI0R2xEODmxEk2J23";
  const [theme, setTheme] = useState('light'); // default
  const { loading, error, data, refetch } = useQuery(GET_USER_QUERY, {
    variables: { firebaseUid: userId },
  });


  useEffect(() => {
    // console.log(data)
    if (data && data.user) {
        // Check if data is available and user object exists
        const {darkMode } = data.user;
        console.log("DarkMode: ", darkMode);
        if(darkMode)
          setTheme('dark');
        //   console.log(data.user, podomoroLength)
        //   console.log("names",firstName, lastName, podomoro, shortBreak, longBreak);
        // Update other state variables if needed
    }
  }, [data]);
  //retireve uid
  /*
  const [uid, setUID] = useState('');
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
  */

  //retrieve user's theme choice
  /*const { loading, error, data } = useQuery(GET_USER_THEME, {
    variables: { firebaseUid: uid },
  });*/

  //set theme accordingly
  /*
  useEffect(() => {
    if (data && data.userTheme) {
      console.log("Madei therere");
      if (data.userTheme.darkMode){
        setTheme('dark');
      }
    }
  }, [data]);*/

  //console.log("Theme in Context: ", theme);
  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));

  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
