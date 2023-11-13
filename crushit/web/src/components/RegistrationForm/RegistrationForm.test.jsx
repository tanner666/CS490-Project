import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import RegistrationForm from './RegistrationForm';
import { signUp } from 'src/auth';
import { navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { ThemeProvider } from '../ThemeContext/ThemeContext';

// Mocks
jest.mock('src/auth', () => ({
  signUp: jest.fn(),
}));
jest.mock('@redwoodjs/router', () => ({
  navigate: jest.fn(),
}));
jest.mock('@redwoodjs/web', () => ({
  useMutation: jest.fn(() => [jest.fn(), { data: {} }]),
}));

describe('RegistrationForm', () => {
  it('allows the user to enter email, password, and confirm password', () => {
    const { getByLabelText } = render(<ThemeProvider><RegistrationForm /></ThemeProvider>);

    const emailInput = getByLabelText(/email\/username/i);
    const passwordInput = getByLabelText(/password/i);
    const confirmPasswordInput = getByLabelText(/confirm password/i);

    fireEvent.change(emailInput, { target: { value: 'test79797@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'passwordpassword1' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'passwordpassword1' } });

    expect(emailInput.value).toBe('test79797@example.com');
    expect(passwordInput.value).toBe('passwordpassword1');
    expect(confirmPasswordInput.value).toBe('passwordpassword1');
  });

  it('shows error if passwords do not match', () => {
    const { getByText, getByRole, getByLabelText } = render(<ThemeProvider><RegistrationForm /></ThemeProvider>);

    fireEvent.change(getByLabelText(/email\/username/i), { target: { value: 'test79798@example.com' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'passwordpassword2' } });
    fireEvent.change(getByLabelText(/confirm password/i), { target: { value: 'passwordpassword1' } });
    fireEvent.click(getByRole('button', { name: /sign up/i }));

    expect(getByText(/passwords do not match/i)).toBeInTheDocument();
  });

  it('navigates to login page on successful registration', async () => {
    signUp.mockResolvedValue({ uid: '123' });

    const { getByLabelText, getByRole } = render(<ThemeProvider><RegistrationForm /></ThemeProvider>);

    fireEvent.change(getByLabelText(/email\/username/i), { target: { value: 'hammy59@gmail.com' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'passwordpassword1' } });
    fireEvent.change(getByLabelText(/confirm password/i), { target: { value: 'passwordpassword1' } });
    fireEvent.click(getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/');
    });
  });

  it('displays an error on registration failure', async () => {
    signUp.mockRejectedValue(new Error('Registration failed'));
  
    const { getByLabelText, getByRole } = render(<ThemeProvider><RegistrationForm /></ThemeProvider>);
  
    fireEvent.change(getByLabelText(/email\/username/i), { target: { value: 'jester' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'passwordpassword1' } });
    fireEvent.change(getByLabelText(/confirm password/i), { target: { value: 'passwordpassword1' } });
  
    fireEvent.click(getByRole('button', { name: /sign up/i }));
  
    await waitFor(() => {
      const errorMessage = screen.getByText(/Registration failed\. Please check your credentials\./i);
      expect(errorMessage).toBeInTheDocument();
    });
  });
  
});
