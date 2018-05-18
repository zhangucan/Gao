<template>
  <el-row style="margin-top:10px;">
    <el-col :span="7">
      <el-container class="chart-data">
        <el-header class="panel-left-heading" style="height: 30px">
          <h4 class="panel-left-title">图表数据</h4>
        </el-header>
        <el-main class="panel-body" style="padding:0px;">
          <hot-table ref="hotTable" :root="root" :data="chartData" :settings="hotSettings"></hot-table>
        </el-main>
        <el-footer class="panel-left-footer"></el-footer>
      </el-container>
    </el-col>
    <el-col :span="12">
      <el-container class="chart-detail">
        <el-main>
          <div ref="customeChart" class="chart"></div>
        </el-main>
        <el-footer class="panel-mid-footer"></el-footer>
      </el-container>
    </el-col>
    <el-col :span="5">
      <el-container class="chart-option">
        <el-row></el-row>
        <el-row></el-row>
        <el-row></el-row>
      </el-container>
    </el-col>
  </el-row>
</template>
<script>
import Bus from '../../utils/bus'
import HotTable from '@handsontable/vue'
import { Chart } from '../charts/Chart'
export default {
  data() {
    return {
      root: 'table',
      hotSettings: {
        rowHeaders: true,
        stretchH: 'all',
        className: 'htCenter',
        fillHandle: true,
        manualColumnFreeze: true,
        contextMenu: {
          items: {
            'row_above': {
              name: '单元格上方插入行'
            },
            'row_below': {
              name: '单元格下方插入行'
            },
            'hsep1': '---------',
            'col_left': {
              name: '单元格左侧插入列'
            },
            'col_right': {
              name: '单元格右侧插入列'
            },
            'hsep2': '---------',
            'remove_row': {
              name: '删除行'
            },
            'remove_col': {
              name: '删除列'
            }
          }
        },
        afterChange(changes, source) {
          if (source !== 'loadData') {
            const data = this.getData()
            Bus.$emit('tableChange', data)
          }
        }
      },
      tableData: [],
      chartData: [],
      chart: null,
      chartType: this.$store.state.bigscreen.chartType
    }
  },
  methods: {
  },
  watch: {
  },
  components: {
    HotTable
  },
  mounted() {
    this.chart = new Chart(this.$refs.customeChart)
    this.chart.setChartOption()(this.chartType)
    this.chartData = this.chart.getData()
    const _this = this
    Bus.$on('tableChange', (content) => {
      if (content) {
        _this.chart.setData(content)
      }
    })
  }
}
</script>
<style>
@import url('../../../node_modules/handsontable/dist/handsontable.full.min.css');
</style>
<style lang="scss" scoped>
.chart-data{
  background-color: #edf2f6;
  height: 85vh;
}
.content {
  padding: 10px;
}
.panel-left-title {
  font-size: 12px;
  margin: 10px;
}
.panel-left-heading {
  height: 29px;
  background-color: #dae4ec;
}
.panel-left-footer {
  background: #dae4ec;
  height: 50px;
}
.panel-mid-footer{
  background: #ffffff;
  height: 50px;
}
.panel-body {
  background-color: #f1f5f8;
}
.chart-detail{
  height: 85vh;
  background-color: #CAD3DB;
}
.el-main{
  height: 100%;
}
.chart-option {
  font-size: 12px;
  color: #b4c0d6;
  background-color: #44546e;
  min-height: calc(100% - 30px);
}
.chart{
  height: inherit;
}
</style>


