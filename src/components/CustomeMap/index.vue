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
        <div class="editor-container">
          <dnd-list :list1="gridItem.rasterList" :list2="rasterList" list1Title="已选择影像图层" list2Title="未选择影像图层"></dnd-list>
        </div>
        <div class="editor-container">
          <dnd-list :list1="gridItem.vectorList" :list2="vectorList" list1Title="已选择矢量图层" list2Title="未选择矢量图层"></dnd-list>
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
            <el-option v-for="(item, index) in gridItem.rasterList" :key="index" :label="item.title" :value="item.address"></el-option>
          </el-select>
        </template>
        <template v-if="gridItem.vectorList.length > 0">
          <el-select v-model="currentVector" multiple placeholder="矢量图层">
            <el-option v-for="(item, index) in gridItem.vectorList" :key="index" :label="item.title" :value="item._id"></el-option>
          </el-select>
        </template>
        <template v-if="gridItem.vectorList.length > 0 ">
          <map-show class="margin-top20" mapWidth="100%" mapHeight="600px" :map-url="currentRaster" :choose-list="chooseVector" :vector-list="tempVectorList" :lon="lon" :lat="lat"></map-show>
        </template>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import * as mapApi from '../../api/map'
import * as utils from '../../utils/index'
// import Bus from '../../utils/bus'
import DndList from '../DndList'
import MapShow from '../MapShow'
export default {
  components: {
    DndList,
    MapShow
  },
  data() {
    return {
      gridItem: this.$store.state.bigscreen.gridItem,
      rasterList: [],
      vectorList: [],
      tempVectorList: [],
      chooseVector: [],
      mapList: [],
      currentRaster: '',
      currentVector: [],
      lon: '',
      lat: ''
    }
  },
  watch: {
    'gridItem.component'(val, oldVal) {
      if (this.gridItem.component !== 'test' && this.gridItem.component !== '') {
        this.gridItem.rasterList = []
        this.gridItem.vectorList = []
        this.fillData(val)
      }
    },
    currentVector(val) {
      this.chooseVector = []
      const _this = this
      val.forEach(item => {
        const index = _this.tempVectorList.findIndex(function(value, index, arr) {
          return value._id === item
        })
        this.chooseVector.push(_this.tempVectorList[index])
      })
    },
    'gridItem.vectorList'() {
      this.chooseVector = []
      this.currentRaster = ''
      this.currentVector = []
    },
    'gridItem.rasterList'() {
      this.chooseVector = []
      this.currentRaster = ''
      this.currentVector = []
    }
  },
  methods: {
    fillData() {
      if (this.gridItem.component !== 'test' && this.gridItem.component !== '') {
        mapApi.fetchMap({ _id: this.gridItem.component }).then(data => {
          if (data.map.rasterLayers.length > 0) {
            const tempList = []
            data.map.rasterLayers.forEach((item, index) => {
              const obj = {
                id: index,
                address: item.address,
                title: item.displayTime
              }
              tempList.push(obj)
            })
            this.rasterList = utils.diffArr(tempList, this.gridItem.rasterList)
          }
          if (data.vectorFeatures.length > 0) {
            const tempList = []
            const _this = this
            data.vectorFeatures.forEach((item, index) => {
              const obj = {
                id: index,
                _id: item._id,
                title: item.type + ' | ' + item.displayTime
              }
              tempList.push(obj)
              const obj2 = {
                _id: item._id,
                vectorFeatures: item[item.featureType]
              }
              _this.tempVectorList.push(obj2)
            })
            this.vectorList = utils.diffArr(tempList, this.gridItem.vectorList)
          }
        })
      } else {
        this.gridItem.component = ''
      }
    }
  },
  mounted() {
    const _this = this
    if (this.gridItem.component !== 'test' && this.gridItem.component !== '') {
      this.fillData(this.gridItem.component)
    } else {
      this.gridItem.component = ''
    }
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
