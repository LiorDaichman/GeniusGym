import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logOut = () => {
  return signOut(auth);
};

export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};