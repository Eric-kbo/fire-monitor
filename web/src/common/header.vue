<template>
  <div class="header">
    <mt-header class="mt-header" title="标题过长会隐藏后面的内容啊哈哈哈哈">
      <router-link to="/plot" slot="left" v-if="routeName=='detail'">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right">
        <i class="iconfont iconcaidan navicon" @click="openSideBar"></i>
      </mt-button>
    </mt-header>
    <transition name="fade" mode="out-in">
      <sidebar-vue @change="closeSidebar" class="sidebar" v-if="sidebarVisible"></sidebar-vue>
    </transition>
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
    routeName() {
      return this.$route.name;
    }
  },
  methods: {
    openSideBar() {
      this.sidebarVisible = true;
    },
    closeSidebar() {
      this.sidebarVisible = false;
    }
  },
}
</script>

<style scoped>
.header {
  width: 100%;
  z-index: 2;
}
.mt-header {
  width: 100%;
}
.navicon {
  font-size: 22px;
}
.sidebar {
  z-index: 999;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-leave,
.fade-enter-to {
  opacity: 1;
}

.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-leave-active {
  transition: opacity 0.5s;
}
</style>