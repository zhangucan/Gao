<template>
  <div class="app-container">
    <el-select v-model="view" placeholder="选择类型">
      <el-option label="地图" value="CustomeMap"></el-option>
      <el-option label="图表" value="CustomeChart"></el-option>
    </el-select>
    <transition name="component-fade" mode="out-in">
      <component v-bind:is="view"></component>
    </transition>
    <!-- <el-form ref="gridItemForm" :model="gridItem" label-width="120px">
      <el-row>
        <el-col :span="24">
          <el-select v-model="gridItem.gridType" placeholder="选择类型">
            <el-option label="地图" value="map"></el-option>
            <el-option label="图表" value="chart"></el-option>
          </el-select>
          <template v-if="gridItem.gridType == 'map'">
            <el-select v-model="gridItem.component" placeholder="选择地图">
              <el-option v-for="(item, index) in mapList" :key="index" :label="item.title" :value="item._id"></el-option>
            </el-select>
          </template>
          <template v-if="gridItem.gridType == 'chart'">
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <template v-if="gridItem.gridType == 'map'">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>栅格图层</span>
              </div>
              <el-transfer
                :titles= "transferTitles"
                v-model="chooseRasterLayers"
                @change="rasterLayersChange"
                :data="rasterLayers">
              </el-transfer>
            </el-card>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>矢量图层</span>
              </div>
              <el-transfer
                :titles= "transferTitles"
                v-model="chooseVectorLayers"
                @change="vectorLayersChange"
                :data="vectorLayers">
              </el-transfer>
            </el-card>
          </template>
        </el-col>
        <el-col :span="15" :offset="1">
          <template v-if="gridItem.gridType == 'map'">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <el-row>
                    <el-col :span="8"><span>地图信息</span></el-col>
                    <el-col :span="8">
                      <el-form-item v-if="gridItem.rasterList.length > 0" label="影像图层">
                        <el-select v-model="currentRaster" placeholder="图层选择">
                          <el-option v-for="(item, index) in gridItem.rasterList" :key="index" :label="item.label" :value="item.key"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item v-if="gridItem.vectorList.length > 0" label="矢量图层">
                        <el-select v-model="chooseList" multiple placeholder="图层选择">
                          <el-option v-for="(item, index) in gridItem.vectorList" :key="index" :label="item.label" :value="item.key"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <map-show v-if="gridItem.rasterList.length > 0" mapWidth="100%" mapHeight="600px" :map-url="currentRaster" 
                  :choose-list="chooseList" :vector-list="map.vectorList" :lon="map.lon" :lat="map.lat"></map-show>
            </el-card>
          </template>
          <template v-if="gridItem.gridType == 'chart'">
            
          </template>
        </el-col>
      </el-row>
    </el-form> -->

  </div>
</template>
<script>
// import * as bigscreenApi from '../../api/bigscreen'
// import * as mapApi from '../../api/map'
import CustomeMap from '../CustomeMap'
import CustomeChart from '../CustomeChart'
import MapShow from '../MapShow'
export default {
  components: {
    MapShow,
    CustomeMap,
    CustomeChart
  },
  computed: {
  },
  watch: {
    // 'gridItem.gridType': {
    //   handler(val, oldVal) {
    //     const _this = this
    //     if (val === 'map') {
    //       mapApi.fetchMapList().then((data) => {
    //         _this.mapList = data.mapLsit
    //       })
    //     }
    //   },
    //   immediate: true
    // },
    // 'gridItem.component': {
    //   handler(val, oldVal) {
    //     this.clearChoose()
    //     const _this = this
    //     _this.vectorLayers = []
    //     _this.rasterLayers = []
    //     // mapApi.fetchMap
    //     mapApi.fetchMap({ _id: val }).then((data) => {
    //       _this.map = data.map
    //       data.map.rasterLayers.forEach((item, index) => {
    //         const obj = {
    //           key: index,
    //           label: item.displayTime,
    //           data: item
    //         }
    //         _this.rasterLayers.push(obj)
    //       })
    //       data.vectorFeatures.forEach((item, index) => {
    //         const obj = {
    //           key: index,
    //           label: item.type + ' | ' + item.displayTime,
    //           data: item
    //         }
    //         _this.vectorLayers.push(obj)
    //       })
    //     })
    //   }
    // }
  },
  methods: {
    // clearChoose() {
    //   this.chooseRasterLayers = []
    //   this.chooseVectorLayers = []
    //   this.rasterLayers = []
    //   this.vectorLayers = []
    // },
    // rasterLayersChange(keys) {
    //   const _this = this
    //   if (keys.length > 0) {
    //     _this.gridItem.rasterList = []
    //     keys.forEach((item, index) => {
    //       _this.gridItem.rasterList.push(_this.rasterLayers[item].data)
    //     })
    //     console.log(_this.gridItem.rasterList)
    //   }
    // },
    // vectorLayersChange(keys) {
    //   const _this = this
    //   if (keys.length > 0) {
    //     _this.gridItem.vectorList = []
    //     keys.forEach((item, index) => {
    //       _this.gridItem.vectorList.push(_this.rasterLayers[item].data)
    //     })
    //   }
    // }
  },
  data() {
    return {
      // currentRaster: '',
      // chooseRasterLayers: [],
      // chooseVectorLayers: [],
      // rasterLayers: [],
      // vectorLayers: [],
      // chooseList: [],
      // transferTitles: ['未选择', '已选择'],
      // map: {},
      // mapList: []
      view: ''
    }
  },
  mounted() {
    this.$store.state.bigscreen.gridItem.gridType === 'map' ? this.view = 'CustomeMap' : this.view = 'CustomeChart'
  },
  beforeCreate() {
  }
}
</script>

<style lang="scss" scoped>
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
</style>
