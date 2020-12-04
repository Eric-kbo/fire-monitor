<template>
  <div class="mask" @click="close">
    <ul class="sidebar">
      <h4 class="img-container">
        <!-- <img src="../assets/images/logo.png" alt srcset /> -->
      </h4>
      <li id="home" @click="goto('home')" :class="$route.name=='home'? 'active':''">
        <i slot="icon" class="tabbaricon iconfont iconxianshi2"></i>
        综合显示
      </li>
      <li id="gmap" @click="goto('gmap')" :class="$route.name=='gmap'? 'active':''">
        <i slot="icon" class="tabbaricon iconfont iconditu1"></i>
        GIS模块
      </li>
      <li id="alert" @click="goto('warn')" :class="$route.name=='warn'? 'active':''">
        <i slot="icon" class="tabbaricon iconfont iconjinggao1"></i>
        告警列表
      </li>
      <li id="data" @click="goto('data')" :class="$route.name=='data'? 'active':''">
        <i slot="icon" class="tabbaricon iconfont iconshujuzhongxin"></i>
        数据中心
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
      this.$router.replace({ name });
    }
  },
}
</script>

<style lang="scss" scoped>
div.mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.1);
}
.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 50vw;
  height: 100vh;
  z-index: 4;
  background-color: #fff;
  .img-container {
    text-align: center;
  }
}
.sidebar li {
  height: 8vh;
  line-height: 8vh;
  text-align: center;
}
.active {
  color: rgb(14, 180, 180);
  background-color: rgba(14, 180, 180, 0.1);
}
</style>