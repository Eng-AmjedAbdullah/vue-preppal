import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AuthView from '../views/AuthView.vue';
import ParentRegisterView from '../views/ParentRegistration.vue'; // Correct import for Parent Registration view
import ParentDashboard from '../views/ParentDashboard.vue';
import { auth } from '../firebase'; // Import Firebase auth

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/auth', name: 'Auth', component: AuthView },
  { path: '/parent-registration', name: 'ParentRegistration', component: ParentRegisterView },
  { path: '/parent-dashboard', name: 'ParentDashboard', component: ParentDashboard, beforeEnter: requireAuth },
  { path: '/:catchAll(.*)', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
