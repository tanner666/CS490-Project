// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'

import { useAuth } from './auth'
import { useTheme } from './components/ThemeContext/ThemeContext';

const Routes = () => {
  return (
    <Router useAuth={useAuth} useTheme={useTheme}>
      <Route path="/resetpassword" page={ResetpasswordPage} name="resetpassword" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/settings" page={SettingsPage} name="settings" />
      <Route path="/registration" page={RegistrationPage} name="registration" />
      <Route path="/home" page={HomePage} name="home" />
      <Route path="/" page={LoginPage} name="login" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
