import React from 'react'

import Button from '../../components/Button/Button'
import Todo from '../../components/Todo/Todo'

import './todos.css'

export default function Todos() {
  return (
    <>
      <header className="todos_header">
        <h1 className="todos__title">MY TO-DOS</h1>
        <Button label="+ Add a todo" variant="primary" />
      </header>
      <div id="todo__container">
        <Todo />
      </div>
    </>
  )
}
