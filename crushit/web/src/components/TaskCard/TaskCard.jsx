import TaskGroup from "../TaskGroup/TaskGroup"
import { useTheme } from '../ThemeContext/ThemeContext'
import React, { useState, useEffect } from 'react';
import { Draggable } from "react-beautiful-dnd"

import { useMutation, gql } from '@redwoodjs/web';

const TaskCard = ({ task, onStatusChange, saveTimerCount }) => {
  const [statusIndex, setStatusIndex] = useState(0);
  const [openedDropdownIndex, setOpenedDropdownIndex] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isTaskInfoVisible, setTaskInfoVisible] = useState(true);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const statuses = ['Not Started', 'In Progress', 'Complete', 'Rolled Over'];
  const [pomodoroCount, setPomodoroCount] = useState(task.pomodoroTimers);
  const [showPomodoroButtons, setShowPomodoroButtons] = useState(false);
  const [showNotesButtons, setShowNotesButtons] = useState(false);
  const [imageSrc, setImageSrc] = useState('https://i.imgur.com/ALJOHMN.png');
  const [imageSize, setImageSize] = useState({ width: 16, height: 16 });
  const [imageSrc2, setImageSrc2] = useState('https://i.imgur.com/ALJOHMN.png');

  const handleIncrement = () => {
    setPomodoroCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    if (pomodoroCount > 0) {
      setPomodoroCount(prevCount => prevCount - 1);
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

  const UPDATE_TASK_DESCRIPTION_MUTATION = gql`
  mutation updateTaskDescription($taskId: Int!, $newDescription: String!) {
    updateTask(id: $taskId, input: { description: $newDescription }) {
      id
      description
    }
  }
  `;

  const [updateTaskDescription] = useMutation(UPDATE_TASK_DESCRIPTION_MUTATION);

  const UPDATE_TASK_ROLLOVER_MUTATION = gql`
    mutation updateTaskRollover(
      $taskId: Int!
      $newDay: Int!
      $newMonth: Int!
      $newYear: Int!
      $newImportanceGroup: ImportanceGroupEnum!
      $newStatus: String!
    ) {
      updateTask(
        id: $taskId
        input: {
          taskStatus: $newStatus
          ImportanceGroup: $newImportanceGroup
          taskDates: [{
            day: $newDay
            month: $newMonth
            year: $newYear
          }]
        }
      ) {
        id
        taskStatus
        ImportanceGroup
        taskDates {
          day
          month
          year
        }
      }
    }
  `;




  const [updateTaskRollover] = useMutation(UPDATE_TASK_ROLLOVER_MUTATION);

  const toggleDescriptionEditing = async () => {
    try {
      if (isEditingDescription) {
        await updateTaskDescription({
          variables: {
            taskId: task.id,
            newDescription: editedDescription,
          },
        });
      }

      setIsEditingDescription((prevIsEditing) => !prevIsEditing);
    } catch (error) {
      console.error('Error updating task description:', error);
    }
  };



  useEffect(() => {
    const storedStatusIndex = localStorage.getItem(`selectedStatusIndex_${task.id}`);
    if (storedStatusIndex !== null) {
      setStatusIndex(parseInt(storedStatusIndex, 10));
    }
  }, [task.id]);

  const toggleButtons = (buttonType) => {
    if (buttonType === 'pomodoro') {
      setImageSrc((prevImageSrc) =>
        prevImageSrc === 'https://i.imgur.com/ALJOHMN.png'
          ? 'https://i.imgur.com/aLhz1Kz.png'
          : 'https://i.imgur.com/ALJOHMN.png'
      );
      setShowPomodoroButtons((prevShowPomodoroButtons) => !prevShowPomodoroButtons);
      if (!showPomodoroButtons) {
        saveTimerCount(task, pomodoroCount);
      }
    } else if (buttonType === 'notes') {
      setImageSrc2((prevImageSrc) =>
        prevImageSrc === 'https://i.imgur.com/ALJOHMN.png'
          ? 'https://i.imgur.com/aLhz1Kz.png'
          : 'https://i.imgur.com/ALJOHMN.png'
      );
      setIsEditingDescription((prevIsEditing) => !prevIsEditing);
      setShowNotesButtons((prevShowNotesButtons) => !prevShowNotesButtons);
    }
  };

  const handleTextareaKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      toggleDescriptionEditing();
    }
  };

  const handleStatusChange = async () => {
    try {
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

  const rollOverTask = async () => {
    try {
      const currentDate = new Date();
      const newDay = currentDate.getDate();
      const newMonth = currentDate.getMonth() + 1;
      const newYear = currentDate.getFullYear();
      const newImportanceGroup = 'Important';
      const newStatus = 'Not Started';

      if (!task.completionStatus && task.taskDates.some(date => date.day < newDay)) {
        await updateTaskRollover({
          variables: {
            taskId: task.id,
            newDay,
            newMonth,
            newYear,
            newImportanceGroup,
            newStatus,
          },
        });
      }
    } catch (error) {
      console.error('Error updating task rollover:', error);
    }
  };

  useEffect(() => {
    rollOverTask();
  }, [task.id]);

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
          {/* Status images */}
        </button>
        <p className="ml-2 text-md text-task-blue">{task.taskName}</p>
        <div className="ml-auto flex items-center">
          {/* Move button */}
          <img src="https://drive.google.com/uc?id=1Xiz9LatICGYP1TZo-kICAtJ2GCIf70Al" className="w-5 h-5 mr-4" />
          {/* Hide/Show */}
          <img
            src="https://drive.google.com/uc?id=14p4ndBlSZ1Bv681-Ze2XyxrxYxTosUP8"
            onClick={() => setTaskInfoVisible(!isTaskInfoVisible)}
            className="w-5 h-5 mr-4"
          />
        </div>
      </div>
      {isTaskInfoVisible && (
        <>
          {/* ... (existing JSX) */}
          <div className="flex items-center justify-between mx-1 mt-3">
            <p className="text-xs text-task-black">Number of Pomodoro Timers (30 mins each) </p>
            <div className="flex items-center">
              {showPomodoroButtons && (
                <>
                  <button onClick={handleDecrement} className="focus:outline-none">
                    <img src="https://i.imgur.com/psv7bFF.png" width={imageSize.width} height={imageSize.height} />
                  </button>
                </>
              )}
              <p className="text-xs text-timer-orange mx-2">{pomodoroCount}</p>
              {showPomodoroButtons && (
                <>
                  <button onClick={handleIncrement} className="focus:outline-none">
                    <img src="https://i.imgur.com/Zm4t7vG.png" width={imageSize.width} height={imageSize.height} />
                  </button>
                </>
              )}
              <button onClick={() => toggleButtons('pomodoro')} className="focus:outline-none le" style={{ marginLeft: '32px' }}>
                <img src={imageSrc} width={imageSize.width} height={imageSize.height} alt="Toggle Image" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-end mx-1 mt-4">
            <p className="text-xs font-medium text-notes-grey">Notes</p>
            <button onClick={() => toggleButtons('notes')} className="focus:outline-none le ml-auto">
              <img src={imageSrc2} width={imageSize.width} height={imageSize.height} alt="Toggle Image" />
            </button>
          </div>
          <div className="mx-1 mt-2">
            {isEditingDescription ? (
              <>
              <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  onKeyDown={handleTextareaKeyDown}  // Handle "Enter" key
                  className="whitespace-normal break-words text-sm text-task-black w-full mx-1 rounded-md mt-1 pt-1 pb-1"
                />
              </>
            ) : (
              <p className="whitespace-normal break-words text-sm text-task-black w-full mx-1 rounded-md mt-1 pt-1 pb-1">
                {editedDescription}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard
