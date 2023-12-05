// TaskDetail.js

const AppointmentDetails = ({ task, onClose }) => {
  return (
    <div className="p-2 mt-2 bg-gray-200 rounded-lg">
      <h4 className="font-bold">Details for {task.time}</h4>
      <p>{task.detail}</p>
      <button
        onClick={onClose}
        className="mt-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
      >
        Close
      </button>
    </div>
  );
};

export default AppointmentDetails;
