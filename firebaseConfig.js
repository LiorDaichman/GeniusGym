import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAuDKEk8g1qO2R4wbihTQIgzNVuRFx4ftI",
    authDomain: "geniusgymapp.firebaseapp.com",
    projectId: "geniusgymapp",
    storageBucket: "geniusgymapp.appspot.com",
    messagingSenderId: "288692898815",
    appId: "1:288692898815:web:1e449b9a8fe40289ebf5ca",
    measurementId: "G-YPHYB41JCX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };