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
      option: {
        title: {
          text: ''
        },
        color: [],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        grid: {
          left: '2%',
          right: '5%',
          top: '20%',
          bottom: '3%',
          // 是否显示刻度标签 如果是true 就显示 否则反之
          containLabel: true
        },
        series: [{
          data: [100, 500, 600, 934, 888, 956, 999],
          type: 'line'
        }]
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const myChart = this.$echarts.init(this.$refs.chart);
      let option = this.option;
      // 随机数据
      option.series[0].data = option.series[0].data.map(() => {
        return Math.floor(Math.random() * 999);
      });
      // 随机类型
      let randomType = Math.floor(Math.random() * 4);
      switch (randomType) {
        case 0:
          option.series[0].areaStyle = {};
          option.series[0].smooth = true;
          break;
        case 1:
          option.series[0].smooth = true;
          break;
        case 2:
          option.series[0].areaStyle = {};
          break;
        default:
          break;
      }
      // 随机颜色
      const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += arr[Math.floor(Math.random() * 16)];
      }
      console.log(color);
      option.color[0] = color;
      myChart.setOption(option);
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