import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { auth } from '../../firebase/firebase'
import { useNavigate } from 'react-router-dom'

import { UserContext } from '../../context/userContext'

import './header.css'

export default function Header() {
  const navigation = useNavigate()
  const { setUserEmail, setUserID } = useContext(UserContext)

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        setUserEmail('null')
        setUserID('null')
        navigation('/signIn')
      })
      .catch((error) => {
        console.error('Une erreur est survenue:', error)
      })
  }

  return (
    <header>
      <nav className="navbar">
        <p className="navbar__name">❐ Check-It-Out</p>
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/todo">MY TODOS</Link>
          </li>
          <li className="nav__item">
            <Link to="/signIn" onClick={logout}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
