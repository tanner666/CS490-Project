import React, { useEffect, useState } from 'react';

const AddTaskForm = ({ onSubmit, onCancel }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [priorityGroup, setPriorityGroup] = useState('other'); // default value

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ taskName, description, priorityGroup });
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
      <select value={priorityGroup} onChange={(e) => setPriorityGroup(e.target.value)}>
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
