import { createUserWithEmailAndPassword } from 'firebase/auth'

import { addDoc, collection } from 'firebase/firestore'

import { auth, db } from './firebase'

export function authSignOut(email, password) {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user
        console.log('User registered:', user)
        const userCollection = collection(db, 'user')
        const data = { email: email, ID: user.uid }

        const docRef = await addDoc(userCollection, data)
        console.log('user créé:', docRef)
        resolve(user)
      })
      .catch((error) => {
        console.error(error.message, error.code)
        if (error.code === 'auth/email-already-in-use') {
          alert('This account already exists.')
        } else {
          reject(error.message)
        }
      })
  })
}
