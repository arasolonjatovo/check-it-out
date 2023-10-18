import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

export function authSignIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User logged in:', user);
        })
        .catch((error) => {
            console.error(error.message, error.code);
        });
}
