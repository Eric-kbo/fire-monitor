<template>
  <div>
    <van-nav-bar
        title="启泰传感"
    />
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item replace to="/home" icon="wap-home">综合展示</van-tabbar-item>
      <van-tabbar-item replace to="/gmap" icon="map-marked">GIS模块</van-tabbar-item>
      <van-tabbar-item replace to="/realtime" icon="underway">实时告警</van-tabbar-item>
      <van-tabbar-item replace to="/history" icon="browsing-history">数据中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "BasicLayout",
  created() {
    const token = localStorage.getItem('chntek-token')
    if (!token) {
      this.$router.push({
        path: '/login'
      })
    }
  }, data() {
    return {
      active: 0,
    };
  },
}
</script>
<style scoped>

</style>