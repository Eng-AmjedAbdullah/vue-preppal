import { createRouter, createWebHistory } from 'vue-router';
import AuthView from '../views/AuthView.vue';
import ParentRegisterView from '../views/ParentRegisterView.vue';
import HomeView from '../views/HomeView.vue'; // Import the new HomeView component

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
    path: '/parent-register',
    name: 'ParentRegister',
    component: ParentRegisterView,
  },
  {
    path: '/:catchAll(.*)', // Catch-all route for undefined paths
    redirect: '/', // Redirect to HomeView
  },
];

// Use `createWebHistory` without base URL argument
const router = createRouter({
  history: createWebHistory(), // No base URL needed
  routes,
});

export default router;
