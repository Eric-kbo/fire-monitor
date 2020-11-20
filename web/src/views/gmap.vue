<template>
  <div class="map-container">
    <iframe class="map" src="./gmap.html"></iframe>
  </div>
</template>

<script>
export default {
  name: 'gmap'
}
</script>

<style scoped>
.map-container {
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.map {
  height: 80vh;
  max-height: 552px;
  margin: 10px 5px;
}
</style>