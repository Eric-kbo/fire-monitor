<template>
  <div>
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script>
export default {
  name: 'chart',
  props: {
    option: {
      type: [Object, Array],
    }
  },
  data() {
    return {
      echart: {},
    };
  },
  watch: {
    option: {
      handler() {
        this.init();
      },
      deep: true
    }
  },
  mounted() {
    // 初始化图表
    this.init();
  },
  methods: {
    init() {
      this.echart = this.$echarts.init(this.$refs.chart);
      // 设置默认参数
      let defaultO = {
        // 下载功能(不确定是否需要)
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        // 设置canvas的grid布局
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        // y轴统一设置为value
        yAxis: {
          type: 'value'
        },
      };
      // 合并外部接口传入的参数
      if (this.option) {
        let option = Object.assign(defaultO, this.option);
        this.echart.setOption(option);
      }
      // 让图表自适应(APP不需要，浏览器需要)
      // window.addEventListener("resize", () => {
      //   this.echart.resize();
      // });
    }
  }
}

</script>

<style scoped>
.chart {
  width: 100vw;
  height: 50vw;
}
</style>