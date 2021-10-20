// Import the functions you need from the SDKs you need
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCg9d8b7B1-VIm28-or7PhaQzSx0jTlqFo",
  authDomain: "password-manager-12ed4.firebaseapp.com",
  projectId: "password-manager-12ed4",
  storageBucket: "password-manager-12ed4.appspot.com",
  messagingSenderId: "86616857981",
  appId: "1:86616857981:web:5ef431c034fcced5c1c014",
  measurementId: "G-CERM0PGBJ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);