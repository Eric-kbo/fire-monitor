<template>
  <div class="home">
    <searchbar tagTitle="综合显示" btnTitle="查找" :model="searchData" @change="search()"></searchbar>
    <ul class="list">
      <li class="item" v-for="(item,index) in list" :key="index">
        <chart-vue :option="item"></chart-vue>
      </li>
    </ul>
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
      searchData: { search: '' },
      // 图表相关数据
      list: [],
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      // 上线时删除
      let params = {
        ids: '00006,00008,00018',
        date: this.date
      };
      params.date = '2020-12-03';  //  上线时删除
      this.list = await this.$chntek.transDeviceStatus(params.ids, params.date);
    },
    async search() {
      let params = {
        ids: this.searchData.search,
        date: this.date
      };
      params.date = '2020-12-03';  //  上线时删除
      this.list = await this.$chntek.transDeviceStatus(params.ids, params.date);
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
.list {
  margin-top: 20px;
  margin-bottom: 60px;
  .item {
    text-align: center;
    border-bottom: 1px solid #eee;
  }
}
</style>