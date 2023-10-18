import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

export function authSignOut(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User registered:', user);
        })
        .catch((error) => {
            console.error(error.message, error.code);
            if (error.code === 'auth/email-already-in-use') {
              alert("This account already exists.");
            }
        });
}
