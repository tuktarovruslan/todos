<template lang="pug">
.chkbx
  input(class="inputchkbx"
    type="checkbox"
    :id="id"
    :checked="checked"
    @change="$emit('change', $event)")
  label(class="labelchkbx"
    :for="id")
</template>

<script>
import Vue from 'vue';

const props = {
  id: { type: Number, default: 1},
  checked: { type: Boolean, default: false},
};

export default Vue.extend({
  name: 'TCheckbox',
  props,
});
</script>

<style lang="scss" scoped>
@import '@styles/common';

.chkbx {

  .inputchkbx {
    display: none;
  }

  .labelchkbx {
    @include fnt-simpletext14;
    color: $strongtext;
    display: block;
    position: relative;
    width: 25px;
    height: 25px;
    cursor: pointer;
  }

  .labelchkbx::before {
    @include positioner(row, center, center);
    content: url("/images/icon/checkmark.svg");
    color: transparent;
    position: absolute;
    width: 25px;
    height: 25px;
    padding-right: 1px;
    border-radius: 4px;
    transition: 0.2s;
    background: $workspace;
    border: 2px solid $textlight;
    overflow: hidden;
    left: 0;
    box-sizing: inherit;
  }

  .inputchkbx:checked + .labelchkbx::before {
    background: $textlight;
    transition: 0.2s;
  }

  .labelchkbx:hover::before {
    border: 2px solid $logo;
  }

  .inputchkbx:checked + .labelchkbx:hover::before {
    background: $logo;
  }
}
</style>