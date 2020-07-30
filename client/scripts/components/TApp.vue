<template lang="pug">
transition(name="pagechange" mode="out-in")
  router-view
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'TApp',
});
</script>

<style lang="scss" scoped>
@import '@styles/common';
@import '@styles/app';
</style>