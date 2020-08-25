<template lang="pug">
.container
  t-checkbox.mid(:id="task.id"
        :checked="task.completed"
        @change="task.completed = $event.target.checked")
  .text-container
    transition(name="modal")
      .pos(v-if="!editing"
          :class="classes")
        .text {{task.text}}
      t-input.pos(:value="task.text"
        placeholder="Новая задача"
        v-if="editing"
        @input="changeTaskText(task, $event.target.value)"
        @change="changeTaskText(task, $event.target.value)"
        @blur="checkEmptyTask(task)")
  svg.edit(@click="editing = !editing")
    use(xlink:href='/images/icon/edit.svg#edit')
  svg.remove(@click="removeTask(task)")
    use(xlink:href='/images/icon/remove.svg#remove')

</template>

<script>
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

import TInput from '@vuecomps/TInput';
import TCheckbox from '@vuecomps/TCheckbox';

const changeTaskText = function(task, value) {
  this.$emit('changeTaskText', task, value);
};

const checkEmptyTask = function(task, value) {
  if (!task.text) {
    this.$emit('removeTask', task);
  }
};

const removeTask = function(task) {
  this.$emit('removeTask', task);
};

const setupEventHandlers = function(vm) {
  const outsideClickHandler = (event) => {
    if (!vm.$el.contains(event.target)) {
      vm.editing = false;
    }
  };

  window.addEventListener('mouseup', outsideClickHandler);
};

const props = {
  task: { type: Object, required: true},
};

const classes = function() {
  return {
    done: this.task.completed,
  };
};

const initialEditing = function(vm) {
  if (vm.task.text == '') {
    vm.editing = true
  }
};

export default Vue.extend({
  name: 'TTask',
  data() {
    return {
      editing: false,
    };
  },
  props,
  computed: {
    ...mapState([
      'todos',
    ]),
    classes,
  },
  methods: {
    changeTaskText,
    checkEmptyTask,
    removeTask,
    setupEventHandlers,
    initialEditing,
  },
  mounted() {
    setupEventHandlers(this),
    initialEditing(this)
  },
  components: {
    TInput,
    TCheckbox,
  },
});
</script>

<style lang="scss" scoped>
@import '@styles/app';
@import '@styles/task';
</style>