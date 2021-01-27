<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">综合展示</van-tabbar-item>
      <van-tabbar-item icon="search">模块</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
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
  }
}
</script>
<style scoped>

</style>