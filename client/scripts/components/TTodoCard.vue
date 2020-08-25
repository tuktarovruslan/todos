<template lang="pug">
.todocard
  .cardhead
    .title {{todo.title}}
    .icons
      svg.edit(@click="edit(todo)")
        use(xlink:href='/images/icon/edit.svg#edit')
      svg.remove(@click="modalRmVisible = true")
        use(xlink:href='/images/icon/remove.svg#remove')
      transition(name="modal")
        t-modal(v-if="modalRmVisible"
          modalTitle="Удаление заметки"
          @closeAction="modalRmVisible = false"
          @okBtnAction="removeTodo(todo)")
          p Вы уверены, что хотите удалить заметку?
  .content
    t-task-card.taskcard(v-for="task in todo.tasks"
        :task="task"
        :key="task.id")

</template>

<script>
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

import TModal from '@vuecomps/TModal';
import TTaskCard from '@vuecomps/TTaskCard';

const edit = function(todo) {
  const tdnum = this.todos.indexOf(todo) + 1;
  this.$router.push(`/todo/${tdnum}`);
};

const removeTodo = function(todo) {
  this.modalRmVisible = false;
  this.$emit('removeTodo', todo.id);
};

const props = {
  todo: { type: Object, required: true},
};

export default Vue.extend({
  name: 'TTodoCard',
  data() {
    return {
      modalRmVisible: false,
    };
  },
  props,
  computed: {
    ...mapState([
      'todos',
    ]),
  },
  methods: {
    edit,
    removeTodo,
  },
  components: {
    TModal,
    TTaskCard,
  },
});
</script>

<style lang="scss" scoped>
@import '@styles/app';
@import '@styles/todocard';
</style>