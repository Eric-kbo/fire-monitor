<template>
  <div class="home">
    <div class="search-bar">
      <span>综合显示</span>
      <input class="search-input" v-model="search" placeholder="输入设备名称" />
      <button class="searchBtn">查找</button>
    </div>
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
import chartVue from '../components/chart';
export default {
  name: 'home',
  components: {
    chartVue
  },
  data() {
    return {
      // 搜索关键字
      search: '',
      // 设备数量极其相关数据
      list: [1, 2, 3],
      tableData: {
        title: ['a', 'b', 'c', 'd'],
        data: [[1, 4, 4, 34], [745, 163, 743, 41], [46, 746, 646, 46], [456, 46, 67, 76]]
      }
    };
  },
  methods: {

  },
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  padding-top: 40px;
  padding-bottom: 60px;
  .search-bar {
    position: fixed;
    top: 60px;
    width: 100%;
    height: 50px;
    padding: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    vertical-align: middle;
    text-align: center;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    z-index: 1;
    .search-input {
      margin: 0 10px;
      height: 30px;
      vertical-align: middle;
      border-radius: 2px;
      border: 1px solid #666;
    }
    .searchBtn {
      user-select: none;
      height: 30px;
      border-radius: 2px;
      padding: 0 10px;
      box-sizing: border-box;
      border: 1px solid #666;
      background-color: #eee;
      &:active {
        background-color: rgba(35, 184, 184, 0.63);
      }
    }
  }
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