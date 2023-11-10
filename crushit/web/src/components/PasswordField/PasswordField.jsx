import SettingsField from "../SettingsField/SettingsField";
import React, { useState } from 'react';

const PasswordField = ({ currentPassword, newPassword, confirmNewPassword, handleCurrentPasswordChange, handleConfirmNewPasswordChange, handleNewPasswordChange, theme }) => {
  const imageUrl = 'https://drive.google.com/uc?id=1pA2Xu-YP86YyJFPSJb4Q6LfOYcmEM1Gc';
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleVisibility = (field) => {
    switch (field) {
      case 'current':
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case 'new':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirm':
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <SettingsField
        id="Current Password"
        label={
          <div className="flex items-center">
            <img src={imageUrl} alt="Lock" className="mr-2 h-5 w-5" />
            Current Password
          </div>
        }
        value={currentPassword}
        onChange={handleCurrentPasswordChange}
        type={showCurrentPassword ? 'text' : 'password'}
        theme={theme}
        placeholder="Enter your current password"
        toggleVisibility={() => toggleVisibility('current')}
      />
      <SettingsField
        id="New Password"
        label={
          <div className="flex items-center">
            <img src={imageUrl} alt="Lock" className="mr-2 h-5 w-5" />
            New Password
          </div>
        }
        value={newPassword}
        onChange={handleNewPasswordChange}
        type={showNewPassword ? 'text' : 'password'}
        theme={theme}
        placeholder="Enter your new password"
        toggleVisibility={() => toggleVisibility('new')}
      />
      <SettingsField
        id="Confirm Password"
        label={
          <div className="flex items-center">
            <img src={imageUrl} alt="Lock" className="mr-2 h-5 w-5" />
            Confirm Password
          </div>
        }
        value={confirmNewPassword}
        onChange={handleConfirmNewPasswordChange}
        type={showConfirmPassword ? 'text' : 'password'}
        theme={theme}
        placeholder="Confirm your new password"
        toggleVisibility={() => toggleVisibility('confirm')}
      />
    </>
  );
}

export default PasswordField;

