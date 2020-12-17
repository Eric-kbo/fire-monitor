<template>
  <ul class="list">
    <li v-for="(item,index) in warningList" :key="index" @click="goto(item)" class="alert-message">
      <div class="display-flex">
        <div class="icon-box">
          <i class="iconfont iconwarn"></i>
        </div>
        <div class="text-box flex_1">
          <p>设备: {{item.id}}</p>
          <p>地点: {{item.location==0?'未获取到地点':item.location}}</p>
          <p class="text-right time">{{item.time}}</p>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>

export default {
  name: 'list',
  props: {
    warningList: {
      type: [Array, Object]
    }
  },
  methods: {
    // 路由跳转
    goto(item) {
      this.$router.push({
        name: 'detail',
        params:item,
      });
    },
  },
}
</script>

<style lang="scss" scoped>
.list{
  padding-bottom: 10px;
}
.iconwarn{
  font-size: 24px;
  color: red;
}
</style>