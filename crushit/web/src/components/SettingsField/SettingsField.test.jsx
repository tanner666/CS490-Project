import { render } from '@redwoodjs/testing/web'

import SettingsField from './SettingsField'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SettingsField', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SettingsField />)
    }).not.toThrow()
  })
})
