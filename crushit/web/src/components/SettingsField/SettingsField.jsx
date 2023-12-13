import React from 'react';

const SettingsField = ({ label, value, onChange, type = 'text', id, placeholder, theme}) => {

  return (
    <div className="relative">
      <label htmlFor={id} className={`block mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={`border-2 p-2 rounded-lg w-full focus:border-blue-500 ${theme === 'dark' ? 'text-black' : 'text-almost-black'}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SettingsField;
