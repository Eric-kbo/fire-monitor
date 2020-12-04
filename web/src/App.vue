<template>
  <div id="app">
    <header-vue class="header"></header-vue>
    <keep-alive>
      <router-view class="view"></router-view>
    </keep-alive>
    <tabbar-vue class="tabbar"></tabbar-vue>
  </div>
</template>

<script>

import headerVue from './common/header.vue';
import tabbarVue from './common/tabbar.vue';

export default {
  name: 'App',
  data() {
    return {
      menuVisible: false
    };
  },
  components: {
    headerVue,
    tabbarVue
  },
}
</script>

<style lang="scss" scoped>
#app {
  width: 100vw;
  .header {
    position: fixed;
    top: 0;
  }
  .view {
    margin-top: 50px;
    padding-bottom: 100px;
  }
  .tabbar {
    position: fixed;
    bottom: 0;
  }
}
</style>
