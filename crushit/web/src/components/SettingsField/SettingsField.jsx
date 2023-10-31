const SettingsField = ({label}) => {
  return (
    <div className="relative">
        <label className="block text-gray-600 mb-2">{label}</label>
        <input className="border-2 p-4 rounded-lg w-full focus:border-blue-500" type="password" placeholder="**********" />
    </div>
  )
}

export default SettingsField
