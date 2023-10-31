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
        <div className={`flex ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-light-gray text-gray-900'}`}>
            {/*Sidebar*/}
            <div className="bg-custom-gray flex-grow h-screen flex flex-col items-center relative" 
             style={{ flex: '1', maxWidth: '14vw' }}>

                {/* Title */}
                <div className="text-white mt-10">
                    <h2 className="font-normal leading-none font-fredoka" style={{ fontSize: '2vw' }}>Crush It</h2>
                </div>

                {/* Bar */}
                <div className=" mt-10 h-0.5 w-[80%] bg-dark-gray">

                </div>
                
                {/* Image */}
                <div className="mt-10 flex items-center justify-center">
                    <img
                        src="https://drive.google.com/uc?id=16-VMhr8wY_qwKfeaHduWZTeB3oFuTc4b"
                        alt="Plan your day illustration"
                        className="w-[63.76%] mb-8"
                    />
                </div>

                {/* Bottom Text */}
                <div className="text-white mb-8">
                    <p className="font-normal leading-none font-fredoka text-center" style={{ fontSize: '1vw' }}>It's time to<br />plan your day!</p>
                </div>

                {/* Bottom Button */}
                <div className="mb-12">
                    <button className="bg-custom-gray text-white py-3 px-10 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 border border-white">
                        Plan Day
                    </button>
                </div>

                {/* Logout  Button */}
                <div className="mb-12 absolute bottom-8">
                    <button className="bg-custom-gray text-xs text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 border border-white">
                        Log Out
                    </button>
                </div>

            </div>    
            {/*Rest of page */}
            <div>
                {/*Profile Header */}
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
        </div>
      );
}

export default SettingsForm;
