import React, { useState } from 'react';

const roundedBoxStyle = {
  backgroundColor: 'transparent',
  color: '#FFFFFF', // Assuming white text color, you can adjust this based on your design
  padding: '8px',
  margin: '0 5px',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  border: 'none', // Slightly darker blue border
};

const ImageBox = ({ imageUrl, onClick, style }) => (
  <div
    style={{
      ...roundedBoxStyle,
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      cursor: 'pointer',
      ...style,
    }}
    onClick={onClick}
  ></div>
);


const TaskCard = ({ title, pomodoroTimers, notes, leaders }) => {
const [checked, setChecked] = useState(false);
const [status, setStatus] = useState('notStarted');
const statusOption = ['Not Started', 'In Progress', 'Complete', 'Rolled Over'];
const statusChange = (newStatus) => {
  setStatus(newStatus);
};
return (
  <div style={{ border: '1px solid black', padding: '10px', margin: '10px', width: '300px', minWidth: '300px' }}>
    <h2>{title}</h2>
    <div style={{ alignItems: 'center' }}>
      <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
      <p style={{ marginLeft: '10px' }}>Complete Math Homework</p>
      <div style={{ marginLeft: '10px' }}>
        <span>Status:</span>
        <select value={status} onChange={(e) => statusChange(e.target.value)}>
          {statusOption.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
    <p>Number of Pomodoro Timers (30 mins each): {pomodoroTimers}</p>
    <p>Notes</p>
    <textarea style={{ width: '100%', height: '10px' }} defaultValue={notes} />
    <p>Assign Leader for Task 1</p>
    <select>
      {leaders.map((leader, index) => (
        <option key={index} value={leader}>
          {leader}
        </option>
      ))}
    </select>
  </div>
);
};


const TaskManagement = () => {
const tasks = [
  { title: 'Top Priority', pomodoroTimers: 2, notes: 'Lorem ipsum...', leaders: ['Leader 1', 'Leader 2'] },
  { title: 'Important', pomodoroTimers: 1, notes: 'Lorem ipsum...', leaders: ['Leader 1', 'Leader 2'] },
  { title: 'Other', pomodoroTimers: 3, notes: 'Lorem ipsum...', leaders: ['Leader 1', 'Leader 2'] },
];

const [showAddTaskForm, setShowAddTaskForm] = useState(false);

const [newTask, setNewTask] = useState({
  title: '',
  pomodoroTimers: 0,
  notes: '',
  leaders: [],
});

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
};

const handleAddTask = () => {
  setTasks((prevTasks) => [...prevTasks, { ...newTask }]);
  setNewTask({ title: '', pomodoroTimers: 0, notes: '', leaders: [] });
  setShowAddTaskForm(false);
};

const handleCancel = () => {
  setNewTask({ title: '', pomodoroTimers: 0, notes: '', leaders: [] });
  setShowAddTaskForm(false);
};

const handleButtonClick = () => {
  setShowAddTaskForm(true);
};

return (
  <div style={{ marginTop: '160px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
    <div style={{width: '81px', height: '39px', top: '170px', left: '220px', color: '#000000', textAlign: 'left', fontFamily: 'DM Sans', fontSize: '30px', fontWeight: '700', lineHeight: '39px', letterSpacing: '0em', padding: '10px' }}>
      Tasks
    </div>
    {showAddTaskForm ? (
      <div style={{ marginBottom: '20px' }}>
        <h2>Create New Task</h2>
        <label>Title:</label>
        <input type="text" name="title" value={newTask.title} onChange={handleInputChange} />
        <label>Pomodoro Timers:</label>
        <input type="number" name="pomodoroTimers" value={newTask.pomodoroTimers} onChange={handleInputChange} />
        <label>Notes:</label>
        <textarea name="notes" value={newTask.notes} onChange={handleInputChange}></textarea>
        <div style={{ marginRight: '10px' }}>
          <button onClick={handleAddTask}>Add Task</button>
        </div>
        <div>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    ) : (
      <ImageBox
        imageUrl="https://drive.google.com/uc?id=15u_E4KTcYWye2DRnndaVYb0WGJK4Ge-h"
        onClick={handleButtonClick}
        style={{
          width: '39px',
          height: '39px',
          top: '170px',
          left: '313px',
        }}
      />

    )}
    {tasks.map((task, index) => (
      <TaskCard key={index} {...task} />
    ))}
  </div>
);
};

export default TaskManagement;


