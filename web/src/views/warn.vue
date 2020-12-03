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
      warningList: [
        {
          id: '00006',
          location: '长沙市浏阳长沙银行古港支行',
          warning_type: '信号低报警、负温标志、压力传感器报警',
          date_time: '2020-12-03 08:39:13'
        },
        {
          id: '00008',
          location: '长沙市浏阳长沙银行集里支行',
          warning_type: '信号低报警、负温标志、水质报警',
          date_time: '2020-12-03 01:43:38'
        },
        {
          id: '00011',
          location: '长沙市望城区望城区管委会主楼3F男卫',
          warning_type: '',
          date_time: '2020-12-03 08:23:34'
        },
        {
          id: '00014',
          location: '长沙市望城区望城区管委会主楼7F男卫',
          warning_type: '低水压',
          date_time: '2020-12-03 07:26:12'
        },
        {
          id: '00014',
          location: '长沙市望城区望城区管委会主楼7F男卫',
          warning_type: '低水压',
          date_time: '2020-12-03 07:26:12'
        },
        {
          id: '00018',
          location: '长沙市浏阳长沙银行浏阳分行',
          warning_type: '低水压',
          date_time: '2020-12-03 07:14:36'
        },
        {
          id: '00020',
          location: '长沙市望城区望城区管委会政务3F东女卫',
          warning_type: '低水压',
          date_time: '2020-12-03 05:02:51'
        },
        {
          id: '00021',
          location: '长沙市望城区望城区管委会政务3F西女卫',
          warning_type: '',
          date_time: '2020-12-03 08:01:44'
        },
        {
          id: '00022',
          location: '长沙浏阳长沙银行浏阳分行',
          warning_type: '信号低报警、负温标志、压力传感器报警',
          date_time: '2020-12-03 08:02:44'
        },
        {
          id: '00027',
          location: '长沙市望城区望城区管委会主楼5F男卫',
          warning_type: '',
          date_time: '2020-12-03 05:25:21'
        },
        {
          id: '00028',
          location: '长沙市望城区望城区管委会主楼1F女卫',
          warning_type: '信号低报警、负温标志、压力传感器报警',
          date_time: '2020-12-03 08:09:53'
        },
        {
          id: '00029',
          location: '长沙市望城区望城区管委会主楼4F男卫',
          warning_type: '',
          date_time: '2020-12-03 08:29:00'
        },
        {
          id: '00033',
          location: '长沙市浏阳长沙银行浏阳分行',
          warning_type: '信号低报警、负温标志、水质报警',
          date_time: '2020-12-03 07:35:11'
        },
        {
          id: '00034',
          location: '长沙市望城区望城区管委会主楼8F男卫',
          warning_type: '低水压',
          date_time: '2020-12-03 01:39:05'
        },
        {
          id: '00036',
          location: '长沙市望城区望城区管委会主楼6F男卫',
          warning_type: '',
          date_time: '2020-12-03 07:26:13'
        },
        {
          id: '00036',
          location: '长沙市望城区望城区管委会主楼6F男卫',
          warning_type: '',
          date_time: '2020-12-03 07:26:13'
        },
        {
          id: '00039',
          location: '长沙市望城区望城区管委会主楼2F男卫',
          warning_type: '信号低报警、负温标志、水质报警',
          date_time: '2020-12-03 05:17:51'
        },
        {
          id: '00055',
          location: 0,
          warning_type: '低水压',
          date_time: '2020-12-03 03:47:45'
        },
        {
          id: '00057',
          location: 0,
          warning_type: '低水压',
          date_time: '2020-12-03 08:01:11'
        },
        {
          id: '00058',
          location: 0,
          id: '00058',
          location: 0,
          warning_type: '低水压',
          date_time: '2020-12-03 04:23:56'
        },
        {
          id: '00059',
          location: 0,
          warning_type: '低水压',
          date_time: '2020-12-03 04:56:22'
        },
        {
          id: '00060',
          location: 0,
          warning_type: '低水压',
          date_time: '2020-12-03 07:06:39'
        }
      ],
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
      console.log(params);
      //  this.warningList = await this.$chntek.transWarningList(params)
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
      // 动画
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
  h4 {
    margin: 10px 0;
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
  box-shadow: 0 0 2px 2px #ccc;
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