import echarts from 'echarts'
import R from 'ramda'
import walden from '../charts/walden'
// __dirname 当前路径
export class Chart {
  constructor(el) {
    echarts.registerTheme('walden', walden)
    this.chart = echarts.init(el, 'walden')
  }
  setChartOption() {
    return R.compose(
      i => this.chart.setOption(i.option),
      i => require(`./${i.type}/${i.name}`)
    )
  }
  clear() {
    this.chart.clear()
  }
  getData() {
    const option = this.chart.getOption()
    let arr1 = []
    const arr2 = option.series
    if (option.xAxis[0].type === 'category') {
      arr1 = option.xAxis[0].data
    } else {
      arr1 = option.yAxis[0].data
    }
    return arr1.map((item, index) => {
      return arr2.map((item2, index2) => {
        return {
          category: item,
          series: {
            legend: item2.name,
            value: item2.data[index]
          }
        }
      })
    })
  }
}
