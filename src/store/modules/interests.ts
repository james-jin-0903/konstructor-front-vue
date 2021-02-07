import { createRequest } from '@/services/http.service';

export interface InterestItem {
  id: number,
  name: string,
  is_selected: boolean
}

export interface Interest {
  id: 0,
  name: string,
  image: string,
  is_selected: boolean,
  children: InterestItem[]
}

interface InterestsState {
  interests: Interest[],
  loaded: boolean,
}

const state: InterestsState = {
  interests: [],
  loaded: false
};

const getters = {
  getInterests: (state: InterestsState) => state.interests,
  getLoaded: (state: InterestsState) => state.loaded
};


const mutationTypes = {
  SET_INTERESTS: 'SET_INTERESTS',
  SET_INTERESTS_LOADED: 'SET_INTERESTS_LOADED'
};

const mutations = {
  [mutationTypes.SET_INTERESTS](state: InterestsState, payload) {
    state.interests = payload;
  },
  [mutationTypes.SET_INTERESTS_LOADED](state: InterestsState, payload) {
    state.loaded = payload;
  }
};


const actions = {
  async fetch({ commit }) {
    commit('SET_INTERESTS_LOADED', true);
    return createRequest('get', '/api/v1/interests')
      .then(res => {
        const response = res.data.response;
        commit('SET_INTERESTS', response);
        return response;
      })
      .finally(() => commit('SET_INTERESTS_LOADED', false));
  },
  async update({ commit, state }, list) {
    commit('SET_INTERESTS_LOADED', true);
    return createRequest('POST', '/api/v1/interests', list)
      .then(res => {
        const response = res.data.response;
        commit('SET_INTERESTS', response);
        return response;
      })
      .finally(() => commit('SET_INTERESTS_LOADED', false));
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
