import React, { useState, useEffect, useContext, createContext } from 'react';
import { useQuery } from '@redwoodjs/web';
import { getUserUid, useAuth } from 'src/auth';

const GET_USER_QUERY = gql`
  query user($firebaseUid: String!) {
    user(firebaseUid: $firebaseUid) {
      darkMode
      name
    }
  }
`;

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [winterTheme, setWinterTheme] = useState(false);

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
      const nameParts = data.user.name.split('|');

      if (nameParts.length === 2) {
        let firstName = data.user.name.split('|')[0];
        let lastName = data.user.name.split('|')[1];

        //if * is last char for both first name and last name
        console.log("First Name last char: ", firstName[firstName.length - 1]);
        console.log("Last Name last char: ", lastName[lastName.length - 1]);

        if (firstName[firstName.length - 1] === '*' && lastName[lastName.length - 1] === '*') {
          console.log("Winter Theme");
          setWinterTheme(true);
        }else{
          setWinterTheme(false);
        }
      } else {
        // Handle case where name doesn't have two parts
        console.log("Name format not as expected");
      }

      //darkMode is either normal or winter themed (easter egg)
      if (data.user.darkMode){
        console.log("Dark Mode winter theme???: ", winterTheme);
        if (firstName[firstName.length - 1] === '*' && lastName[lastName.length - 1] === '*') {
          console.log("Set Theme Winter???");
          setTheme('winter');
        }else{
          setTheme('dark');
        }
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
    if(theme === 'light'){
      if (winterTheme){
        setTheme('winter');
      }
      else{
        setTheme('dark');
      }
    }
    else{
      setTheme('light');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
