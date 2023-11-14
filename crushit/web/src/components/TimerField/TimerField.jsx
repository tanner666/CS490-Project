import SettingsField from "../SettingsField/SettingsField";
import React from 'react';

const TimerField = ({ podomoro, shortBreak, longBreak, handlePodomoroChange, handleShortBreakChange, handleLongBreakChange, theme }) => {
  const timerIconUrl = 'https://drive.google.com/uc?id=1zVrNKtABhvWbYYbZkVL0zWngMhVaioVf';

  return (
    <>
      <SettingsField
        id="Podomoro"
        label={
          <div className="flex items-center">
            <img src={timerIconUrl} alt="Timer" className="mr-2 h-5 w-5" />
            Pomodoro
          </div>
        }
        value={podomoro}
        onChange={handlePodomoroChange}
        theme={theme}
        type="number"
        placeholder="Enter Pomodoro duration"
      />
      <SettingsField
        id="Short Break"
        label={
          <div className="flex items-center">
            <img src={timerIconUrl} alt="Timer" className="mr-2 h-5 w-5" />
            Short Break
          </div>
        }
        value={shortBreak}
        onChange={handleShortBreakChange}
        theme={theme}
        type="number"
        placeholder="Enter Short Break duration"
      />
      <SettingsField
        id="Long Break"
        label={
          <div className="flex items-center">
            <img src={timerIconUrl} alt="Timer" className="mr-2 h-5 w-5" />
            Long Break
          </div>
        }
        value={longBreak}
        onChange={handleLongBreakChange}
        theme={theme}
        type="number"
        placeholder="Enter Long Break duration"
      />
    </>
  );
}

export default TimerField;

