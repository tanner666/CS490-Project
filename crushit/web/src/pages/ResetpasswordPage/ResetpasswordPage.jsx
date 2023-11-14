import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import ResetPasswordForm from 'src/components/ResetPasswordForm/ResetPasswordForm'

const ResetpasswordPage = () => {
  return (
    <>
      <MetaTags title="Resetpassword" description="Resetpassword page" />
      <ResetPasswordForm/>
    </>
  )
}

export default ResetpasswordPage
