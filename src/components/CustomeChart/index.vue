<template>
  <el-row>
    <el-col :span="8">
      <el-container class="chart-list">
        <el-aside style="width:90px;">
          <el-menu @select="changeChartList">
            <el-menu-item index="bar">
              <span slot="title">柱状图</span>
            </el-menu-item>
            <el-menu-item index="line">
              <span slot="title">线图</span>
            </el-menu-item>
            <el-menu-item index="pie">
              <span slot="title">饼图</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <el-row>
            <transition-group name="list-complete">
              <el-col :span="8" v-for="(item, index) in currentChartList.children" :key="index" >
                <el-card :body-style="{ padding: '0px' }" style="cursor:pointer;margin:10px;" :class= "{ chartOn: item.type == currentChart }">
                  <img :src="formatImg(item)" class="image" @click="chooseChart(item)">
                  <div class="chart-name">
                    <span >{{ item.name }}</span>
                  </div>
                </el-card>
              </el-col>
            </transition-group>
          </el-row>
        </el-main>
      </el-container>
    </el-col>
    <el-col :span="16">
      <el-container class="chart-detail">
      </el-container>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      chartList: this.$store.state.bigscreen.chartList,
      currentChartList: [],
      currentChart: '',
      chartOn: {
        'box-shadow': '0 2px 12px 0 rgba(103,194,58,1)'
      },
      chartOff: {
        'box-shadow': '0 2px 12px 0 rgba(0,0,0,.1)'
      }
    }
  },
  methods: {
    changeChartList(type) {
      this.currentChartList = this.chartList.find(item => {
        return item.type === type
      })
    },
    formatImg(item) {
      return `../../../static/charts/${item.img}.png`
    },
    chooseChart(item) {
      console.log(item.type)
      this.currentChart = item.type
    },
    chartActive(item) {
      return item.type === this.currentChart ? this.chartOn : this.chartOff
    }
  }
}
</script>
<style lang="scss" scoped>
.chart-list{
  height: 85vh;
  background-color: #edf2f6;
  
}
.chart-detail{
  height: 85vh;
  background-color: #CAD3DB;
}
.el-menu{
  height: 85vh;
  width: 90px;
  background-color: rgba($color: #000000, $alpha: 0);
}
.margin10{
  margin: 10px;
}
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
.chart-name {
  padding: 5px;
  font-size: 14px;
  text-align: center;
}
.chartOn {
   box-shadow: 0 2px 12px 0 rgba(103,194,58,.1);
}
</style>
