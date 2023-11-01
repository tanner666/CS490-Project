import { render } from '@redwoodjs/testing/web'
import { ThemeProvider } from '../ThemeContext/ThemeContext'

import SettingsField from './SettingsField'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SettingsField', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <ThemeProvider>
          <SettingsField />
          </ThemeProvider>
        )
    }).not.toThrow()
  })
})
