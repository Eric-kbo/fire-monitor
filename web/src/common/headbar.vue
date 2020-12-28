<template>
  <div>
    <div class="md-toolbar-section-start" v-if="$route.name!='detail'">
      <img src="../assets/images/logo.png" />
      <span class="md-title">启泰传感</span>
    </div>
    <div v-else class="md-toolbar-section-start">
      <md-button @click="goback()" class="back-button">
        <md-icon class="iconfont iconfanhui"></md-icon>
      </md-button>
      <span class="location">{{$route.params.location ? $route.params.location:'未获取到地点'}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headbarVue',
  props: {
    model: {
      type: [Object]
    }
  },
  methods: {
    menuChange() {
      this.model.menuVisible = !this.model.menuVisible;
    },
    goback() {
      this.$router.go(-1);
    }
  },
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
}
.back-button {
  width: 40px;
  min-width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #efefef;
}
.location {
  max-width: calc(100vw - 120px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.md-title {
  vertical-align: baseline;
}
</style>