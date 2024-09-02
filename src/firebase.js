// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBb2fTjtHyL-UHq4fYhIwGQb4RfejPQsc4",
    authDomain: "vue-preppal.firebaseapp.com",
    projectId: "vue-preppal",
    storageBucket: "vue-preppal.appspot.com",
    messagingSenderId: "142142137057",
    appId: "1:142142137057:web:b2d5eb254db31720740da0"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  export { auth, db };
