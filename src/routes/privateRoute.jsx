import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserContext } from '../context/userContext'

export default function PrivateRoute(props) {
  const { userID } = useContext(UserContext)
  const navigation = useNavigate()

  useEffect(() => {
    //if the userID isn't as its default state it means that the user is connected
    if (userID === 'null') navigation('/signIn')
  }, [userID, navigation])

  return <>{props.children}</>
}
