import SettingsField from "../SettingsField/SettingsField";
import React from 'react';

const NameField = ({ firstName, lastName, handleFirstNameChange, handleLastNameChange, theme }) => {
  const imageUrl = 'https://drive.google.com/uc?id=1nuF8YGQs70iXrKNP3pU0aZzn-MJiVDI7';

  return (
    <>
      <SettingsField
        id="First Name"
        label={
          <div className="flex items-center">
            <img src={imageUrl} alt="Profile" className="mr-2 h-5 w-5" />
            First Name
          </div>
        }
        value={firstName}
        onChange={handleFirstNameChange}
        theme={theme}
        placeholder="Enter your first name"
      />
      <SettingsField
        id="Last Name"
        label={
          <div className="flex items-center">
            <img src={imageUrl} alt="Profile" className="mr-2 h-5 w-5" />
            Last Name
          </div>
        }
        value={lastName}
        onChange={handleLastNameChange}
        theme={theme}
        placeholder="Enter your last name"
      />
    </>
  );
}

export default NameField;
