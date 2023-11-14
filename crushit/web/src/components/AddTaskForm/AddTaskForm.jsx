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
    console.log("useId: ", userId);
    console.log("IMportance group value:", ImportanceGroup);
    try {
      const response = await createTask({
        variables: {
          input: {
            taskName, 
            description, 
            ImportanceGroup,
            createdBy: userId,
            completionStatus: false,
            taskOrder: 0, //need to add functionality to handle this for rearanging tasks
            pomodoroTimers: 0, // Set default value or get from state
            pomodoroTimerType: 'pomodoro', // Example value
            taskDates: [{ day, month, year}], // Assuming taskDates is an array of dates
          },
        },
      });
      console.log("response: ", response);
      if (response && response.data && response.data.createTask) {
        // Task creation successful
        console.log('Task created:', response.data.createTask);
        onSubmit(); // Invoke the onSubmit callback if needed
      }
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task.');
    }
  };

  return (
<div>
  <h2 className="text-2xl font-semibold mb-4 ">Add Task</h2>
  <form onSubmit={handleSubmit}>
    <input 
      type="text" 
      value={taskName} 
      onChange={(e) => setTaskName(e.target.value)} 
      placeholder="Task Name" 
      required 
      className="w-full p-2 mb-4 border rounded"
    />
    <textarea 
      className="w-full h-32 p-2 mb-4 border rounded"
      value={description} 
      onChange={(e) => setDescription(e.target.value)} 
      placeholder="Description"  
    />
    <select 
      value={ImportanceGroup} 
      onChange={(e) => setImportanceGroup(e.target.value)}
      className="w-full p-2 mb-4 border rounded"
    >
      <option value="TopPriority">Top Priority</option>
      <option value="Important">Important</option>
      <option value="Other">Other</option>
    </select>
    <div className="flex space-x-4">
      <button className="bg-white p-2 rounded" type="submit">
        Add Task
      </button>
      <button className="bg-white p-2 rounded" type="button" onClick={onCancel}>
        Cancel
      </button>
    </div>
  </form>
</div>

  );
};

export default AddTaskForm
