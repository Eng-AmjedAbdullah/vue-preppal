<template>
  <header id="header" class="header d-flex align-items-center fixed-top">
    <div class="container-fluid d-flex align-items-center justify-content-between">
      <router-link to="/" class="logo d-flex align-items-center me-auto me-lg-0">
        <img :src="logo" alt="Logo" width="50" height="50" />
        <h1>PrepPal</h1>
      </router-link>

      <nav id="navbar" class="navbar">
        <ul>
          <li><router-link to="/" class="active">Home</router-link></li>
          <li class="dropdown">
            <a href="#"><span>Educational Modules</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
            <ul>
              <li><a href="#">Nature</a></li>
              <li class="dropdown">
                <a href="#"><span>Sub Menu</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
                <ul>
                  <li><a href="#">Sub Menu 1</a></li>
                  <li><a href="#">Sub Menu 2</a></li>
                  <li><a href="#">Sub Menu 3</a></li>
                </ul>
              </li>
            </ul>
          </li>
          <li><router-link to="/services">Services</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
          <li><router-link to="/about">About</router-link></li>
          <li v-if="isLoggedIn" class="dropdown">
            <a href="#"><img :src="userImage" class="profile-image" /> {{ username }} <i class="bi bi-chevron-down dropdown-indicator"></i></a>
            <ul>
              <li><router-link to="/profile">Edit Profile</router-link></li>
              <li><a href="#" @click.prevent="logout">Logout</a></li>
            </ul>
          </li>
          <li v-else><router-link to="/login">Login</router-link></li>
        </ul>
      </nav>

      <div class="header-social-links">
        <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
        <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
        <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
        <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
      </div>

      <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
      <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import logo from '../assets/logo.png';

const isLoggedIn = ref(false); // Placeholder for auth state
const username = ref('John Doe'); // Placeholder username
const userImage = ref('https://via.placeholder.com/50'); // Placeholder image

function logout() {
  isLoggedIn.value = false;
  localStorage.removeItem('userToken'); // Clear token or handle session logic
}

onMounted(() => {
  // Check user authentication status
  isLoggedIn.value = !!localStorage.getItem('userToken'); // Example check
});
</script>

<style scoped>
.header {
  transition: all 0.5s;
  z-index: 997;
  padding: 30px 0;
  background-color: #000;
}

.profile-image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
