// Client-side route management
import Vue from 'vue'
import VueRouter from 'vue-router'

import TApp from '@vuecomps/TApp'
import TTodos from '@vuecomps/TTodos'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'root',
      component: TApp,
      redirect: '/todos'
    },
    { 
      path: '/todos',
      name: 'todos',
      component: TTodos
    },
  ]
});

export default router; 
