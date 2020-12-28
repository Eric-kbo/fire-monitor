<template>
  <div class="home">
    <searchbar :options="{btnText:'查找'}" :model="params" @change="search($event)"></searchbar>
    <ul class="charts">
      <li class="item" v-for="(item,index) in chart" :key="index">
        <chart-vue :option="item"></chart-vue>
      </li>
    </ul>
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
import chartVue from '../components/chart';
export default {
  name: 'home',
  components: {
    searchbar,
    chartVue
  },
  data() {
    return {
      date: new Date().toISOString().slice(0, 10),
      // 图表相关数据
      chart: [],
      list: [],
      wait: false,
      message: '',
      params: null
    };
  },
  created() {
    this.getLocalParams();

  },
  methods: {
    getLocalParams() {
      let params = JSON.parse(localStorage.getItem('paramsHome'));
      if (params) {
        this.params = params;
        this.search(params);
      }
    },
    async search(params) {
      if (params.devices.length) {
        params.date = this.date;
        localStorage.setItem('paramsHome', JSON.stringify(params));
        this.$chntek.transDeviceStatus(params.devices, params.date, params.date).then(res => {
          this.chart = res.chart;
          this.chart[0].yAxis = [
            {
              name: "Mpa",
              type: "value"
            }
          ];
          this.list = res.list;
          console.log(this.chart);
          this.wait = false;
        });
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  padding-top: 10px;
}

.charts {
  margin-top: 20px;
  margin-bottom: 20px;
  .item {
    text-align: center;
    border-bottom: 1px solid #eee;
  }
}

.wait {
  width: 100%;
  text-align: center;
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