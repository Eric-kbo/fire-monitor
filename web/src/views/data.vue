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
    <p v-if="wait" class="wait">{{message}}</p>
    <ul class="list">
      <li class="item" v-for="(item,index) in list" :key="index">
        <chart-vue :option="item"></chart-vue>
      </li>
    </ul>
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
      searchData: { search: '' },
      list: [],
      wait: false
    };
  },
  created() {
    // 初始化日期为一个月前到当天
    let timestamp1 = Date.now();
    let timestamp2 = timestamp1 - 30 * 24 * 60 * 60 * 1000;
    this.dateStart = new Date(timestamp2).toISOString().slice(0, 10);
    this.dateEnd = new Date(timestamp1).toISOString().slice(0, 10);
    // 获取本地数据
    this.getLocalParams();
  },
  methods: {
    getLocalParams() {
      let params = JSON.parse(localStorage.getItem('Params'));
      // 如果保存有查询参数则直接调用
      if (params) {
        this.searchData.search = params.devices;
        this.dateStart = params.dateStart;
        this.dateEnd = params.dateEnd;
        this.search();
      }
    },
    async search() {
      if (this.searchData.search) {
        let params = {
          devices: this.searchData.search,
          dateStart: this.dateStart,
          dateEnd: this.dateEnd
        };
        localStorage.setItem('Params', JSON.stringify(params));
        this.wait = true;
        this.mesasge = "查询中，等待返回数据";
        this.$chntek.transStatistics(params.devices, params.dateStart, params.dateEnd).then(res => {
          this.list = JSON.parse(JSON.stringify(res));
          this.wait = false;
        });
      } else {
        this.wait = true;
        this.mesasge = "查询参数不能为空";
      }

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
.wait {
  width: 100%;
  text-align: center;
}
</style>