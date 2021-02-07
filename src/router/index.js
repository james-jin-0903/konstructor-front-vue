import Vue from 'vue';
import Router from 'vue-router';

import { initCurrentUserStateMiddleware, setPageTitleMiddleware } from './middlewares';
import { routes } from './routes';

Vue.use(Router);

const router = new Router({
  linkActiveClass: 'is-active',
  mode: 'history',
  routes
});

router.beforeEach(initCurrentUserStateMiddleware);
router.beforeEach(setPageTitleMiddleware);

export default router;
