import { useRouteError, Link } from 'react-router-dom'
import './errorPage.css'

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <Link to="/todos">GO BACK TO HOME</Link>
    </div>
  )
}
