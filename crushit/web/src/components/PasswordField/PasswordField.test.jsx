import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PasswordField from './PasswordField';
import { ThemeProvider } from '../ThemeContext/ThemeContext';

describe('TimerField Component', () => {
  const mockHandleCurrentPasswordChange = jest.fn((e) => e.target.value);
  const mockHandleNewPasswordChange = jest.fn();
  const mockHandleConfirmNewPasswordChange = jest.fn();

  it('renders without crashing', () => {
    render(
      <ThemeProvider>
        <PasswordField
          currentPassword={'131313'} 
          newPassword={'tesdasflkj234234'} 
          confirmNewPassword={'tesdasflkj234234'}
          handleCurrentPasswordChange={mockHandleCurrentPasswordChange}
          handleNewPasswordChange={mockHandleNewPasswordChange}
          handleConfirmNewPasswordChange={mockHandleConfirmNewPasswordChange}
          theme="light"
        />
      </ThemeProvider>
    );

    expect(screen.getByLabelText(/Current Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/New Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm New Password/i)).toBeInTheDocument();
  });

  it('calls handlePodomoroChange when Podomoro value is changed', () => {
    render(
      <ThemeProvider>
        <PasswordField 
          currentPassword={'131313'} 
          newPassword={'tesdasflkj234234'} 
          confirmNewPassword={'tesdasflkj234234'}
          handleCurrentPasswordChange={mockHandleCurrentPasswordChange}
          handleNewPasswordChange={mockHandleNewPasswordChange}
          handleConfirmNewPasswordChange={mockHandleConfirmNewPasswordChange}
          theme="light"
        />
      </ThemeProvider>
    );
  
    fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: 'tesdasflkj234234' } });
    
    // Check if the first argument of the first call to the function contains an object with a target.value of '30'
    expect(mockHandleCurrentPasswordChange.mock.calls[0][0].target.value).toBe('tesdasflkj234234');
  });

  // Similar tests for shortBreak and longBreak
});

