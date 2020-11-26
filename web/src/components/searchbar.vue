<template>
  <div class="search-bar">
    <md-field>
      <!-- <label>{{tagTitle}}</label> -->
      <md-input class="search-input" v-model="model.search" placeholder="请输入设备名称,用逗号分隔"></md-input>
    </md-field>
    <md-button class="md-elevation-2" @click="change">{{btnTitle}}</md-button>
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
  padding: 10px;
  padding-right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  .search-input {
    border-bottom: 1px solid #666;
    height: 36px;
    &:focus {
      border-bottom: 1px solid #000;
    }
  }
  .search-button {
    padding: 0;
    height: 32px;
    background-color: #eee;
    box-shadow: -1px 1px 1px 1px #ccc;
  }
  .md-button{
    .md-ripple{
      z-index: 1;
    }
  }
  
}
</style>