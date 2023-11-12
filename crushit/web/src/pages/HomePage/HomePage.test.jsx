// HomePage.test.jsx

import { render } from '@redwoodjs/testing/web'
import HomePage from './HomePage'

// Mock the ThemeContext module
jest.mock('../../components/ThemeContext/ThemeContext', () => ({
  useTheme: jest.fn(() => ({ theme: 'yourMockedTheme' })), // Replace 'yourMockedTheme' with your actual mocked theme
}))

describe('HomePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HomePage />)
    }).not.toThrow()
  })
})
