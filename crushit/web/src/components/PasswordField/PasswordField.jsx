import SettingsField from "../SettingsField/SettingsField"
import React, {useState} from 'react'

const PasswordField = ({currentPassword, newPassword, confirmNewPassword, handleCurrentPasswordChange, handleConfirmNewPasswordChange, handleNewPasswordChange, theme}) => {

  return (
    //need to implement functionality to check if new password matches the confirm new password
    <>
      <SettingsField
        id="Current Password"
        label="Current Password"
        value={currentPassword}
        onChange={handleCurrentPasswordChange}
        theme={theme}
      />
      <SettingsField
        id="New Password"
        label="New Password"
        value={newPassword}
        onChange={handleNewPasswordChange}
        theme={theme}
      />
      <SettingsField
        id="Confirm Password"
        label="Confirm Password"
        value={confirmNewPassword}
        onChange={handleConfirmNewPasswordChange}
        theme={theme}
      />
    </>

  )
}

export default PasswordField
