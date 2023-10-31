import SettingsField from "../SettingsField/SettingsField"

const TimerField = ({theme}) => {
  return (
    <>
      <SettingsField label="Podomoro" theme={theme}/>
      <SettingsField label="Short Break" theme={theme}/>
      <SettingsField label="Long Break" theme={theme}/>
    </>
    
  )
}

export default TimerField
