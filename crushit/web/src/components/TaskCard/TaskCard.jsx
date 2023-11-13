import TaskGroup from "../TaskGroup/TaskGroup"
import { useTheme } from '../ThemeContext/ThemeContext'


const TaskCard = ({ task, onStatusChange }) => {
  return (
      <div className="p-2 my-4 mx-3 w-full max-w-[91%] rounded-lg shadow-sm bg-white">
        <div className="task-card flex items-center mt-2">
        <h3>{task.title}</h3>
        {/* REplace this checkbox with status images */}
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => onStatusChange(task.id, e.target.checked)}
            className="form-checkbox h-4 w-5 text-blue-600"
          />
          <p className="ml-2 text-md font-dm text-task-blue">{task.taskName}</p>
        </div>
        <p className="text-sm text-gray-500 mt-3">Number of Pomodoro Timers (30 mins each): {task.pomodoroTimers}</p>
        <p className="text-sm font-medium text-gray-700 mt-4">Notes</p>
        <textarea
          className="w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-md mt-1"
          defaultValue={task.description}
        />
        
      </div>
  )
}

export default TaskCard
