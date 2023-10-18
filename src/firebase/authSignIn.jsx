import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase'

export function authSignIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
      console.log('User logged in:', user)
      return user
    })
    .catch((error) => {
      console.error(error.message, error.code)
      if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        throw new Error('Invalid email or password. Please try again.')
      } else {
        throw error
      }
    })
}
