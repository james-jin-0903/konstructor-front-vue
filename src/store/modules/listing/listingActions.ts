
export default {
  async toggleIsListType({ commit, state }) {
    commit('SET_IS_LIST_TYPE', !state.isListType);
  },
};
