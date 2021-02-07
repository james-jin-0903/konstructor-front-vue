//import axios from 'axios'

// initial state
import { createRequest } from '@/services/http.service';
import { CLIENT_UUID } from '@/config'

export interface ResponsibleUser {
  uuid: string,
  name: string,
  surname: string
}

export interface Author {
  uuid: string,
  name: string,
  surname: string
}

export interface Community {
  uuid: string,
  name: string
}

export interface Project {
  id: number,
  email: string,
  is_main: boolean,
  state_slug: boolean,
  notification_on: boolean,
  uuid: string,
  title: string,
  income: string,
  delta: string,
  responsible_user: ResponsibleUser,
  community: Community,
  author: Author
}

interface ProjectsState {
  projects: Project[],
  loaded: boolean
}

const state: ProjectsState = {
  projects: [],
  loaded: false
};

// getters
const getters = {
  getProjects: (state: ProjectsState) => state.projects,
  getLoaded: (state: ProjectsState) => state.loaded
};

// actions
const actions = {
  async fetchProjects({ commit }) {
    commit('SET_PROJECTS_LOADED', true);
    const props = {
      author_uuid: CLIENT_UUID
    }
    return createRequest('get', '/api/v1/projects', props)
      .then(res => {
        // console.log('SET_PROJECTS', res.data.response)
        const response: Project[] = res.data.response;
        commit('SET_PROJECTS', response);
        return response;
      })
      // .catch(err => console.log(err))
      .finally(() => commit('SET_PROJECTS_LOADED', false));
  },
  async fetchNewProject({ commit }, props) {
    commit('SET_PROJECTS_LOADED', true);
    return createRequest('post', '/api/v1/project/add', props)
      .then(res => {
        // console.log('SET_PROJECTS', res.data.response)
        
      })
      // .catch(err => console.log(err))
      .finally(() => {
        commit('SET_PROJECTS_LOADED', false)
      });
  },
  async fetchNewTask({ commit }, props) {
    commit('SET_PROJECTS_LOADED', true);
    return createRequest('post', '/api/v1/task/add', props)
      .then(res => {
        // console.log('SET_PROJECTS', res.data.response)
        
      })
      // .catch(err => console.log(err))
      .finally(() => {
        commit('SET_PROJECTS_LOADED', false)
      });
  },
};

const mutationTypes = {
  SET_PROJECTS: 'SET_PROJECTS',
  SET_PROJECTS_LOADED: 'SET_PROJECTS_LOADED',
};

// mutations
const mutations = {
  [mutationTypes.SET_PROJECTS](state, payload) {
    state.projects = payload;
  },
  [mutationTypes.SET_PROJECTS_LOADED](state, payload) {
    state.loaded = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
