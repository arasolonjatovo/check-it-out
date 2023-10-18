import React from 'react'
import Auth from './Auth/Auth'

// il faut changer les element par les elements de connexion ou d'inscription
export default function routes() {
  return [
    {
      path: '/signIn',
      element: <Auth />,
    },
    {
      path: '/signUp',
      element: <Auth />,
    },
  ]
}
