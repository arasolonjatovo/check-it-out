import React, { createContext, useState } from 'react'

export const UserContext = createContext()

function UserContextProvider(props) {
  const [userEmail, setUserEmail] = useState('')
  const [userID, setUserID] = useState('')

  return (
    <UserContext.Provider
      value={{ userEmail, setUserEmail, userID, setUserID }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
