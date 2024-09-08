// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AuthView from '../views/AuthView.vue';
import ParentRegisterView from '../views/ParentRegistration.vue';
import ParentDashboard from '../views/ParentDashboard.vue';
import { auth } from '../firebase'; // Firebase auth import
import { onAuthStateChanged } from 'firebase/auth'; // Import for auth state change listener

// Navigation guard for routes that require authentication
function requireAuth(to, from, next) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      next(); // User is authenticated, allow navigation
    } else {
      next('/auth'); // User is not authenticated, redirect to login
    }
  });
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
    props: (route) => ({
      childUid: route.query.childUid,
      childEmail: route.query.childEmail,
      username: route.query.username,
    }),
  },
  {
    path: '/parent-dashboard',
    name: 'ParentDashboard',
    component: ParentDashboard,
    beforeEnter: requireAuth, // Protect the route
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/', // Redirect any undefined paths to HomeView
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
