import $store from '../store';
import { Route } from 'vue-router';
import { User } from '@/store/modules/user/userState';
import { levelRoutes, authRoutesMap } from '@/config';
import { DEFAULT_PATH } from '@/utils/constants';

/**
 * Current user state initialization
 * @WARN Must be always first in middleware chain
 */

export async function initCurrentUserStateMiddleware(to, from, next) {
  // todo set token here
  // TODO: uncomment when server will working
  // const currentUser = $store.getters['user/getUser'];
  // if (!currentUser) {
  //   await $store.dispatch('user/fetchUser');
  // }
  const mockUser: User = {
    date_of_birth: '01.01.2000',
    first_name: 'Иван',
    gender: 'male',
    last_name: 'Петров',
    patronymic: ''
  };
  $store.commit('user/SET_USER', mockUser);
  next();
}

export function setPageTitleMiddleware(to: Route, from: Route, next: Function) {
  const pageTitle = to.matched.find(item => item.meta.title);

  if (pageTitle) window.document.title = pageTitle.meta.title;
  next();
}


export async function checkAuth(to: Route, from: Route, next: Function) {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const hasPermission = await $store.dispatch('global/readCookie');
  const toPath = to.path;
  $store.commit('global/SET_REF', toPath);
  if (!hasPermission && requiresAuth) {
    next(authRoutesMap.signIn);
  } else if (hasPermission && !requiresAuth) {
    next(authRoutesMap.auth);
  } else {
    $store.commit('global/SET_AUTH_COMPLETE', true);
    next();
  }
}


export const controlLvl = (to, next) => {
  const str = localStorage.getItem('signUpState');

  if (str) {
    const state: { level: string | number } = JSON.parse(str);

    if ($store.state.signUp.level !== state.level) {
      $store.commit('signUp/SET_STATE', state);
    }
    if (to.name !== levelRoutes[state.level].name) {
      next(levelRoutes[state.level].route);
    } else {
      next();
    }
    return;
  } else {
    next(authRoutesMap.signUp);
  }
};


export const authRouteGuard = async (to, from, next) => {
  const hasPermission = await $store.dispatch('global/readCookie');
  if (hasPermission) {
    next(DEFAULT_PATH);
  } else {
    next();
  }
};
