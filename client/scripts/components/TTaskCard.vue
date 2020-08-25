<template lang="pug">
.text(:class="classes") {{task.text}}
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';

import TInput from '@vuecomps/TInput';
import TCheckbox from '@vuecomps/TCheckbox';

const props = {
  task: { type: Object, required: true},
};

const classes = function() {
  return {
    done: this.task.completed,
  };
};

export default Vue.extend({
  name: 'TTaskCard',
  props,
  computed: {
    ...mapState([
      'todos',
    ]),
    classes,
  },
});
</script>

<style lang="scss" scoped>
@import '@styles/app';
@import '@styles/taskcard';
</style>