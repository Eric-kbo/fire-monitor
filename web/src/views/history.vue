<template>
  <div class="alert">
    <h4>历史告警列表</h4>
    <list-vue :warningList="warningList"></list-vue>
    <div v-if="warningList.length" class="bottom-text">
      <md-button class="addMonth" @click="decOneDay()">点击查询更多</md-button>
    </div>
  </div>
</template>

<script>
import listVue from "../components/list";
export default {
  name: 'alert',
  components: {
    listVue
  },
  data() {
    return {
      timestamp: new Date(),
      warningList: [],
    };
  },
  created() {
    this.decOneDay();
  },
  methods: {
    async decOneDay() {
      this.timestamp -= 24 * 3600 * 1000;
      let params = {
          date:new Date(this.timestamp).toISOString().slice(0, 10)
      } 
      console.log(params);
      this.getHistory(params);
    },
    async getHistory(params) {
      let result = await this.$chntek.transWarningListOfMonths(params.date);
      console.log(result);
      this.warningList.push(...result);
    },
  },
}
</script>

<style lang="scss" scoped>
.alert {
  padding: 5px;
  h4 {
    margin: 10px;
  }
}

.switchDate {
  z-index: 1;
  position: fixed;
  display: block;
  right: 20px;
  bottom: 100px;
  justify-self: flex-end;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: none;
  .icon {
    display: block;
    font-size: 26px;
  }
}
.rotate-go {
  animation: reverse 0.3s ease-in;
}
@keyframes reverse {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
.bottom-text {
  margin-top: 10px;
  margin-bottom: 70px;
  display: flex;
  justify-content: center;
  .addMonth {
    width: 80%;
    background-color: #eee;
  }
}
</style>