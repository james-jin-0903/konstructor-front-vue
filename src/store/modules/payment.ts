const state = {
  list: [],
  platforms: []
};

const getters = {
  getList: state => state.list,
  getPlatforms: state => state.platforms
};

const actions = {
  async fetchPayment({ commit }) {
    try {
      setTimeout(() => {
        const data = testList;

        commit('SET_LIST', data);
      }, 0.2);
    } catch (error) {
      throw error;
    }
  },
  async fetchPlatforms({ commit }) {
    try {
      setTimeout(() => {
        const data = testPlatforms;

        commit('SET_PLATFORMS', data);
      }, 0.2);
    } catch (error) {
      throw error;
    }
  },
  async addPayment({ commit, state }, props) {
    try {
      let max = 0;
      state.list.forEach(element => {
        if (element.id > max) max = element.id;
      });
      const result = {
        id: max + 1,
        platform: props.platform,
        main: props.main,
        requisites: props.data
      };
      commit('ADD_PAYMENT', result);
    } catch (error) {
      throw error;
    }
  },
  async removePayment({ commit, state }, props) {
    try {
      const index = state.list.findIndex(el => {
        return el.id === props;
      });
      commit('REMOVE_PAYMENT', index);
    } catch (error) {
      throw error;
    }
  },
  async editPayment({ commit, state }, props) {
    try {
      const index = state.list.findIndex(el => {
        return el.id === props.id;
      });
      commit('EDIT_PAYMENT', {
        index: index,
        item: props
      });
    } catch (error) {
      throw error;
    }
  }
};

const mutationTypes = {
  SET_LIST: 'SET_LIST',
  SET_PLATFORMS: 'SET_PLATFORMS',
  ADD_PAYMENT: 'ADD_PAYMENT',
  REMOVE_PAYMENT: 'REMOVE_PAYMENT',
  EDIT_PAYMENT: 'EDIT_PAYMENT'
};

const mutations = {
  [mutationTypes.SET_LIST](state, payload) {
    state.list = payload;
  },
  [mutationTypes.SET_PLATFORMS](state, payload) {
    state.platforms = payload;
  },
  [mutationTypes.ADD_PAYMENT](state, payload) {
    if (payload.main) {
      const result = state.list.map(el => {
        el.main = false;
        return el;
      });
      result.push(payload);
      state.list = result;
    } else state.list.push(payload);
  },
  [mutationTypes.REMOVE_PAYMENT](state, payload) {
    state.list.splice(payload, 1);
  },
  [mutationTypes.EDIT_PAYMENT](state, payload) {
    let result = state.list;
    if (payload.item.main) {
      result = state.list.map(el => {
        el.main = false;
        return el;
      });
    }
    result[payload.index].platform = payload.item.platform;
    result[payload.index].main = payload.item.main;
    result[payload.index].requisites = payload.item.data;
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

const testList = [
  {
    id: 1,
    platform: 'Visa',
    main: false,
    requisites: {
      number: '7456125436889465',
      cvv: 273,
      period: {
        month: '11',
        year: '25'
      }
    }
  },
  {
    id: 2,
    platform: 'Mastercard',
    main: true,
    requisites: {
      number: '7456125436889465',
      cvv: 273,
      period: {
        month: '11',
        year: '25'
      }
    }
  },
  {
    id: 3,
    platform: 'Visario',
    main: false,
    requisites: {
      email: 'yamaaaayka@gmail.com'
    }
  }
];

const testPlatforms = [
  'Visa',
  'Mastercard',
  'Qiwi',
  'Visage',
  'Qiasawi',
  'Visagssse',
  'Q12iwi',
  'Vis33age'
];
