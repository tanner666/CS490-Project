import SettingsField from "../SettingsField/SettingsField"

const PasswordField = ({theme}) => {
  return (
    <>
      <SettingsField label="Current Password" theme={theme}/>
      <SettingsField label="New Password" theme={theme}/>
      <SettingsField label="Confirm New Password" theme={theme}/>
    </>
    
  )
}

export default PasswordField
