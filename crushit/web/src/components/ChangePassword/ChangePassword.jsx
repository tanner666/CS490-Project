import React from 'react';

export const ChangePassword = ({ newPassword, onNewPasswordChange }) => {
  return (
    <div className="bg-white p-8 w-full max-w-5xl mx-auto rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-8">Change Password</h2>
      <div className="grid grid-cols-3 gap-8">
        <PasswordField
          label="Current Password"
          value={newPassword.current}
          onChange={(e) => onNewPasswordChange('current', e.target.value)}
        />
        <PasswordField
          label="New Password"
          value={newPassword.new}
          onChange={(e) => onNewPasswordChange('new', e.target.value)}
        />
        <PasswordField
          label="Confirm New Password"
          value={newPassword.confirm}
          onChange={(e) => onNewPasswordChange('confirm', e.target.value)}
        />
      </div>
    </div>
  );
}

const PasswordField = ({ label, value, onChange }) => {
  return (
    <div className="relative">
      <label className="block text-gray-600 mb-2">{label}</label>
      <input
        className="border-2 p-4 rounded-lg w-full focus-border-blue-500"
        type="password"
        placeholder="**********"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default ChangePassword;
