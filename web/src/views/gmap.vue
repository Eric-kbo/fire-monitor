<template>
  <div class="map-container">
    <map-vue></map-vue>
  </div>
</template>

<script>
import mapVue from "../components/map";
export default {
  name: 'gmap',
  components: {
    mapVue
  },
  mounted() {

  },
}
</script>

<style scoped>
.map-container {
  position: fixed;
  left: -6px;
  top: -1px;
  width: 100%;
  height: calc(100vh - 120px);
}
#iframe {
  width: 101%;
  height: 100%;
  max-height: 552px;
  margin: 10px 5px;
}
</style>