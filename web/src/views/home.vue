<template>
  <div class="home">
    <searchbar tagTitle="综合显示" btnTitle="查找" :model="searchData" @change="search()"></searchbar>
    <ul class="list">
      <li class="item" v-for="(item,index) in list" :key="index">
        <chart-vue :option="item"></chart-vue>
      </li>
    </ul>
    <table class="table">
      <thead class="thead"></thead>
      <tbody>
        <tr class="first-row">
          <th v-for="(item,index) in tableData.title" :key="index">{{item}}</th>
        </tr>
        <tr v-for="(item,index) in tableData.data" :key="index">
          <td v-for="(val,key) in item" :key="key">{{val}}</td>
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
      // 搜索关键字
      searchData: { search: '00017,00018' },
      // 图表相关数据
      list: [],
      // 表格的数据
      tableData: {
        title: ['a', 'b', 'c', 'd'],
        data: []
      }
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.getHistory();
    },
    search() {
      this.getHistory();
    },
    async getHistory() {
      // let params = {
      //   ids: this.searchData.search,
      //   date: this.date
      // };
      // this.list = await this.$chntek.transDeviceStatus(params.ids, params.date);
      let data = [{ "title": { "text": "压力" }, "legend": { "data": ["00017", "00018"] }, "xAxis": { "data": ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"] }, "series": [{ "name": "00017", "type": "line", "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }, { "name": "00018", "type": "line", "data": [0, "0.116", "0.116", "0.116", "0.116", "0.116", "0.116", "0.117", "0.117", "0.117", "0.117", "0.117", "0.117", "0.117", "0.117", "0.117", "0.117", "0.117", "0.117", "0.117", "0.117", "0.117", "0.117", "0.117"] }] }, { "title": { "text": "电量" }, "legend": { "data": ["00017", "00018"] }, "xAxis": { "data": ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"] }, "series": [{ "name": "00017", "type": "line", "data": [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100] }, { "name": "00018", "type": "line", "data": [100, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99] }] }];
      this.list = JSON.parse(JSON.stringify(data));
    },

  },
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 60px;
}

.list {
  width: 100%;
  margin-top: 20px;
  .item {
    text-align: center;
    border-bottom: 1px solid #eee;
  }
}

.table {
  margin: 10px;
  text-align: center;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid #ccc;
  }
  .first-row {
    background-color: #eee;
  }
}
</style>