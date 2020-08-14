<template lang="pug">
.container
  t-todo-card(v-for="(todo, i) in todos"
    :todo="todo"
    :key="i"
    @removeTodo="removeTodo")
  router-link.addbtn(to="/todo/new")
    svg.plus
      use(xlink:href='/images/icon/add.svg#add')
</template>

<script>
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

import TTodoCard from '@vuecomps/TTodoCard';

export default Vue.extend({
  name: 'TTodos',
  data() {
    return {

    };
  },
  computed: {
    ...mapState([
      'todos',
    ]),
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