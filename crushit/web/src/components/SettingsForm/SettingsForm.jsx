import React from 'react';

export const SettingsForm = () => {
    return (
        <div className="bg-white p-8 w-full max-w-5xl mx-auto rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-8">Change Password</h2>
            <div className="grid grid-cols-3 gap-8">
                <PasswordField label="Current Password" />
                <PasswordField label="New Password" />
                <PasswordField label="Confirm New Password" />
            </div>
        </div>
    );
}

const PasswordField = ({ label }) => {
    return (
        <div className="relative">
            <label className="block text-gray-600 mb-2">{label}</label>
            <input className="border-2 p-4 rounded-lg w-full focus:border-blue-500" type="password" placeholder="**********" />
        </div>
    );
}

export default SettingsForm;
