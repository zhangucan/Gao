<template>
  <el-row>
    <el-col :span="8">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>地图管理模块</span>
        </div>
        <el-select v-model="gridItem.component" placeholder="地图选择">
          <el-option v-for="(item, index) in mapList" :key="index" :label="item.title" :value="item._id"></el-option>
        </el-select>
        <el-transfer
          :titles= "transferTitles"
          v-model="chooseRasterLayers"
          @change="rasterLayersChange"
          :data="rasterList">
        </el-transfer>
        <el-transfer
          :titles= "transferTitles"
          v-model="chooseVectorLayers"
          @change="vectorLayersChange"
          :data="vectorList">
        </el-transfer>
      </el-card>
    </el-col>
    <el-col :span="15" :offset="1">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>大屏展示模块</span>
        </div>
        <template v-if="gridItem.rasterList.length > 0">
          <el-select v-model="currentRaster" placeholder="地图选择">
            <el-option v-for="(item, index) in gridItem.rasterList" :key="index" :label="item.displayTime" :value="item.address"></el-option>
          </el-select>
        </template>
        <template v-if="gridItem.vectorList.length > 0">
          <el-select v-model="chooseList" multiple placeholder="地图选择">
            <el-option v-for="(item, index) in gridItem.vectorList" :key="index" :label="item.label" :value="item.data"></el-option>
          </el-select>
        </template>
        <template v-if="gridItem.vectorList.length > 0 ">
          <map-show mapWidth="100%" mapHeight="600px" :map-url="currentRaster" :choose-list="chooseList" :vector-list="tempVectorList" :lon="lon" :lat="lat"></map-show>
        </template>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import * as mapApi from '../../api/map'
import MapShow from '../MapShow'
export default {
  components: {
    MapShow
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
      transferTitles: ['未选择', '已选择'],
      currentRaster: '',
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
              const obj = {
                key: index,
                label: item.type + ' | ' + item.displayTime,
                data: item
              }
              _this.vectorList.push(obj)
              item.vectorFeatures = item[item.featureType]
              _this.tempVectorList.push(item)
            })
          })
        }
      },
      immediate: true
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
      if (_this.chooseRasterLayers.length > 0) {
        _this.chooseRasterLayers.forEach((item, index) => {
          _this.gridItem.rasterList.push(_this.rasterList[item].data)
        })
      }
    },
    vectorLayersChange() {
      const _this = this
      _this.gridItem.vectorList = []
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

</style>
