import { createRequest } from '@/services/http.service';

export interface Account {
  nickname: string,
  current_lang_slug: string
}

export interface Locale {
  slug: string,
  name: string
}

export interface AccountState {
  account: Account,
  locales: Locale[],
  loaded: boolean
}

const state: AccountState = {
  account: { nickname: '', current_lang_slug: '' },
  locales: [],
  loaded: false
};

const getters = {
  getAccount: state => state.account,
  getLocales: state => state.locales,
  getLoaded: state => state.loaded
};

const actions = {
  async fetch({ commit }) {
    commit('SET_ACCOUNT_LOADED', true);
    return createRequest('get', '/api/v1/account')
      .then(res => {
        const response = res.data.response;
        commit('SET_ACCOUNT', response);
        return response;
      })
      .finally(() => commit('SET_ACCOUNT_LOADED', false));
  },
  async fetchLocales({ commit }) {
    commit('SET_ACCOUNT_LOADED', true);
    return createRequest('get', '/api/v1/account/available-locales')
      .then(res => {
        const response = res.data.response;
        commit('SET_LOCALES', response);
        return response;
      })
      .finally(() => commit('SET_ACCOUNT_LOADED', false));
  },
  async updateAccount({ commit, state }, account) {
    commit('SET_ACCOUNT_LOADED', true);
    return createRequest('POST', '/api/v1/account', account)
      .then(res => {
        const response = res.data.response;
        commit('SET_ACCOUNT', response);
        return response;
      })
      .finally(() => commit('SET_ACCOUNT_LOADED', false));
  }
};

const mutationTypes = {
  SET_ACCOUNT: 'SET_ACCOUNT',
  SET_LOCALES: 'SET_LOCALES',
  SET_ACCOUNT_LOADED: 'SET_ACCOUNT_LOADED'
};

const mutations = {
  [mutationTypes.SET_ACCOUNT](state: AccountState, payload) {
    state.account = payload;
  },
  [mutationTypes.SET_LOCALES](state: AccountState, payload) {
    state.locales = payload;
  },
  [mutationTypes.SET_ACCOUNT_LOADED](state: AccountState, payload) {
    state.loaded = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
