<template>
  <div class="detail">
     <md-button @click="goto('alert')">
       返回
    </md-button>
    <h1>Detail</h1>
    <p
      class="para"
    >Lorem ipsum dolor sit amet consectetur adipisicing elit. A quam tempora dignissimos minima? Nihil suscipit, quae perferendis quis minus voluptas molestias optio cum corporis! Accusantium fuga iusto qui doloribus laudantium?</p>
   
  </div>
</template>

<script>
export default {
  name:'detail',
  methods: {
    goto(name){
      this.$router.push({name})
    }
  },
}
</script>

<style lang="scss" scoped>
.detail {
  padding-top: 15px;
}
.para {
  text-align: center;
}
.md-button {
  z-index: 1  ;
  justify-self: flex-start;
  box-shadow: 0 0 2px 2px #ccc;
  .icon {
    display: block;
    font-size: 16px;
  }
}
</style>