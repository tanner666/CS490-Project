import React from 'react';

const UserInfo = ({ firstName, lastName }) => {
  return (
    <div className="bg-white p-8 w-full max-w-5xl mx-auto rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-8">User Info</h2>
      <div className="grid grid-cols-2 gap-8">
        <UserInfoField label="First Name" value={firstName} />
        <UserInfoField label="Last Name" value={lastName} />
      </div>
    </div>
  );
};

const UserInfoField = ({ label, value }) => {
  return (
    <div className="relative">
      <label className="block text-gray-600 mb-2">{label}</label>
      <input
        className="border-2 p-4 rounded-lg w-full focus:border-blue-500"
        type="text"
        value={value}
        readOnly
      />
    </div>
  );
};

export default UserInfo;
