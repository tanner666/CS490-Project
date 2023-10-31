import SettingsField from "../SettingsField/SettingsField"

const NameField = ({theme}) => {
  return (
    <>
      <SettingsField label="First Name" theme={theme}/>
      <SettingsField label="Last Name" theme={theme}/>
    </>
    
  )
}

export default NameField