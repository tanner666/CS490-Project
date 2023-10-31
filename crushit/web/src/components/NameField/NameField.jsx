import SettingsField from "../SettingsField/SettingsField"
import React, {useState} from 'react'

const NameField = ({firstName, lastName, handleFirstNameChange, handleLastNameChange, theme}) => {

  return (
    <>
      <SettingsField 
        id="First Name"
        label="First Name" 
        value={firstName} 
        onChange={handleFirstNameChange} 
        theme={theme} 
      />
      <SettingsField 
        id="Last Name"
        label="Last Name" 
        value={lastName} 
        onChange={handleLastNameChange} 
        theme={theme} 
      />
  </>
    
  );
}

export default NameField