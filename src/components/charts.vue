<template>
  <div id="charts">
    <div id="main" class="charts_main" ref="canvas"></div>
  </div>
</template>
<script>
import { drawEchars } from '../utils/util'
export default {
  name: 'Charts',
  props: ['datas'],
  data() {
    return {
      option: {
        title: {
          text: 'Fig'
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'none',
            symbolSize: 25,
            roam: true,
            label: {
              show: true
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [5, 10],
            edgeLabel: {
              fontSize: 13
            },
            data: [],
            links: [],
            lineStyle: {
              width: 2,
            },
            textStyle: {
              fontSize: 20
            }
          }
        ]
      }
    }
  },
  mounted() {
    const { nodes, links } = drawEchars(this.datas)
    this.option.series[0].data = nodes
    this.option.series[0].links = links
    const myChart = this.$echarts.init(document.querySelector('#main'))
    myChart.setOption(this.option)
  }
}
</script>
<style scoped>
.charts_main {
  width: 600px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
}
</style>
