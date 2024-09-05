// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AuthView from '../views/AuthView.vue';
import ParentRegisterView from '../views/ParentRegistration.vue';
import ParentDashboard from '../views/ParentDashboard.vue'; // Import the new component

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
    path: '/parent-dashboard', // Define the route path
    name: 'ParentDashboard',   // Name the route
    component: ParentDashboard, // Specify the component to render
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

export default router;
