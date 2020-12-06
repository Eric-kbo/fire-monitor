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
      searchData: { search: '' },
      list: [],
    };
  },
  created() {
    let timestamp1 = Date.now();
    let timestamp2 = timestamp1 - 30 * 24 * 60 * 60 * 1000;
    this.dateStart = new Date(timestamp2).toISOString().slice(0, 10);
    this.dateEnd = new Date(timestamp1).toISOString().slice(0, 10);
    let search = localStorage.getItem('SearchData');
    if (search) {
      this.searchData.search = JSON.parse(search);
      this.search();
    }
  },
  methods: {
    async search() {
      let params = {
        devices: this.searchData.search,
        dateStart: this.dateStart,
        dateEnd: this.dateEnd
      };
      localStorage.setItem('SearchData', JSON.stringify(params.devices));
      console.log(params.devices, params.dateStart, params.dateEnd);
      this.list = await this.$chntek.transStatistics(params.devices, params.dateStart, params.dateEnd);
      console.log(this.list);
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