import React, { useEffect, useState } from 'react';
import { useTheme } from '../ThemeContext/ThemeContext'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import PasswordField from '../PasswordField/PasswordField'
import NameField from '../NameField/NameField'
import TimerField from '../TimerField/TimerField'
import { useMutation, useQuery } from '@redwoodjs/web'
import {changeUserPassword , signOutUser} from 'src/auth';
import { navigate } from '@redwoodjs/router';
//import { UpdateUserInput } from 'src/graphql/users.sdl';

const GET_USER_QUERY = gql`
  query user($firebaseUid: String!) {
    user(firebaseUid: $firebaseUid) {
      id
      firebaseUid
      name
      username
      email
    }
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation updateUser($firebaseUid: String!, $input: UpdateUserInput!) {
    updateUser(firebaseUid: $firebaseUid, input: $input) {
      firebaseUid
      name
      email
    }
  }
`

export const SettingsForm = ({ userId }) => {
    // const [uid, setUID] = useState('')
    const { loading, error, data } = useQuery(GET_USER_QUERY, {
        variables: { firebaseUid: userId },
      });
    const [updateUser] = useMutation(UPDATE_USER_MUTATION)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [podomoro, setPodomoro] = useState('');
    const [shortBreak, setShortBreak] = useState('');
    const [longBreak, setLongBreak] = useState('');
    const { theme } = useTheme();

    useEffect(() => {
        // console.log(data)
        if (data && data.user) {
          // Check if data is available and user object exists
          const { name } = data.user;
          let firstName = name.split('|')[0];
          let lastName = name.split('|')[1];
        //   console.log(firstName, lastName, data.user);
          setFirstName(firstName);
          setLastName(lastName);
          // Update other state variables if needed
        }
      }, [data]);

    // const [userData, setUserData] = useState(null);

    // Fetch user data when the component is mounted


    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleCurrentPasswordChange = (event) => {
        setCurrentPassword(event.target.value);
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };
    const handleConfirmNewPasswordChange = (event) => {
        setConfirmNewPassword(event.target.value);
    };
    const handlePodomoroChange = (event) => {
        setPodomoro(event.target.value);
    };
    const handleShortBreakChange = (event) => {
        setShortBreak(event.target.value);
    };
    const handleLongBreakChange = (event) => {
        setLongBreak(event.target.value);
    };

    const handleLogout = async (event) => {
        await signOutUser()
        navigate('/')
    }

    //this function is the save button that saves the entire settings page
    const handleSave = async () => {
        try {
            // Here you call your updateUser mutation and password, and podomoro timer
            // Replace `updateUserAPI` with the actual function you would use to call your API
            await updateUser({
                variables:{
                    firebaseUid: userId,
                    input: {
                        name: firstName +'|' + lastName,
                    },
                }
            });
            if (currentPassword && newPassword && confirmNewPassword) {
                if (newPassword === confirmNewPassword && newPassword.length > 12 && containsTwoCharacterTypes(newPassword)) {
                    console.log('Password will be changed');
                    try {
                        await changeUserPassword(data.user.email, currentPassword, newPassword);
                    } catch (error) {
                        alert('Failed to change password');
                    }
                } else {
                    console.log('Password requirements not met');

                }
            }else{
                console.log('passwords empty')
            }
            
            alert('User updated successfully!');
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Failed to update user.');
        }
    };

    //just clears all of the text boxes, not db stuff needed
    const handleCancel = () => {
        setFirstName(data.user.firstName);
        setLastName(data.user.lastName);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setPodomoro('');
        setShortBreak('');
        setLongBreak('');
        // Reset other states if necessary
    };
    const containsTwoCharacterTypes = (password) => {
        const hasUpper = /[A-Z]/.test(password)
        const hasLower = /[a-z]/.test(password)
        const hasNumeric = /[0-9]/.test(password)
        const hasSpecial = /[!@#$%^&*()_+[\]{};:'",.<>?/\\| -]/.test(password)
    
        const characterTypes = [hasUpper, hasLower, hasNumeric, hasSpecial]
        const typesCount = characterTypes.filter((type) => type).length
    
        return typesCount >= 2
      }
    return (
        <div className={`flex ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-light-gray text-gray-900'}`}>
            {/*Sidebar*/}
            <div className="bg-custom-gray flex-grow h-screen flex flex-col items-center relative"
                style={{ flex: '1', maxWidth: '14vw', minWidth: '14vw' }}>

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
                    <button onClick={handleLogout} className="bg-custom-gray text-xs text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 border border-white">
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
                        <ThemeToggle />
                    </div>
                    <div className={`pb-5 px-8 w-full mx-auto rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                        <div className="grid grid-cols-2 gap-8">
                            <NameField
                                firstName={firstName}
                                lastName={lastName}
                                handleFirstNameChange={handleFirstNameChange}
                                handleLastNameChange={handleLastNameChange}
                                theme={theme}
                            />
                        </div>
                    </div>
                    <h2 className={`text-xl font-dm font-semibold mt-6 mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Change Password</h2>
                    <div className={`pb-5 px-8 w-full mx-auto rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                        <div className="grid grid-cols-3 gap-8">
                            <PasswordField 
                            currentPassword={currentPassword}
                            newPassword={newPassword}
                            confirmNewPassword={confirmNewPassword}
                            handleNewPasswordChange={handleNewPasswordChange}
                            handleCurrentPasswordChange={handleCurrentPasswordChange}
                            handleConfirmNewPasswordChange={handleConfirmNewPasswordChange}
                            theme={theme} />
                        </div>
                    </div>
                    <h2 className={`text-xl font-dm font-semibold mt-6 mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Podomoro Timer (Minutes)</h2>
                    <div className={`pb-5 px-8 w-full mx-auto rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                        <div className="grid grid-cols-3 gap-8">
                            <TimerField theme={theme} />
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
                        onClick={handleCancel}
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
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SettingsForm;
