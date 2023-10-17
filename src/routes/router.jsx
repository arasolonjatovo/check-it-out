import { createBrowserRouter } from 'react-router-dom'

import Root from './Root/Root'
import ErrorPage from './ErrorPage/ErrorPage'
import Auth from './Auth/Auth'

const routes = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
      }
    ]
  },
  {
    path: '/auth:id',
    element: <Auth />,
    errorElement: <ErrorPage />,
  }
]

export const router = createBrowserRouter(routes)
