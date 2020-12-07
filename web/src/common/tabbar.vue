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
    <md-bottom-bar-item @click="goto('warn')" :class="$route.name=='warn'? 'active':'default'">
      <i class="tabbaricon iconfont iconjinggao1"></i>
      <p>告警列表</p>
    </md-bottom-bar-item>
    <md-bottom-bar-item @click="goto('data')" :class="$route.name=='data'? 'active':'default'">
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