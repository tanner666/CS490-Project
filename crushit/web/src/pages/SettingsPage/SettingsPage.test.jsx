import { render } from '@redwoodjs/testing/web'
import { ThemeProvider } from 'src/components/ThemeContext/ThemeContext'

import SettingsPage from './SettingsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SettingsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <ThemeProvider>
          <SettingsPage />
          </ThemeProvider>
        )
    }).not.toThrow()
  })
})