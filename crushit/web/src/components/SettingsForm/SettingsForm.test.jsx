import { ThemeProvider } from '../ThemeContext/ThemeContext';
import { render, screen, fireEvent } from '@redwoodjs/testing/web';
import SettingsForm from './SettingsForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SettingsForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <ThemeProvider>
          <SettingsForm userId={1}/>
        </ThemeProvider>
      )
    }).not.toThrow()
  })

  it('updates fields on change', () => {
    render(<ThemeProvider><SettingsForm /></ThemeProvider>); // Adjust this line to match how you render your component

    const firstNameInput = screen.getByPlaceholderText(/Enter your first name/i);
    fireEvent.change(firstNameInput, { target: { value: 'Kyle' } });

    expect(firstNameInput.value).toBe('Kyle'); // Check if the input value is updated

    const LastNameInput = screen.getByPlaceholderText(/Enter your first name/i);
    fireEvent.change(LastNameInput, { target: { value: 'Joe' } });

    expect(LastNameInput.value).toBe('Joe'); // Check if the input value is updated

    const ConfirmPassword = screen.getByLabelText(/Confirm Password/i);
    fireEvent.change(ConfirmPassword, { target: { value: 'tesdasflkj234234' } });

    expect(ConfirmPassword.value).toBe('tesdasflkj234234');

    const podomorDuration = screen.getByPlaceholderText(/Enter Pomodoro duration/i);
    fireEvent.change(podomorDuration, {target: { value: '30' },});
    
    expect(podomorDuration.value).toBe('30');


  });
});
