<template lang="pug">
.input-block(:class="classes")
  .inp-block-box
    .inp-block-fname
      slot
    .inp-block-notice(ref="drib") {{notification}}
  .input-field
    input(:type="type"
      :value="value"
      :placeholder="placeholder"
      :maxlength="maxlength"
      @focus="$emit('focus', $event)"
      @change="$emit('change', $event)"
      @input="$emit('input', $event)")
</template>

<script>
import Vue from 'vue';
import anime from 'animejs';

function dribble(obj) {
  const dribble = anime.timeline({
    targets: obj,
    direction: 'normal',
    easing: 'easeInOutBounce'
  });

  dribble
  .add({
    translateX: -30,
    duration: 60,
  })
  .add({
    translateX: 0,
    duration: 60,
  },'+=60');
};

function fuckup() {
  const obj = this.$refs.drib;
  if (this.fuckups === 1) { return };
  dribble(obj);
};

const props = {
  type: { type: String, default: 'text'},
  value: { type: String, default: ''},
  placeholder: { type: String, default: ''},
  maxlength: { type: String, default: ''},
  notification: { type: String, default: ''},
  invalid: { type: Boolean, default: false },
  fuckups: { type: Number, default: 0 }
};

const classes = function() {
  return {
    invalid: this.invalid,
  };
};

export default Vue.extend({
  name: 'TInput',
  data() {
    return {

    };
  },
  props,
  computed: { classes },
  methods: {

  },
  watch: {
    fuckups: fuckup,
  },
  components: {

  }
});
</script>

<style lang="scss" scoped>
@import '@styles/common';

.input-block {

  .inp-block-box {
    @include positioner(row, space-between, center);

    .inp-block-fname {
      @include fnt-pagetext18;
      @include clr-headbar;
      padding: 10px 0;
    }

    .inp-block-notice {
      @include fnt-pagetext18;
      @include clr-loss;
      opacity: 0;
      cursor: default;
      padding: 1px 0;
      transition: 0.5s;
    }
  }

  .input-field {
    @include positioner(row, stretch, center);
    position: relative;

    input {
      @include fnt-pagetext18;
      @include clr-strongtext;
      @include hyptransition;
      flex: 1 1 170px;
      height: 52px;
      width: 100%;
      padding: 0px 18px 1px 18px;
      background-color: $barspace;
      border-radius: 5px;
      border: 2px solid $baredge;
      outline: none;
    }
      
    input:focus {
      @include hyptransition;
      background-color: $barhighlight;
      border: 2px solid $textlight;
    }

    input::placeholder {
      @include fnt-pagetext16;
      @include clr-comments;
      transition: 0.5s;
    }
  }
}

.input-block.invalid {

  .inp-block-notice {
    @include fnt-simpletext14;
    @include clr-loss;
    opacity: 1;
    transition: 0.5s;
  }

  input {
    @include clr-strongtext;
    @include hyptransition;
    background-color: rgba(255, 8, 67, 0.05) !important;
    border: 2px solid rgba(255, 8, 67, 0.2);
    outline: none;
  }
      
  input:focus {
    @include hyptransition;
    background-color: rgba(255, 8, 67, 0.05);
    border: 2px solid rgba(255, 8, 67, 0.2);
  }

  input::placeholder {
    @include clr-loss;
  }
}
</style>