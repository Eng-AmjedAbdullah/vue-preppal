// src/firebase.js

// Import necessary Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';  // Import Firebase Storage

// Firebase configuration object (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyBb2fTjtHyL-UHq4fYhIwGQb4RfejPQsc4",
  authDomain: "vue-preppal.firebaseapp.com",
  projectId: "vue-preppal",
  storageBucket: "vue-preppal.appspot.com",
  messagingSenderId: "142142137057",
  appId: "1:142142137057:web:b2d5eb254db31720740da0"
};

// Initialize Firebase app instance
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);  // Firebase Authentication
const db = getFirestore(app);  // Firestore (NoSQL database)
const storage = getStorage(app);  // Firebase Storage for file uploads

// Initialize authentication providers (for OAuth logins)
const googleProvider = new GoogleAuthProvider();  // Google login provider
const facebookProvider = new FacebookAuthProvider();  // Facebook login provider
const appleProvider = new OAuthProvider('apple.com');  // Apple login provider

// Export Firebase modules and providers for use throughout the app
export { auth, db, storage, googleProvider, facebookProvider, appleProvider };
