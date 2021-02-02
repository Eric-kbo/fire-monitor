<template>
  <div class="small">
    <canvas id="myChart" width="400px" height="400px"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: 'HomeChart',
  data() {
    return {
      myChart: new Chart()
    }
  },

  mounted() {
    var ctx2 = document.getElementById('myChart')

    this.myChart = new Chart(ctx2, {
      type: 'line',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: [
          {
            label: 'CSCB0000003',
            backgroundColor: 'rgba(225,10,10,0.3)',
            borderColor: 'rgba(225,103,110,1)',
            borderWidth: 1,
            pointStrokeColor: '#fff',
            pointStyle: 'crossRot',
            data: [65, 59, 65, 81, 56, 10, 40, 22, 32, 54, 10, 30],
            cubicInterpolationMode: 'monotone',
            spanGaps: 'false',
            fill: 'false'
          },
          {
            label: 'CSCB0000002',
            backgroundColor: 'rgba(30,168,255,0.3)',
            borderColor: 'rgba(30,168,255,1)',
            borderWidth: 1,
            pointStrokeColor: '#fff',
            pointStyle: 'crossRot',
            data: [10, 40, 22, 32, 54, 10, 30, 65, 59, 65, 81, 56],
            cubicInterpolationMode: 'monotone',
            spanGaps: 'false',
            fill: 'false'
          }
        ]
      },
      options: {}

    })
  }
}
</script>

<style scoped>

</style>
