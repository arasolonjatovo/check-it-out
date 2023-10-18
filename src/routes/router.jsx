import { createBrowserRouter } from 'react-router-dom'
import privateRoute from './privateRoute'

import Root from './Root/Root'
import ErrorPage from './ErrorPage/ErrorPage'
import Auth from './Auth/Auth'
import Todos from './Todos/Todos'
import Tasks from './Tasks/Tasks'

const routes = [
  {
    path: '/signIn',
    element: <Auth />,
  },
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/todo',
        element: <Todos />,
      },
      {
        path: '/todo:id',
        element: <Tasks />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
