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
  getOption() {
    return this.chart.getOption()
  }
  setOption(option) {
    this.chart.setOption(option)
  }
  getData() {
    const option = this.chart.getOption()
    const data = option.series.map(item => {
      return item.data
    })
    let category = []
    if (option.xAxis[0].type === 'category') {
      category = option.xAxis[0].data
    } else {
      category = option.yAxis[0].data
    }
    const legend = option.legend[0].data
    data.unshift(category)
    const tempArr = data[0].map((col, i) => {
      return data.map((row) => {
        return row[i]
      })
    })
    legend.unshift('')
    tempArr.unshift(legend)
    return tempArr
  }
  setTitle(title) {
    const option = this.chart.getOption()
    option.title = title
    this.chart.setOption(option)
  }
  setXAxis(xAxis) {
    let temp = JSON.parse(JSON.stringify(xAxis))
    const option = this.chart.getOption()
    temp = this.lineOrBarFormat(option, temp)
    option.xAxis[0]['name'] = temp.name
    option.xAxis[0]['nameRotate'] = temp.nameRotate
    option.xAxis[0]['nameLocation'] = temp.nameLocation
    option.xAxis[0]['axisLabel'] = temp.axisLabel
    this.chart.setOption(option)
  }
  setYAxis(yAxis) {
    let temp = JSON.parse(JSON.stringify(yAxis))
    const option = this.chart.getOption()
    temp = this.lineOrBarFormat(option, temp)
    option.yAxis[0]['name'] = temp.name
    option.yAxis[0]['nameRotate'] = temp.nameRotate
    option.yAxis[0]['nameLocation'] = temp.nameLocation
    option.yAxis[0]['axisLabel'] = temp.axisLabel
    this.chart.setOption(option)
  }
  lineOrBarFormat(option, temp) {
    option.yAxis[0]['nameLocation'] = temp.nameLocation
    if (option.yAxis[0].type === 'category') {
      temp.axisLabel.formatter = {}
    }
    switch (temp.nameLocation) {
      case '开始':
        temp.nameLocation = 'start'
        break
      case '中间':
        temp.nameLocation = 'center'
        break
      case '结尾':
        temp.nameLocation = 'end'
        break
      default:
        temp.nameLocation = 'center'
        break
    }
    return temp
  }
  setGrid(grid) {
    const option = this.chart.getOption()
    option.grid = grid
    this.chart.setOption(option)
  }
  setData(data) {
    const option = this.chart.getOption()
    const category = data.shift()
    category.shift()
    option.legend[0].data = category
    const tempArr = data[0].map((col, i) => {
      return data.map((row) => {
        return row[i]
      })
    })

    if (option.xAxis[0].type === 'category') {
      option.xAxis[0].data = tempArr.shift()
    } else {
      option.yAxis[0].data = tempArr.shift()
    }
    tempArr.forEach((item, index) => {
      if (!option.series[index]) {
        option.series[index] = option.series[0]
      }
      option.series[index].data = item.map(item2 => {
        return Number(item2)
      })
      option.series[index].name = category[index]
    })
    this.chart.setOption(option)
  }
}
