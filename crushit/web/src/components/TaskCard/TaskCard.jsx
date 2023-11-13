import TaskGroup from "../TaskGroup/TaskGroup"

const TaskCard = ({ task, onStatusChange }) => {
  return (
    <div>
        <div className="task-card flex items-center mt-2">
        <h3>{task.title}</h3>
        {/* Other task details */}
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => onStatusChange(task.id, e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <p className="ml-2 text-sm text-gray-700">Complete Math Homework</p>
        </div>
        <p className="text-sm text-gray-500 mt-3">Number of Pomodoro Timers (30 mins each): {pomodoroTimers}</p>
        <p className="text-sm font-medium text-gray-700 mt-4">Notes</p>
        <textarea
          className="w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-md mt-1"
          defaultValue={notes}
        />
        
      </div>
  )
}

export default TaskCard
