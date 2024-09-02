<script>
// Import Firebase and Firestore
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

// Correct the import path for the logo image using a relative path
import logo from '../assets/logo.png'; // Assuming this is the correct relative path

export default {
  data() {
    return {
      parentEmail: '',
      parentPassword: '',
      logo, // Set the imported logo to a data property
    };
  },
  methods: {
    async handleParentRegister() {
      try {
        // Register parent with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, this.parentEmail, this.parentPassword);
        alert('Parent registered successfully. Child’s account is now activated.');

        // Activate child’s account in Firestore
        const childDocRef = doc(db, 'users', 'childUserId'); // Replace with actual child user ID
        await updateDoc(childDocRef, {
          status: 'active'
        });
      } catch (error) {
        console.error(error);
        alert('Parent registration failed. Please try again.');
      }
    }
  }
};
</script>

<template>
  <div class="container">
    <div class="forms-container">
      <div class="parent-register">
        <h2 class="title">Parent Registration</h2>
        <form @submit.prevent="handleParentRegister">
          <div class="input-field">
            <i class="fas fa-envelope"></i>
            <input type="email" v-model="parentEmail" placeholder="Parent's Email" required />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input type="password" v-model="parentPassword" placeholder="Password" required />
          </div>
          <input type="submit" class="btn" value="Register as Parent" />
        </form>
      </div>
    </div>

    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>Register as a Parent</h3>
          <p>
            As a parent, you have the ability to approve your child's registration and ensure a safe and secure experience on our platform.
          </p>
        </div>
        <!-- Correctly use the imported logo -->
        <img :src="logo" class="image" alt="Register as Parent" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Reuse styles from your existing authentication views to maintain consistency */

.container {
  position: relative;
  width: 100%;
  background-color: #fff;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.forms-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.parent-register {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
}

.title {
  font-size: 2rem;
  color: #444;
  margin-bottom: 20px;
}

.input-field {
  max-width: 380px;
  width: 100%;
  background-color: #f0f0f0;
  margin: 10px 0;
  height: 55px;
  border-radius: 55px;
  display: grid;
  grid-template-columns: 15% 85%;
  padding: 0 0.4rem;
  position: relative;
}

.input-field i {
  text-align: center;
  line-height: 55px;
  color: #000000;
  transition: 0.5s;
  font-size: 1.1rem;
  padding-left: 20px;
}

.input-field input {
  background: none;
  outline: none;
  border: none;
  line-height: 1;
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
  padding-left: 10px; /* Ensure placeholder alignment */
}

.input-field input::placeholder {
  color: #aaa;
  font-weight: 500;
}

.btn {
  width: 150px;
  background-color: #5995fd;
  border: none;
  outline: none;
  height: 49px;
  border-radius: 49px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  margin: 20px 0;
  cursor: pointer;
  transition: 0.5s;
}

.btn:hover {
  background-color: #4d84e2;
}

.panels-container {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  z-index: 1;
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  z-index: 6;
}

.left-panel {
  pointer-events: all;
  align-items: flex-start;
  padding: 3rem 17% 2rem 12%;
}

.image {
  width: 70%;
  transition: transform 1.1s ease-in-out;
  transition-delay: 0.4s;
}
</style>
