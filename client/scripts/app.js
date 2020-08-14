import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueMeta from 'vue-meta'

import TApp from '@vuecomps/TApp'

import router from '@router/router';
import store from '@store/store';

Vue.use(Vuelidate);
Vue.use(VueMeta);

const app = new Vue({
  router,
  store,
  el: '#app',
  render: h => h(TApp)
});