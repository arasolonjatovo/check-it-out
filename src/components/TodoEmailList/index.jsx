import React, { useState, useEffect } from 'react'
import './TodoEmailList.css'
import Button from '../Button/Button'
import { db } from '../firebase/firebase'
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'

export default function TodoEmailList() {
  const [newEmail, setNewEmail] = useState('')
  const [emails, setEmails] = useState([])

  const [todos, setTodos] = useState([])

  const fetchPost = async () => {
    const querySnapshot = await getDocs(collection(db, 'test'))
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    setTodos(newData)
  }

  useEffect(() => {
    fetchPost()
  }, [])

  const addEmail = async () => {
    if (newEmail) {
      const docRef = await addDoc(collection(db, 'test'), { email: newEmail })

      const newTodo = {
        email: newEmail,
        id: docRef.id,
      }
      setTodos([...todos, newTodo])

      setEmails([...emails, newEmail])
      setNewEmail('')

      console.log('Nouveau document ID :', docRef.id)
    }
  }
  const deleteEmail = async (id) => {
    try {
      await deleteDoc(doc(db, 'test', id))
      // Mettez à jour l'état local pour exclure l'e-mail supprimé
      const updatedTodos = todos.filter((todo) => todo.id !== id)
      setTodos(updatedTodos)
    } catch (error) {
      console.error("Erreur lors de la suppression de l'e-mail :", error)
    }
  }

  return (
    <div className="emailListContainer">
      <h2>Access to my to-do:</h2>
      <ul className="emailList">
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.email}{' '}
            <button
              className="deleteEmail"
              onClick={() => deleteEmail(todo.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
      <input
        type="email"
        placeholder="Enter the email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <Button variant="primary" label="ADD EMAIL" handleClick={addEmail} />
    </div>
  )
}
