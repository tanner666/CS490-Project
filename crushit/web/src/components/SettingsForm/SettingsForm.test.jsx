import { render } from '@redwoodjs/testing/web'
import { ThemeProvider } from '../ThemeContext/ThemeContext';


import SettingsForm from './SettingsForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SettingsForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <ThemeProvider>
          <SettingsForm userId={1}/>
        </ThemeProvider>
      )
    }).not.toThrow()
  })
})
