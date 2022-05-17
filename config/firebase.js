import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAqMeyhtR55cfj1Bp_uUfq54vWZm8JIrRE",
    authDomain: "myapp-42975.firebaseapp.com",
    databaseURL: "https://myapp-42975-default-rtdb.firebaseio.com",
    projectId: "myapp-42975",
    storageBucket: "myapp-42975.appspot.com",
    messagingSenderId: "806152517783",
    appId: "1:806152517783:web:7bf6cb77c5dc29588cd1d2"
  };


const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
export const db = getDatabase(app);