<template lang="pug">
.container
  .title {{id}}
  .content
    span {{completed}}
    .text
      t-input(:value="task.text"
        @input="changeTaskText(task, $event.target.value)"
        @change="changeTaskText(task, $event.target.value)") Таска
    svg.edit
      use(xlink:href='/images/icon/edit.svg#edit')
    svg.remove(@click="removeTask(task)")
      use(xlink:href='/images/icon/remove.svg#remove')

</template>

<script>
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

import TInput from '@vuecomps/TInput';

const changeTaskText = function(task, value) {
  this.$emit('changeTaskText', task, value);
};

const removeTask = function(task) {
  this.$emit('removeTask', task);
};

const props = {
  task: { type: Object, required: true},
};

export default Vue.extend({
  name: 'TTask',
  data() {
    return {
      id: this.task.id,
      text: this.task.text,
      completed: this.task.completed
    };
  },
  props,
  computed: {
    ...mapState([
      'todos',
    ]),
  },
  methods: {
    changeTaskText,
    removeTask,
  },
  components: {
    TInput,
  },
});
</script>

<style lang="scss" scoped>
@import '@styles/app';
@import '@styles/task';
</style>