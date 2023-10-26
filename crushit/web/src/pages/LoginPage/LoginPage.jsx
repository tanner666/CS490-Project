import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import LoginForm from '../../components/LoginForm/LoginForm';

const LoginPage = () => {
  return (
    <>
      <MetaTags title="Login" description="Login page" />

      <h1>LoginPage</h1>
      <LoginForm/>
    </>
  )
}

export default LoginPage
