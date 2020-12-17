<template>
  <div class="stat">


    <div class="datePicker">
      <div class="display-flex date">
        <label for="dateStart">先选择一个起始日期：</label>
        <input class="data-input flex_1" id="dateStart" type="date" v-model="dateStart" />
      </div>
      <div class="display-flex date">
        <label for="dateEnd">再选择一个截止日期：</label>
        <input class="data-input flex_1" id="dateEnd" type="date" v-model="dateEnd" />
      </div>
    </div>

    <searchbar :options="{btnText:'点这里查询'}" :model="params" @change="search($event)"></searchbar>
    <div>

    </div>
    <table class="table">
      <tbody>
        <tr class="head">
          <th>设备编号</th>
          <th>温度(℃)</th>
          <th>水压(Mpa)</th>
          <th>电量(%)</th>
          <th>检测时间</th>
        </tr>
        <tr v-for="(item,index) in list" :key="index">
          <td>{{item.id}}</td>
          <td>{{item.temperature}}</td>
          <td>{{item.hydraulic_pressure}}</td>
          <td>{{item.energy}}</td>
          <td>{{item.time}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
 
<script>
import searchbar from "../components/searchbar";
import chartVue from "../components/chartfor";
export default {
  name: 'log',
  components: {
    searchbar,
    chartVue
  },
  data() {
    return {
      dateStart: new Date().toISOString().slice(0, 10),
      dateEnd: new Date().toISOString().slice(0, 10),
      list: [],
      params:null
    };
  },
  created() {
    // 初始化日期为一个月前到当天
    let timestamp1 = Date.now();
    let timestamp2 = timestamp1 - 30 * 24 * 3600 * 1000;
    this.dateStart = new Date(timestamp2).toISOString().slice(0, 10);
    this.dateEnd = new Date(timestamp1).toISOString().slice(0, 10);
    // 获取本地数据
    this.getLocalParams();
  },
  methods: {
    getLocalParams() {
      let params = JSON.parse(localStorage.getItem('paramsStat'));
      // 如果保存有查询参数则直接调用
      if (params) {
        this.search(params);
        this.params = params
      }
    },
    async search(params) {
      if (params.devices.length) {
        params.dateStart = this.dateStart;
        params.dateEnd = this.dateEnd;
        localStorage.setItem('paramsStat', JSON.stringify(params));
        this.$chntek.transDeviceStatusHistory(params.devices, params.dateStart, params.dateEnd).then(res => {
          this.list = res;
        });
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.stat {
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  .datePicker {
    margin: 0 10px;
    z-index: 1;
    .date {
      margin: 10px 0;
      height: 28px;
      line-height: 28px;
    }
  }
}

.table {
  margin: 0 10px 70px 10px;
  border-collapse: collapse;
  font-size: 12px;
  .head {
    background-color: #ccc;
  }
  th,
  td {
    border: 1px solid #666;
    text-align: center;
  }
}
</style>