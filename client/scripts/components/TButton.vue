<template lang="pug">
button.btn(:type="type"
  :class="classes"
  @click="$emit('click', $event)")
  .btnname 
    slot
</template>

<script>
import Vue from 'vue';

const props = {
  type: { type: String, default: ''},
  upper: { type: Boolean, default: false },
  shadowed: { type: Boolean, default: false },
  fill: { type: Boolean, default: false },
  litetext: { type: Boolean, default: false },
  inactive: { type: Boolean, default: false },
};

const classes = function() {
  return {
    upper: this.upper,
    shadowed: this.shadowed,
    fill: this.fill,
    litetext: this.litetext,
    inactive: this.inactive,
  };
};

export default Vue.extend({
  name: 'TButton',
  props,
  computed: { classes },
});
</script>

<style lang="scss" scoped>
@import '@styles/common';

.btn {
  @include positioner(row, center, center);
  height: 50px;
  border-radius: 26px;
  border: 3px solid $textlight;
  background-color: transparent;
  cursor: pointer;
  transition: 0.2s;
  outline: none;
  text-decoration: none;

  .btnname {
    @include fnt-text16b;
    color: $textlight;
    text-decoration: none;
    padding: 0px 22px 1px;
    transition: 0.2s;
  }
}

.btn:hover {
  background-color: $textlight;

  .btnname {
    color: $workspace;
  }
}

.btn:active {
  border: 3px solid $textlightclk;
  transition: 0.1s;
}

.upper {
  .btnname {
    text-transform: uppercase;
    padding: 0px 22px 0px;
  }
}

.shadowed:hover {
  box-shadow: $plateshadow;
}

.litetext {
  .btnname {
    @include fnt-pagetext16;
  }
}

.fill {
  background-color: $textlight;

  .btnname {
    color: $workspace;
  }
}

.fill:hover {
  border: 3px solid $logo;
  background-color: $logo;
}

.fill:active {
  border: 3px solid $logoclk;
}

.inactive {
  border: 3px solid $comments;
  background-color: $comments;
  cursor: default;

  .btnname {
    color: $workspace;
  }
}

.inactive:hover {
  border: 3px solid $comments;
  background-color: $comments;
}

.inactive:active {
  border: 3px solid $comments;
}
</style>