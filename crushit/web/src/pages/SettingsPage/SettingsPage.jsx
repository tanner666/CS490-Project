import { Link, routes } from '@redwoodjs/router';
import { MetaTags } from '@redwoodjs/web';
import SettingsForm from '../../components/SettingsForm/SettingsForm';
import ThemeToggle from 'src/components/ThemeToggle/ThemeToggle';

const SettingsPage = () => {
  return (
    <>
      <MetaTags title="Settings" description="Settings page" />

      <h1 className="text-2xl font-semibold mb-4">Settings Page</h1>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <SettingsForm />
          <div className="flex justify-center space-x-4">
          <button className="bg-gray-300 text-gray-700 px-4 py-2 my-5 rounded-md hover:bg-gray-400">
            Cancel
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 my-5 rounded-md hover:bg-blue-700">
            Save
          </button>
          
        </div>
        </div>
        
        <ThemeToggle />
        
      </div>
    </>
  );
};

export default SettingsPage;
