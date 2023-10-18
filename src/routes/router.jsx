import { createBrowserRouter } from 'react-router-dom'

import PrivateRoute from './privateRoute'

import Root from './Root/Root'
import ErrorPage from './ErrorPage/ErrorPage'
import Auth from './Auth/Auth'
import Todos from './Todos/Todos'
import Tasks from './Tasks/Tasks'

const routes = [
  {
    path: '/',
    element: <Auth />,
  },
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/todo',
        element: (
          <PrivateRoute>
            <Todos />
          </PrivateRoute>
        ),
      },
      {
        path: '/todo/:id',
        element: (
          <PrivateRoute>
            <Tasks />
          </PrivateRoute>
        ),
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
