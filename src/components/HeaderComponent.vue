<template>
  <header id="header"  class="header d-flex align-items-center fixed-top">
    <div class="container-fluid d-flex align-items-center justify-content-between">
      <router-link to="/" class="logo d-flex align-items-center me-auto me-lg-0">
        <img :src="logo" alt="Logo" width="50" height="50" />
        <h1>PrepPal</h1>
      </router-link>

      <!-- Desktop Navigation -->
      <nav id="navbar" class="navbar d-none d-lg-flex">
        <ul>
          <li><router-link to="/" class="active">Home</router-link></li>
          <li><router-link to="/games">Games</router-link></li>
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
          <li v-else><router-link to="/auth">Login</router-link></li>
        </ul>
      </nav>

      <!-- Mobile Hamburger Button -->
      <i class="mobile-nav-toggle bi bi-list" @click="toggleMobileMenu" v-if="!isSidebarOpen"></i>
      <i class="mobile-nav-toggle bi bi-x" @click="toggleMobileMenu" v-if="isSidebarOpen"></i>

      <!-- Sidebar Navigation for Mobile -->
      <nav id="sidebar" class="navbar sidebar" :class="{ 'open': isSidebarOpen }">
        <ul>
          <li><router-link to="/" class="active">Home</router-link></li>
          <li><router-link to="/games" >Games</router-link></li>
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
          <li v-else><router-link to="/auth">Login</router-link></li>
        </ul>
        <div class="header-social-links ">
          <a href="#" class="twitter"><i class="bi bi-twitter-x"></i></a>
          <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
          <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
        </div>
      </nav>

      <!-- Desktop Social Links (Optional) -->
      <div class="header-social-links ">
        <a href="#" class="twitter"><i class="bi bi-twitter-x"></i></a>
        <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
        <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
        
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import logo from '../assets/logo.png';

const isLoggedIn = ref(false); // Placeholder for auth state
const username = ref('hayaa'); // Placeholder username
const userImage = ref('https://via.placeholder.com/50'); // Placeholder image
const isSidebarOpen = ref(false); // State to control sidebar visibility

function toggleMobileMenu() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

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
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.05) ;
  border-bottom: 1px solid rgba(255, 255, 255, .15);
}

.navbar {
  display: flex;
  align-items: center;
}

.sidebar {
  display: none; /* Hide sidebar by default */
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  z-index: 998;
  overflow-y: auto;
}

.sidebar.open {
  display: flex; /* Show sidebar when open */
  transform: translateX(0);
}

.mobile-nav-toggle {
  font-size: 28px;
  cursor: pointer;
  color: #fff;
  display: none; /* Hide toggle button by default */
}

.profile-image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.header-social-links a {
  color: #333;
  margin-left: 10px;
  font-size: 18px;
  transition: color 0.3s;
}

.header-social-links a:hover {
  color: #27a776!important;
}

@media (max-width: 992px) {
  .navbar {
    display: none; /* Hide desktop navigation on smaller screens */
  }

  .mobile-nav-toggle {
    display: inline;
    order: 3; /* Show toggle button on smaller screens */
  }

  .sidebar {
    transform: translateX(-100%); /* Initially hide sidebar off-screen */
  }
}

@media (min-width: 993px) {
  .navbar {
    display: flex; /* Show navbar on larger screens */
  }

  .mobile-nav-toggle {
    display: none; /* Hide toggle button on larger screens */
  }

  .sidebar {
    display: none; /* Ensure sidebar is hidden on larger screens */
  }
}
</style>
