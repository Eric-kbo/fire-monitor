<template>
  <div id="app">
    <header-vue class="header"></header-vue>
    <router-view class="view"></router-view>
    <tabbar-vue class="tabbar"></tabbar-vue>
  </div>
</template>

<script>

import headerVue from './common/header.vue';
import tabbarVue from './common/tabbar.vue';

export default {
  name: 'App',
  components: {
    headerVue,
    tabbarVue
  },
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
}
.view {
  margin-top: 40px;
}
.tabbar {
  position: fixed;
  bottom: 0;
}
</style>
