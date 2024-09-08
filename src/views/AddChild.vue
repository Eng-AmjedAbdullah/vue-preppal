<!-- src/views/AddChild.vue -->
<template>
    <div class="container">
      <h2>Add Child</h2>
      <form @submit.prevent="addChild">
        <div class="form-group">
          <label for="name">Child's Name</label>
          <input type="text" id="name" v-model="childData.name" required />
        </div>
  
        <div class="form-group">
          <label for="age">Child's Age</label>
          <input type="number" id="age" v-model="childData.age" required min="1" />
        </div>
  
        <div class="form-group">
          <label for="email">Child's Email</label>
          <input type="email" id="email" v-model="childData.email" required />
        </div>
  
        <button type="submit" class="btn">Add Child</button>
      </form>
    </div>
  </template>
  
  <script>
  import { collection, addDoc } from 'firebase/firestore';
  import { auth, db } from '../firebase';  // Import Firebase resources
  
  export default {
    name: "AddChild",
    data() {
      return {
        childData: {
          name: '',
          age: '',
          email: ''
        }
      };
    },
    methods: {
      async addChild() {
        try {
          const childrenRef = collection(db, `users/${auth.currentUser.uid}/children`);
          await addDoc(childrenRef, {
            name: this.childData.name,
            age: this.childData.age,
            email: this.childData.email,
            parentId: auth.currentUser.uid,
            registrationDate: new Date().toISOString(),
            status: 'Active'
          });
  
          alert('Child added successfully!');
        } catch (error) {
          console.error('Error adding child:', error);
          alert('Failed to add child. Please try again.');
        }
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
  