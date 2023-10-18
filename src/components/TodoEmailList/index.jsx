import React, { useState, useEffect } from 'react'
import './TodoEmailList.css'
import Button from '../Button/Button'
import { db } from '../../firebase/firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'

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
