import React, { useState, useEffect } from 'react';
import { useMutation } from '@redwoodjs/web';
import { useQuery } from '@redwoodjs/web';

const GET_USER_THEME_QUERY = gql`
  query GetUserTheme($firebaseUid: String!) {
    userTheme(firebaseUid: $firebaseUid)
  }
`;

const ThemeToggle = ({theme, handleToggle, isDark}) => {

    console.log("isDark: ", isDark);

    const handleToggleAndUpdate = () => {
      handleToggle();
    // Replace with your second function
    };

    //creates task in database
    return (
      <div
        className={`${
          isDark ? 'bg-blue-500' : 'bg-gray-300'
        } relative inline-block w-12 h-6 rounded-full transition duration-200 ease-in`}
      >
        <input
          type="checkbox"
          name="toggle"
          id="toggle"
          className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          style={{
            right: isDark ? '0' : 'auto',
            left: isDark ? 'auto' : '0',
            border: isDark ? 'border-blue-500' : ''
          }}
          checked={isDark}
          onChange={handleToggleAndUpdate}
        />

      </div>
    );
  };

export default ThemeToggle;
