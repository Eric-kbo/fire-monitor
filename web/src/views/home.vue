<template>
  <div class="display-flex home">
    <div class="search-bar">
      <span>设备</span>
      <input v-model="search" placeholder="输入设备名称" />
      <button class="searchBtn">查找</button>
    </div>
    <!-- v-infinite-scroll="loadMore" -->
    <ul class="list" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
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
import chartVue from '../components/chart';
export default {
  name: 'home',
  components: {
    chartVue
  },
  data() {
    return {
      list: [1, 2, 3],
      resul: [],
      tableData: {
        title: ['a', 'b', 'c', 'd'],
        data: [[1, 4, 4, 34], [745, 163, 743, 41], [46, 746, 646, 46], [456, 46, 67, 76]]
      }
    };
  },
  methods: {
    // loadMore() {
    //   this.loading = true;
    //   setTimeout(() => {
    //     let last = this.list[this.list.length - 1];
    //     for (let i = 1; i <= 5; i++) {
    //       this.list.push(last + i);
    //     }
    //     this.loading = false;
    //   }, 2500);
    // }
  },
}
</script>

<style>
.home {
  margin-bottom: 50px;
}
.search-bar {
  position: fixed;
  top: 40px;
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  padding: 5px 0;
  z-index: 1;
}
.search-bar input {
  margin: 0 10px;
}
.searchBtn {
  height: 20px;
  line-height: 16px;
}
.list {
  width: 100%;
  margin-top: 20px;
}
.list .item {
  text-align: center;
  border-bottom: 1px solid #eee;
}
.table {
  margin: 10px;
  text-align: center;
  border-collapse: collapse;
}
.table th,
.table td {
  border: 1px solid #ccc;
}
.table .first-row {
  background-color: #eee;
}
</style>