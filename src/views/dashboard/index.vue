<template>
  <div class="dashboard-container">
    <div id="text" ref="echarts" class="dashboard-text"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Dashboard',
  computed: {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      var myChart = echarts.init(this.$refs.echarts)

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: 'app'
        },
        tooltip: {},
        legend: {
          data: ['销量', '战绩']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {
          type: 'value',
          name: 'y',
          minorTick: {
            show: true
          }
        },
        series: [
          {
            name: '销量',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20]
          },
          {
            name: '战绩',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    width: 500px;
    height: 400px;
  }
}
</style>
