import React from 'react'

import Button from '../../components/Button/Button'
import Todo from '../../components/Todo/Todo'

import './todos.css'

import { addDoc, doc, setDoc, collection } from 'firebase/firestore'
import { db, auth } from '../../firebase/firebase'
import { v4 as uuidv4 } from 'uuid'

export default function Todos() {
  const handleAddTodo = async () => {
    const TodoId = uuidv4() // Générez un nouvel ID pour chaque tâche

    const todoData = {
      // Autres données de tâche
    }

    try {
      // Utilisez doc() pour spécifier le nom du document comme l'ID de la tâche
      await setDoc(doc(db, 'Todos', TodoId), todoData)
      console.log('Tâche ajoutée avec succès')
    } catch (error) {
      console.log("Erreur lors de l'ajout de la tâche")
    }
  }

  return (
    <>
      <header className="todos_header">
        <h1 className="todos__title">MES TÂCHES À FAIRE</h1>
        <Button
          handleClick={handleAddTodo}
          label="+ Ajouter une tâche"
          variant="primary"
        />
      </header>
      <div id="todo__container">
        <Todo />
        <Todo />
        <Todo />
        <Todo />
      </div>
    </>
  )
}
