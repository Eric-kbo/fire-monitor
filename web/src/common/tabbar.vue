<template>
  <md-bottom-bar class="tabbar">
    <md-bottom-bar-item @click="goto('home')" :class="$route.name=='home'? 'active':''">
      <i class="tabbaricon iconfont iconxianshi2"></i>
    </md-bottom-bar-item>
    <md-bottom-bar-item @click="goto('gmap')" :class="$route.name=='gmap'? 'active':''">
      <i class="tabbaricon iconfont iconditu1"></i>
    </md-bottom-bar-item>
    <md-bottom-bar-item @click="goto('alert')" :class="$route.name=='alert'? 'active':''">
      <i class="tabbaricon iconfont iconjinggao1"></i>
    </md-bottom-bar-item>
    <md-bottom-bar-item @click="goto('log')" :class="$route.name=='log'? 'active':''">
      <i class="tabbaricon iconfont iconshujuzhongxin"></i>
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
      this.$router.push({ name });
    }
  },
}
</script>

<style scoped>
.tabbar {
  z-index: 5;
  background-color: #fff;
}
.active {
  color: rgb(14, 180, 180);
  background-color: rgba(14, 180, 180, 0.1);
}
.tabbaricon {
  font-size: 22px;
}
</style>