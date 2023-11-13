import React, { useState } from 'react';


const TaskCard = ({ title, pomodoroTimers, notes, leaders }) => {
const [checked, setChecked] = useState(false);


return (
  <div style={{ border: '1px solid black', padding: '10px', margin: '10px', width: '300px', minWidth: '300px' }}>
    <h2>{title}</h2>
    <div style={{ alignItems: 'center' }}>
      <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
      <p style={{ marginLeft: '10px' }}>Complete Math Homework</p>
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


return (
  <div style={{ marginTop: '160px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
    {tasks.map((task, index) => (
      <TaskCard key={index} {...task} />
    ))}
  </div>
);
};


export default TaskManagement;


