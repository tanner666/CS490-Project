import SettingsField from "../SettingsField/SettingsField"
import React, {useState} from 'react'

const PasswordField = ({currentPassword, newPassword, confirmNewPassword, handleCurrentPasswordChange, handleConfirmNewPasswordChange, handleNewPasswordChange, theme}) => {
  
  return (
    //need to implement functionality to check if new password matches the confirm new password
    <>
      <SettingsField 
        label="Current Password" 
        value={currentPassword}
        onChange={handleCurrentPasswordChange}
        theme={theme}
      />
      <SettingsField 
        label="New Password" 
        value={newPassword}
        onChange={handleNewPasswordChange}
        theme={theme}
      />
      <SettingsField 
        label="Confirm New Password" 
        value={confirmNewPassword}
        onChange={handleConfirmNewPasswordChange}
        theme={theme}
      />
    </>
    
  )
}

export default PasswordField
