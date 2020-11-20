<template>
  <mt-tabbar v-model="selected" ref="tabbar">
    <mt-tab-item id="home">
      <i slot="icon" class="tabbaricon iconfont iconhome"></i>
    </mt-tab-item>
    <mt-tab-item id="gmap">
      <i slot="icon" class="tabbaricon iconfont iconditu"></i>
    </mt-tab-item>
    <mt-tab-item id="plot">
      <i slot="icon" class="tabbaricon iconfont iconicon"></i>
    </mt-tab-item>
    <mt-tab-item id="log">
      <i slot="icon" class="tabbaricon iconfont icontubiao"></i>
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
.tabbaricon {
  font-size: 22px;
}
</style>