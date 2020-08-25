<template lang="pug">
.input-block(:class="classes")
  .input-field
    input(ref="focusInput"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :maxlength="maxlength"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
      @change="$emit('change', $event)"
      @input="$emit('input', $event)")
</template>

<script>
import Vue from 'vue';

const props = {
  type: { type: String, default: 'text'},
  value: { type: String, default: ''},
  placeholder: { type: String, default: ''},
  maxlength: { type: String, default: ''},
  invalid: { type: Boolean, default: false },
};

const classes = function() {
  return {
    invalid: this.invalid,
  };
};

const setFocus = function(vm) {
  if (vm.value == '') {
    vm.$refs.focusInput.focus();
  }
}

export default Vue.extend({
  name: 'TInput',
  props,
  computed: { classes },
  methods: {
    setFocus,
  },
  mounted() {
    setFocus(this)
  },
});
</script>

<style lang="scss" scoped>
@import '@styles/common';

.input-block {

  .input-field {
    @include positioner(row, stretch, center);
    position: relative;

    input {
      @include fnt-pagetext16;
      color: $strongtext;
      transition: 0.2s;
      flex: 1 1 170px;
      height: 35px;
      width: 100%;
      padding: 0px 10px;
      background-color: $barspace;
      border-radius: 5px;
      border: 1px solid $baredge;
      outline: none;
    }
      
    input:focus {
      transition: 0.2s;
      background-color: $barhighlight;
      border: 1px solid $textlight;
    }

    input::placeholder {
      @include fnt-pagetext16;
      color: $comments;
      transition: 0.5s;
    }
  }
}

.input-block.invalid {

  input {
    color: $strongtext;
    transition: 0.2s;
    background-color: rgba(255, 8, 67, 0.05) !important;
    border: 1px solid rgba(255, 8, 67, 0.2);
    outline: none;
  }
      
  input:focus {
    transition: 0.2s;
    background-color: rgba(255, 8, 67, 0.05);
    border: 1px solid rgba(255, 8, 67, 0.2);
  }

  input::placeholder {
    color: $loss;
  }
}
</style>