import TaskCard from "../TaskCard/TaskCard"

const TaskGroup = ({groupTitle, tasks, onStatusChange}) => {
  return (
    <div className="task-group">
      <h2 className="text-lg font-semibold text-gray-700">{groupTitle}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onStatusChange={onStatusChange} />
      ))}
    </div>
  )
}

export default TaskGroup
