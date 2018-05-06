<template>
  <div class="app-container">
    <el-row>
      <el-col :span="5">
        <el-card :body-style="{ padding: '0px' }">
          <img src="../../../static/bigscreen/baiguihu.png" class="image">
          <div style="padding: 14px;">
            <span>平顶山白龟湖高分动态监测</span>
            <div class="bottom clearfix">
              <time class="time">2018-05-05 20:20</time>
              <el-button type="text" class="button"> 修改 </el-button>
              <el-button type="text" class="button" @click="test"> 查看 </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5" :offset="1" style="text-align: center">
        <el-card :body-style="{ padding: '0px' }">
          <i class="el-icon-plus add-srceen"></i>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import vueGridLayout from 'vue-grid-layout'
import * as bigscreen from '../../api/bigscreen'
const GridLayout = vueGridLayout.GridLayout
const GridItem = vueGridLayout.GridItem
var testLayout = [
  { 'x': 0, 'y': 0, 'w': 2, 'h': 2, 'i': '0' },
  { 'x': 2, 'y': 0, 'w': 2, 'h': 4, 'i': '1' },
  { 'x': 4, 'y': 0, 'w': 2, 'h': 5, 'i': '2' },
  { 'x': 6, 'y': 0, 'w': 2, 'h': 3, 'i': '3' },
  { 'x': 8, 'y': 0, 'w': 2, 'h': 3, 'i': '4' },
  { 'x': 10, 'y': 0, 'w': 2, 'h': 3, 'i': '5' },
  { 'x': 0, 'y': 5, 'w': 2, 'h': 5, 'i': '6' },
  { 'x': 2, 'y': 5, 'w': 2, 'h': 5, 'i': '7' },
  { 'x': 4, 'y': 5, 'w': 2, 'h': 5, 'i': '8' },
  { 'x': 6, 'y': 4, 'w': 2, 'h': 4, 'i': '9' },
  { 'x': 8, 'y': 4, 'w': 2, 'h': 4, 'i': '10' },
  { 'x': 10, 'y': 4, 'w': 2, 'h': 4, 'i': '11' },
  { 'x': 0, 'y': 10, 'w': 2, 'h': 5, 'i': '12' },
  { 'x': 2, 'y': 10, 'w': 2, 'h': 5, 'i': '13' },
  { 'x': 4, 'y': 8, 'w': 2, 'h': 4, 'i': '14' },
  { 'x': 6, 'y': 8, 'w': 2, 'h': 4, 'i': '15' },
  { 'x': 8, 'y': 10, 'w': 2, 'h': 5, 'i': '16' },
  { 'x': 10, 'y': 4, 'w': 2, 'h': 2, 'i': '17' },
  { 'x': 0, 'y': 9, 'w': 2, 'h': 3, 'i': '18' },
  { 'x': 2, 'y': 6, 'w': 2, 'h': 2, 'i': '19' }
]
export default {
  name: 'bigscreen',
  components: {
    GridLayout,
    GridItem
  },
  data() {
    return {
      layout: testLayout,
      currentDate: new Date()
    }
  },
  methods: {
    test() {
      bigscreen.fetchLayout({ title: '白龟山湿地公园' })
    }
  }
}
</script>
<style lang="scss" scoped>
.grid-demo {
  background: #d3dce6;
  border-radius: 4px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
.add-srceen {
  font-size: 255px;
  color: #989898;
}
</style>
