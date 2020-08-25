<template lang="pug">
.modal-space(ref="outside")
  .modal-window
    .m-header
      span {{ modalTitle }}
    .m-content
      slot
    .m-footer
      t-button(fill @click="okBtnAction") {{ okBtnTitle }}
      t-button(fill @click="closeAction") Отменить
</template>

<script>
import Vue from 'vue';

import TButton from '@vuecomps/TButton';

const closeAction = function() {
  return this.$emit('closeAction');
}

const okBtnAction = function() {
  return this.$emit('okBtnAction');
}

const setupEventHandlers = function() {
  const outsideClickHandler = (event) => {
    if (event.target === this.$refs.outside) {
      this.$emit('closeAction')
    }
  };

  window.addEventListener('mouseup', outsideClickHandler);
};

const props = {
  modalTitle: { type: String, default: ''},
  okBtnTitle: { type: String, default: 'Да'},
};

export default Vue.extend({
  name: 'TModal',
  props,
  methods: {
    closeAction,
    okBtnAction,
    setupEventHandlers,
  },
  mounted() {
    this.setupEventHandlers();
  },
  components: {
    TButton,
  }
});
</script>

<style lang="scss" scoped>
@import '@styles/common';

.modal-space {
  @include positioner(row, center, center);
  position: fixed;
  background: rgba(64, 64, 64, 0.4);
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 100;

  .modal-window {
    flex: 0 1 400px;
    border-radius: 5px;
    background: $barspace;
    box-shadow: $windowshadow;
    
    .m-header {
      @include positioner(row, space-between, center);
      padding: 20px 30px;
      border-radius: 5px 5px 0px 0px;
      background: $barspacedark;
      box-shadow: $headshadow;

      span {
        @include fnt-text16b;
        color: $strongtext;
      }
    }
  
    .m-content {
      @include positioner(row, center, center);
      padding: 25px 30px 0px;

      p {
        @include fnt-pagetext16;
        color: $strongtext;
      }
    }
  
    .m-footer {
      @include grid(repeat(2, auto), 1fr);
      @include gcxy(center);
      gap: 40px;
      padding: 40px 30px 40px;
    }
  }
}
</style>