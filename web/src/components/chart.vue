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
        layout: 'vertical',
        title: {
          text: '',
          show: true,// 控制标题显示
          bottom: -2,
          left: -2,
          textStyle: {
            fontSize: 14
          },
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          //  控制图表边距
          top: '30%',
          right: '3%',
          bottom: '3%',
          left: '3%',
          containLabel: true
        },
        legend: {
          data: []
        },
        xAxis: {
          data: [],
          boundaryGap: false,
          axisLabel: {
            interval: 0,
            rotate: 0,
            formatter: (value, index) => {
              if (index % 2 != 0) {
                return '\n' + value.slice(0, 2);
              }
              else {
                return value.slice(0, 2);
              }
            }
          },
        },
        // y轴统一设置为value
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '',
            type: 'line',
            data: []
          }
        ]
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
      // 初始化
      this.echart = this.$echarts.init(this.$refs.chart);
      if (this.option.title.text == '统计') {
        this.defaultO.xAxis.axisLabel.formatter = (value, index) => {
          if (index % 2 != 0) {
            return '\n' + value.slice(8);
          }
          else {
            return value.slice(8);
          }
        };
      }
      // 默认配置
      this.echart.setOption(this.defaultO);
      // 外部配置

      if (this.option) this.echart.setOption(this.option);
      // 让图表自适应(APP不需要，浏览器需要)
      window.addEventListener("resize", () => {
        this.echart.resize();
      });
    },

  }
}

</script>

<style scoped>
.chart {
  height: 40vw;
}
</style>