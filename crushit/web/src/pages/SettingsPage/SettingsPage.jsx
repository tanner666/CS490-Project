import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import SettingsForm from '../../components/SettingsForm/SettingsForm';

const SettingsPage = () => {
  return (
    <>
      <MetaTags title="Settings" description="Settings page" />

      <h1>SettingsPage</h1>
      <div>
        <SettingsForm/>
      </div>
    </>
  )
}

export default SettingsPage
