import React from 'react'

import './todo.css'

export default function Todo({ handleClick, index }) {
  return (
    <article className="todo__container" onClick={handleClick}>
      <h2 className="todo__title">TODO {index}</h2>
    </article>
  )
}
