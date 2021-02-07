import { createRequest } from '@/services/http.service';

const state = {
  list: [],
  permList: [],
  countries: [],
  loaded: false
};

const getters = {
  getList: state => state.list,
  getLoaded: state => state.loaded,
  getPermList: state => state.permList,
  getCountries: state => state.countries,
  getCities: state => state.cities
};

const actions = {
  async fetchAddress({ commit }) {
    commit('SET_LOADED', true);
    return createRequest('get', '/api/v1/addresses')
      .then(res => {
        const response: [] = res.data.response;
        commit('SET_LIST', response);
        return response;
      })
      .finally(() => commit('SET_LOADED', false));
  },
  async fetchCountries({ commit }) {
    commit('SET_LOADED', true);
    return createRequest('get', '/api/v1/address/available-countries')
      .then(res => {
        const response = res.data.response;
        commit('SET_COUNTRIES', response);
      })
      .finally(() => commit('SET_LOADED', false));
  },
  async fetchCities({ commit }, props: { country: number, name: string }) {
    commit('SET_LOADED', true);
    return createRequest('get', '/api/v1/address/search-cities', null, props)
      .then(res => {
        const response = res.data.response;
        commit('SET_CITIES', response);
        return response;
      })
      .finally(() => commit('SET_LOADED', false));
  },
  async addAddress({ commit, state }, props) {
    commit('SET_LOADED', true);
    return createRequest('post', '/api/v1/address/add', props)
      .then(() => {
        commit('ADD_ADDRESS', props);
        return props;
      })
      .finally(() => commit('SET_LOADED', false));
  },
  async editAddress({ commit, state }, props) {
    commit('SET_LOADED', true);
    return createRequest('post', `/api/v1/address/update/${props.id}`, props)
      .then(() => {
        commit('EDIT_ADDRESS', props);
        return props;
      })
      .finally(() => commit('SET_LOADED', false));
  },
  async removeAddress({ commit, state }, props) {
    try {
      const index = state.list.findIndex(el => {
        return el.id === props;
      });
      commit('REMOVE_ADDRESS', index);
    } catch (error) {
      throw error;
    }
  },
  async deleteAddress({ commit, state }, id) {
    commit('SET_LOADED', true);
    return createRequest('post', `/api/v1/address/delete/${id}`, {})
      .then(() => id)
      .finally(() => commit('SET_LOADED', false));
  },
  async restoreAddress({ commit, state }, props) {
    try {
      const index = state.list.findIndex(el => {
        return el.id === props;
      });
      commit('RESTORE_ADDRESS', index);
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
  SET_LOADED: 'SET_LOADED',
  SET_PERMLIST: 'SET_PERMLIST',
  SET_CITIES: 'SET_CITIES',
  SET_COUNTRIES: 'SET_COUNTRIES',
  ADD_ADDRESS: 'ADD_ADDRESS',
  REMOVE_ADDRESS: 'REMOVE_ADDRESS',
  RESTORE_ADDRESS: 'RESTORE_ADDRESS',
  EDIT_ADDRESS: 'EDIT_ADDRESS'
};

const mutations = {
  [mutationTypes.SET_PERMLIST](state, payload) {
    state.permList = payload;
  },
  [mutationTypes.SET_LIST](state, payload) {
    state.list = payload;
  },
  [mutationTypes.SET_LOADED](state, payload) {
    state.loaded = payload;
  },
  [mutationTypes.SET_COUNTRIES](state, payload) {
    state.countries = payload;
  },
  [mutationTypes.SET_CITIES](state, payload) {
    state.cities = payload;
  },
  [mutationTypes.ADD_ADDRESS](state, payload) {
    state.list.push(payload);
  },
  [mutationTypes.REMOVE_ADDRESS](state, payload) {
    const clonedList = [...state.list];
    clonedList[payload].isDeleted = true;
    state.list = clonedList;
  },
  [mutationTypes.RESTORE_ADDRESS](state, payload) {
    const clonedList = [...state.list];
    clonedList[payload] = { ...state.list[payload] };
    delete clonedList[payload].isDeleted;
    state.list = clonedList;
  },
  [mutationTypes.EDIT_ADDRESS](state, payload) {
    let result = state.list;
    result[payload.index] = payload.item;
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
