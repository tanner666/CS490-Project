import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import RegistrationForm from './RegistrationForm'; // Adjust the path as needed
//import { useMutation } from '@redwoodjs/web';
import { ThemeProvider } from '../ThemeContext/ThemeContext';

jest.mock('@redwoodjs/web', () => {
  const actual = jest.requireActual('@redwoodjs/web');
  return {
    ...actual,
    useMutation: jest.fn().mockImplementation(() => [
      jest.fn(),
      { loading: false, error: null, data: null },
    ]),
  };
});
jest.mock('src/auth', () => ({
  signUp: jest.fn()
}));

jest.mock('../ThemeContext/ThemeContext', () => {
  return {
    ThemeProvider: ({ children }) => children,
    useTheme: () => ({
      theme: 'light',
    }),
  };
});


const setup = () => {
  const utils = render(<ThemeProvider><RegistrationForm /></ThemeProvider>);
  const emailInput = utils.getByLabelText('Email/username');
  const passwordInput = utils.getByLabelText('Password');
  const confirmPasswordInput = utils.getByLabelText('Confirm Password');
  const submitButton = utils.getByText('Sign Up');
  return {
    emailInput,
    passwordInput,
    confirmPasswordInput,
    submitButton,
    ...utils,
  };
};

test('it renders all form fields and allows input', () => {
  const { emailInput, passwordInput, confirmPasswordInput } = setup();

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'Password123!' } });

  expect(emailInput.value).toBe('test@example.com');
  expect(passwordInput.value).toBe('Password123!');
  expect(confirmPasswordInput.value).toBe('Password123!');
});

test('it shows error message when passwords do not match', () => {
  const { passwordInput, confirmPasswordInput, submitButton, getByText } = setup();

  fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'AnotherPass123!' } });
  fireEvent.click(submitButton);

  expect(getByText('Passwords do not match.')).toBeInTheDocument();
});

