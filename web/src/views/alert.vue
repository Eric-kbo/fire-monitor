<template>
  <div>
    <h1>ALERT</h1>
    <mt-button class="btn" type="default" size="small" @click="goto">go to detail</mt-button>
  </div>
</template>

<script>
export default {
  name: 'alert',
  methods: {
    goto() {
      this.$router.push({
        name: 'detail'
      });
    }
  },
}
</script>

<style scoped>
.btn {
  display: block;
  margin: 50px auto;
}
</style>