import SettingsField from "../SettingsField/SettingsField"
import React, {useState} from 'react'

const TimerField = ({podomoro, shortBreak, longBreak, handlePodomoroChange, handleShortBreakChange, handleLongBreakChange, theme}) => {
  return (
    <>
      <SettingsField 
        label="Podomoro" 
        value={podomoro}
        onChange={handlePodomoroChange}
        theme={theme}
      />
      <SettingsField 
        label="Short Break" 
        value={shortBreak}
        onChange={handleShortBreakChange}
        theme={theme}
      />
      <SettingsField 
        label="Long Break" 
        value={longBreak}
        onChange={handleLongBreakChange}
        theme={theme}
      />
    </>
    
  )
}

export default TimerField
