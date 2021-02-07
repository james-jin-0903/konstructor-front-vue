import { createRequest } from '@/services/http.service';

export interface SkillItem {
  id: number,
  name: string,
  is_selected: boolean
}

export interface Skill {
  id: 0,
  name: string,
  image: string,
  is_selected: boolean,
  children: SkillItem[]
}

interface SkillsState {
  skills: Skill[],
  loaded: boolean,
}

const state: SkillsState = {
  skills: [],
  loaded: false
};

const getters = {
  getSkills: (state: SkillsState) => state.skills,
  getLoaded: (state: SkillsState) => state.loaded
};


const mutationTypes = {
  SET_SKILLS: 'SET_SKILLS',
  SET_SKILLS_LOADED: 'SET_SKILLS_LOADED'
};

const mutations = {
  [mutationTypes.SET_SKILLS](state: SkillsState, payload) {
    state.skills = payload;
  },
  [mutationTypes.SET_SKILLS_LOADED](state: SkillsState, payload) {
    state.loaded = payload;
  }
};


const actions = {
  async fetch({ commit }) {
    commit('SET_SKILLS_LOADED', true);
    return createRequest('get', '/api/v1/skills')
      .then(res => {
        const response = res.data.response;
        commit('SET_SKILLS', response);
        return response;
      })
      .finally(() => commit('SET_SKILLS_LOADED', false));
  },
  async update({ commit, state }, list) {
    commit('SET_SKILLS_LOADED', true);
    return createRequest('POST', '/api/v1/skills', list)
      .then(res => {
        const response = res.data.response;
        commit('SET_SKILLS', response);
        return response;
      })
      .finally(() => commit('SET_SKILLS_LOADED', false));
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
