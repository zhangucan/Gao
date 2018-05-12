<template>
  <el-row>
    <el-col :span="8">
      <el-card class="box-card margin-top20">
        <div slot="header" class="clearfix">
          <span>地图管理模块</span>
        </div>
        <el-select v-model="gridItem.component" placeholder="地图选择">
          <el-option v-for="(item, index) in mapList" :key="index" :label="item.title" :value="item._id"></el-option>
        </el-select>
        <el-transfer
          class="margin-top20"
          :titles= "transferTitles"
          v-model="chooseRasterLayers"
          @change="rasterLayersChange"
          :data="rasterList">
        </el-transfer>
        <el-transfer
          class="margin-top20"
          :titles= "transferTitles2"
          v-model="chooseVectorLayers"
          @change="vectorLayersChange"
          :data="vectorList">
        </el-transfer>
        <div class="editor-container">
          <dnd-list :list1="list1" :list2="list2" list1Title="List" list2Title="Article pool"></dnd-list>
        </div>
      </el-card>
    </el-col>
    <el-col :span="15" :offset="1">
      <el-card class="box-card margin-top20">
        <div slot="header" class="clearfix">
          <span>大屏展示模块</span>
        </div>
        <template v-if="gridItem.rasterList.length > 0">
          <el-select v-model="currentRaster" placeholder="栅格图层">
            <el-option v-for="(item, index) in gridItem.rasterList" :key="index" :label="item.displayTime" :value="item.address"></el-option>
          </el-select>
        </template>
        <template v-if="gridItem.vectorList.length > 0">
          <el-select v-model="currentVector" multiple placeholder="矢量图层">
            <el-option v-for="(item, index) in gridItem.vectorList" :key="index" :label="item.label" :value="item.data._id"></el-option>
          </el-select>
        </template>
        <template v-if="gridItem.vectorList.length > 0 ">
          <map-show class="margin-top20" mapWidth="100%" mapHeight="600px" :map-url="currentRaster" :choose-list="chooseList" :vector-list="tempVectorList" :lon="lon" :lat="lat"></map-show>
        </template>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import * as mapApi from '../../api/map'
import DndList from '../DndList'
import MapShow from '../MapShow'
export default {
  components: {
    MapShow,
    DndList
  },
  data() {
    return {
      gridItem: this.$store.state.bigscreen.gridItem,
      mapList: [],
      rasterList: [],
      vectorList: [],
      tempVectorList: [],
      chooseRasterLayers: [],
      chooseVectorLayers: [],
      transferTitles: ['影像图层', '影像图层'],
      transferTitles2: ['矢量图层', '矢量图层'],
      currentRaster: '',
      currentVector: [],
      chooseList: [],
      lon: '',
      lat: ''
    }
  },
  watch: {
    'gridItem.component': {
      handler(val, oldVal) {
        const _this = this
        if (val !== 'test' && val !== '') {
          this.clearLayers()
          mapApi.fetchMap({ _id: val }).then((data) => {
            _this.lon = data.map.lon
            _this.lat = data.map.lat
            data.map.rasterLayers.forEach((item, index) => {
              const obj = {
                key: index,
                label: item.displayTime,
                data: item
              }
              _this.rasterList.push(obj)
            })
            data.vectorFeatures.forEach((item, index) => {
              item.vectorFeatures = item[item.featureType]
              const obj = {
                key: index,
                label: item.type + ' | ' + item.displayTime,
                data: item
              }
              _this.vectorList.push(obj)
              _this.tempVectorList.push(item)
            })
          })
        }
      },
      immediate: true
    },
    currentVector(val, oldVal) {
      const _this = this
      _this.chooseList = []
      if (val.length > 0) {
        val.forEach((item, index) => {
          const obj = {
            _id: item
          }
          _this.chooseList.push(obj)
        })
      }
    }
  },
  methods: {
    clearLayers() {
      this.rasterList = []
      this.vectorList = []
      this.chooseRasterLayers = []
      this.chooseVectorLayers = []
      this.tempVectorList = []
    },
    rasterLayersChange() {
      const _this = this
      _this.gridItem.rasterList = []
      _this.currentRaster = ''
      if (_this.chooseRasterLayers.length > 0) {
        _this.chooseRasterLayers.forEach((item, index) => {
          _this.gridItem.rasterList.push(_this.rasterList[item].data)
        })
      }
    },
    vectorLayersChange() {
      const _this = this
      _this.gridItem.vectorList = []
      _this.currentVector = []
      if (_this.chooseVectorLayers.length > 0) {
        _this.chooseVectorLayers.forEach((item, index) => {
          _this.gridItem.vectorList.push(_this.vectorList[item])
        })
      }
    }
  },
  mounted() {
    const _this = this
    mapApi.fetchMapList().then((data) => {
      _this.mapList = data.mapLsit
    })
  }
}
</script>
<style lang="scss" scoped>
.margin-top20{
  margin-top: 20px;
}
</style>
