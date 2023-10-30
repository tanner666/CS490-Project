import React from 'react'

import { render, screen, waitFor, fireEvent } from '@redwoodjs/testing/web'

import { useAuth } from 'src/auth'

import RegistrationForm from './RegistrationForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

jest.mock('src/auth', () => ({
  useAuth: jest.fn(),
}))

describe('RegistrationForm', () => {
  it('allows a user to sign up', async () => {
    const signUpMock = jest.fn()
    useAuth.mockImplementation(() => ({
      signUp: signUpMock,
    }))

    const { getByLabelText, getByText } = render(<RegistrationForm />)

    // Simulate user input
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: 'password123' },
    })

    // Simulate button click
    fireEvent.click(getByText(/sign up/i))

    // Assertions
    await waitFor(() => {
      expect(signUpMock).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      })
    })

    // Optionally, test for navigation or success message if applicable
  })

  // Add more tests as needed...
  it('renders successfully', () => {
    expect(() => {
      render(<RegistrationForm />)
    }).not.toThrow()
  })
})
