import { User } from '@/store/modules/user/userState';
import { createRequest } from '@/services/http.service';

export default {
  async fetchUser({ commit }) {
    commit('SET_USER_LOADED', true);
    return createRequest('GET', '/api/v1/user')
      .then(res => {
        const response = res.data.response;
        commit('SET_USER', response);
        return response;
      })
      .finally(() => commit('SET_USER_LOADED', false));
  },
  async updateUser({ commit, state }, userData: User) {
    commit('SET_USER_LOADED', true);
    return createRequest('POST', '/api/v1/user', userData)
      .then(() => {
        commit('SET_USER', { ...state.currentUser, ...userData });
      })
      .finally(() => commit('SET_USER_LOADED', false));
  },
  async updateImage({ commit, state }, formData) {
    commit('SET_USER_LOADED', true);
    return createRequest('POST', '/api/v1/user/update-photo', formData)
      .finally(() => commit('SET_USER_LOADED', false));
  },
  async deleteImage({ commit }) {
    commit('SET_USER_LOADED', true);
    return createRequest('POST', '/api/v1/user/delete-photo')
      .finally(() => commit('SET_USER_LOADED', false));
  },
  async updateVideo({ commit, state }, formData) {
    commit('SET_USER_LOADED', true);
    return createRequest('POST', '/api/v1/user/update-video', formData)
      .finally(() => commit('SET_USER_LOADED', false));
  },
  async deleteVideo({ commit }) {
    commit('SET_USER_LOADED', true);
    return createRequest('POST', '/api/v1/user/delete-video')
      .finally(() => commit('SET_USER_LOADED', false));
  }
};
