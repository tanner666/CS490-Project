import { render, screen, waitFor, fireEvent } from '@redwoodjs/testing/web'
import userEvent from '@testing-library/user-event'

import FocusTime from './FocusTime'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components


const mockedTask = {
  id: 1,
  description: 'Mocked Task Description',
  taskName: 'Mocked Task',
  pomodoro: [
    {
      id: 1,
      currentPomo: 25,
      currentShort: 5,
      currentLong: 15,
    },
  ],
  pomodorosCompleted: 0,
  pomodoroTimers: 4,
};

describe('FocusTime', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FocusTime />)
    }).not.toThrow()
  })

  it('renders the options correctly', () => {
    render(<FocusTime />)
    const pomodoroOption = screen.getByText('Pomodoro')
    const shortBreakOption = screen.getByText('Short Break')
    const longBreakOption = screen.getByText('Long Break')

    expect(pomodoroOption).toBeInTheDocument()
    expect(shortBreakOption).toBeInTheDocument()
    expect(longBreakOption).toBeInTheDocument()
  })

  it('changes the selected option when clicked', async() => {
    render(<FocusTime />)
    const pomodoroOption = screen.getByText('Pomodoro')
    const shortBreakOption = screen.getByText('Short Break')
    const longBreakOption = screen.getByText('Long Break')

    userEvent.click(shortBreakOption)
    await waitFor(() => {
      expect(pomodoroOption).not.toHaveStyle('color: blue')
      expect(shortBreakOption).toHaveStyle('color: blue')
      expect(longBreakOption).not.toHaveStyle('color: blue')
    })

    userEvent.click(longBreakOption)
    await waitFor(() => {
      expect(pomodoroOption).not.toHaveStyle('color: blue')
      expect(shortBreakOption).not.toHaveStyle('color: blue')
      expect(longBreakOption).toHaveStyle('color: blue')
    })
  })

  it('starts and stops the timer when start/stop button is clicked', async () => {
    render(<FocusTime isTimerRunning={false}/>)
    // Check if the button text is 'Start'
    const startStopButton = screen.getByTestId('stopStart')
    expect(startStopButton).toHaveTextContent('Start');

    await waitFor(() => {
      userEvent.click(startStopButton);
      expect(startStopButton).toHaveTextContent('Stop');
    });
  })

  /*it('updates the notes when edited and saved', async () => {
    render(<FocusTime />);
    const editButton = screen.getByRole('editNotes');
    const notesTextArea = screen.getByRole('notesEdit');

    userEvent.click(editButton);
    userEvent.type(notesTextArea, '');
    userEvent.click(editButton);

    await waitFor(() => {
      expect(notesTextArea).toHaveTextContent('');
    }, { timeout: 4000 }); // Adjust the timeout as needed
  });*/

})

describe('FocusTime component', () => {

  it('renders FocusTime component with correct timer values for pomodoro', () => {
    render(<FocusTime userId="mockUserId" onClose={() => {}} task={mockedTask} />);

    const pomodoroOption = screen.getByText('Pomodoro');

    userEvent.click(pomodoroOption);
    const pomodoroTimerElement = screen.getByText('25:00');
    expect(pomodoroTimerElement).toBeInTheDocument();
  });
});


describe('FocusTime format time', () => {
  it('renders the formatted time correctly', () => {
    render(<FocusTime />);
    const time = 1500; // 25 minutes in seconds
    const formattedTime = '25:00';

    const formattedTimeElement = screen.getByText(formattedTime);
    expect(formattedTimeElement).toBeInTheDocument();
  });
});