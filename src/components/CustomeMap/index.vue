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
          <dnd-list :list1="gridItem.component.rasterList" :list2="rasterList" list1Title="已选择影像图层" list2Title="未选择影像图层"></dnd-list>
        </div>
        <div class="editor-container">
          <dnd-list :list1="gridItem.component.vectorList" :list2="vectorList" list1Title="已选择矢量图层" list2Title="未选择矢量图层"></dnd-list>
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
                <el-radio  v-for="(item, index) in gridItem.component.rasterList" :key="index" :label="item.id">{{item.title}}</el-radio>
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
                <el-checkbox v-for="item in gridItem.component.vectorList" :label="item.id" :key="item.id">
                  {{item.title}}
                </el-checkbox>
              </el-checkbox-group>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <map-show :key="mapKey" class="margin-top20" mapWidth="100%" mapHeight="650px" :raster-layer="currentRaster" :vector-list="tempVectorList" :raster-list="tempRasterList" :choose-list="currentVector" :lon="lon" :lat="lat"></map-show>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import * as mapApi from '../../api/map'
import * as utils from '../../utils/index'
// import Bus from '../../utils/bus'
import shortid from 'shortid'
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
      tempRasterList: [],
      tempVectorList: [],
      rasterLayer: '',
      chooseVector: [],
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
        this.mapKey += 1
        this.gridItem.component.rasterList = []
        this.gridItem.component.vectorList = []
        this.vectorList = []
        this.rasterList = []
        this.fillData(val)
      }
    },
    'gridItem.component.vectorList'() {
      this.chooseVector = []
      this.currentRaster = ''
      this.currentVector = []
    },
    'gridItem.component.rasterList'() {
      this.chooseVector = []
      this.currentRaster = ''
      this.currentVector = []
    }
  },
  methods: {
    fillData(val) {
      const _this = this
      _this.tempRasterList = []
      _this.tempVectorList = []
      if (this.gridItem.component.id !== 'test' && this.gridItem.component.id !== '') {
        mapApi.fetchMap({ _id: val }).then(data => {
          if (data.map.rasterLayers.length > 0) {
            data.map.rasterLayers.forEach(item => {
              const id = shortid.generate()
              item.id = id
              item.title = item.displayTime
              _this.gridItem.component.rasterList.forEach(item2 => {
                if (item.address === item2.address && item.displayTime === item2.title) {
                  item2.id = id
                }
              })
              _this.tempRasterList.push(item)
            })
            this.rasterList = utils.diffArr(_this.tempRasterList, this.gridItem.component.rasterList)
          }
          if (data.vectorFeatures.length > 0) {
            const _this = this
            data.vectorFeatures.forEach((item, index) => {
              const obj = {
                id: item._id,
                title: item.type + ' | ' + item.displayTime
              }
              obj.vectorFeatures = item[item.featureType]
              _this.tempVectorList.push(obj)
            })
            this.vectorList = utils.diffArr(_this.tempVectorList, this.gridItem.component.vectorList)
          }
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
      _this.mapList = data.mapLsit
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
