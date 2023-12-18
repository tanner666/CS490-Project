import TaskGroup from "../TaskGroup/TaskGroup"
import { useTheme } from '../ThemeContext/ThemeContext'
import React, { useState, useEffect } from 'react';
import { Draggable } from "react-beautiful-dnd"

import { useMutation } from '@redwoodjs/web';

const UPDATE_TASK_MUTATION = gql`
  mutation updateTask($id: Int!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      taskName
      ImportanceGroup
      completionStatus
      description
      pomodoroTimers
      pomodoroTimerType
      taskOrder
      pomodoro{
        id
      }
    }
  }
`

const TaskCard = ({ task, onStatusChange, saveTimerCount, toggleFocusTime, updateTaskInList, group}) => {

  const taskNotesTextStyle = {
    fontFamily: 'DM Sans',
    fontSize: '12px', // Adjust the font size as needed
    fontWeight: 500,
  };

  const [checkboxImage, setCheckboxImage] = useState(
    'https://drive.google.com/uc?id=13Qa4tAKL_0LYj8RYCgbktwhLQyHYhMyC'
  );

  const checkboxStyle = {
    cursor: 'pointer',
    width: '12px',
    height: '12px',
    top: '10px',
    right: '20px',
    backgroundColor: 'rgba(98, 132, 255, 1)',
    borderRadius: '3px',
    backgroundImage: `url(${checkboxImage})`, // Set the checkbox image
    backgroundSize: '7px 7px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  const [statusIndex, setStatusIndex] = useState(0);
  const [openedDropdownIndex, setOpenedDropdownIndex] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isTaskInfoVisible, setTaskInfoVisible] = useState(true);
  const statuses = ['Not Started', 'In Progress', 'Complete', 'Rolled Over'];
  const [pomodoroCount, setPomodoroCount] = useState(task.pomodoroTimers);
  const [showButtons, setShowButtons] = useState(false);
  const [imageSrc, setImageSrc] = useState('https://i.imgur.com/ALJOHMN.png');
  const [imageSize, setImageSize] = useState({ width: 16, height: 16 });
  const [updateTasks] = useMutation(UPDATE_TASK_MUTATION);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [description, setDescription] = useState(task.description);


  const handleEditButtonClick = () => {
    setIsEditingNotes(true);
  };

  const handleCheckboxClick = () => {
    setIsEditingNotes(false);
    updateTasks({ variables: { id: task.id, input: {description: description } } })

  };


  const handleIncrement = () => {
    setPomodoroCount(prevCount => prevCount + 1);
    updateTaskInList(task, group);

  };

  const handleDecrement = () => {
    if (pomodoroCount > 0) {
      setPomodoroCount(prevCount => prevCount - 1);
      updateTaskInList(task, group);

    }
  };

  const toggleButtons = () => {
    const newImageSrc =
      imageSrc === 'https://i.imgur.com/ALJOHMN.png'
        ? 'https://i.imgur.com/aLhz1Kz.png'
        : 'https://i.imgur.com/ALJOHMN.png';
    setImageSrc(newImageSrc);

    setShowButtons(prevShowButtons => !prevShowButtons);
    if (showButtons) {
      saveTimerCount(task, pomodoroCount);
    }
  };

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

  const DELETE_TASK_MUTATION = gql`
  mutation deleteTask($taskId: Int!) {
    deleteTask(id: $taskId) {
      id
    }
  }
  `;
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION);

  const handleDelete = async () => {
    try {
      const response = await deleteTask({
        variables: { taskId: task.id },
      });

      onDelete(task.id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

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
  const handleToggleFocusTime = () => {
    toggleFocusTime(task); // Call the toggleFocusTime function from props
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
            <img src="https://drive.google.com/uc?id=15MpHv4HVjiysSd5_bahlb5jBG90GGg5Q" alt="Rolled Over" />
          )}
        </button>
        <div onClick={handleToggleFocusTime} className="task-text-container">
          <p className="ml-2 text-md text-task-blue">{task.taskName}</p>
        </div>        <div className="ml-auto flex items-center">
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
            <div className="flex items-center">
              {showButtons && (
                <>
                  <button onClick={handleDecrement} className="focus:outline-none">
                    <img src="https://i.imgur.com/psv7bFF.png" width={imageSize.width} height={imageSize.height} />
                  </button>
                </>
              )}
              <p className="text-xs text-timer-orange mx-2">{pomodoroCount}</p>
              {showButtons && (
                <>
                  <button onClick={handleIncrement} className="focus:outline-none">
                    <img src="https://i.imgur.com/Zm4t7vG.png" width={imageSize.width} height={imageSize.height} />
                  </button>
                </>
              )}
              <button onClick={toggleButtons} className="focus:outline-none le" style={{ marginLeft: '32px' }}>
                <svg className="mr-3.5 mt-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8.83994 2.39997L3.36661 8.1933C3.15994 8.4133 2.95994 8.84664 2.91994 9.14664L2.67328 11.3066C2.58661 12.0866 3.14661 12.62 3.91994 12.4866L6.06661 12.12C6.36661 12.0666 6.78661 11.8466 6.99327 11.62L12.4666 5.82664C13.4133 4.82664 13.8399 3.68664 12.3666 2.2933C10.8999 0.913305 9.78661 1.39997 8.83994 2.39997Z" stroke="#6284FF" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7.92664 3.36667C8.2133 5.20667 9.70664 6.61334 11.56 6.8" stroke="#6284FF" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 14.6667H14" stroke="#6284FF" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
               </svg>
             </button>
            </div>
          </div>
          <p className="text-xs font-medium text-notes-grey mt-4 mx-1">Notes</p>
          <div className="whitespace-normal break-words text-sm text-task-black w-full mx rounded-md mt-1 pt-1 pb-1">
              {isEditingNotes ? (
              <>
                <textarea
                  className="w-[98.5%] border border-gray-300 rounded p-2 text-sm font-medium text-gray-700"
                  onBlur={(e) => {
                    setNotes(e.target.value);
                    setIsEditingNotes(false);
                  }}
                  onChange={(e) => setDescription(e.target.value)}
                >
                  {description}
                </textarea>
                <div
                  className="mt-1"
                  style={checkboxStyle}
                  onClick={handleCheckboxClick}
                ></div>
              </>
            ) : (

              <div className="flex-col">
                <svg className="ml-[93.5%] mt-[-5%]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" alt="edit button"
                  onClick={handleEditButtonClick}>
                  <path d="M8.83994 2.39997L3.36661 8.1933C3.15994 8.4133 2.95994 8.84664 2.91994 9.14664L2.67328 11.3066C2.58661 12.0866 3.14661 12.62 3.91994 12.4866L6.06661 12.12C6.36661 12.0666 6.78661 11.8466 6.99327 11.62L12.4666 5.82664C13.4133 4.82664 13.8399 3.68664 12.3666 2.2933C10.8999 0.913305 9.78661 1.39997 8.83994 2.39997Z" stroke="#6284FF" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7.92664 3.36667C8.2133 5.20667 9.70664 6.61334 11.56 6.8" stroke="#6284FF" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2 14.6667H14" stroke="#6284FF" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div className="w-[98.5%] max-w-lg rounded p-2 text-sm font-medium text-gray-700 resize-none break-words overflow-x-auto">
                  {description}
                </div>
              </div>

            )}
          </div>
          {/* Context menu for delete */}
           <div className="flex items-center justify-end mx-1 mt-4">
            {/* Delete button */}
            <button onClick={handleDelete} className="focus:outline-none le ml-auto">
              <img src="https://drive.google.com/uc?id=1ZA0CrEEbzgnx_TSsvLgy9wktqVkdYFf_" width={imageSize.width + 4}  height={imageSize.height + 4} alt="Delete Image" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard
