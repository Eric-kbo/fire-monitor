<template>
  <div class="search-bar">
    <span>{{tagTitle}}</span>
    <input class="search-input" v-model="model.search" placeholder="请输入设备名称,用逗号分隔" autocomplete />
    <button class="searchBtn" @click="change">{{btnTitle}}</button>
  </div>
</template>

<script>
export default {
  name: 'searchbar',
  props: {
    tagTitle: {
      type: [String]
    },
    btnTitle: {
      type: [String]
    },
    model: {
      type: [String, Object]
    }
  },
  watch: {
    model: {
      handler() {
        this.model.search = this.model.search.replace(/，/g, ',');
      },
      deep: true
    }
  },
  methods: {
    change() {
      this.$emit('change');
    }
  },

}
</script>

<style lang="scss" scoped>
.search-bar {
  width: 100%;
  height: 36px;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  vertical-align: middle;
  text-align: center;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
  z-index: 1;
  .search-input {
    margin: 0 10px;
    height: 24px;
    min-width: 180px;
    vertical-align: middle;
    border: none;
    border-bottom: 1px solid #666;
    outline: none;
    &:focus {
      border-bottom: 1px solid #000;
    }
  }
  .searchBtn {
    user-select: none;
    height: 24px;
    padding: 0 10px;
    box-sizing: border-box;
    border: none;
    box-shadow: 1px 1px 1px 0px #ccc;
    &:active {
      box-shadow: 0px 0px 2px 2px #ccc;
      background-color: #ddd;
    }
  }
}
</style>