<template>
  <el-row>
    <el-col :span="8" style="padding-right:10px;">
      <el-card class="box-card margin-top20" style="max-height:806px;min-height:806px;overflow:auto;">
        <div slot="header" class="clearfix">
          <span>地图管理模块</span>
        </div>
        <el-select v-model="gridItem.component.id" placeholder="地图选择">
          <el-option v-for="(item, index) in mapList" :key="index" :label="item.title" :value="item._id"></el-option>
        </el-select>
        <div class="editor-container">
          <dnd-list :list1="rasterList2" :list2="rasterList1" list1Title="已选择影像图层" list2Title="未选择影像图层"></dnd-list>
        </div>
        <div class="editor-container">
          <dnd-list :list1="vectorList2" :list2="vectorList1" list1Title="已选择矢量图层" list2Title="未选择矢量图层"></dnd-list>
        </div>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-card class="box-card margin-top20">
        <div slot="header" class="clearfix">
          <span>大屏展示模块</span>
        </div>
        <el-dropdown trigger="click">
          <el-button plain>栅格图层选择
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu class="no-padding" slot="dropdown">
            <el-dropdown-item>
              <el-radio-group style="padding: 10px;" v-model="currentRaster">
                <el-radio  v-for="(item, index) in rasterList2" :key="index" :label="item._id">{{item.displayTime}}</el-radio>
              </el-radio-group>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="click">
          <el-button plain>矢量图层选择
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu class="no-padding" slot="dropdown">
            <el-dropdown-item>
              <el-checkbox-group v-model="currentVector" style="padding: 5px 15px;">
                <el-checkbox v-for="item in vectorList2" :label="item._id" :key="item.id">
                  {{item.type}}{{item.displayTime}}
                </el-checkbox>
              </el-checkbox-group>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <map-show :key="mapKey" class="margin-top20" mapWidth="100%" mapHeight="650px" :raster-layer="currentRaster" :vector-list="vectorList" :raster-list="rasterList" :choose-list="currentVector" :lon="lon" :lat="lat"></map-show>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import * as mapApi from '../../api/map'
// import Bus from '../../utils/bus'
import R from 'ramda'
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
      rasterList1: [],
      vectorList1: [],
      rasterList2: [],
      vectorList2: [],
      rasterList: [],
      vectorList: [],
      tempRasterList: [],
      tempVectorList: [],
      rasterLayer: '',
      mapList: [],
      mapKey: 0,
      currentRaster: '',
      currentVector: [],
      lon: '',
      lat: ''
    }
  },
  watch: {
    'gridItem.component.id'(val, oldVal) {
      if (this.gridItem.component.id !== 'test' && this.gridItem.component.id !== '') {
        this.vectorList = []
        this.rasterList = []
        this.rasterList2 = []
        this.rasterList1 = []
        this.vectorList1 = []
        this.vectorList2 = []
        this.$store.dispatch('SetScreenMap', val)
        this.fillData(val)
      }
    },
    rasterList2(val) {
      this.currentRaster = ''
      this.currentVector = []
      this.gridItem.component.rasterLayers = val
    },
    vectorList2(val) {
      this.currentRaster = ''
      this.currentVector = []
      this.gridItem.component.vectorLayers = val
    }
  },
  methods: {
    fillData(val) {
      const _this = this
      _this.tempRasterList = []
      _this.tempVectorList = []
      if (this.gridItem.component.id !== 'test' && this.gridItem.component.id !== '') {
        mapApi.fetchMap(val).then(result => {
          _this.lon = result.data.lon
          _this.lat = result.data.lat
          _this.rasterList = result.data.rasterLayers
          _this.vectorList = result.data.vectorLayers
          _this.rasterList2 = [..._this.gridItem.component.rasterLayers]
          _this.rasterList1 = R.difference(result.data.rasterLayers)(_this.rasterList2)
          _this.vectorList2 = [..._this.gridItem.component.vectorLayers]
          const temp = result.data.vectorLayers.map(item => {
            return {
              _id: item._id,
              displayTime: item.displayTime,
              type: item.type,
              featurecollection: item.featurecollection
            }
          })
          _this.vectorList1 = R.difference(temp)(_this.vectorList2)
          this.mapKey += 1
        })
      }
    }
  },
  mounted() {
    const _this = this
    if (this.gridItem.component.id !== 'test' && this.gridItem.component.id !== '') {
      this.fillData(this.gridItem.component.id)
    } else {
      this.gridItem.component.id = ''
    }
    mapApi.fetchMapList().then((data) => {
      _this.mapList = data.data
    })
    this.mapKey += 1
  }
}
</script>
<style lang="scss" scoped>
.margin-top20{
  margin-top: 20px;
}
.el-checkbox-group{
  max-width: 450px;
}
.el-radio-group{
  max-width: 370px;
}
.el-checkbox {
  margin-right: 15px;
}
.el-radio{
  margin-right: 20px;
  margin-bottom: 5px;
}
.el-checkbox+.el-checkbox {
  margin-left: 0;
}
.el-radio+.el-radio {
  margin-left: 0;
}
</style>
