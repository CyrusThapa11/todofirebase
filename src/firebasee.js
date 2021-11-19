// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// import firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyCZhwPx_iPPBuRwKZ9UvD6obbOgyiaY6AI',
  authDomain: 'todo1-ed71e.firebaseapp.com',
  projectId: 'todo1-ed71e',
  storageBucket: 'todo1-ed71e.appspot.com',
  messagingSenderId: '409054214275',
  appId: '1:409054214275:web:c5088713eabeaecdac03b6',
  measurementId: 'G-QNYQCZ3XS7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;
