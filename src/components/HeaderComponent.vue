<template>
  <header id="header" class="header d-flex align-items-center fixed-top">
    <div class="container-fluid d-flex align-items-center justify-content-between">
      <!-- Logo -->
      <router-link to="/" class="logo d-flex align-items-center me-auto me-lg-0">
        <img :src="logo" alt="Logo" width="50" height="50" />
        <h1>PrepPal</h1>
      </router-link>

      <!-- Navigation Menu -->
      <nav id="navbar" class="navbar">
        <ul>
          <li><router-link to="/" exact-active-class="active">Home</router-link></li>
          <li class="dropdown">
            <a href="#" @click.prevent="toggleDropdown('educationalModules')">
              <span>Educational Modules</span> <i class="bi bi-chevron-down dropdown-indicator"></i>
            </a>
            <ul v-if="activeDropdown === 'educationalModules'">
              <li><a href="#">Nature</a></li>
              <li class="dropdown">
                <a href="#" @click.prevent="toggleDropdown('subMenu')">
                  <span>Sub Menu</span> <i class="bi bi-chevron-down dropdown-indicator"></i>
                </a>
                <ul v-if="activeDropdown === 'subMenu'">
                  <li><a href="#">Sub Menu 1</a></li>
                  <li><a href="#">Sub Menu 2</a></li>
                  <li><a href="#">Sub Menu 3</a></li>
                </ul>
              </li>
            </ul>
          </li>
          <li><router-link to="/services" exact-active-class="active">Services</router-link></li>
          <li><router-link to="/contact" exact-active-class="active">Contact</router-link></li>
          <li><router-link to="/about" exact-active-class="active">About</router-link></li>
          <li v-if="isLoggedIn" class="dropdown">
            <a href="#" @click.prevent="toggleDropdown('userMenu')">
              <img :src="userImage" class="profile-image" /> {{ username }} <i class="bi bi-chevron-down dropdown-indicator"></i>
            </a>
            <ul v-if="activeDropdown === 'userMenu'">
              <li><router-link to="/profile">Edit Profile</router-link></li>
              <li><a href="#" @click.prevent="logout">Logout</a></li>
            </ul>
          </li>
          <li v-else><router-link to="/login" exact-active-class="active">Login</router-link></li>
        </ul>
      </nav>

      <!-- Social Links -->
      <div class="header-social-links">
        <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
        <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
        <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
        <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
      </div>

      <!-- Mobile Navigation Toggle -->
      <i class="mobile-nav-toggle mobile-nav-show bi bi-list" @click="toggleMobileMenu"></i>
      <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x" @click="toggleMobileMenu"></i>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import logo from '../assets/logo.png';

const isLoggedIn = ref(false); // Placeholder for auth state
const username = ref('John Doe'); // Placeholder username
const userImage = ref('https://via.placeholder.com/50'); // Placeholder image

const activeDropdown = ref(null);
const mobileMenuOpen = ref(false);

function toggleDropdown(menu) {
  activeDropdown.value = activeDropdown.value === menu ? null : menu;
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  document.getElementById('navbar').classList.toggle('mobile-nav-active');
  document.querySelector('.mobile-nav-show').classList.toggle('d-none');
  document.querySelector('.mobile-nav-hide').classList.toggle('d-none');
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
  padding: 30px 0;
  background-color: #000;
}

.profile-image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.navbar ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.navbar ul li {
  position: relative;
  padding: 10px;
}

.navbar ul li a {
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: 0.3s;
}

.navbar ul li a:hover,
.navbar ul li a.active {
  color: #00f;
}

.navbar ul ul {
  position: absolute;
  left: 0;
  top: 100%;
  background-color: #333;
  display: none;
  list-style: none;
  padding: 10px;
  margin: 0;
}

.navbar ul li:hover > ul {
  display: block;
}

.mobile-nav-active .navbar ul {
  display: block;
  position: static;
  background: #000;
  padding: 10px;
  width: 100%;
}

.mobile-nav-toggle {
  cursor: pointer;
  font-size: 24px;
  color: #fff;
  display: none;
}

.mobile-nav-show {
  display: block;
}

.mobile-nav-hide {
  display: none;
}

@media (max-width: 991px) {
  .mobile-nav-toggle {
    display: block;
  }
  
  .navbar {
    display: none;
  }

  .mobile-nav-active .navbar {
    display: block;
  }
}
</style>
