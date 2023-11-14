import TaskGroup from "../TaskGroup/TaskGroup"
import { useTheme } from '../ThemeContext/ThemeContext'
import React, { useState, useEffect } from 'react';
import { Draggable } from "react-beautiful-dnd"
import { useMutation } from '@redwoodjs/web';

const TaskCard = ({ task, onStatusChange }) => {
  const [statusIndex, setStatusIndex] = useState(0);
  const [openedDropdownIndex, setOpenedDropdownIndex] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isTaskInfoVisible, setTaskInfoVisible] = useState(true);
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

  const handleStatusChange = async () => {
    try {
      // Increment the status index in a circular manner
      const newIndex = (statusIndex + 1) % statuses.length;
      const newStatus = statuses[newIndex];
      const completionStatus = newStatus === 'Complete';
      const response = await updateTaskStatus({
        variables: {
          taskId: task.id,
          taskStatus: newStatus,
        },
      });

      console.log('Update Task Status Response:', response);

      setStatusIndex(newIndex);
      onStatusChange(task.id, completionStatus);
      localStorage.setItem(`selectedStatusIndex_${task.id}`, newIndex.toString());
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };
  return (
    <div className="p-2 my-3 mx-auto w-[94%] rounded-lg shadow-sm bg-white font-dm font-bold">
      <div className="task-card flex items-center mt-1">
        <h3>{task.title}</h3>
        {/* Replaced this checkbox with status images */}
        {/* Status */}
        <button
          className={`w-${task.taskStatus === 'Complete' ? '5' : '8'} h-${task.taskStatus !== 'Complete' ? '9' : '7'}`}
          onClick={handleStatusChange}
        >
          {task.taskStatus === 'Complete' && (
            <img src="https://drive.google.com/uc?id=1AMVLk1OUD4tKJ6C3yT25b7OIunfU7TGA" alt="Complete" />
          )}
          {task.taskStatus === 'Not Started' && (
            <img src="https://drive.google.com/uc?id=1K5uTrydwCXSBTG8-6YVu9kibvzlqmlpg" alt="Not Started" />
          )}
          {task.taskStatus === 'In Progress' && (
            <img src="https://drive.google.com/uc?id=1EAgXSX1V2YIPJnUTfEx16jMO-TeC1_oo" alt="In Progress" />
          )}
          {task.taskStatus === 'Rolled Over' && (
            <img src="https://drive.google.com/uc?id=1EAgXSX1V2YIPJnUTfEx16jMO-TeC1_oo" alt="Rolled Over" />
          )}
        </button>
        <p className="ml-2 text-md text-task-blue">{task.taskName}</p>
        <div className="ml-auto flex items-center">
          {/* Move button */}
          <img
            src="https://drive.google.com/uc?id=1Xiz9LatICGYP1TZo-kICAtJ2GCIf70Al"
            className="w-5 h-5 mr-4"
          />
          {/* Hide/Show */}
          <img
            src="https://drive.google.com/uc?id=14p4ndBlSZ1Bv681-Ze2XyxrxYxTosUP8"
            onClick={() => setTaskInfoVisible(!isTaskInfoVisible)}
            className="w-5 h-5 mr-4"
          />
        </div>
      </div>{isTaskInfoVisible && (
        <>
          <div className="border mt-2 mx-auto h-0.4 w-[98%] bg-bar-grey"></div>
          <div className="flex items-center justify-between mx-1 mt-3">
            <p className="text-xs text-task-black">Number of Pomodoro Timers (30 mins each) </p>
            <p className="text-xs text-timer-orange mr-8">{task.pomodoroTimers}</p>
          </div>
          <p className="text-xs font-medium text-notes-grey mt-4 mx-1">Notes</p>
          <p className="whitespace-normal break-words text-sm text-task-black w-full mx-1 rounded-md mt-1 pt-1 pb-1">
            {task.description}
          </p>
        </>
      )}
      </div>
  );
};

export default TaskCard
