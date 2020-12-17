<template>
  <div class="detail">
    <div class="display-flex alert-message">
      <div class="icon-box">
        <i class="iconfont iconwarn"></i>
      </div>
      <div class="flex_1">
        <p>设备: {{model.id}}</p>
        <p>经纬度: {{model.longitude.slice(0,7)}} {{model.latitude.slice(0,6)}}</p>
        <p>地址: {{model.location==0?'未获取到地址信息':model.location}}</p>
        <p>类型: {{model.warning_type}}</p>
        <p class="text-right time">{{model.time}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data() {
    return {
      model: {},
      history: ''
    };
  },
  methods: {
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.model = to.params;
      console.log(vm.model);
    }
    );
  }
}
</script>

<style lang="scss" scoped>
.detail {
  padding-top: 15px;
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
</style>