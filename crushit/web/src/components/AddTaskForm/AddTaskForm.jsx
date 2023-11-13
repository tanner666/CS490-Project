import React, { useEffect, useState } from 'react';

const AddTaskForm = ({ userId, day, month, year, onSubmit, onCancel }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [ImportanceGroup, setImportanceGroup] = useState('other'); // default value


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ 
      taskName, 
      description, 
      ImportanceGroup,
      pomodoroTimeType: 'pomodoro',
      createdBy: userId,
      taskDates: {
        day: day,
        month: month,
        year: year,
      }
    });
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
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Description" 
        required 
      />
      <select value={ImportanceGroup} onChange={(e) => setImportanceGroup(e.target.value)}>
        <option value="topPriority">Top Priority</option>
        <option value="important">Important</option>
        <option value="other">Other</option>
      </select>
      <button type="submit">Add Task</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default AddTaskForm
