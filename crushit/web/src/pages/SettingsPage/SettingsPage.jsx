import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import SettingsForm from '../../components/SettingsForm/SettingsForm';
import ThemeToggle from 'src/components/ThemeToggle/ThemeToggle';

const SettingsPage = () => {
  return (
    <>
      <MetaTags title="Settings" description="Settings page" />

      <h1>SettingsPage</h1>
      <div>
        <SettingsForm/>
        <ThemeToggle/>
      </div>
    </>
  )
}

export default SettingsPage
