import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../pages/HomePage.vue';
import MapPage from '../pages/MapPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/map',
    name: 'Map',
    component: MapPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;