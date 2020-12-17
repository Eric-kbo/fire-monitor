<template>
  <md-bottom-bar class="tabbar">
    <md-bottom-bar-item @click="goto('home')" :class="$route.name=='home'? 'active':'default'">
      <i class="tabbaricon iconfont iconxianshi2"></i>
      <p>综合显示</p>
    </md-bottom-bar-item>
    <md-bottom-bar-item @click="goto('gmap')" :class="$route.name=='gmap'? 'active':'default'">
      <i class="tabbaricon iconfont iconditu1"></i>
      <p>GIS模块</p>
    </md-bottom-bar-item>
    <md-bottom-bar-item @click="goto('realtime')" :class="$route.name=='realtime'? 'active':'default'">
      <i class="tabbaricon iconfont iconshishijiankong"></i>
      <p>实时监控</p>
    </md-bottom-bar-item>
     <md-bottom-bar-item @click="goto('history')" :class="$route.name=='history'? 'active':'default'">
      <i class="tabbaricon iconfont iconjinggao1"></i>
      <p>历史告警</p>
    </md-bottom-bar-item>
    <md-bottom-bar-item @click="goto('stat')" :class="$route.name=='stat'? 'active':'default'">
      <i class="tabbaricon iconfont iconshujuzhongxin"></i>
      <p>数据中心</p>
    </md-bottom-bar-item>
  </md-bottom-bar>
</template>

<script>
export default {
  name: 'tabbarVue',
  data() {
    return {

    };
  },
  methods: {
    goto(name) {
      if (this.$route.name == name) return;
      this.$router.replace({ name });
    }
  },
}
</script>

<style lang="scss" scoped>
.tabbar {
  background-color: #fff;
  p {
    margin: 8px 0 0 0;
    font-size: 12px;
  }
}
.active {
  color: rgb(14, 180, 180);
  background-color: rgba(14, 180, 180, 0.1);
}
.default {
  color: #444;
  background-color: #fff;
}
.tabbaricon {
  font-size: 24px;
  line-height: 1;
}
</style>