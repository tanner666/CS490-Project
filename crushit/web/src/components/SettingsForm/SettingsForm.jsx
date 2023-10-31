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
             style={{ flex: '1', maxWidth: '14vw', minWidth: '14vw'}}>

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
            <div className="w-full">
                {/*Profile Header */}
                <div className={`pt-1 pb-1 w-full mx-auto shadow-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                    <h2 className={`text-2xl font-dm font-bold mt-2 mb-2 ml-[3%] ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Profile</h2>
                </div>
                <div className="forms ml-[3%] mr-[3%]">
                    <div className="flex justify-between items-center">
                        <h2 className={`text-xl font-dm font-semibold mt-6 mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>User Info</h2>
                        <ThemeToggle/>
                    </div>
                    <div className={`pb-5 px-8 w-full mx-auto rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                        <div className="grid grid-cols-2 gap-8">
                            <NameField theme={theme}/>
                        </div>
                    </div>
                    <h2 className={`text-xl font-dm font-semibold mt-6 mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Change Password</h2>
                    <div className={`pb-5 px-8 w-full mx-auto rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                        <div className="grid grid-cols-3 gap-8">
                            <PasswordField theme={theme}/>
                        </div>
                    </div>
                    <h2 className={`text-xl font-dm font-semibold mt-6 mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Podomoro Timer (Minutes)</h2>
                    <div className={`pb-5 px-8 w-full mx-auto rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                        <div className="grid grid-cols-3 gap-8">
                            <TimerField theme={theme}/>
                        </div>
                    </div>
                </div>
                {/*Save Buttons*/}
                <div className="pt-20 flex items-center justify-center space-x-4">
                    <button
                    type="button"
                    className="w-[18%] py-3 rounded-lg mb-6 transition duration-150 border-2"
                    style={{
                        background: 'white',
                        color: '#6284FF',
                        borderColor: '#6284FF',
                        boxShadow: '0px 4px 80px 0px rgba(98, 132, 255, 0.20)'
                    }}
                    //onClick={handleSignUp}
                    >
                    Cancel
                    </button>
                    <button
                    type="button"
                    className="text-white w-[18%] py-3 rounded-lg mb-6 transition duration-150"
                    style={{
                        background: 'linear-gradient(180deg, #6284FF 0%, #4B6DE9 100%)',
                        boxShadow: '0px 4px 80px 0px rgba(98, 132, 255, 0.20)'
                    }}
                    //onClick={handleSignUp}
                    >
                    Save
                    </button>
                </div>
            </div>
        </div>
      );
}

export default SettingsForm;
