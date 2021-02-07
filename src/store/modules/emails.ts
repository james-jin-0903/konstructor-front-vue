import { createRequest } from '@/services/http.service';

export interface Email {
  id: number,
  email: string,
  is_main: boolean,
  state_slug: boolean,
  notification_on: boolean
}

const state = {
  list: [],
  loaded: false
};

const getters = {
  getList: state => state.list,
  getLoaded: state => state.loaded
};

const actions = {
  async fetchEmails({ commit }) {
    commit('SET_EMAILS_LOADED', true);
    return createRequest('get', '/api/v1/emails')
      .then(res => {
        const response: Email[] = res.data.response;
        commit('SET_LIST', response);
        return response;
      })
      .finally(() => commit('SET_EMAILS_LOADED', false));
  },
  async addEmail({ commit, state }, props) {
    commit('SET_EMAILS_LOADED', true);
    return createRequest('post', '/api/v1/email/add', props)
      .then(() => {
        commit('ADD_EMAIL', props);
        return props;
      })
      .finally(() => commit('SET_EMAILS_LOADED', false));
  },
  async editEmail({ commit, state }, props) {
    commit('SET_EMAILS_LOADED', true);
    return createRequest('post', `/api/v1/email/update/${props.id}`, props)
      .then(() => {
        commit('EDIT_EMAIL', props);
        return props;
      })
      .finally(() => commit('SET_EMAILS_LOADED', false));
  },
  async deleteEmail({ commit, state }, id) {
    commit('SET_EMAILS_LOADED', true);
    return createRequest('post', `/api/v1/email/delete/${id}`, {})
      .then(() => id)
      .finally(() => commit('SET_EMAILS_LOADED', false));
  },
  async removeEmail({ commit, state }, props) {
    try {
      const index = state.list.findIndex(el => {
        return el.id === props;
      });
      commit('REMOVE_EMAIL', index);
    } catch (error) {
      throw error;
    }
  }
};

const mutationTypes = {
  SET_LIST: 'SET_LIST',
  SET_EMAILS_LOADED: 'SET_EMAILS_LOADED',
  ADD_EMAIL: 'ADD_EMAIL',
  REMOVE_EMAIL: 'REMOVE_EMAIL',
  EDIT_EMAIL: 'EDIT_EMAIL'
};

const mutations = {
  [mutationTypes.SET_LIST](state, payload) {
    state.list = payload;
  },
  [mutationTypes.SET_EMAILS_LOADED](state, payload) {
    state.loaded = payload;
  },
  [mutationTypes.ADD_EMAIL](state, payload) {
    if (payload.is_main) {
      const result = state.list.map(el => {
        el.is_main = false;
        return el;
      });
      result.push(payload);
      state.list = result;
    } else state.list.push(payload);
  },
  [mutationTypes.REMOVE_EMAIL](state, payload) {
    state.list.splice(payload, 1);
  },
  [mutationTypes.EDIT_EMAIL](state, payload) {
    state.list[payload.index] = payload;

    // TODO update after backend was finished
    /*if (payload.is_main) {
      const result = state.list.map(el => {
        el.is_main = false;
        return el;
      });
      result[payload.index] = payload;
      state.list = result;
    } else {
      state.list[payload.index] = payload;
    }*/
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
