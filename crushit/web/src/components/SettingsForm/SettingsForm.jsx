import React, {useState} from 'react';
import {useTheme} from '../ThemeContext/ThemeContext'
import ThemeToggle from '../ThemeToggle/ThemeToggle'

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
    
          {/* User Information */}
          <div className="user-info" style={{ marginTop: '100px' }}>
            <h2>User Info</h2>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  style={{ width: '800px' }} // Increase width for the first name input
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={handleLastNameChange}
                  style={{ width: '800px' }} // Increase width for the last name input
                />
              </div>
            </div>
          </div>
          <div className={`p-8 w-full max-w-5xl mx-auto rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                <h2 className={`text-xl font-semibold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Change Password</h2>
                <div className="grid grid-cols-3 gap-8">
                    <PasswordField label="Current Password" theme={theme} />
                    <PasswordField label="New Password" theme={theme} />
                    <PasswordField label="Confirm New Password" theme={theme} />
                </div>
            </div>
        </div>
      );
}

const PasswordField = ({ label }) => {
    return (
        <div className="relative">
            <label className="block text-gray-600 mb-2">{label}</label>
            <input className="border-2 p-4 rounded-lg w-full focus:border-blue-500" type="password" placeholder="**********" />
        </div>
    );
}

export default SettingsForm;
