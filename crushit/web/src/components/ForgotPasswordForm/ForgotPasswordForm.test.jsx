import { render, screen } from '@testing-library/react';
import ForgotPasswordForm from './ForgotPasswordForm';

test('renders ForgotPasswordForm', () => {
  render(<ForgotPasswordForm />);
  const formElement = screen.getByText(/Forgot Password?/i);
  expect(formElement).toBeInTheDocument();
});
