<template>
  <mt-tabbar v-model="selected" ref="tabbar" class="tabbar">
    <mt-tab-item id="home">
      <i slot="icon" class="tabbaricon iconfont iconxianshi2"></i>
    </mt-tab-item>
    <mt-tab-item id="gmap">
      <i slot="icon" class="tabbaricon iconfont iconditu1"></i>
    </mt-tab-item>
    <mt-tab-item id="alert">
      <i slot="icon" class="tabbaricon iconfont iconjinggao1"></i>
    </mt-tab-item>
    <mt-tab-item id="log">
      <i slot="icon" class="tabbaricon iconfont iconshujuzhongxin"></i>
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
export default {
  name: 'tabbarVue',
  data() {
    return {
      selected: 'home'
    };
  },
  watch: {
    selected(newV) {
      this.$router.push({
        name: newV
      }).catch(() => { });
    }
  },
}
</script>

<style scoped>
.tabbar {
  z-index: 5;
}
.tabbaricon {
  font-size: 22px;
}
</style>