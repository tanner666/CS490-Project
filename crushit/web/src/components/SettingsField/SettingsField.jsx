import {useTheme} from '../ThemeContext/ThemeContext'


const SettingsField = ({label, value, onChange, type='text', id}) => {
  const {theme} = useTheme();
  return (
    <div className="relative">
        <label htmlFor={id} className={`block mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`}>{label}</label>
        <input 
          id={id}
          type={type}
          className="border-2 p-2 rounded-lg w-full focus:border-blue-500"
          value={value}
          onChange={onChange}
          placeholder={label}
        />
    </div>
  )
}

export default SettingsField
