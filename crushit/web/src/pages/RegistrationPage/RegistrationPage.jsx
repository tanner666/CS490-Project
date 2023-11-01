import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';


const RegistrationPage = () => {
  return (
    <>
      <MetaTags title="Registration" description="Registration page" />
      
      <div>
        <RegistrationForm/>
      </div>
    </>
  )
}

export default RegistrationPage
