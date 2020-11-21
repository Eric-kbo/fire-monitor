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
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
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
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
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
    this.init();
  },
  methods: {
    init() {
      const myChart = this.$echarts.init(this.$refs.chart);
      let option = this.option;
      // 随机数据
      option.series.forEach((element, index) => {
        option.series[index].data = element.data.map(() => {
          return Math.floor(Math.random() * 999);
        });
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