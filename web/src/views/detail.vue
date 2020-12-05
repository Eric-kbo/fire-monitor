<template>
  <div class="detail">
    <div class="display-flex alert-message">
      <div class="icon-box">
        <i class="iconfont iconjinggao alert-logo"></i>
      </div>
      <div class="flex_1">
        <p>设备: {{model.id}}</p>
        <p>地点: {{model.location==0?'未获取到地点':model.location}}</p>
        <p>类型: {{model.warning_type}}</p>
        <p class="text-right time">{{model.date_time}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data() {
    return {
      model: {}
    };
  },
  methods: {

  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.model = to.params;
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