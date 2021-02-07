import { createRequest } from '@/services/http.service';

const state = {
  list: [],
  availableList: [],
  platforms: [],
  loaded: false
};

const getters = {
  getList: state => state.list,
  getLoaded: state => state.loaded,
  getAvailable: state => state.availableList,
  getPlatforms: state => state.platforms
};

const actions = {
  async fetchPlatforms({ commit }) {
    commit('SET_SOCIALS_LOADED', true);
    return createRequest('get', '/api/v1/social-medias/available')
      .then(res => {
        const response = res.data.response;
        commit('SET_AVAILABLE_LIST', response);
      })
      .finally(() => commit('SET_SOCIALS_LOADED', false));
  },
  async fetchSocial({ commit }) {
    commit('SET_SOCIALS_LOADED', true);
    return createRequest('get', '/api/v1/social-medias')
      .then(res => {
        const response = res.data.response;
        commit('SET_LIST', response);
        return response;
      })
      .finally(() => commit('SET_SOCIALS_LOADED', false));
  },
  async addSocial({ commit, state }, props) {
    commit('SET_SOCIALS_LOADED', true);
    return createRequest('post', '/api/v1/social-media/add', props)
      .then(() => {
        commit('ADD_SOCIAL', props);
        return props;
      })
      .finally(() => commit('SET_SOCIALS_LOADED', false));
  },
  async updateSocial({ commit, state }, props) {
    commit('SET_SOCIALS_LOADED', true);
    return createRequest('post', `/api/v1/social-media/update/${props.id}`, props)
      .then(() => {
        commit('EDIT_SOCIAL', props);
        return props;
      })
      .finally(() => commit('SET_SOCIALS_LOADED', false));
  },
  async deleteSocial({ commit, state }, id) {
    commit('SET_SOCIALS_LOADED', true);
    return createRequest('post', `/api/v1/social-media/delete/${id}`, {})
      .then(() => id)
      .finally(() => commit('SET_SOCIALS_LOADED', false));
  },
  async removeSocial({ commit, state }, props) {
    try {
      const index = state.list.findIndex(el => {
        return el.id === props;
      });
      commit('REMOVE_SOCIAL', index);
    } catch (error) {
      throw error;
    }
  },
  async restoreSocial({ commit, state }, props) {
    try {
      const index = state.list.findIndex(el => {
        return el.id === props;
      });
      commit('RESTORE_SOCIAL', index);
    } catch (error) {
      throw error;
    }
  },
  deleteFromList({ commit, state }, deletedItems) {
    const currentList = state.list;
    const newList = currentList.filter(item => !deletedItems.includes(item.id));
    commit('SET_LIST', newList);
  }
};

const mutationTypes = {
  SET_LIST: 'SET_LIST',
  SET_SOCIALS_LOADED: 'SET_SOCIALS_LOADED',
  SET_AVAILABLE_LIST: 'SET_AVAILABLE_LIST',
  SET_PLATFORMS: 'SET_PLATFORMS',
  ADD_SOCIAL: 'ADD_SOCIAL',
  REMOVE_SOCIAL: 'REMOVE_SOCIAL',
  RESTORE_SOCIAL: 'RESTORE_SOCIAL',
  EDIT_SOCIAL: 'EDIT_SOCIAL'
};

const mutations = {
  [mutationTypes.SET_AVAILABLE_LIST](state, payload) {
    state.availableList = payload;
  },
  [mutationTypes.SET_LIST](state, payload) {
    state.list = payload;
  },
  [mutationTypes.SET_SOCIALS_LOADED](state, payload) {
    state.loaded = payload;
  },
  [mutationTypes.SET_PLATFORMS](state, payload) {
    state.platforms = payload;
  },
  [mutationTypes.ADD_SOCIAL](state, payload) {
    state.list.push(payload);
  },
  [mutationTypes.REMOVE_SOCIAL](state, payload) {
    const clonedList = [...state.list];
    clonedList[payload].isDeleted = true;
    state.list = clonedList;
  },
  [mutationTypes.RESTORE_SOCIAL](state, payload) {
    const clonedList = [...state.list];
    clonedList[payload] = { ...state.list[payload] };
    delete clonedList[payload].isDeleted;
    state.list = clonedList;
  },
  [mutationTypes.EDIT_SOCIAL](state, payload) {
    const result = state.list;
    const targetItemIndex = result.findIndex(item => item.id === payload.id);
    result[targetItemIndex].network_slug = payload.network_slug;
    result[targetItemIndex].account = payload.link;
    state.list = result;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
