import React, { useState, useEffect } from 'react'
import './TodoEmailList.css'
import Button from '../Button/Button'
import { db } from '../../firebase/firebase'
import {
  collection,
  getDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from 'firebase/firestore'
import { useParams } from 'react-router-dom'

export default function TodoEmailList({ mails }) {
  const [newEmail, setNewEmail] = useState('')
  const [emails, setEmails] = useState([])
  const { id } = useParams()

  const [todos, setTodos] = useState([])

  const addEmail = async () => {
    const userQuery = query(
      collection(db, 'user'),
      where('email', '==', newEmail)
    )

    const querySnapshot = await getDocs(userQuery)

    if (querySnapshot.empty) {
      // Handle the case where no documents match the query.
      return
    }

    // Assuming there's only one matching document, you can access it like this.
    const userDoc = querySnapshot.docs[0]

    setNewEmail('')

    const myMail = {
      ID: userDoc.data().ID,
      email: newEmail,
    }

    const myNewMails = mails.slice() // Create a copy of the array
    myNewMails.push(myMail)
    setEmails(myNewMails)

    const docRef = doc(db, 'todo', id)
    await updateDoc(docRef, { user: myNewMails })
  }

  return (
    <div className="emailListContainer">
      <h2>See who has access to my to do 👀 :</h2>
      <ul className="emailList">
        {mails.map((mail, index) => (
          <li key={index}>{mail.email}</li>
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
