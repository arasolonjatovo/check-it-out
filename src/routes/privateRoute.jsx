import React from 'react'

import Root from './Root/Root'
import Todos from './Todos/Todos'
import Tasks from './Tasks'
import ErrorPage from './ErrorPage/ErrorPage'

export default function privateRoute() {
  return {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Todos />,
      },
      {
        path: '/todo:id',
        element: <Tasks />,
      },
    ],
  }
}
