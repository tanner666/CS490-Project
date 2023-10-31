import React, {useState} from 'react';
import {useTheme} from '../ThemeContext/ThemeContext'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import PasswordField from '../PasswordField/PasswordField'
import NameField from '../NameField/NameField'
import TimerField from '../TimerField/TimerField'

export const SettingsForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const {theme} = useTheme();
    
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };
    
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    return (
        <div className={`p-8 w-full max-w-5xl mx-auto rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-light-gray text-gray-900'}`}>
                <div className={`p-8 w-full ml-[-30px] max-w-5xl mx-auto rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                    <h2 className={`text-2xl font-dm font-bold mt-4 mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Profile</h2>
                </div>
            <div className="forms">
                <div className="flex justify-between items-center">
                    <h2 className={`text-xl font-dm font-semibold mt-4 mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>User Info</h2>
                    <ThemeToggle/>
                </div>
                <div className={`p-8 w-full max-w-5xl mx-auto rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                    <div className="grid grid-cols-2 gap-8">
                        <NameField theme={theme}/>
                    </div>
                </div>
                <h2 className={`text-xl font-dm font-semibold mt-4 mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Change Password</h2>
                <div className={`p-8 w-full max-w-5xl mx-auto rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                    <div className="grid grid-cols-3 gap-8">
                        <PasswordField theme={theme}/>
                    </div>
                </div>
                <h2 className={`text-xl font-dm font-semibold mt-4 mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Podomoro Timer (Minutes)</h2>
                <div className={`p-8 w-full max-w-5xl mx-auto rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                    <div className="grid grid-cols-3 gap-8">
                        <TimerField theme={theme}/>
                    </div>
                </div>
            </div>
        </div>
      );
}

export default SettingsForm;
