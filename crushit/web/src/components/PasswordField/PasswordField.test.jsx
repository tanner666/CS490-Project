import React from 'react';
import { render, screen, fireEvent } from '@redwoodjs/testing/web';
import '@testing-library/jest-dom';
import PasswordField from './PasswordField';
import { ThemeProvider } from '../ThemeContext/ThemeContext';

describe('PasswordField Component', () => {
  const mockHandleCurrentPasswordChange = jest.fn();
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

    // Check if password fields are rendered
    const currentPasswordField = screen.getByLabelText(/Current Password/i);
    const newPasswordField = screen.getByLabelText(/New Password/i);
    const confirmNewPasswordField = screen.getByLabelText(/Confirm Password/i);

    expect(currentPasswordField).toBeInTheDocument();
    expect(newPasswordField).toBeInTheDocument();
    expect(confirmNewPasswordField).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(currentPasswordField, { target: { value: 'newcurrentpassword' } });
    fireEvent.change(newPasswordField, { target: { value: 'newpassword' } });
    fireEvent.change(confirmNewPasswordField, { target: { value: 'newpassword' } });

    // Check if handlers are called
    expect(mockHandleCurrentPasswordChange).toHaveBeenCalledTimes(1);
    expect(mockHandleNewPasswordChange).toHaveBeenCalledTimes(1);
    expect(mockHandleConfirmNewPasswordChange).toHaveBeenCalledTimes(1);
  });

  // Additional tests can be added here to cover other scenarios and interactions
});
