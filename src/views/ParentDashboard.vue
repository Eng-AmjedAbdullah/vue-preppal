<!-- src/components/ParentDashboardHeader.vue -->
<template>
  <header class="parent-dashboard-header">
    <div class="container d-flex align-items-center justify-content-between">
      <router-link to="/parent-dashboard" class="logo d-flex align-items-center">
        <img :src="logo" alt="Logo" width="50" height="50" />
        <h1>PrepPal Parent Dashboard</h1>
      </router-link>

      <nav class="navbar" :class="{'active': isSidebarOpen}">
        <ul>
          <li><router-link to="/parent-dashboard" class="active">Home</router-link></li>
          <li><router-link to="/parent-dashboard/children">My Children</router-link></li>
          <li><router-link to="/parent-dashboard/settings">Settings</router-link></li>
          <li class="dropdown">
            <a href="#" @click="toggleDropdown">
              <img :src="parentData.avatar || 'https://via.placeholder.com/50'" class="profile-image" />
              {{ parentData.username || 'Parent Name' }}
              <i class="bi bi-chevron-down dropdown-indicator"></i>
            </a>
            <ul v-if="isDropdownOpen" class="dropdown-menu">
              <li><router-link to="/parent-dashboard/profile">Edit Profile</router-link></li>
              <li><a href="#" @click.prevent="logout">Logout</a></li>
            </ul>
          </li>
        </ul>
      </nav>

      <div class="header-social-links">
        <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
        <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
        <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
        <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
      </div>

      <i @click="toggleSidebar" class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
      <i @click="toggleSidebar" class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import logo from '../assets/logo.png';

const isSidebarOpen = ref(false);
const isDropdownOpen = ref(false);
const parentData = ref({
  username: 'Parent Name',
  avatar: 'https://via.placeholder.com/50'
});

// Toggle sidebar for mobile
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

// Toggle dropdown for profile actions
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

// Logout function
function logout() {
  // Perform logout operation
  console.log('User logged out');
}
</script>

<style scoped>
.parent-dashboard-header {
  width: 100%;
  padding: 20px 0;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
}

.logo h1 {
  font-size: 20px;
  margin-left: 10px;
  color: #27a776;
}

.navbar {
  display: flex;
  align-items: center;
}

.navbar ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
}

.navbar ul li {
  margin-right: 20px;
}

.navbar ul li a {
  text-decoration: none;
  color: #333;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s;
}

.navbar ul li a:hover {
  color: #27a776;
}

.navbar.active {
  display: block;
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  list-style: none;
  padding: 10px;
  border-radius: 4px;
  display: block;
}

.dropdown-menu li {
  padding: 5px 0;
}

.dropdown-menu li a {
  text-decoration: none;
  color: #333;
}

.dropdown-menu li a:hover {
  color: #27a776;
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
  color: #27a776;
}

.mobile-nav-toggle {
  display: none;
}

@media (max-width: 768px) {
  .navbar ul {
    display: none;
    flex-direction: column;
    align-items: flex-start;
    background-color: #fff;
    width: 100%;
    position: absolute;
    top: 60px;
    left: 0;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .mobile-nav-show {
    display: inline;
  }

  .mobile-nav-hide {
    display: none;
  }

  .navbar ul.show {
    display: flex;
  }
}
</style>
