<template>
  <div class="page-container">
    <md-app md-mode="fixed">
      <md-app-toolbar class="md-primary header display-flex">
        <headbar-vue></headbar-vue>
        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button" @click="menuChange()">
            <md-icon class="iconfont iconmenu-fill"></md-icon>
          </md-button>
        </div>
      </md-app-toolbar>
      <md-app-drawer :md-active.sync="menuVisible" :md-right="true">
        <sidebar-vue @change="menuChange()"></sidebar-vue>
      </md-app-drawer>
      <md-app-content>
        <keep-alive>
          <router-view class="view"></router-view>
        </keep-alive>
      </md-app-content>
    </md-app>
    <tabbar-vue class="tabbar"></tabbar-vue>
  </div>
</template>

<script>

import headbarVue from '../common/headbar.vue'
import tabbarVue from '../common/tabbar.vue'
import sidebarVue from '../common/sidebar.vue'

export default {
  name: 'App',
  data () {
    return {
      menuVisible: false
    }
  },
  components: {
    headbarVue,
    tabbarVue,
    sidebarVue
  },
  mounted () {
    this.$chntek.notify = (obj) => {
      this.$store.commit('setNotify', JSON.parse(JSON.stringify(obj)))
    }
  },
  methods: {
    menuChange () {
      this.menuVisible = !this.menuVisible
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .md-app {
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100vw;

  &.md-fixed .md-app-scroller {
    overflow-x: hidden;
  }

  .md-app-content {
    padding: 0;
    margin: 0;
    width: 100vw;
    min-height: 50%;

    .view {
      padding: 0;
      margin: 0;
      width: 100vw;
    }
  }

  .md-drawer {
    width: 50vw;
    max-width: 200px;
  }
}

.header {
  height: 60px;
}

.tabbar {
  position: fixed;
  bottom: 0;
}
</style>
