<template>
  <div class="alert">
    <h4>实时监控列表</h4>
    <div class="total-box">
      <div class="total-item">
        <p>
          <img class="img" :src="totalUrl"/>
        </p>
        <p>总数</p>
        <p>{{ sum }}</p>
      </div>
      <div class="total-item">
        <p>
          <img class="img" :src="normalUrl"/>
        </p>
        <p>正常</p>
        <p>{{ normal }}</p>
      </div>
      <div class="total-item">
        <p>
          <img class="img" :src="abnormalUrl"/>
        </p>
        <p>异常</p>
        <p>{{ abnormal }}</p>
      </div>
    </div>
    <li v-for="(item,index) in warningList" :key="index" @click="goto(item)" class="alert-message">
      <div class="display-flex">
        <div class="icon-box">
          <i class="iconfont iconwarn"></i>
        </div>
        <div class="text-box flex_1">
          <p>设备: {{ item.id }}</p>
          <p>地点: {{ item.location == 0 ? '未获取到地点' : item.location }}</p>
          <p>数量:{{ item.children.length }}</p>
          <p class="text-right time">{{ item.time }}</p>
        </div>
      </div>
    </li>
    <p class="tips" v-if="warningList.length">没有更多了</p>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  data () {
    return {
      sum: '0',
      normal: '0',
      abnormal: '0',
      warningList: [],
      totalUrl: require('@/assets/images/total.png'),
      normalUrl: require('@/assets/images/normal.png'),
      abnormalUrl: require('@/assets/images/abnormal.png')
    }
  },
  computed: {
    notify () {
      return this.$store.state.Notify
    }
  },
  watch: {
    notify (newV) {
      console.log('-----', newV)
      console.log(newV)
      this.warningList = newV.warnings
      this.sum = newV.sum
      this.normal = newV.normal
      this.abnormal = newV.abnormal
    }
  },
  created () {
    this.$chntek.syncingWarnings()
  },
  methods: {
    // 路由跳转
    goto (item) {
      this.$router.push({
        name: 'detail',
        params: item
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.alert {
  padding: 5px;

  h4 {
    margin: 10px;
  }
}

.icon-info {
  font-size: 26px;
}

.total-box {
  display: flex;
  justify-content: space-around;

  .total-item {
    text-align: center;
  }

  .img {
    width: 36px;
  }
}

.tips {
  text-align: center;
  margin-top: 30px;
  margin-bottom: 80px;
}
</style>
