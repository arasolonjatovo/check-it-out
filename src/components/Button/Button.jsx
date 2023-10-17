import React from 'react'

import './button.css'

export default function Button({ label, variant, handleClick }) {
  return (
    <button className={`button ${variant}`} onClick={handleClick}>
      {label}
    </button>
  )
}
