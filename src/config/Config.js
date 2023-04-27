// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore'
 import 'firebase/storage'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJINkKd-P7fdg-ApDk1rWaoFg3NR427Ic",
  authDomain: "testmarket-bfdcf.firebaseapp.com",
  projectId: "testmarket-bfdcf",
  storageBucket: "testmarket-bfdcf.appspot.com",
  messagingSenderId: "647476652553",
  appId: "1:647476652553:web:123bfaefbaca1c4aec26d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth()
// createUserWithEmailAndPassword(auth, email, password)
const db = getFirestore()
const storage = getStorage()

export { app, auth, db, storage }