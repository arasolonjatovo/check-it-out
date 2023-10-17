import React from 'react'

import Button from '../../components/Button/Button'

import './todos.css'

export default function Todos() {
  return (
    <>
      <header className='todos__container'>
        <h1 className='todos__title'>MY TO-DOS</h1>
        <Button label="+ Add a todo" variant="primary" />
      </header>
    </>
  )
}
