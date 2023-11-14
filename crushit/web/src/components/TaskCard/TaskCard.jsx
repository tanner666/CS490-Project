import TaskGroup from "../TaskGroup/TaskGroup"
import { useTheme } from '../ThemeContext/ThemeContext'
import React, { useState, useEffect } from 'react';
import { Draggable } from "react-beautiful-dnd"
import { useMutation } from '@redwoodjs/web';

const TaskCard = ({ task, onStatusChange }) => {
  const [statusIndex, setStatusIndex] = useState(0);
  const [openedDropdownIndex, setOpenedDropdownIndex] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const statuses = ['Not Started', 'In Progress', 'Complete', 'Rolled Over'];

  const UPDATE_TASK_STATUS_MUTATION = gql`
  mutation updateTaskStatus($taskId: Int!, $taskStatus: String!) {
    updateTask(id: $taskId, input: { taskStatus: $taskStatus }) {
      id
      taskStatus
    }
  }
  `;

  const [updateTaskStatus] = useMutation(UPDATE_TASK_STATUS_MUTATION);

  useEffect(() => {
    const storedStatusIndex = localStorage.getItem(`selectedStatusIndex_${task.id}`);
    if (storedStatusIndex !== null) {
      setStatusIndex(parseInt(storedStatusIndex, 10));
    }
  }, [task.id]);

  const handleStatusChange = async (newIndex) => {
    try {
      const newStatus = statuses[newIndex];
      const completionStatus = newStatus === 'Complete';
      setStatusIndex(newIndex);

      const response = await updateTaskStatus({
        variables: {
          taskId: task.id,
          taskStatus: newStatus,
        },
      });

      console.log('Update Task Status Response:', response);
      setStatusIndex(newIndex);
      onStatusChange(task.id, completionStatus);
      setDropdownOpen(false);
      setOpenedDropdownIndex(null);
      localStorage.setItem(`selectedStatusIndex_${task.id}`, newIndex.toString());
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };
  return (
    <div className="p-2 my-3 mx-auto w-full w-[94%] rounded-lg shadow-sm bg-white font-dm font-bold">
      <div className="task-card flex items-center mt-1">
        <h3>{task.title}</h3>
        {/* Replaced this checkbox with status images */}
        {/* Checkbox */}
        <button className='w-7 h-7' onClick={() => onStatusChange(task.id, !task.completed)}>
          <img src="https://drive.google.com/uc?export=view&id=1JbmEUFBK5MHBXKQNh0MvHDI8eSG8z1sP" />
        </button>
        <p className="ml-2 text-md text-task-blue">{task.taskName}</p>
        <div className="relative ml-auto">
          {/* Dropdown */}
          <img
            src="https://drive.google.com/uc?id=14p4ndBlSZ1Bv681-Ze2XyxrxYxTosUP8"
            alt="Status"
            onClick={() => {
              setDropdownOpen(!isDropdownOpen);
              setOpenedDropdownIndex(isDropdownOpen ? null : statusIndex);
            }}
            className="ml-2 px-2 py-1 cursor-pointer"
          />
          {isDropdownOpen && (
            <div
              className="absolute top-8 right-0 bg-white shadow-md mt-1"
              style={{ zIndex: openedDropdownIndex === statusIndex ? 2 : 1 }}
            >
              <ul>
                {statuses.map((status, index) => (
                  <li
                    key={status}
                    onClick={() => handleStatusChange(index)}
                    className={`cursor-pointer px-4 py-2 hover:bg-gray-200 ${index === statusIndex ? 'bg-task-blue text-white' : ''}`}
                  >
                    {status}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div><div className="border mt-2 mx-auto h-0.4 w-[98%] bg-bar-grey"></div><div className="flex items-center justify-between mx-1 mt-3">
          <p className="text-xs text-task-black">Number of Pomodoro Timers (30 mins each) </p>
          <p className="text-xs text-timer-orange mr-8">{task.pomodoroTimers}</p>
        </div><p className="text-xs font-medium text-notes-grey mt-4 mx-1">Notes</p><p className="whitespace-normal break-words text-sm text-task-black w-full mx-1 rounded-md mt-1 pt-1 pb-1">
          {task.description}
        </p>
      </div>
  );
};

export default TaskCard
