import React, { useEffect, useState } from 'react';
import { useTheme } from '../ThemeContext/ThemeContext'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import PasswordField from '../PasswordField/PasswordField'
import NameField from '../NameField/NameField'
import TimerField from '../TimerField/TimerField'
import { useMutation, useQuery } from '@redwoodjs/web'
import { changeUserPassword, signOutUser } from 'src/auth';
import { navigate } from '@redwoodjs/router';
import PlanDay from '../PlanDay/PlanDay';
//import { UpdateUserInput } from 'src/graphql/users.sdl';

const GET_USER_QUERY = gql`
  query user($firebaseUid: String!) {
    user(firebaseUid: $firebaseUid) {
      id
      firebaseUid
      name
      username
      email
      pomodoroLength
      pomodoroShort
      pomodoroLong
      darkMode
    }
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation updateUser($firebaseUid: String!, $input: UpdateUserInput!) {
    updateUser(firebaseUid: $firebaseUid, input: $input) {
      firebaseUid
      name
      email
      pomodoroLength
      pomodoroShort
      pomodoroLong
      darkMode
    }
  }
`

export const SettingsForm = ({ userId }) => {
    // const [uid, setUID] = useState('')
    const { loading, error, data, refetch } = useQuery(GET_USER_QUERY, {
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
            const { name, pomodoroLength, pomodoroShort, pomodoroLong, darkMode } = data.user;
            let firstName = name.split('|')[0];
            let lastName = name.split('|')[1];
            //   console.log(firstName, lastName, data.user);
            if (firstName && lastName) {
                setFirstName(firstName);
                setLastName(lastName);
            }
            if (pomodoroLength && pomodoroShort && pomodoroLong) {
                setPodomoro(pomodoroLength);
                setShortBreak(pomodoroShort);
                setLongBreak(pomodoroLong);
            }
            //   console.log(data.user, podomoroLength)
            //   console.log("names",firstName, lastName, podomoro, shortBreak, longBreak);
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

    //this function is the save button that saves the entire settings page
    const handleSave = async () => {
        try {
            // Here you call your updateUser mutation and password, and podomoro timer
            // Replace `updateUserAPI` with the actual function you would use to call your API
            await updateUser({
                variables: {
                    firebaseUid: userId,
                    input: {
                        name: firstName + '|' + lastName,
                        username: data.user.username,
                        pomodoroLength: parseInt(podomoro),
                        pomodoroShort: parseInt(shortBreak),
                        pomodoroLong: parseInt(longBreak),
                    },
                }
            });
            await refetch();
            if (currentPassword && newPassword && confirmNewPassword) {
                if (newPassword === confirmNewPassword && newPassword.length >= 12 && containsTwoCharacterTypes(newPassword)) {
                    console.log('Password will be changed');
                    try {
                        await changeUserPassword(data.user.email, currentPassword, newPassword).then(() => {
                            alert('Password changed successfully!');

                        })
                    } catch (error) {
                        alert('Failed to change password');
                    }
                    setCurrentPassword('');
                            setNewPassword('');
                            setConfirmNewPassword('')
                } else {
                    console.log('Password must match and be at least 12 characters long and contain characters from at least two different types (uppercase, lowercase, numeric, special).');
                    alert('Password must match and be at least 12 characters long and contain characters from at least two different types (uppercase, lowercase, numeric, special).');

                }
            } else {
                alert("Passwords are empty")
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
        if (data.user.name) {
            let firstName = data.user.name.split('|')[0];
            let lastName = data.user.name.split('|')[1];
            setFirstName(firstName);
            setLastName(lastName);
        } else {
            setFirstName('');
            setLastName('');
        }
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        if (data.user.pomodoroLength && data.user.pomodoroShort && data.user.pomodoroLong) {
            setPodomoro(data.user.pomodoroLength);
            setShortBreak(data.user.pomodoroShort);
            setLongBreak(data.user.pomodoroLong);
        } else {
            setPodomoro('');
            setShortBreak('');
            setLongBreak('');
        }
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
        <div className={`flex ${theme === 'dark' ? 'bg-gray-800 text-white' : (theme === 'winter' ? "bg-[url('/snow_background.jpeg')] bg-cover text-white" :'bg-light-gray text-gray-900')}`}>
            <PlanDay/>
            {/*Rest of page */}
            <div className="w-full">
                {/*Profile Header */}
                <div className={`pt-1 pb-1 w-full mx-auto shadow-sm ${(theme === 'dark' || theme === 'winter')? 'bg-gray-700' : 'bg-white'}`}>
                    <h2 className={`text-2xl font-dm font-bold mt-2 mb-2 ml-[3%] ${(theme === 'dark' || theme === 'winter') ? 'text-white' : 'text-gray-900'}`}>Profile</h2>
                </div>
                <div className="forms ml-[3%] mr-[3%]">
                    <div className="flex justify-between items-center">
                        <h2 className={`text-xl font-dm font-semibold mt-6 mb-2 ${(theme === 'dark' || theme === 'winter') ? 'text-white' : 'text-gray-900'}`}>User Info</h2>
                        <ThemeToggle userId={userId}/>
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
                    <h2 className={`text-xl font-dm font-semibold mt-6 mb-2 ${(theme === 'dark' || theme === 'winter' )? 'text-white' : 'text-gray-900'}`}>Change Password</h2>
                    <div className={`pb-5 px-8 w-full mx-auto rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                        <div className="grid grid-cols-3 gap-8">
                            <PasswordField

                                currentPassword={currentPassword}
                                newPassword={newPassword}
                                confirmNewPassword={confirmNewPassword}
                                handleCurrentPasswordChange={handleCurrentPasswordChange}
                                handleNewPasswordChange={handleNewPasswordChange}
                                handleConfirmNewPasswordChange={handleConfirmNewPasswordChange}
                                theme={theme}
                            />
                        </div>
                    </div>
                    <h2 className={`text-xl font-dm font-semibold mt-6 mb-2 ${(theme === 'dark' || theme === 'winter') ? 'text-white' : 'text-gray-900'}`}>Podomoro Timer (Minutes)</h2>
                    <div className={`pb-5 px-8 w-full mx-auto rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                        <div className="grid grid-cols-3 gap-8">
                            <TimerField
                                podomoro={podomoro}
                                shortBreak={shortBreak}
                                longBreak={longBreak}
                                handlePodomoroChange={handlePodomoroChange}
                                handleShortBreakChange={handleShortBreakChange}
                                handleLongBreakChange={handleLongBreakChange}
                                theme={theme}
                            />
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
