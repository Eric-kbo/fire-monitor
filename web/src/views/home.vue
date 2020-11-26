<template>
  <div class="home">
    <searchbar tagTitle="综合显示" btnTitle="查找" :model="home" @change="search()"></searchbar>
    <ul class="list">
      <li class="item" v-for="(item,index) in list" :key="index">
        {{index}}
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
      // 搜索关键字
      home: { search: '' },
      // 相关数据
      list: [],
      // 表格的数据
      tableData: {
        title: ['a', 'b', 'c', 'd'],
        data: [[1, 4, 4, 34], [745, 163, 743, 41], [46, 746, 646, 46], [456, 46, 67, 76]]
      }
    };
  },
  watch: {
    list: {
      handler() {

      },
      deep: true
    }
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.getHistory();
    },
    getHistory() {
      let params = this.home.search;
      this.$http.getHistory(params).then(res => {
        this.dataTransform(res.data.val);
        // 手动刷新组件，关键
        this.$forceUpdate();
      }).catch((e) => { console.log(e); });
    },
    dataTransform(val) {
      // 定义一个方法取到hour字符
      function getHour(val) {
        // 注意这里是按照空格分开的
        return val.split(' ')[1].slice(0, 2);
      }
      // 拿到每个设备的名字组成的列表
      let deviceNameList = Object.keys(val);
      // 使用这个数组遍历每个设备
      deviceNameList.forEach(deviceName => {
        let deviceData = val[deviceName];
        // 每个设备的数据根据时间顺序原地排序，注意排序比较的次数要比数据长度少一次
        for (let i = 0; i < deviceData.length - 1; i++) {
          if (getHour(deviceData[i].timestamp) - (getHour(deviceData[i + 1].timestamp)) > 0) {
            let temp = deviceData[i];
            deviceData[i] = deviceData[i + 1];
            deviceData[i + 1] = temp;
          }
        }
        // 赋值回去
        val[deviceName] = deviceData;
      });
      // 设备数据排序后，映射到图表
      // 1.定义图表数量
      let chartsNumber = 3;
      for (let i = 0; i < chartsNumber; i++) {
        this.list[i] = {};
      }
      // 2.定义每个图表的名字
      this.list[0].title = { text: "水压" };
      this.list[1].title = { text: "温度" };
      this.list[2].title = { text: "电量" };
      // 遍历图表
      for (let i = 0; i < chartsNumber; i++) {

        // 3.给图表中的每根线命名
        this.list[i].legend = { data: [] };
        this.list[i].legend.data = deviceNameList;
        this.list[i].series = [];
        for (let j = 0; j < deviceNameList.length; j++) {
          this.list[i].series[j] = { name: '' };
          this.list[i].series[j].name = deviceNameList[j];
        }
        // 4.给每根线赋值，有多少设备就有多少线
        let status = '';
        switch (i) {
          case 0:
            status = 'hydraulic_pressure';
            break;
          case 1:
            status = 'temperature';
            break;
          case 2:
            status = 'energy';
            break;
          default:
            break;
        }
        this.list[i].series = [];
        deviceNameList.forEach((deviceName) => {
          let deviceData = val[deviceName];
          let arr = deviceData.map(data => data[status]);
          this.list[i].series.push({ data: arr, type: 'line', name: deviceName });
        });
        // 5.给图表的横轴刻度命名，取出其中一个设备的时间列表
        this.list[i].xAxis = { data: [], type: 'category', boundaryGap: false };
        this.list[i].xAxis.data = val[deviceNameList[0]].map(item => getHour(item.timestamp));
      }

      return this.list;
    },
    search() {
    }
  },
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  padding-top: 10px;
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