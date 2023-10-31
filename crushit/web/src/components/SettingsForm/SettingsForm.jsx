import React, {useState} from 'react';
import {useTheme} from '../ThemeContext/ThemeContext'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import PasswordField from '../PasswordField/PasswordField'

export const SettingsForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const {theme} = useTheme();
    
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };
    
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    return (
        <div className={`p-8 w-full max-w-5xl mx-auto rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>

          <ThemeToggle/>
          
          <div className={`p-8 w-full max-w-5xl mx-auto rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
            <div className="password">
                <h2 className={`text-xl font-semibold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Change Password</h2>
                <div className="grid grid-cols-3 gap-8">
                    <PasswordField theme={theme}/>
                </div>
            </div>
          </div>
        </div>
      );
}

export default SettingsForm;
