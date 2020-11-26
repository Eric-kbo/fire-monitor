<template>
  <div class="map-container">
    <baidu-map :zoom="zoom" class="map" center="长沙" @ready="handler"></baidu-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      address: '长沙',
      zoom:12,
    };
  },
  mounted() {
  },
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map);
    }
  },
}
</script>

<style>
/* 地图容器必须设置宽和高属性 */
.map {
  position: fixed;
  top:60px;
  /* left:0 有用，不要删 */
  left: 0px;
  padding: 0;
  width: 100%;
  height: calc(100vh - 116px);
}
</style>

<style scoped>
.map-container {
  position: fixed;
  left: -6px;
  top: -1px;
  width: 100%;
  height: calc(100vh - 120px);
}

</style>