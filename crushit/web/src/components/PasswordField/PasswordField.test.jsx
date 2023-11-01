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
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
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

    expect(mockHandleCurrentPasswordChange).toHaveBeenCalledWith(expect.objectContaining({ target: { value: 'tesdasflkj234234' } }));w
  });

});

