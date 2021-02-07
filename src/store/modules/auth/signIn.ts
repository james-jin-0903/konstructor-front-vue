import router from '@/router/index';
import $store from '../../../store';
import { DEFAULT_PATH } from '@/utils/constants';
import { createAuthRequest } from '@/services/http.service';

// initial state
const state = {
  isFetch: false
};

// getters
const getters = {
  getIsFetch: state => state.isFetch
};

// eslint-disable-next-line no-unused-vars
const mutationTypes = {
  SET_ISFETCH: 'SET_ISFETCH'
};

// actions
const actions = {
  // eslint-disable-next-line no-unused-vars
  async checkEmail({ state }, email) {
    let result = await createAuthRequest('post', '/api/v1/registration/email/check', {email});
    return result.error_message !== 'Email not found'
  },

  async auth({ rootState, dispatch }, param) {
    let result = await createAuthRequest('post', '/api/v1/auth/login', param);

    if (!result.response){
      return false;
    }

    await dispatch('global/setCookie', result.response, { root: true });

    $store.commit('global/SET_AUTH_COMPLETE', true);

    router.push(rootState.global.ref_url ? rootState.global.ref_url : DEFAULT_PATH);

    return true;
  }
};

// mutations
const mutations = {
  // payload is parameter that mutation takes. Can be any shape
  [mutationTypes.SET_ISFETCH](state, payload) {
    state.isFetch = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
