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
          right: '5%',
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
            formatter: (value) => {
              return value;
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
      // 外部配置
      if (this.option) {
        console.log(this.option.title.text);
        this.echart.clear();
        if (this.option.title.text == '统计') {
          let length = this.option.xAxis.data.length;
          this.defaultO.xAxis.axisLabel.rotate = 60;
          this.defaultO.xAxis.axisLabel.formatter = (value, index) => {
            if (index != 0 && index % Math.floor(length / 5) == 0) {
              return value;
            }
          };
        }
        this.echart.setOption(this.defaultO);
        this.echart.setOption(this.option);

        // this.echart.setOption(this.defaultO);
      }
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
  height: 66vw;
}
</style>