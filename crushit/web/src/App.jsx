import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import { AuthProvider, useAuth } from './auth'
import {ThemeProvider} from './components/ThemeContext/ThemeContext'

import './index.css'

const App = () => (
  <RedwoodApolloProvider>
      <FatalErrorBoundary page={FatalErrorPage}>
        <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
          <AuthProvider>
            <RedwoodApolloProvider useAuth={useAuth}>
            <ThemeProvider>
              <Routes />
              </ThemeProvider>
            </RedwoodApolloProvider>
          </AuthProvider>
        </RedwoodProvider>
      </FatalErrorBoundary>
  </RedwoodApolloProvider>
)

export default App
