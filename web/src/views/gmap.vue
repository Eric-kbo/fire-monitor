<template>
  <div class="map-container">
    <!-- <iframe id="iframe" src="./iframe/gmap.html"></iframe> -->
  </div>
</template>

<script>
export default {
  name: 'gmap',
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