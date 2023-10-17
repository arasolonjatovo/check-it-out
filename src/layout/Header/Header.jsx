import React from 'react'
import { Link } from 'react-router-dom'

import './header.css'

export default function Header() {
  return (
    <header>
      <nav className="navbar">
        <p className="navbar__name">❐ Check-It-Out</p>
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/todos">MY TODOS</Link>
          </li>
          <li className="nav__item">
            <Link to="/">Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
