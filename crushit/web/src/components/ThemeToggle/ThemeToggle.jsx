import React, { useState, useEffect } from 'react';
import {useTheme} from '../ThemeContext/ThemeContext'
import { useMutation } from '@redwoodjs/web'


const UPDATE_THEME_MUTATION = gql`
  mutation updateTheme($firebaseUid: String!, $darkMode: Boolean!) {
    updateTheme(firebaseUid: $firebaseUid, darkMode: $darkMode) {
      darkMode
    }
  }
`

const ThemeToggle = ({userId}) => {
    const { toggleTheme, isDark } = useTheme(); // Assuming `useTheme` provides `isDark`
    const [isEnabled, setIsEnabled] = useState(isDark || false);
    const [updateTheme] = useMutation(UPDATE_THEME_MUTATION)

  
    useEffect(() => {
      setIsEnabled(isDark);
    }, [isDark]);
  
    
    //creates task in database
    const handleToggle = async () => {
      setIsEnabled(!isEnabled);
      toggleTheme();
      try {
          // Here you call your updateUser mutation and password, and podomoro timer
          // Replace `updateUserAPI` with the actual function you would use to call your API
          await updateTheme({
              variables: {
                  firebaseUid: userId,
                  darkMode: !isEnabled,
              },
          });
        } 
        catch (error) {
          console.error('Error updating Theme:', error);
          alert('Failed to update theme.');
      }      
    };
  
    return (
      <div
        className={`${
          isEnabled ? 'bg-blue-500' : 'bg-gray-300'
        } relative inline-block w-12 h-6 rounded-full transition duration-200 ease-in`}
      >
        <input
          type="checkbox"
          name="toggle"
          id="toggle"
          className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          style={{
            right: isEnabled ? '0' : 'auto',
            left: isEnabled ? 'auto' : '0',
            border: isEnabled ? 'border-blue-500' : ''
          }}
          checked={isEnabled}
          onChange={handleToggle}
        />
        
      </div>
    );
  };

export default ThemeToggle;
