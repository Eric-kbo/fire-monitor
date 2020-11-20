<template>
  <div class="display-flex">
    <h1>HOME</h1>
    <ul class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <li class="item" v-for="(item,index) in list" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      list: [1, 2, 3, 4, 5]
    };
  },
  methods: {
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        let last = this.list[this.list.length - 1];
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i);
        }
        this.loading = false;
      }, 2500);
    }
  },
}
</script>

<style>
.list {
  width: 100%;
}

.list .item {
  text-align: center;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #eee;
}
</style>