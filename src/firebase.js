// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } from 'firebase/auth'; // Import providers
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Optional: if you plan to use Firebase Storage

const firebaseConfig = {
    apiKey: "AIzaSyBb2fTjtHyL-UHq4fYhIwGQb4RfejPQsc4",
    authDomain: "vue-preppal.firebaseapp.com",
    projectId: "vue-preppal",
    storageBucket: "vue-preppal.appspot.com",
    messagingSenderId: "142142137057",
    appId: "1:142142137057:web:b2d5eb254db31720740da0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
const db = getFirestore(app);

// Optionally, initialize Firebase Storage
const storage = getStorage(app);

// Initialize authentication providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const appleProvider = new OAuthProvider('apple.com'); // Apple OAuth provider

export { auth, db, storage, googleProvider, facebookProvider, appleProvider };
