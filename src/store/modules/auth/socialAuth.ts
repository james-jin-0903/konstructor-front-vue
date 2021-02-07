import axios from 'axios';
import router from '@/router/index';
import { authRoutesMap, social, AUTH_API_URL } from '@/config';
import { createAuthRequest } from '@/services/http.service';

// initial state
const state = {};

// getters
const getters = {};

// eslint-disable-next-line no-unused-vars
const mutationTypes = {
  SET_SOCIAL: 'SET_SOCIAL'
};

// actions
const actions = {
  async signPinterest({ dispatch, commit }, { token, type }) {
    try {
      const { data } = await axios.get('https://api.pinterest.com/v1/me/', {
        params: {
          access_token: token
        }
      });

      if (type === 'up') {
        let result = await createAuthRequest('post', '/api/v1/registration/social/pinterest', {
          socialId: data.data.id,
          accessToken: token
        });

        commit('signUp/SET_JWT', result.response.token, { root: true });
        router.push(authRoutesMap.signUpPath);

      } else {
        dispatch(
          'signIn/auth',
          {
            type: 'byPinterest',
            socialId: data.data.id,
            accessToken: token
          },
          { root: true }
        );
      }

    } catch (e) {
      if (type === 'up') {
        router.push(authRoutesMap.signUp);
      } else {
        router.push(authRoutesMap.signIn);
      }
    }
  },
  async signFacebook({ commit }, { code, type }) {
    try {
      const { data } = await axios.get('https://graph.facebook.com/v5.0/oauth/access_token', {
        params: {
          client_id: social.facebook.client_id,
          client_secret: social.facebook.secret,
          code: code,
          redirect_uri: `${window.location.origin}/sign/${type}/${social.facebook.redirect}`
        }
      });

      const token = data.access_token;

      const result = await axios.get('https://graph.facebook.com/me/', {
        params: {
          access_token: token
        }
      });

      await commit(mutationTypes.SET_SOCIAL, {
        socialId: result.data.id,
        accessToken: token
      });

      return true;
    } catch (error) {
      return false;
    }
  }
};

// mutations
const mutations = {
  // payload is parameter that mutation takes. Can be any shape
  [mutationTypes.SET_SOCIAL](state, payload) {
    state.data = { ...payload };
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
