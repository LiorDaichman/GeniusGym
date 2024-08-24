import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "Your apiKey",
    authDomain: "Your authDomain",
    projectId: "Your projectId",
    storageBucket: "Your storageBucket",
    messagingSenderId: "Your messagingSenderId",
    appId: "Your appId",
    measurementId: "Your measurementId"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
