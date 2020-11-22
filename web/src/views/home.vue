<template>
  <div class="home">
    <searchbar tagTitle="综合显示" btnTitle="查找" :model="home" @change="search()"></searchbar>
    <ul class="list">
      <li class="item" v-for="(item,index) in list" :key="index">
        <chart-vue></chart-vue>
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
      // 设备数量极其相关数据
      list: [1, 2, 3],
      tableData: {
        title: ['a', 'b', 'c', 'd'],
        data: [[1, 4, 4, 34], [745, 163, 743, 41], [46, 746, 646, 46], [456, 46, 67, 76]]
      }
    };
  },
  methods: {
    search() {
      console.log(this.home.search);
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