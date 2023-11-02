import SettingsField from "../SettingsField/SettingsField"
import React, {useState} from 'react'


const TimerField = ({podomoro, shortBreak, longBreak, handlePodomoroChange, handleShortBreakChange, handleLongBreakChange, theme}) => {
  return (
    <>
      <SettingsField
        id="Podomoro"
        label="Podomoro"
        value={podomoro}
        onChange={handlePodomoroChange}
        theme={theme}
        type="number"
      />
      <SettingsField
        id="Short Break"
        label="Short Break"
        value={shortBreak}
        onChange={handleShortBreakChange}
        theme={theme}
        type="number"

      />
      <SettingsField
        id="Long Break"
        label="Long Break"
        value={longBreak}
        onChange={handleLongBreakChange}
        theme={theme}
        type="number"

      />
    </>

  )
}

export default TimerField
