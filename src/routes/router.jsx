import { createBrowserRouter } from 'react-router-dom'

import Root from './Root/Root'
import ErrorPage from './ErrorPage/ErrorPage'

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
]

export const router = createBrowserRouter(routes)
