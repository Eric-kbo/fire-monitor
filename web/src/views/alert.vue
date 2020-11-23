<template>
  <div class="alert">
    <h4>告警列表-{{mode=="current"?'当天':'历史'}}</h4>
    <ul>
      <li v-for="item in alertList" :key="item.name" @click="goto(item)" class="alert-message">
        <div class="display-flex">
          <div class="iconfont iconjinggao alert-logo"></div>
          <div class="flex_1">
          <p>{{item.name}}</p>
          <p>{{item.location}}</p>
          <p class="text-right time">{{item.time}}</p>
          </div>
       
        </div>
      </li>
    </ul>
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
      alertList: [
        {name:'设备A', location: "湖大三号厨房", time: '2019-10-10 10:24:00' },
        {name:'设备B', location: "湖大四号厨房", time: '2019-10-10 10:24:00' },
        {name:'设备C', location: "湖大五号厨房", time: '2019-10-10 10:24:00' }
      ],
      rotate: false,
      timer: null,
      mode:'history'
    };
  },
  methods: {
    goto(item) {
      this.$router.push({
        name: 'detail',
        params: item
      });
    },
    switchDate() {
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
  padding: 15px 10px 10px 10px;
  h4{
    margin: 10px 0;
  }
}
.alert-message {
  text-align: left;
  border-bottom: 1px solid #ccc;
  margin: 0 20px;
  padding: 0 10px;
  align-items: center;
  p{
    height: 20px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  &:active {
    background-color: #ccc;
  }
  .alert-logo{
    color: rgb(235, 38, 38);
    font-size: 30px;
    line-height: 50px;
    margin: 0 10px 0 0;
  }
  .time{
    color:rgb(7, 160, 109)  }
}
.switchDate {
  z-index: 1;
  position: fixed;
  display: block;
  right: 20px;
  bottom: 100px;
  justify-self: flex-end;
  box-shadow: 0 0 1px 1px #ccc;
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
</style>