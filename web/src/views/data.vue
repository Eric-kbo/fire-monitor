<template>
  <div class="log">
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

    <searchbar tagTitle="数据中心" btnTitle="点这里查询" :model="log" @change="search()"></searchbar>

    <ul class="list">
      <li class="item" v-for="(item,index) in list" :key="index">
        <chart-vue :option="item"></chart-vue>
      </li>
    </ul>
  </div>
</template>
 
<script>
import searchbar from "../components/searchbar";
import chartVue from "../components/chart";
export default {
  name: 'log',
  components: {
    searchbar,
    chartVue
  },
  data() {
    return {
      dateStart: new Date(),
      dateEnd: new Date(),
      log: { search: '' },
      list: [{
        title: {
          text: '压力'
        },
        legend: {
          data: ['直接访问', '搜索引擎']
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        series: [
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }],
    };
  },
  methods: {
    search() {
      console.log(this.log.search);
    }
  },

}
</script>

<style lang="scss" scoped>
.log {
  padding-top: 10px;
  padding-bottom: 60px;
  .datePicker {
    margin: 0 10px;
    z-index: 1;
    .date {
      margin: 10px 0;
    }
  }
}
.list {
  margin-top: 20px;
}
</style>