<template>
  <div>
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script>
export default {
  name: 'chart',
  props: {
    // option: {
    //   type: [Object]
    // }
  },
  data() {
    return {
      echart: {},
      option: {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['直接访问', '搜索引擎']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    };
  },
  mounted() {
    // 初始化图表
    this.init();
    // 让图表自适应
    window.addEventListener("resize", () => {
      this.echart.resize();
    });
  },
  methods: {
    init() {
      this.echart = this.$echarts.init(this.$refs.chart);
      // 暂时使用本地数据
      let option = this.option;
      // 随机数据
      option.series.forEach((element, index) => {
        option.series[index].data = element.data.map(() => {
          return Math.floor(Math.random() * 999);
        });
      });
      this.echart.setOption(option);
    }
  },
}
</script>

<style scoped>
.chart {
  width: 100vw;
  height: 50vw;
}
</style>