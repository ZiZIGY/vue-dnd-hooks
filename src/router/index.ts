import { Component, reactive, ref } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import Guide from '../views/Examples/index.vue';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/guide',
    name: 'guide',
    component: Guide,
  },
];

const router = createRouter({
  history: createWebHistory('/vue-dnd-hooks'),
  routes,
});

const previousRouteComponent = ref<Component | null>(null);

let lastScrollPosition = reactive({
  x: 0,
  y: 0,
});

router.beforeEach((to, from, next) => {
  const fromRoute = routes.find((route) => route.path === from.path);

  if (fromRoute) previousRouteComponent.value = fromRoute.component;

  lastScrollPosition.x = window.scrollX;
  lastScrollPosition.y = window.scrollY;

  next();
});

export { routes, router, previousRouteComponent, lastScrollPosition };

export default router;
