import { createRequest } from '@/services/http.service';

const state = {
  list: [],
  permList: [],
  platforms: [],
  loaded: false
};

const getters = {
  getList: state => state.list,
  getLoaded: state => state.loaded,
  getPermList: state => state.permList,
  getPlatforms: state => state.platforms
};

const actions = {
  async fetch({ commit }) {
    commit('SET_COMMUNICATIONS_LOADED', true);
    return createRequest('get', '/api/v1/communications')
      .then(res => {
        const response: [] = res.data.response;
        commit('SET_LIST', response);
        return response;
      })
      .finally(() => commit('SET_COMMUNICATIONS_LOADED', false));
  },
  async fetchPlatforms({ commit }) {
    commit('SET_COMMUNICATIONS_LOADED', true);
    return createRequest('get', '/api/v1/communications/available')
      .then(res => {
        const response = res.data.response;
        commit('SET_PLATFORMS', response);
      })
      .finally(() => commit('SET_COMMUNICATIONS_LOADED', false));
  },
  async add({ commit, state }, props) {
    commit('SET_COMMUNICATIONS_LOADED', true);
    return createRequest('post', '/api/v1/communication/add', props)
      .then(() => {
        commit('ADD_COMM', props);
        return props;
      })
      .finally(() => commit('SET_COMMUNICATIONS_LOADED', false));
  },
  async removeComm({ commit, state }, props) {
    try {
      const index = state.list.findIndex(el => {
        return el.id === props;
      });
      commit('REMOVE_COMM', index);
    } catch (error) {
      throw error;
    }
  },
  async restoreComm({ commit, state }, props) {
    try {
      const index = state.list.findIndex(el => {
        return el.id === props;
      });
      commit('RESTORE_COMM', index);
    } catch (error) {
      throw error;
    }
  },
  async update({ commit, state }, props) {
    commit('SET_COMMUNICATIONS_LOADED', true);
    return createRequest('post', `/api/v1/communication/update/${props.id}`, props)
      .then(() => {
        commit('EDIT_COMM', props);
        return props;
      })
      .finally(() => commit('SET_COMMUNICATIONS_LOADED', false));
  },
  async deleteCommunication({ commit, state }, id) {
    commit('SET_COMMUNICATIONS_LOADED', true);
    return createRequest('post', `/api/v1/communication/delete/${id}`, {})
      .then(() => id)
      .finally(() => commit('SET_COMMUNICATIONS_LOADED', false));
  },
  async updateSortOrder({ commit, state }, orderArray) {
    commit('SET_COMMUNICATIONS_LOADED', true);
    return createRequest('post', '/api/v1/communications/update-sort-order', orderArray)
      .then(() => true)
      .finally(() => commit('SET_COMMUNICATIONS_LOADED', false));
  },
  async lowPriority({ commit, state }, communication) {
    try {
      const newList = [...state.list];
      const itemIndex = newList.findIndex(item => item.id === communication.id);
      [newList[itemIndex + 1], newList[itemIndex]] = [newList[itemIndex], newList[itemIndex + 1]];
      commit('SET_LIST', newList);
    } catch (error) {
      throw error;
    }
  },
  async highPriority({ commit, state }, communication) {
    try {
      const newList = [...state.list];
      const itemIndex = newList.findIndex(item => item.id === communication.id);
      [newList[itemIndex - 1], newList[itemIndex]] = [newList[itemIndex], newList[itemIndex - 1]];
      commit('SET_LIST', newList);
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
  SET_COMMUNICATIONS_LOADED: 'SET_COMMUNICATIONS_LOADED',
  SET_PLATFORMS: 'SET_PLATFORMS',
  ADD_COMM: 'ADD_COMM',
  REMOVE_COMM: 'REMOVE_COMM',
  RESTORE_COMM: 'RESTORE_COMM',
  EDIT_COMM: 'EDIT_COMM'
};

const mutations = {
  [mutationTypes.SET_COMMUNICATIONS_LOADED](state, payload) {
    state.loaded = payload;
  },
  [mutationTypes.SET_LIST](state, payload) {
    state.list = payload.sort(function(a, b) {
      return a.priority - b.priority;
    });
  },
  [mutationTypes.SET_PLATFORMS](state, payload) {
    state.platforms = payload;
  },
  [mutationTypes.ADD_COMM](state, payload) {
    state.list.push(payload);
  },
  [mutationTypes.REMOVE_COMM](state, payload) {
    const clonedList = [...state.list];
    clonedList[payload].isDeleted = true;
    state.list = clonedList;
  },
  [mutationTypes.RESTORE_COMM](state, payload) {
    const clonedList = [...state.list];
    clonedList[payload] = { ...state.list[payload] };
    delete clonedList[payload].isDeleted;
    state.list = clonedList;
  },
  [mutationTypes.EDIT_COMM](state, payload) {
    let result = state.list;
    const targetItemIndex = result.findIndex(item => item.id === payload.id);
    result[targetItemIndex] = payload;
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
