import React, { useState } from 'react';

const PomodoroTimer = () => {
  const [pomodoroTime, setPomodoroTime] = useState(25);
  const [shortBreakTime, setShortBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);

  return (
    <div className="bg-white p-8 w-full max-w-5xl mx-auto rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-8">Pomodoro Timer</h2>
      <div className="grid grid-cols-3 gap-8">
        <PomodoroField label="Pomodoro" value={pomodoroTime} onChange={setPomodoroTime} />
        <PomodoroField label="Short Break" value={shortBreakTime} onChange={setShortBreakTime} />
        <PomodoroField label="Long Break" value={longBreakTime} onChange={setLongBreakTime} />
      </div>
    </div>
  );
};

const PomodoroField = ({ label, value, onChange }) => {
  return (
    <div className="relative">
      <label className="block text-gray-600 mb-2">{label}</label>
      <input
        className="border-2 p-4 rounded-lg w-full focus:border-blue-500"
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default PomodoroTimer;
