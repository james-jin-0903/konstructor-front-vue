interface AuthState {
  accessTokenExpDate: string
}

export default {
  namespaced: true,
  state: {
    accessTokenExpDate: ''
  },

  mutations: {
    SET_ATOKEN_EXP_DATE(state: AuthState, expDate: string) {
      state.accessTokenExpDate = expDate;
    }
  }
};
