import { render, fireEvent, screen } from '@redwoodjs/testing/web'
import ResetPasswordForm from './ResetPasswordForm'

describe('ResetPasswordForm', () => {
  it('renders successfully', () => {
    render(<ResetPasswordForm />)
    expect(screen.getByText('Reset Password?')).toBeInTheDocument()
  })

  it('allows entering a password', () => {
    render(<ResetPasswordForm />)

    const passwordInput = screen.getByPlaceholderText('New Password')
    fireEvent.change(passwordInput, { target: { value: 'myNewPassword123!' } })

    expect(passwordInput.value).toBe('myNewPassword123!')
  })

  it('allows entering a confirmation password', () => {
    render(<ResetPasswordForm />)

    const confirmPasswordInput = screen.getByPlaceholderText('Confirm New Password')
    fireEvent.change(confirmPasswordInput, { target: { value: 'myNewPassword123!' } })

    expect(confirmPasswordInput.value).toBe('myNewPassword123!')
  })

  it('shows error message if passwords do not match', async () => {
    render(<ResetPasswordForm />)

    const passwordInput = screen.getByPlaceholderText('New Password')
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm New Password')
    const submitButton = screen.getByText('Submit')

    fireEvent.change(passwordInput, { target: { value: 'Password1' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password2' } })
    fireEvent.click(submitButton)

    expect(await screen.findByText('Passwords do not match')).toBeInTheDocument()
  })
})
