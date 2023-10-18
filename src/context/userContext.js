import React, { createContext, useState, useEffect } from 'react'

export const UserContext = createContext()

function UserContextProvider(props) {
  
  //retrieve value in local storage if exists or set it at null
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'))
  const [userID, setUserID] = useState(localStorage.getItem('userID'))

  // update localStorage every time the state is update

  useEffect(() => {
    localStorage.setItem('userEmail', userEmail)
  }, [userEmail])

  useEffect(() => {
    localStorage.setItem('userID', userID)
  }, [userID])

  return (
    <UserContext.Provider
      value={{ userEmail, setUserEmail, userID, setUserID }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
