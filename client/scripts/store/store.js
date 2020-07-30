// Client-side state management
import Vue from 'vue';
import Vuex from 'vuex';

import {
  mailMomentLocalGetter,
  mailMomentLocalSetter
} from '@store/localmanager';

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      mailMoment: mailMomentLocalGetter() || 0,
    };
  },
  getters : {
    isLoggedIn: state => !!state.token,
    isVerified: state => state.user.confirmed,
  },
  mutations: {
    authSuccess(state, { token, user }) {
      state.authStatus = 'authorized';
      state.token = token;
      state.user = user;
    }
  },
});