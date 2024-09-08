<!-- src/views/EditProfile.vue -->
<template>
    <div class="container">
      <h2>Edit Profile</h2>
      <form @submit.prevent="updateProfile">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="parentData.username" required />
        </div>
  
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="parentData.email" required />
        </div>
  
        <div class="form-group">
          <label for="avatar">Avatar</label>
          <input type="file" @change="handleAvatarUpload" />
          <img :src="parentData.avatar || placeholderAvatar" alt="Profile Image" width="100" />
        </div>
  
        <button type="submit" class="btn">Update Profile</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
  import { doc, getDoc, updateDoc } from 'firebase/firestore';
  import { auth, db, storage } from '../firebase';  // Import Firebase resources
  
  export default {
    name: "EditProfile",
    data() {
      return {
        parentData: {
          username: '',
          email: '',
          avatar: ''
        },
        avatarFile: null,
        placeholderAvatar: 'https://via.placeholder.com/150'
      };
    },
    async created() {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        this.parentData = userDoc.data();
      }
    },
    methods: {
      async handleAvatarUpload(event) {
        this.avatarFile = event.target.files[0];
      },
      async updateProfile() {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
  
        // If user has uploaded a new avatar, upload it to Firebase Storage
        if (this.avatarFile) {
          const avatarRef = ref(storage, `avatars/${auth.currentUser.uid}`);
          await uploadBytes(avatarRef, this.avatarFile);
          const avatarUrl = await getDownloadURL(avatarRef);
          this.parentData.avatar = avatarUrl;
        }
  
        // Update the user's data in Firestore
        await updateDoc(userDocRef, {
          username: this.parentData.username,
          email: this.parentData.email,
          avatar: this.parentData.avatar
        });
  
        alert('Profile updated successfully!');
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  .form-group {
    margin-bottom: 20px;
  }
  .btn {
    background-color: #5995fd;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }
  </style>
  