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
  // apiKey: "AIzaSyDRskK2aTlOQ6OwZjwCzykNAlnXNPMGuvE",
  // authDomain: "goonmarket-eb1f8.firebaseapp.com",
  // projectId: "goonmarket-eb1f8",
  // storageBucket: "goonmarket-eb1f8.appspot.com",
  // messagingSenderId: "362131737109",
  // appId: "1:362131737109:web:0f36a22199f39576515c1c",
  // measurementId: "G-NYBXE2MXFT"
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