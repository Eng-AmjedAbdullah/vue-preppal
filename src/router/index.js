import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'), // Lazy load HomeView
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/AuthView.vue'), // Lazy load AuthView
  },
  {
    path: '/parent-register',
    name: 'ParentRegister',
    component: () => import('../views/ParentRegisterView.vue'), // Lazy load ParentRegisterView
  },
  {
    path: '/:catchAll(.*)', // Catch-all route for undefined paths
    redirect: '/', // Redirect to HomeView
  },
];

const router = createRouter({
  history: createWebHistory(), // No base URL needed
  routes,
});

export default router;
