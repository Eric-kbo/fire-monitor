<template>
  <div class="mask" @click="close">
    <ul class="sidebar">
      <li id="home" @click="goto('home')">
        <i slot="icon" class="tabbaricon iconfont iconhome"></i>
        主页
      </li>
      <li id="gmap" @click="goto('gmap')">
        <i slot="icon" class="tabbaricon iconfont iconditu"></i>
        地图
      </li>
      <li id="plot" @click="goto('plot')">
        <i slot="icon" class="tabbaricon iconfont iconicon"></i>
        图表
      </li>
      <li id="log" @click="goto('log')">
        <i slot="icon" class="tabbaricon iconfont icontubiao"></i>
        日志
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'sidebarVue',
  methods: {
    close() {
      this.$emit('change');
    },
    goto(name) {
      if (this.$route.name == name) return;
      this.$router.push({ name });
    }
  },
}
</script>

<style scoped>
div.mask {
  position: fixed;
  display: block;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 199;
}
.sidebar {
  cursor: pointer;
  background-color: #fff;
  position: fixed;
  top: 0;
  right: 0;
  width: 50vw;
  height: 100vh;
  z-index: 299;
  border: 1px solid #ccc;
  border-right: none;
}
.sidebar li {
  height: 8vh;
  line-height: 8vh;
  text-align: center;
  border-bottom: 1px solid #ccc;
}
.sidebar li:hover {
  color: #0aa284;
}
</style>