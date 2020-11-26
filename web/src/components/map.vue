<template>
  <div>
    <baidu-map class="map" center="长沙" @ready="handler"></baidu-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      address: '长沙'
    };
  },
  mounted() {

  },
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.center.lng = 116.404;
      this.center.lat = 39.915;
      this.zoom = 15;
    }
  },
}
</script>

<style>
/* 地图容器必须设置宽和高属性 */
.map {
  margin: 0;
  width: 103%;
  height: calc(100vh - 105px);
}
</style>