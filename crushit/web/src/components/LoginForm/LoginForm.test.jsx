import React from 'react'
import { render, screen, waitFor, fireEvent } from '@redwoodjs/testing/web'
import LoginForm from './LoginForm'
import {useAuth} from 'src/auth'
import { ThemeProvider } from '../ThemeContext/ThemeContext';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

jest.mock('src/auth', () => {
  return {
    useAuth: () => ({
      signIn: jest.fn(),
      // include other functions or properties that useAuth returns, if any
    }),
  };
});


describe('LoginForm', () => {
  it('allows a user to sign in', async () => {
    const signInMock = jest.fn(() => Promise.resolve({ uid: '123' }));

    // Now, you directly set the mock return value of signIn
    useAuth().signIn.mockReturnValue(signInMock());

    const { getByLabelText, getByText, findByText } = render(<ThemeProvider><LoginForm /></ThemeProvider>);

    fireEvent.change(getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    const submitButton = getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(signInMock).toHaveBeenCalledWith('test@example.com', 'password123');
    });

    // Check for success message
    expect(await findByText('Login successful!')).toBeInTheDocument();
  });

  it('shows error message on invalid credentials', async () => {
    const signInMock = jest.fn(() => Promise.reject(new Error('Invalid credentials')));
    useAuth().signIn.mockReturnValue(signInMock());
    
    const { getByLabelText, getByText, findByText } = render(<ThemeProvider><LoginForm /></ThemeProvider>);

    // ... similar steps to simulate user input

    const submitButton = getByText('Sign In');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(signInMock).toHaveBeenCalledWith('test@example.com', 'password123');
    });

    // Check for error message
    expect(await findByText('Login failed. Please check your credentials.')).toBeInTheDocument();
  });

  // Additional tests for form validation, empty fields, etc.

  it('renders successfully', () => {
    expect(() => {
      render(<LoginForm />)
    }).not.toThrow()
  });
});
