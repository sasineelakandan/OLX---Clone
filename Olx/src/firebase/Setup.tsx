

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import {getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAeNGc9b_A9bu3jZ0tr_VrH97UBNjEgPk4",
  authDomain: "olx-clone-948fd.firebaseapp.com",
  projectId: "olx-clone-948fd",
  storageBucket: "olx-clone-948fd.appspot.com",
  messagingSenderId: "895436262730",
  appId: "1:895436262730:web:3b064caacd2b55413b05b3",
  measurementId: "G-L48TSKS6YN"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider= new GoogleAuthProvider()