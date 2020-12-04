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

    <searchbar tagTitle="数据中心" btnTitle="点这里查询" :model="searchData" @change="search()"></searchbar>

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
      dateStart: new Date().toISOString().slice(0, 10),
      dateEnd: new Date().toISOString().slice(0, 10),
      searchData: { search: '00017,00018' },
      list: [],
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      // let data = await this.$chntek.transStatistics();
      let data = [{ "title": { "text": "统计信息" }, "legend": { "data": ["00017", "00018"] }, "xAxis": { "data": ["2020-11-16", "2020-11-17", "2020-11-18", "2020-11-19", "2020-11-20", "2020-11-21", "2020-11-22", "2020-11-23", "2020-11-24", "2020-11-25", "2020-11-26", "2020-11-27", "2020-11-28", "2020-11-29", "2020-11-30", "2020-12-01", "2020-12-02"] }, "series": [{ "name": "00017", "type": "line", "data": [0, 0, 4, 4, 4, 1, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0] }, { "name": "00018", "type": "line", "data": [4, 12, 12, 12, 12, 13, 11, 9, 10, 10, 13, 10, 11, 12, 12, 12, 12] }] }];
      this.list = JSON.parse(JSON.stringify(data));
      console.log(this.list);
    },
    async search() {
      // this.list = await this.$chntek.transStatistics();
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
      height: 28px;
      line-height: 28px;
    }
  }
}
.list {
  margin-top: 20px;
}
</style>