import { createBrowserRouter } from 'react-router-dom'

import Root from './Root/Root'
import Todos from './Todos/Todos'
import ErrorPage from './ErrorPage/ErrorPage'

const routes = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/todos',
        element: <Todos />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
