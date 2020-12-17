<template>
  <div class="sidebar">
    <md-toolbar class="md-transparent" md-elevation="0">
      <img src="../assets/images/logo.png" />
    </md-toolbar>
    <md-list>
      <md-list-item class="route" :class="$route.name=='home'? 'active':''">
        <md-icon class="tabbaricon iconfont iconxianshi2"></md-icon>
        <span id="home" @click="goto('home')">综合显示</span>
      </md-list-item>
      <md-list-item class="route" :class="$route.name=='gmap'? 'active':''">
        <md-icon class="tabbaricon iconfont iconditu1"></md-icon>
        <span id="gmap" @click="goto('gmap')">GIS模块</span>
      </md-list-item>
      <md-list-item class="route" :class="$route.name=='realtime'? 'active':''">
        <md-icon class="tabbaricon iconfont iconshishijiankong"></md-icon>
        <span id="alert" @click="goto('realtime')">实时监控</span>
      </md-list-item>
       <md-list-item class="route" :class="$route.name=='history'? 'active':''">
        <md-icon class="tabbaricon iconfont iconjinggao1"></md-icon>
        <span id="alert" @click="goto('history')">历史告警</span>
      </md-list-item>
      <md-list-item class="route" :class="$route.name=='stat'? 'active':''">
        <md-icon class="tabbaricon iconfont iconshujuzhongxin"></md-icon>
        <span id="stat" @click="goto('stat')">数据中心</span>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
export default {
  name: 'sidebarVue',
  methods: {
    goto(name) {
      this.$emit('change');
      if (this.$route.name == name) return;
      this.$router.replace({ name });
    }
  },
}
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: #fff;
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 50vw;
  max-width: 200px;
  .md-list-item-text {
    text-align: center;
  }
  span {
    text-align: left;
  }
  .route {
    padding: 0;
    &:hover {
      background-color: rgb(200, 255, 255);
    }
    &.active {
      background-color: rgb(200, 255, 255);
    }
  }
}
</style>