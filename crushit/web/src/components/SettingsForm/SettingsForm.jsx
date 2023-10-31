import React, { useState } from 'react';
import { ChangePassword } from '../ChangePassword/ChangePassword';
import UserInfo from '../UserInfo/UserInfo';
import PomodoroTimer from '../PomodoroTimer/PomodoroTimer';

export const SettingsForm = () => {
  const [newPassword, setNewPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleNewPasswordChange = (field, value) => {
    setNewPassword((prevPassword) => ({
      ...prevPassword,
      [field]: value,
    }));
  };

  const handleSaveClick = () => {
    console.log('New Password:', newPassword.new);
  };

  return (
    <div>
      <UserInfo />
      <ChangePassword newPassword={newPassword} onNewPasswordChange={handleNewPasswordChange} />
      <PomodoroTimer />
      <div className="flex justify-center space-x-4"> {/* Center and add spacing between the buttons */}
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 my-5 mx-2 rounded-md hover:bg-gray-400"
          onClick={() => {
            // Handle Cancel button click event
          }}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 my-5 mx-2 rounded-md hover-bg-blue-700"
          onClick={handleSaveClick}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SettingsForm;
