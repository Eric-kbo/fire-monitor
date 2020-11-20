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
    <sidebar-vue @change="closeSidebar" class="sidebar" v-if="sidebarVisible"></sidebar-vue>
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
}
.mt-header {
  width: 100%;
}
.navicon {
  font-size: 22px;
}

/* .sidebar {
  background-color: #fff;
  border: 1px solid #ccc;
  position: fixed;
  top: 0;
  right: 0;
} */
</style>