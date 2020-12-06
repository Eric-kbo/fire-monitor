<template>
  <div class="alert">
    <h4>告警列表-{{history == true ?'历史':'当天'}}</h4>
    <list-vue :warningList="warningList"></list-vue>
    <div v-if="warningList.length" class="bottom-text">
      <p class="text-center" v-if="!history">没有更多了</p>
      <md-button class="addMonth" @click="decMonth()" v-else>点击查询更多</md-button>
    </div>
    <md-button class="md-fab md-clean switchDate" :class="{'rotate-go':rotate}">
      <i class="iconfont icon iconhistory" @click="switchMode"></i>
    </md-button>
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
      year: new Date().getFullYear(),
      date: new Date(),
      month: new Date().getMonth() + 1,
      warningList: [],
      rotate: false,
      timer: null,
      history: false
    };
  },
  created() {
    this.getToday();
  },
  methods: {
    async getToday() {
      this.warningList = await this.$chntek.transWarningListOfToday();
    },
    async getMonth(params) {
      let list = await this.$chntek.transWarningListOfMonths(params);
      this.warningList.push(...list);
    },
    async decMonth() {
      this.month -= 1;
      if (this.month == 0) {
        this.year -= 1;
        this.month = 12;
      }
      let params = this.year + '-' + (this.month < 10 ? '0' + this.month : this.month) + '-01';
      console.log(params);
      this.getMonth(params);
    },
    switchMode() {
      this.history = !this.history;
      this.animation();
      if (this.history) {
        let params = this.year + '-' + (this.month < 10 ? '0' + this.month : this.month) + '-01';
        this.warningList = [];
        this.getMonth(params);
      } else {
        this.getToday();
      }
    },
    // 旋转动画
    animation() {
      this.rotate = true;
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.rotate = false;
      }, 300);
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
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
  .addMonth {
    width: 80%;
    background-color: #eee;
  }
}
</style>