import { createRouter, createWebHistory } from 'vue-router';
import AuthView from '../views/AuthView.vue';
import ParentRegisterView from '../views/ParentRegistration.vue';
import HomeView from '../views/HomeView.vue'; // Import the HomeView component

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView, // Set HomeView as the default route
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthView,
  },
  {
    path: '/parent-registration', // Corrected the path and removed the typo
    name: 'ParentRegistration', // Corrected the route name and removed the trailing dot
    component: ParentRegisterView, // Correctly reference the ParentRegistration component
  },
  {
    path: '/:catchAll(.*)', // Catch-all route for undefined paths
    redirect: '/', // Redirect to HomeView
  },
];

// Create a router instance using `createWebHistory`
const router = createRouter({
  history: createWebHistory(), // No base URL needed
  routes,
});

export default router;
