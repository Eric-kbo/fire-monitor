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
    let search = localStorage.getItem('SearchHome');
    if (search) {
      this.searchData.search = JSON.parse(search);
      this.search();
    }
  },
  methods: {
    async search() {
      let params = {
        devices: this.searchData.search,
        date: this.date
      };
      params.date = '2020-12-03';  //  上线时删除
      localStorage.setItem('SearchHome', JSON.stringify(params.devices));
      console.log(params.devices, params.date);
      this.list = await this.$chntek.transDeviceStatus(params.devices, params.date);
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