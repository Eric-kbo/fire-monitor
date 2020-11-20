<template>
  <div class="log">
    <div class="search-bar">
      <span>数据中心</span>
      <input class="search-input" v-model="search" placeholder="输入设备名称" />
      <button class="searchBtn">统计</button>
    </div>
    <div class="datePick">
      从
      <input id="date1" type="date" />
      到
      <input id="date2" type="date" />
    </div>
    <ul class="list">
      <li class="item" v-for="(item,index) in list" :key="index">
        <chart-vue></chart-vue>
      </li>
    </ul>
  </div>
</template>
 
<script>
import chartVue from "../components/chart";
export default {
  name: 'log',
  components: {
    chartVue
  },
  data() {
    return {
      search: '',
      list: [1, 2, 3],
    };
  }

}
</script>

<style lang="scss" scoped>
.log {
  padding-top: 10px;
  padding-bottom: 60px;
}
.search-bar {
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
.datePick {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>