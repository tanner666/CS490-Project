import React, {useState} from 'react';

export const SettingsForm = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const toggleTheme = () => {
        const updatedMode = !isDarkMode;
        setIsDarkMode(updatedMode);
    
        if (updatedMode) {
          document.body.classList.add('dark-mode');
        } else {
          document.body.classList.remove('dark-mode');
        }
      };
    
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };
    
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    return (
        <div className={`button-container ${isDarkMode ? 'dark-mode' : ''}`}>
          <div className="theme-text">
            {isDarkMode ? 'Dark Theme' : 'Light Theme'}
          </div>
          <div className="toggle" onClick={toggleTheme}></div>
    
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
          <div className="bg-white p-8 w-full max-w-5xl mx-auto rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-8">Change Password</h2>
            <div className="grid grid-cols-3 gap-8">
                <PasswordField label="Current Password" />
                <PasswordField label="New Password" />
                <PasswordField label="Confirm New Password" />
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
