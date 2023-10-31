import {useTheme} from '../ThemeContext/ThemeContext'


const SettingsField = ({label}) => {
  const {theme} = useTheme();
  return (
    <div className="relative">
        <label className={`block mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`}>{label}</label>
        <input className="border-2 p-3 rounded-lg w-full focus:border-blue-500" type="password" placeholder="**********" />
    </div>
  )
}

export default SettingsField
