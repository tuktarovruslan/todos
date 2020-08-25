<template lang="pug">
.todos
  .emptylist(v-if="emptyList") У Вас пока нет созданных заметок
  t-todo-card(v-for="(todo, i) in todos"
    :todo="todo"
    :key="i"
    @removeTodo="removeTodo")
  .btncontainer
    router-link.addbtn(to="/todo/new")
      svg.plus
        use(xlink:href='/images/icon/add.svg#add')
</template>

<script>
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

import TTodoCard from '@vuecomps/TTodoCard';

const emptyList = function() {
  return this.todos.length == 0 ? true : false
};

export default Vue.extend({
  name: 'TTodos',
  computed: {
    ...mapState([
      'todos',
    ]),
    emptyList,
  },
  methods: {
    ...mapActions([
      'removeTodo',
    ]),
  },
  components: {
    TTodoCard,
  },
  metaInfo: {
    title: 'Список дел',
  },
});
</script>

<style lang="scss" scoped>
@import '@styles/todos';
</style>