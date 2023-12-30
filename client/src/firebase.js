// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-48fdb.firebaseapp.com",
  projectId: "mern-auth-48fdb",
  storageBucket: "mern-auth-48fdb.appspot.com",
  messagingSenderId: "976264533746",
  appId: "1:976264533746:web:3d4c7532872b9124e5226b"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);
