// Client-side state management
import Vue from 'vue';
import Vuex from 'vuex';

import {
  todosLocalGetter,
  todosLocalSetter,
  stashesLocalGetter,
  stashesLocalSetter,
} from '@store/localmanager';

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      todos: todosLocalGetter(),
      stashes: stashesLocalGetter(),
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
      state.stashes.push(stash);
      stashesLocalSetter(state.stashes);
    },
    updateStash(state, stash) {
      const position = state.todos.findIndex(t => t.id === stash.id);
      state.stashes[position] = stash;
      stashesLocalSetter(state.stashes);
    },
    removeStash(state, id) {
      state.stashes = state.stashes.filter(s => s.id !== id);
      stashesLocalSetter(state.stashes);
    },
  },
  actions: {
    createTodo({commit}, todo) {
      commit('createTodo', todo);
      commit('createStash', todo);
    },
    updateTodo({commit}, todo) {
      commit('updateTodo', todo);
      commit('updateStash', todo);
    },
    removeTodo({commit}, id) {
      commit('removeTodo', id);
      commit('removeStash', id);
    },
    updateStash({commit}, stash) {
      commit('updateStash', stash)
    },
    removeStash({commit}, id) {
      commit('removeStash', id)
    }
  }
});