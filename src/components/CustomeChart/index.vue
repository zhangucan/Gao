<template>
  <el-row>
    <el-col :span="7">
      <el-container class="chart-data">
        <el-header class="panel-left-heading" style="height: 30px">
          <h4 class="panel-left-title">图表数据</h4>
        </el-header>
        <el-main class="panel-body">
          <hot-table :root="root" :settings="hotSettings"></hot-table>
        </el-main>
        <el-footer class="panel-left-footer"></el-footer>
      </el-container>
    </el-col>
    <el-col :span="12">
      <el-container class="chart-container">
        <el-main></el-main>
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
import HotTable from '@handsontable/vue'
const data = [
  {
    x: '类别名称',
    legend: '地区',
    count: '订单数量'
  }
]
export default {
  data() {
    return {
      root: 'table',
      hotSettings: {
        data: data,
        columns: [
          {
            data: 'x',
            type: 'text'
          },
          {
            data: 'legend',
            type: 'text'
          },
          {
            data: 'count',
            type: 'text'
          }
        ],
        colHeaders: [
          'x轴',
          '图例',
          '数据值'
        ],
        stretchH: 'all',
        autoWrapRow: true,
        rowHeaders: true,
        mergeCells: true,
        contextMenu: true,
        manualRowResize: true,
        manualColumnResize: true
      }
    }
  },
  components: {
    HotTable
  }
}
</script>
<style>
@import url('../../styles/handsontable.css');
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
.chart-container {
  background-color: #CAD3DB;
  height: 85vh;
  padding: 0;
}
.chart-option {
  font-size: 12px;
  color: #b4c0d6;
  background-color: #44546e;
  min-height: calc(100% - 30px);
}
</style>


