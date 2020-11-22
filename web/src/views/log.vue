<template>
  <div class="log">
    <div class="datePick">
      <span>从</span>
      <input class="date-input" id="date1" type="date" />
      <span>到</span>
      <input class="date-input" id="date2" type="date" />
    </div>
    <searchbar tagTitle="数据中心" btnTitle="统计" :model="log" @change="search()"></searchbar>
    <ul class="list">
      <li class="item" v-for="(item,index) in list" :key="index">
        <chart-vue></chart-vue>
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
      log: { search: '' },
      list: [1],
    };
  },
  methods: {
    search() {
      console.log(this.log.search);
    }
  },

}
</script>

<style lang="scss" scoped>
.log {
  padding-top: 10px;
  padding-bottom: 60px;
}

.datePick {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px 10px 0;
  .date-input {
    height: 20px;
    min-width: 120px;

    vertical-align: center;
  }
  span {
    margin: 0 5px;
  }
}
</style>