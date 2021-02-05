<template>
  <div>
    <van-nav-bar title="启泰传感" :left-arrow="getLeft()"
                 @click-left="onClickLeft"
                 @click-right="onClickRight">
      <template #title>
        <div>
          <img style="height: 47px;display: inline-block;max-width: 100%" src="../assets/images/headerLogo.png"/>
        </div>
      </template>
      <template #right>
        <van-popover
            v-model="showPopover"
            trigger="click"
            :actions="actions"
            @select="onSelect"
            placement="bottom-end"
        >
          <template #reference>
            <van-icon name="wap-nav" color="#000000" size="20"/>
          </template>
        </van-popover>
      </template>
    </van-nav-bar>
    <router-view></router-view>
    <van-tabbar v-model="active">
      <!--      <van-tabbar-item replace to="/home" icon="wap-home">综合展示</van-tabbar-item>-->
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

    this.actions = [{text: '版本1.0', disabled: true}, {text: '更新'}, {text: '注销'}]
  }, data() {
    return {
      active: 0,
      activeKey: 0,
      showPopover: false,
      // 通过 actions 属性来定义菜单选项
      actions: [],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {

    },
    getLeft() {
      const path = this.$route.name;
      switch (path) {
        case 'home':
        case 'gmap':
        case 'history':
        case 'realtime':
          return false;
        default:
          return true;

      }
    },
    onSelect(action) {
      if (action.text === '注销') {
        localStorage.clear();
        this.$router.go(0)
      }
    },
  },
}
</script>
<style scoped>

</style>