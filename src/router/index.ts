import Vue from 'vue';
import VueRouter from 'vue-router';

import PerfectScrollbar from 'perfect-scrollbar';

import {
  initCurrentUserStateMiddleware,
  setPageTitleMiddleware
} from './middlewares';
import { routes } from './routes';
import { scrollBehavior } from '@/router/util';


Vue.use(VueRouter);

const router = new VueRouter({
  linkActiveClass: 'is-active',
  mode: 'history',
  // @ts-ignore
  routes,
  scrollBehavior
});

router.beforeEach(initCurrentUserStateMiddleware);
router.beforeEach(setPageTitleMiddleware);
router.afterEach(() => {
  setTimeout(() => {
    if (document.querySelector('.layoutMain__main')) {
      new PerfectScrollbar('.layoutMain__main');
    }
  }, 1000);
});

export default router;
