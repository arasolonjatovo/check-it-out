import React from 'react'

// il faut changer les element par les elements de connexion ou d'inscription
export default function routes() {
  return [
    {
      path: '/signIn',
      element: <div>Se connecter</div>,
    },
    {
      path: '/signUp',
      element: <div>S'inscrire</div>,
    },
  ]
}
