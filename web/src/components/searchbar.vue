<template>
  <div class="search-bar">
    <md-field>
      <md-input class="search-input" v-model="model.search" placeholder="请输入设备名称,用逗号分隔"></md-input>
    </md-field>
    <md-button @click="change">{{btnTitle}}</md-button>
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
      handler(newV) {
        this.model.search = newV.search.replace(/，/g, ',');
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
  margin-top: 10px;
  padding: 5px 5px 5px 10px;
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
  .md-ripple {
    padding: 0;
  }
  .search-button {
    padding: 0;
    height: 32px;
    margin-right: 5px;
    .md-ripple {
      z-index: 1;
    }
  }
  .md-button {
    border: 1px solid #666;
  }
}
</style>