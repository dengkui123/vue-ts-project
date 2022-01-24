import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw, RouteLocationNormalized } from 'vue-router';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import localCache from '@/utils/cache';
import { firstMenu } from '@/utils/map-menus';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/:patchMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/notFound/NotFound.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('@/views/main/index.vue'),
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  routes,
  history: createWebHashHistory()
});

router.beforeEach((to: RouteLocationNormalized) => {
  NProgress.start();
  if (to.path !== '/login') {
    const token = localCache.getCache('token');
    if (to.meta.requiresAuth && !token) {
      return {
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      };
    }
  }
  if (to.path === '/main') {
    return firstMenu.url;
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
