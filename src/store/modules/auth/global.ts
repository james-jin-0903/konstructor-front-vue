import Cookies from 'js-cookie';

interface AuthState {
  ref_url: string,
  isAuthComplete: boolean,
}

// initial state
const state: AuthState = {
  ref_url: '',
  isAuthComplete: false
};

// getters
const getters = {
  getRef: (state: AuthState) => state.ref_url,
  isAuthComplete: (state: AuthState) => {
    return state.isAuthComplete;
  }
};

const mutationTypes = {
  SET_REF: 'SET_REF',
  SET_AUTH_COMPLETE: 'SET_AUTH_COMPLETE'
};

// actions
const actions = {
  async setRef({ commit }, url) {
    try {
      commit('SET_REF', url);
    } catch (error) {
      throw error;
    }
  },
  async setCookie({ state }, { token, client_id }) {
    try {
      Cookies.set('jwt_token', token);
      Cookies.set('client_id', client_id);
    } catch (error) {
      throw error;
    }
  },
  async readCookie() {
    try {
      const token = Cookies.get('jwt_token');
      const id = Cookies.get('client_id');
      if (token && id) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  },
  async removeCookie() {
    try {
      Cookies.remove('jwt_token');
      Cookies.remove('client_id');
    } catch (error) {
      throw error;
    }
  }
};

// mutations
const mutations = {
  // payload is parameter that mutation takes. Can be any shape
  [mutationTypes.SET_REF](state: AuthState, payload) {
    state.ref_url = payload;
  },
  [mutationTypes.SET_AUTH_COMPLETE](state: AuthState, payload) {
    state.isAuthComplete = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
