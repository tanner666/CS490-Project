import React, { useState, useEffect, useContext, createContext } from 'react';
import { useQuery } from '@redwoodjs/web';
import { getUserUid, useAuth } from 'src/auth';

const GET_USER_THEME = gql`
  query userTheme($firebaseUid: String!) {
    userTheme(firebaseUid: $firebaseUid) {
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

  //retrieve user's theme choice
  const { loading, error, data } = useQuery(GET_USER_THEME, {
    variables: { firebaseUid: uid },
  });

  const [theme, setTheme] = useState('light'); // default

  //set theme accordingly
  useEffect(() => {
    if (data && data.userTheme) {
      if (data.userTheme.darkMode){
        setTheme('dark');
      }
    }
  }, [data]);

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
