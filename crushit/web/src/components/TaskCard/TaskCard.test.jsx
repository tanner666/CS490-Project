import { render, fireEvent} from '@redwoodjs/testing/web'

import TaskCard from './TaskCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TaskCard', () => {
  const mockTask = {
    id: '1',
    taskName: 'Sample Task',
    pomodoroTimers: 3,
    completed: false,
    pomodorosCompleted: 1,
    description: 'Sample description',
    // ... any other necessary properties ...
  };
  const mockUpdateTaskInList = jest.fn(); // Create a mock function


  it('renders successfully', () => {
    expect(() => {
      render(<TaskCard task={mockTask} onStatusChange={() => {}} />);
    }).not.toThrow()
  })

  it('displays the correct pomodoroCount value', () => {
    const { getByText } = render(<TaskCard task={mockTask} onStatusChange={() => {}} />);
    const expectedPomodoroCount = mockTask.pomodoroTimers - mockTask.pomodorosCompleted;
    const displayedPomodoroCount = getByText(`${expectedPomodoroCount}`); // Locate the displayed pomodoroCount

    expect(displayedPomodoroCount).toBeInTheDocument(); // Assert that the displayed value matches the expected value
  });

  it('increments pomodoroCount by one when increment button is clicked and showButtons is true', () => {
    const { getByText, getByRole, getByTestId } = render(<TaskCard task={mockTask} onStatusChange={() => {}} updateTaskInList={mockUpdateTaskInList} />);
    const toggleButtonsButton = getByTestId('toggleincrementdecrement'); // Find the toggleButtons button by role

    fireEvent.click(toggleButtonsButton); // Click to toggle showButtons to true
    const incrementButton = getByTestId('increment-button');

    fireEvent.click(incrementButton);

    const expectedPomodoroCount = mockTask.pomodoroTimers - mockTask.pomodorosCompleted + 1;
    const displayedPomodoroCount = getByText(`${expectedPomodoroCount}`);
    expect(displayedPomodoroCount).toBeInTheDocument();
  });

  it('decrements pomodoroCount by one when decrement button is clicked and showButtons is true', () => {
    const { getByText, getByRole, getByTestId } = render(<TaskCard task={mockTask} onStatusChange={() => {}} updateTaskInList={mockUpdateTaskInList} />);
    const toggleButtonsButton = getByTestId('toggleincrementdecrement'); // Find the toggleButtons button by role

    fireEvent.click(toggleButtonsButton); // Click to toggle showButtons to true
    const decrementButton = getByTestId('decrement-button');

    fireEvent.click(decrementButton);

    const expectedPomodoroCount = mockTask.pomodoroTimers - mockTask.pomodorosCompleted - 1;
    const displayedPomodoroCount = getByText(`${expectedPomodoroCount}`);
    expect(displayedPomodoroCount).toBeInTheDocument();
  });
})
