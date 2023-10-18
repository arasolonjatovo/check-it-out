import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import privateRoute from './privateRoute'
import routes from './routes'

const isLogin = true

export default function App() {
  const router = createBrowserRouter([
    isLogin ? privateRoute() : {},
    ...routes(),
  ])
  return <RouterProvider router={router} />
}
