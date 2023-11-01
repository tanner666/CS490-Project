import React, { useState, useEffect } from 'react';
import {useTheme} from '../ThemeContext/ThemeContext'

const ThemeToggle = () => {
    const { toggleTheme, isDark } = useTheme(); // Assuming `useTheme` provides `isDark`
    const [isEnabled, setIsEnabled] = useState(isDark);
  
    useEffect(() => {
      setIsEnabled(isDark);
    }, [isDark]);
  
    const handleToggle = () => {
      setIsEnabled(!isEnabled);
      toggleTheme();
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
