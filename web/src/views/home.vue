<template>
  <div class="home">
    <searchbar tagTitle="综合显示" btnTitle="查找" :model="searchData" @change="search()"></searchbar>
    <p v-if="wait" class="wait">查询中，等待返回数据</p>
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
      wait: false
    };
  },
  created() {
    let search = JSON.parse(localStorage.getItem('SearchHome'));
    if (search) {
      this.searchData.search = search;
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
      this.wait = true;
      this.$chntek.transDeviceStatus(params.devices, params.date).then(res => {
        // 纯数据Object深度拷贝
        this.list = JSON.parse(JSON.stringify(res));
        this.wait = false;
      });
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
.wait {
  width: 100%;
  text-align: center;
}
</style>