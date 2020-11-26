<template>
  <div class="header">
    <md-toolbar class="nav display-flex">
      <div class="md-title flex_1">
        <img src="../assets/images/logo.png" alt srcset />
        <span class="title">启泰传感</span>
      </div>
      <i class="iconfont iconmenu-fill navicon" @click="openSidebar"></i>
    </md-toolbar>
    <sidebar-vue class="sidebar" v-if="sidebarVisible" @change="closeSidebar"></sidebar-vue>
  </div>
</template>

<script>
import sidebarVue from '../components/sidebar';
export default {
  name: 'headerVue',
  components: {
    sidebarVue
  },
  data() {
    return {
      sidebarVisible: false
    };
  },
  computed: {

  },
  methods: {
    openSidebar() {
      this.sidebarVisible = true;
    },
    closeSidebar() {
      this.sidebarVisible = false;
    }

  },
}
</script>

<style lang="scss" scoped>
.header {
  background-color: #fff;
  z-index: 2;
  width: 100%;
  .nav {
    width: 100%;
    .navicon {
      font-size: 26px;
      color: #444;
      &.active {
        color: #000;
        background-color: #ccc;
      }
    }
  }
  .title {
    vertical-align: bottom;
    font-size: 20px;
    line-height: 40px;
  }
}
</style>