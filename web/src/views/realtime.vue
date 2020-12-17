<template>
  <div class="alert">
    <h4>实时监控列表</h4>
    <div class="total-box">
      <div class="total-item">
        <p>
          <img class="img" :src="totalUrl" />
        </p>
        <p>总数</p>
        <p>{{sum}}</p>
      </div>
      <div class="total-item">
        <p>
          <img class="img" :src="normalUrl" />
        </p>
        <p>正常</p>
        <p>{{normal}}</p>
      </div>
      <div class="total-item">
        <p>
          <img class="img" :src="abnormalUrl" />
        </p>
        <p>异常</p>
        <p>{{abnormal}}</p>
      </div>
    </div>
    <list-vue :warningList="warningList"></list-vue>
    <p class="tips" v-if="warningList.length">没有更多了</p>
  </div>
</template>

<script>
import listVue from "../components/list";
export default {
  name: 'alert',
  components: {
    listVue
  },
  data() {
    return {
      sum: '',
      normal: '',
      abnormal: '',
      warningList: [],
      totalUrl: require('@/assets/images/total.png'),
      normalUrl: require('@/assets/images/normal.png'),
      abnormalUrl: require('@/assets/images/abnormal.png'),
    };
  },
  mounted() {
    this.$chntek.notify = (obj) => {
      this.$store.commit('setNotify', JSON.parse(JSON.stringify(obj)));
    };
  },
  computed: {
    notify() {
      return this.$store.state.Notify;
    }
  },
  watch: {
    notify(newV) {
      console.log('-----', newV);
      this.warningList = newV.warnings;
      this.sum = newV.sum;
      this.normal = newV.normal;
      this.abnormal = newV.abnormal;
    }
  },
}
</script>

<style lang="scss" scoped>
.alert {
  padding: 5px;
  h4 {
    margin: 10px;
  }
}
.icon-info {
  font-size: 26px;
}

.total-box {
  display: flex;
  justify-content: space-around;
  .total-item {
    text-align: center;
  }
  .img {
    width: 36px;
  }
}

.tips{
  text-align: center;
  margin-top: 30px;
  margin-bottom: 80px;
}
</style>