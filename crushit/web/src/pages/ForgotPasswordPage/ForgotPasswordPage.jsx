import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import ForgotPasswordForm from 'src/components/ForgotPasswordForm/ForgotPasswordForm'

const ForgotPasswordPage = () => {
  return (
    <>
      <MetaTags title="ForgotPassword" description="ForgotPassword page" />
      <ForgotPasswordForm/>
    </>
  )
}

export default ForgotPasswordPage
