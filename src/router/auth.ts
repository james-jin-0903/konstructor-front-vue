import { authRoutesMap } from '@/config';
import { authRouteGuard, controlLvl } from '@/router/middlewares';
import settingsPage from '../pages/auth/Index.vue';

export const authRoutes = [
  {
    path: authRoutesMap.root,
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../pages/auth/Index.vue'),
    beforeEnter: authRouteGuard
  },
  {
    path: authRoutesMap.signIn,
    name: 'signIn',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../pages/auth/SignIn.vue'),
    beforeEnter: authRouteGuard
  },
  {
    path: authRoutesMap.signSocial,
    name: 'signSocial',
    component: () =>
      import(/* webpackChunkName: "about" */ '../pages/auth/SignSocial.vue'),
    props: true,
    beforeEnter: authRouteGuard
  },
  {
    path: authRoutesMap.signUp,
    name: 'signUp',
    component: () => import('../pages/auth/SignUp.vue'),
    beforeEnter: authRouteGuard
  },
  {
    path: authRoutesMap.signUpPath,
    name: 'signUpPath',
    component: () => import('../pages/auth/SignUpPath.vue'),
    beforeEnter: (to, from, next) => {
      controlLvl(to, next);
    }
  },
  {
    path: authRoutesMap.skills,
    name: 'skills',
    component: () => import('../pages/auth/Selection.vue'),
    props: { type: 'skills' },
    beforeEnter: (to, from, next) => {
      controlLvl(to, next);
    }
  },
  {
    path: authRoutesMap.interest,
    name: 'interest',
    component: () => import('../pages/auth/Selection.vue'),
    props: { type: 'interest' },
    beforeEnter: (to, from, next) => {
      controlLvl(to, next);
    }
  },
  {
    path: authRoutesMap.recover,
    name: 'recover',
    component: () => import('../pages/auth/Recover.vue'),
    beforeEnter: authRouteGuard
  },

  {
    path: authRoutesMap.recover_pass,
    name: 'recoverNew',
    component: () => import('../pages/auth/RecoverPass.vue'),
    props: true,
    beforeEnter: authRouteGuard
  },

  {
    path: authRoutesMap.auth,
    name: 'authed',
    component: () => settingsPage,
    meta: { requiresAuth: true }
  },

  {
    path: '*',
    name: 'notFound',
    component: () => import('../pages/auth/NotFound.vue')
  }
];
