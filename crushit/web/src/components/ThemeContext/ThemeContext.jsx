import React, { useState, useEffect, useContext, createContext } from 'react';
import { useQuery } from '@redwoodjs/web';
import { getUserUid, useAuth } from 'src/auth';

const GET_USER_QUERY = gql`
  query user($firebaseUid: String!) {
    user(firebaseUid: $firebaseUid) {
      darkMode
    }
  }
`;

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

  //retireve uid
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

  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { firebaseUid: uid },
  });

  //retrieve user's theme choice
  /*const { loading, error, data } = useQuery(GET_USER_THEME, {
    variables: { firebaseUid: uid },
  });*/

  const [theme, setTheme] = useState('light'); // default
  useEffect(() => {
    console.log("ThemProvider useEffect");
    if (data && data.user) {
      console.log("ThemeProvider theme: ", data.user.darkMode);
      if (data.user.darkMode){
        setTheme('dark');
      }
    }
  }, [data]);

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
