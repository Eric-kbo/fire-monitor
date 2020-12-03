<template>
  <div class="detail">
    <md-button @click="goto('warn')">返回</md-button>
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
    goto(name) {
      if (this.$route.name == name) return;
      this.$router.replace({ name });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log(to);
      vm.model = to.params;
    }
    );
  }


}
</script>

<style lang="scss" scoped>
.detail {
  padding-top: 15px;
}
.para {
  text-align: center;
}
.md-button {
  z-index: 1;
  justify-self: flex-start;
  box-shadow: 0 0 2px 2px #ccc;
  .icon {
    display: block;
    font-size: 16px;
  }
}
</style>