import { createAuthRequest } from '@/services/http.service';

// initial state
const state = {
  tokenList: ['soghGg8g9DD8j4', 'GJhfv87hG090', 'GJdfgvbcv5454k']
};

// getters
const getters = {};

// actions
const actions = {
  async checkToken(_, token) {
    let result = await createAuthRequest('post', '/api/v1/recovery/check-token', {token});
    return result.error_code === 0
  },

  async startRecover(_, email) {
    let result = await createAuthRequest('post', '/api/v1/recovery/recover', {email});
    return result.error_code === 0
  },
  // eslint-disable-next-line no-unused-vars
  async updatePass(_, payload) {
    let result = await createAuthRequest('post', '/api/v1/recovery/change-password', payload);

    if (result.error_code !== 0) throw result.error_message;

    return true;
  }
};

// mutations
const mutations = {
  // payload is parameter that mutation takes. Can be any shape
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
