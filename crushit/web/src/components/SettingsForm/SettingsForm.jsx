import React from 'react';
import { ChangePassword } from '../ChangePassword/ChangePassword';
import UserInfo from '../UserInfo/UserInfo';
import PomodoroTimer from '../PomodoroTimer/PomodoroTimer';

export const SettingsForm = () => {
    return <div>

        <UserInfo></UserInfo>
        <ChangePassword></ChangePassword>
        <PomodoroTimer></PomodoroTimer>
    </div>
}
    

export default SettingsForm;
