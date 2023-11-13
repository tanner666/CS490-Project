import React, { useEffect, useState } from 'react';
import {useMutation} from '@redwoodjs/web';


const CREATE_TASK_MUTATION = gql`
   mutation createTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      taskName
      ImportanceGroup
      completionStatus
      description
      pomodoroTimers
      pomodoroTimerType
      taskOrder
      createdBy
      taskDates {
        day
        month
        year
      }
    }
  }
`

export const AddTaskForm = ({ userId, day, month, year, onSubmit, onCancel }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [ImportanceGroup, setImportanceGroup] = useState('Other'); // default value
  const [createTask] = useMutation(CREATE_TASK_MUTATION);

//creates task in database
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Importance group value:", ImportanceGroup);
  try {
    const formattedTaskDates = [{ day, month, year }];
    const response = await createTask({
      variables: {
        input: {
          taskName,
          description,
          ImportanceGroup,
          createdBy: userId,
          completionStatus: false,
          taskOrder: 0,
          pomodoroTimers: 0,
          pomodoroTimerType: 'pomodoro',
          taskDates: formattedTaskDates, // Use the formatted taskDates array
        },
      },
    });
    console.log("response: ", response);
    if (response && response.data && response.data.createTask) {
      console.log('Task created:', response.data.createTask);
      onSubmit(response.data.createTask);
    }
  } catch (error) {
    console.error('Error creating task:', error);
    alert('Failed to create task.');
  }
};



  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Task Name"
        required
      />
      <textarea
        className = "w-full h-32"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <select value={ImportanceGroup} onChange={(e) => setImportanceGroup(e.target.value)}>
        <option value="TopPriority">Top Priority</option>
        <option value="Important">Important</option>
        <option value="Other">Other</option>
      </select>
      <button className="bg-white" type="submit">Add Task</button>
      <button className="bg-white" type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default AddTaskForm
