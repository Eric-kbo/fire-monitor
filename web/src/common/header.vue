<template>
  <div class="header">
    <md-toolbar class="nav display-flex">
      <h2 class="md-title flex_1">
        <img src="../assets/images/logo.png" alt srcset />
        <span class="title">启泰传感</span>
      </h2>
      <md-button class="md-icon-button" @click="openSidebar">
        <md-icon>
          <i class="iconfont iconcaidan navicon"></i>
        </md-icon>
      </md-button>
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
      font-size: 22px;
      color: #000;
    }
  }
  .title {
    vertical-align: bottom;
    line-height: 40px;
  }
}
</style>