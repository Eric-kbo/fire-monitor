<template>
  <div class="alert">
    <h4>告警列表-{{yesterday == true ?'历史':'当天'}}</h4>
    <ul>
      <li v-for="item in warningList" :key="item.name" @click="goto(item)" class="alert-message">
        <div class="display-flex">
          <div class="icon-box">
            <i class="iconfont iconjinggao alert-logo"></i>
          </div>
          <div class="text-box flex_1">
            <p>设备: {{item.id}}</p>
            <p>地点: {{item.location==0?'未获取到地点':item.location}}</p>
            <p class="text-right time">{{item.date_time}}</p>
          </div>
        </div>
      </li>
    </ul>
    <p class="text-center bottom-text" v-if="warningList.length">没有更多了</p>
    <md-button class="md-fab md-clean switchDate" :class="{'rotate-go':rotate}">
      <i class="iconfont icon iconhistory" @click="switchDate"></i>
    </md-button>
  </div>
</template>

<script>
export default {
  name: 'alert',
  data() {
    return {
      date: new Date().toISOString().slice(0, 10),
      warningList: [],
      rotate: false,
      timer: null,
      yesterday: false
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let timestamp = Date.now();
      if (this.yesterday) {
        timestamp -= 24 * 60 * 60 * 1000;
      };
      let params = new Date(timestamp).toISOString().slice(0, 10);
      params = '2020-12-03'; // 上线时删除
      this.warningList = await this.$chntek.transWarningList(params);
    },
    goto(item) {
      this.$router.push({
        name: 'detail',
        params: item
      });
    },
    switchDate() {
      this.yesterday = !this.yesterday;
      this.getData();
      // 旋转动画
      this.rotate = true;
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.rotate = false;
      }, 300);
    }
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
}
</style>