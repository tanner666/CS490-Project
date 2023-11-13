import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import ToDoAndAppts from 'src/components/ToDoAndAppts/ToDoAndAppts';

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <div>
        <ToDoAndAppts/>
      </div>
    </>
  )
}

export default HomePage
