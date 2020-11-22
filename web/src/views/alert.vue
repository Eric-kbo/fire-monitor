<template>
  <div class="alert">
    <ul>
      <li v-for="item in alertList" :key="item.name" @click="goto(item)" class="alert-message">
        <p>{{item.name}}</p>
        <p>{{item.time}}</p>
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
        { name: "湖大三号厨房", time: '2019-10-10 10:24:00' },
        { name: "湖大四号厨房", time: '2019-10-10 10:24:00' },
        { name: "湖大五号厨房", time: '2019-10-10 10:24:00' }
      ],
      rotate: false,
      timer: null
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
  padding-top: 15px;
}
.alert-message {
  text-align: center;
  border-bottom: 1px solid #ccc;
  margin: 0 20px;
  &:active {
    background-color: #ccc;
  }
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