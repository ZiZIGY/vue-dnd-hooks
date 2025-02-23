import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';

const router = createRouter({
  history: createWebHistory('/vue-dnd-hooks/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
  ],
});

export default router;
