import React, { useState, useEffect } from 'react'
import './TodoEmailList.css'
import Button from '../Button/Button'
import { db } from '../../firebase/firebase'
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore'
import { useParams } from 'react-router-dom'

export default function TodoEmailList() {
  const [newEmail, setNewEmail] = useState('')
  const [emails, setEmails] = useState([])
  const { id } = useParams()

  const [todos, setTodos] = useState([])

  const fetchPost = async () => {
    // Créez une requête pour filtrer les documents de la sous-collection "user" de la collection "todo" par ID
    const userQuery = query(collection(db, 'todo', id, 'user'))

    const querySnapshot = await getDocs(userQuery)
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    setTodos(newData)
  }

  useEffect(() => {
    fetchPost()
  }, [id])

  const addEmail = async () => {
    if (newEmail) {
      // Ajoutez un nouvel e-mail à la sous-collection "user" de la collection "todo" spécifique (utilisez l'ID)
      const docRef = await addDoc(collection(db, 'todo', id, 'user'), {
        email: newEmail,
      })

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

  return (
    <div className="emailListContainer">
      <h2>Access to my to-do:</h2>
      <ul className="emailList">
        {todos.map((todo, index) => (
          <li key={index}>{todo.email}</li>
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
