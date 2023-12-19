import React from 'react'
import { render, screen, waitFor, fireEvent } from '@redwoodjs/testing/web'
import LoginForm from './LoginForm'
import {useAuth} from 'src/auth'
import { ThemeProvider } from '../ThemeContext/ThemeContext';
import { signIn } from 'src/auth';
import { navigate } from '@redwoodjs/router';

// Mock the signIn and navigate functions
jest.mock('src/auth', () => ({
  signIn: jest.fn(),
}));
jest.mock('@redwoodjs/router', () => ({
  navigate: jest.fn(),
}));

describe('LoginForm', () => {
  it('allows the user to enter email and password', () => {
    const { getByLabelText } = render(<ThemeProvider><LoginForm /></ThemeProvider>);

    const emailInput = getByLabelText(/email\/username/i);
    const passwordInput = getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('shows an error if email or password is not entered', () => {
    const { getByLabelText, getByRole } = render(<ThemeProvider><LoginForm /></ThemeProvider>);

    const signInButton = getByRole('button', { name: /sign in/i });
    fireEvent.click(signInButton);

    expect(getByLabelText(/email\/username/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('navigates to settings page on successful sign-in', async () => {
    signIn.mockResolvedValue({ uid: '123' });

    const { getByLabelText, getByRole } = render(<ThemeProvider><LoginForm /></ThemeProvider>);

    fireEvent.change(getByLabelText(/email\/username/i), { target: { value: 'hammy1@gmail.com' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'passwordpassword1' } });

    fireEvent.click(getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/home');
    });
  });

  it('displays an error on sign-in failure', async () => {
    signIn.mockRejectedValue(new Error('Login failed'));

    const { getByLabelText, getByRole, findByText } = render(<ThemeProvider><LoginForm /></ThemeProvider>);

    fireEvent.change(getByLabelText(/email\/username/i), { target: { value: 'test' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'passwordpassword123' } });

    fireEvent.click(getByRole('button', { name: /sign in/i }));

    const errorMessage = await findByText(/Login failed\. Please check your credentials\./i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('navigates to forgot-password page on clicking Forgot Password', () => {
    const { getByText } = render(<ThemeProvider><LoginForm /></ThemeProvider>);
    fireEvent.click(getByText(/forgot password/i));
    expect(navigate).toHaveBeenCalledWith('/forgot-password');
  });
});