// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AuthView from '../views/AuthView.vue';
import ParentRegisterView from '../views/ParentRegistration.vue';
import ParentDashboard from '../views/ParentDashboard.vue';
import { auth } from '../firebase'; // Import Firebase auth

// Middleware function to check authentication
function requireAuth(to, from, next) {
  const user = auth.currentUser; // Get the current user from Firebase auth

  if (user) {
    // If user is logged in, allow access
    next();
  } else {
    // If not logged in, redirect to the Auth page
    next('/auth');
  }
}

// Middleware function to redirect children to home page
function redirectIfChild(to, from, next) {
  const user = auth.currentUser;

  // Assume user data is stored in a way where 'isChild' flag is retrievable
  if (user && user.isChild) {
    next('/'); // Redirect child to home
  } else {
    next(); // Continue to the desired route
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthView,
  },
  {
    path: '/parent-registration',
    name: 'ParentRegistration',
    component: ParentRegisterView,
  },
  {
    path: '/parent-dashboard',
    name: 'ParentDashboard',
    component: ParentDashboard,
    beforeEnter: (to, from, next) => {
      // Check if user is authenticated and not a child
      requireAuth(to, from, () => redirectIfChild(to, from, next));
    },
  },
  {
    path: '/:catchAll(.*)', // Catch-all route for undefined paths
    redirect: '/', // Redirect to HomeView
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Optional: Use beforeEach hook for global route guard (if needed)
router.beforeEach((to, from, next) => {
  // Add any global checks here, like logging, analytics, etc.
  next();
});

export default router;
