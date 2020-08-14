<template lang="pug">
.modal-space(ref="outside")
  .modal-window
    .m-header
      span {{ modalTitle }}
    .m-content
      slot
    .m-footer
      t-button(fill @click="closeAction") Отменить
      t-button(fill @click="okBtnAction") {{ okBtnTitle }}
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

const setupEventHandlers = function(vm) {
  const outsideClickHandler = (event) => {
    if (event.target === vm.$refs.outside) {
      vm.$emit('closeAction')
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
  data() {
    return {

    };
  },
  props,
  methods: {
    closeAction,
    okBtnAction,
    setupEventHandlers,
  },
  mounted() {
    setupEventHandlers(this)
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
  position: absolute;
  background: rgba(64, 64, 64, 0.4);
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 100;

  .modal-window {
    position: fixed;
    width: 400px;
    padding: 20px;
    background: red;
    
    
    .m-header {
      @include positioner(row, space-between, center);
    }
  
    .m-content {
      @include positioner(row, center, center);
    }
  
    .m-header {
      @include positioner(row, space-between, center);
    }
  }
}


</style>