import React from 'react';
import { useTheme } from '../ThemeContext/ThemeContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { navigate } from '@redwoodjs/router';
import { Link } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';

const ROLLOVER_TASKS_MUTATION = gql`
  mutation RolloverTasksMutation($createdBy: String!, $day: Int!, $month: Int!, $year: Int!) {
    rolloverTasks(createdBy: $createdBy, day: $day, month: $month, year: $year) {
      id
    }
  }
`;

const handleLogout = async () => {
  // Your logout logic here
  navigate('/');
};

const PlanDay = ({userId}) => {
  const [rolloverTasks, { loading, error }] = useMutation(ROLLOVER_TASKS_MUTATION);

  const handlePlanDay = async () => {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    //console.log(`Rollover for user: ${userId}, Date: ${year}-${month}-${day}`);
    try {
      await rolloverTasks({ variables: { createdBy: userId, day, month, year } });
    } catch (error) {
      console.error("Error in rolling over tasks:", error);
    }
  };

  return (
    <div className="bg-custom-gray flex-grow h-screen flex flex-col items-center relative" style={{ flex: '1', maxWidth: '14vw', minWidth: '14vw' }}>
        <div className="text-white mt-10">
          <Link to="/home" className="font-normal leading-none font-fredoka" style={{ fontSize: '2vw' }}>Crush It</Link>
        </div>
        <div className="mt-10 h-0.5 w-[80%] bg-dark-gray"></div>
        <div className="mt-10 flex items-center justify-center">
          <img
            src="https://drive.google.com/uc?id=16-VMhr8wY_qwKfeaHduWZTeB3oFuTc4b"
            alt="Plan your day illustration"
            className="w-[63.76%] mb-8"
          />
        </div>
        <div className="text-white mb-8">
          <p className="font-normal leading-none font-fredoka text-center" style={{ fontSize: '1vw' }}>It's time to<br />plan your day!</p>
        </div>
        <div className="mb-12">
          <button
            onClick={handlePlanDay}
            className="bg-custom-gray text-white py-3 px-10 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 border border-white"
            disabled={loading}
          >
            Plan Day
          </button>
        </div>
        <div className="mb-12 absolute bottom-8">
          <button onClick={handleLogout} className="bg-custom-gray text-xs text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 border border-white">
            Log Out
          </button>
        </div>
      </div>
  )
}

export default PlanDay
