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
      defaultO: {
        title: {
          text: ''
        },
        tooltip: {},
        legend: {
          data: []
        },
        xAxis: {
          data: []
        },
        // y轴统一设置为value
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '',
          type: 'bar',
          data: []
        }],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        }
      }
    };
  },
  watch: {
    option: {
      handler() {
        this.init();
      },
      immediate: false,
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
      // 合并外部接口传入的参数
      if (this.option) {
        this.echart.setOption(Object.assign(this.defaultO, this.option));
      }
      // 让图表自适应(APP不需要，浏览器需要)
      window.addEventListener("resize", () => {
        this.echart.resize();
      });
    }
  }
}

</script>

<style scoped>
.chart {
  display: block;
  width: 100vw;
  height: 50vw;
}
</style>