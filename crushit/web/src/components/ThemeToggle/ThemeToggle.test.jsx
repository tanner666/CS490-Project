import { render } from '@redwoodjs/testing/web'
import { ThemeProvider } from '../ThemeContext/ThemeContext'
import ThemeToggle from './ThemeToggle'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ThemeToggle', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <ThemeProvider>
          <ThemeToggle />
          </ThemeProvider>
        )
    }).not.toThrow()
  })
})
