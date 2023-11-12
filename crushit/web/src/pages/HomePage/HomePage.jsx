import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import DateNavigation from '../../components/DateNavigation/DateNavigation';

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <div>
        <DateNavigation/>
      </div>
    </>
  )
}

export default HomePage
