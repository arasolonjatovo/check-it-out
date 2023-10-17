import { createBrowserRouter } from 'react-router-dom'

import Root from './Root/Root'
import ErrorPage from './ErrorPage/ErrorPage'
import Tasks from './Tasks/'

const routes = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
      },
      {
        path: '/tasks:id',
        element: <Tasks />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes)