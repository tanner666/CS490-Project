import { render } from '@redwoodjs/testing/web'
import { ThemeProvider } from '../ThemeContext/ThemeContext'

import PlanDay from './PlanDay'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PlanDay', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ThemeProvider><PlanDay /></ThemeProvider>)
    }).not.toThrow()
  })
})
