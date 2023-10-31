import SettingsField from "../SettingsField/SettingsField"
import React, {useState} from 'react'

const NameField = ({firstName, lastName, handleFirstNameChange, handleLastNameChange, theme}) => {

  return (
    <>
      <SettingsField 
        label="First Name" 
        value={firstName} 
        onChange={handleFirstNameChange} 
        theme={theme} 
      />
      <SettingsField 
        label="Last Name" 
        value={lastName} 
        onChange={handleLastNameChange} 
        theme={theme} 
      />
  </>
    
  );
}

export default NameField