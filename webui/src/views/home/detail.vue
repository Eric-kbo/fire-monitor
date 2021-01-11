<template>
  <div class="detail">
    <div class="display-flex alert-message" v-for="(item,index) in model" :key="index">
      <div class="icon-box">
        <i class="iconfont iconwarn"></i>
      </div>
      <div class="flex_1">
        <p>设备: {{ item.id }}</p>
        <p>经纬度: {{ item.longitude.slice(0, 7) }} {{ item.latitude.slice(0, 6) }}</p>
        <p>地址: {{ item.location == 0 ? '未获取到地址信息' : item.location }}</p>
        <p>类型: {{ item.warning_type }}</p>
        <p class="text-right time">{{ item.time }}</p>
      </div>
    </div>
    <div class="bottom-box">
      <p>没有更多了</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data () {
    return {
      model: {},
      history: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
          vm.model = to.params.children
          console.log(vm.model)
        }
    )
  }
}
</script>

<style lang="scss" scoped>
.detail {
  padding-top: 15px;
  padding-bottom: 80px;

  .alert-message {
    margin-top: 20px;
  }
}

.para {
  text-align: center;
}

.md-button {
  border: 1px solid #666;
}

.bottom-box {
  margin-top: 10px;
  margin-bottom: 70px;
  display: flex;
  justify-content: center;
}
</style>
