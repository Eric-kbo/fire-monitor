<template>
  <div class="alert">
    <h4>历史告警列表</h4>
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
    <div v-if="warningList.length" class="bottom-box">
      <md-button class="decOneDay" @click="decOneDay()">点击查询更多</md-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  data () {
    return {
      timestamp: new Date(),
      warningList: []
    }
  },
  created () {
    this.decOneDay()
  },
  methods: {
    async decOneDay () {
      this.timestamp -= 24 * 3600 * 1000
      const params = {
        date: new Date(this.timestamp).toISOString().slice(0, 10)
      }
      console.log(params)
      this.getHistory(params)
    },
    async getHistory (params) {
      const result = await this.$chntek.transWarningListOfMonths(params.date)
      this.warningList.push(...result)
      console.log(this.warningList)
    },
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

.bottom-box {
  margin-top: 10px;
  margin-bottom: 70px;
  display: flex;
  justify-content: center;

  .decOneDay {
    width: 80%;
    background-color: #eee;
  }
}
</style>
