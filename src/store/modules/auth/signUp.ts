import { createAuthRequest, createRequest } from '@/services/http.service';

// initial state
const state = {
  level: 0,
  main: {
    name: '',
    surname: '',
    email: '',
    password: ''
  },
  path: false,
  skills: {
    existed: [],
    new: [],
    old: []
  },
  interest: {
    existed: [],
    new: [],
    old: []
  },
  skillsList: [],
  interestList: [],
  isFetch: false,
  jwt_token: ''
};

// getters
const getters = {
  getMain: state => state.main,
  getPath: state => state.path,
  getSkillsList: state => state.skillsList,
  getInterestList: state => state.interestList,
  getSkills: state => state.skills.old,
  getInterest: state => state.interest.old,
  getIsFetch: state => state.isFetch
};

const mutationTypes = {
  SET_STATE: 'SET_STATE',
  SET_MAIN: 'SET_MAIN',
  SET_PATH: 'SET_PATH',
  SET_SKILLS_LIST: 'SET_SKILLS_LIST',
  SET_INTEREST_LIST: 'SET_INTEREST_LIST',
  SET_SKILLS: 'SET_SKILLS',
  SET_INTEREST: 'SET_INTEREST',
  SET_ISFETCH: 'SET_ISFETCH',
  SET_JWT: 'SET_JWT',
  SET_LEVEL: 'SET_LEVEL'
};

// actions
const actions = {
  async firstPart({ commit }, payload) {
    commit(mutationTypes.SET_ISFETCH, true);

    let result = await createAuthRequest('post', '/api/v1/registration/email', payload);

    if (result.error_code !== 0) {
      commit(mutationTypes.SET_ISFETCH, false);
      throw result.error_message;
    }

    commit(mutationTypes.SET_JWT, result.response.token);
    commit(mutationTypes.SET_MAIN, payload);
    commit(mutationTypes.SET_ISFETCH, false);
  },
  async fetchSkills({ commit }) {
    let result = await createRequest('get', '/api/v1/skills');
    commit(mutationTypes.SET_SKILLS_LIST, result.response);
  },
  async fetchInterest({ commit }) {
    let result = await createRequest('get', '/api/v1/interests');
    commit(mutationTypes.SET_INTEREST_LIST, result.response);
  },
  async fetchSignUp({ state }) {
    await createRequest('post', '/api/v1/skills', {
      existed: state.skills.existed,
      new: state.skills.new
    });
    await createRequest('post', '/api/v1/interests', {
      existed: state.interest.existed,
      new: state.interest.new
    });
  }
};

// mutations
const mutations = {
  // payload is parameter that mutation takes. Can be any shape
  [mutationTypes.SET_STATE](state, payload) {
    state.level = payload.level;
    state.main = { ...payload.main };
    state.path = payload.path;
    state.skills = { ...payload.skills };
    state.interest = { ...payload.interest };
    state.skillsList = [...payload.skillsList];
    state.interestList = [...payload.interestList];
    state.isFetch = payload.isFetch;
    state.jwt_token = payload.jwt_token;
  },
  [mutationTypes.SET_ISFETCH](state, payload) {
    state.isFetch = payload;
  },
  [mutationTypes.SET_JWT](state, payload) {
    state.jwt_token = payload;
    state.level = 1;
  },
  [mutationTypes.SET_LEVEL](state, payload) {
    state.level = payload;
    localStorage.setItem('signUpState', JSON.stringify(state));
  },
  [mutationTypes.SET_MAIN](state, payload) {
    state.main = { ...payload };
    localStorage.setItem('signUpState', JSON.stringify(state));
  },
  [mutationTypes.SET_PATH](state, payload) {
    state.path = payload;
    state.level = 2;
    localStorage.setItem('signUpState', JSON.stringify(state));
  },
  [mutationTypes.SET_SKILLS_LIST](state, payload) {
    state.skillsList = payload;
  },
  [mutationTypes.SET_INTEREST_LIST](state, payload) {
    state.interestList = payload;
  },
  [mutationTypes.SET_SKILLS](state, payload) {
    const newArr = [];
    state.skills.old = payload;
    state.skills.existed = payload.reduce((acc, el) => {
      if (el.is_selected) {
        acc.push(el.id);
        el.children.forEach(item => {
          if (item.new && item.is_selected) {
            newArr.push({
              name: item.name,
              parent_id: el.id
            });
          }
        });
      }
      return acc;
    }, []);
    state.skills.new = newArr;
    state.level = 3;
    localStorage.setItem('signUpState', JSON.stringify(state));
  },
  [mutationTypes.SET_INTEREST](state, payload) {
    const newArr = [];
    state.interest.old = payload;
    state.interest.existed = payload.reduce((acc, el) => {
      if (el.is_selected) {
        acc.push(el.id);
        el.children.forEach(item => {
          if (item.new && item.is_selected) {
            newArr.push({
              name: item.name,
              parent_id: el.id
            });
          }
        });
      }
      return acc;
    }, []);
    state.interest.new = newArr;
    localStorage.setItem('signUpState', JSON.stringify(state));
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
