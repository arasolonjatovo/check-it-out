import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PrivateRoute(props) {
  const [login, setLogin] = useState(false)
  const navigation = useNavigate()

  useEffect(() => {
    if (!login) navigation('/signIn')
  }, [login])

  return <>{props.children}</>
}
