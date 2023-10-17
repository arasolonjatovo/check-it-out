import React from 'react'

import './button.css'

export default function Button({ label, variant }) {
  return <button className={`button ${variant}`}>{label}</button>
}
