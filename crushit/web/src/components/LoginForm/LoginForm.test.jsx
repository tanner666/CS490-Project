import React from 'react'
import { render, screen, waitFor, fireEvent } from '@redwoodjs/testing/web'
import LoginForm from './LoginForm'
import {useAuth} from 'src/auth'
import { ThemeProvider } from '../ThemeContext/ThemeContext';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

jest.mock('src/auth', () => ({
  useAuth: jest.fn(),
}));


describe('LoginForm', () => {
  it('allows a user to sign in', async () => {
    const signInMock = jest.fn();
    useAuth.mockImplementation(() => ({
      signIn: signInMock,
    }));

    const { getByLabelText, getByText } = render(<ThemeProvider><LoginForm /></ThemeProvider>);

    // Simulate user input
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    // Simulate button click
    fireEvent.click(getByText(/sign in/i));

    // Assertions
    await waitFor(() => {
      expect(signInMock).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    // Optionally, test for navigation or success message if applicable
  });

  // Add more tests as needed...
  it('renders successfully', () => {
    expect(() => {
      render(<LoginForm />)
    }).not.toThrow()
  });
});