import { render } from '@redwoodjs/testing/web'
import { DragDropContext } from 'react-beautiful-dnd';
import TaskGroup from './TaskGroup'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TaskGroup', () => {
  const mockTaskGroup = {
    tasks:[
      {
        id: 345,
        taskName: 'Sample Task',
        pomodoroTimers: 3,
        completed: false,
        description: 'Sample description',
      },
    ]
      
    // ... any other necessary properties ...
  };

  it('renders successfully', () => {
    expect(() => {
      render(<DragDropContext><TaskGroup groupTitle="Top Priority" tasks={mockTaskGroup.tasks} onStatusChange={() => {}}/></DragDropContext>)
    }).not.toThrow()
  })
})
