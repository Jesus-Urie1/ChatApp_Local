import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCIg5piZMovoPS_8Ee--q2n8P88YzhPjmw",
    authDomain: "chatapp-9fc1c.firebaseapp.com",
    databaseURL: "https://chatapp-9fc1c-default-rtdb.firebaseio.com",
    projectId: "chatapp-9fc1c",
    storageBucket: "chatapp-9fc1c.appspot.com",
    messagingSenderId: "678850495144",
    appId: "1:678850495144:web:64286c23993913a218b89d"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
export const db = getDatabase(app);