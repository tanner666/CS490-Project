import { render } from '@redwoodjs/testing/web'

import TaskCard from './TaskCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TaskCard', () => {
  const mockTask = {
    id: '1',
    taskName: 'Sample Task',
    pomodoroTimers: 3,
    completed: false,
    description: 'Sample description',
    // ... any other necessary properties ...
  };

  it('renders successfully', () => {
    expect(() => {
      render(<TaskCard task={mockTask} onStatusChange={() => {}} />);
    }).not.toThrow()
  })
})
