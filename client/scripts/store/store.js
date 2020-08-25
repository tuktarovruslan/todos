// Client-side state management
import Vue from 'vue';
import Vuex from 'vuex';

import {
  todosLocalGetter,
  todosLocalSetter,
  stashLocalGetter,
  stashLocalSetter,
} from '@store/localmanager';

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      todos: todosLocalGetter(),
      stash: stashLocalGetter(),
    };
  },
  getters : {

  },
  mutations: {
    createTodo(state, todo) {
      state.todos.push(todo);
      todosLocalSetter(state.todos);
    },
    updateTodo(state, todo) {
      const position = state.todos.findIndex(t => t.id === todo.id);
      state.todos[position] = todo;
      todosLocalSetter(state.todos);
    },
    removeTodo(state, id) {
      state.todos = state.todos.filter(t => t.id !== id);
      todosLocalSetter(state.todos);
    },
    createStash(state, stash) {
      state.stash = stash;
      stashLocalSetter(state.stash);
    },
    removeStash(state) {
      state.stash = null;
      stashLocalSetter(state.stash);
    },
  },
  actions: {
    createTodo({commit}, todo) {
      commit('createTodo', todo);
      commit('createStash', todo);
    },
    updateTodo({commit}, todo) {
      commit('updateTodo', todo);
      commit('createStash', todo);
    },
    removeTodo({commit}, id) {
      commit('removeTodo', id);
      commit('removeStash', id);
    },
    createStash({commit}, stash) {
      commit('createStash', stash)
    },
    removeStash({commit}) {
      commit('removeStash')
    }
  }
});