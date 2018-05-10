<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-form ref="categoryForm" :model="categoryForm" label-width="120px">
          <el-form-item label="类型选择">
            <el-select v-model="categoryForm.region" placeholder="please select your zone">
              <el-option label="地图" value="map"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>地图展示信息</span>
          </div>
          <el-form ref="mapForm" label-width="120px">
            <el-form-item label="地图选择">
              <el-select v-model="currentMap" placeholder="地图选择">
                <el-option v-for="(item, index) in mapList" :key="index" :label="item.title" :value="index"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-transfer
            :titles= "transferTitles"
            v-model="chooseRasterLayers"
            :data="rasterLayers">
          </el-transfer>
          <el-transfer
            :titles= "transferTitles"
            v-model="chooseVectorLayers"
            :data="vectorLayers">
          </el-transfer>
        </el-card>
      </el-col>
      <el-col :span="15" :offset="1">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-row>
              <el-form ref="submitForm" :model="submitForm" label-width="120px">
                <el-col :span="8"><span>地图信息</span></el-col>
                <el-col :span="8">
                  <el-form-item label="影像图层">
                    <el-select v-model="submitForm.currentRaster" placeholder="图层选择">
                      <el-option v-for="(item, index) in submitForm.rasterList" :key="index" :label="item.label" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="矢量图层">
                    <el-select v-model="submitForm.currentVector" placeholder="图层选择">
                      <el-option v-for="(item, index) in submitForm.vectorList" :key="index" :label="item.label" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-row>
          </div>
          <map-show mapWidth="100%" mapHeight="600px" :map-url="currentRaster" 
            :choose-list="chooseList" :vector-list="vectorLayers" :lon="lon" :lat="lat"></map-show>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import * as bigscreenApi from '../../api/bigscreen'
import MapShow from '../MapShow'
export default {
  components: {
    MapShow
  },
  computed: {
    mapList() {
      return this.$store.state.bigscreen.gridMapList
    }
  },
  watch: {
    async currentMap(val, oldVal) {
      this.loading = true
      const _this = this
      _this.mapList[val].rasterLayers.forEach((item, index) => {
        const obj = {
          key: index,
          label: item.displayTime,
          address: item.address
        }
        _this.rasterLayers.push(obj)
      })
      const data = await bigscreenApi.fetchVectors({ mapId: _this.mapList[val]._id })
      data.vectors.forEach((item, index) => {
        const obj = {
          key: index,
          label: item.type + ' | ' + item.displayTime,
          vectorFeatures: item[item.featureType]
        }
        _this.vectorLayers.push(obj)
      })
      this.loading = false
    },
    chooseVectorLayers(val) {
      console.log(this.vectorLayers[val])
      this.submitForm.vectorList = val
    },
    chooseRasterLayers(val) {
      console.log(this.rasterLayers[val])
      this.submitForm.rasterList = val
    }
  },
  methods: {
  },
  data() {
    return {
      categoryForm: {
        region: 'map'
      },
      currentMap: '',
      chooseRasterLayers: [],
      chooseVectorLayers: [],
      rasterLayers: [],
      vectorLayers: [],
      transferTitles: ['未选择', '已选择'],
      currentRaster: '',
      chooseList: [],
      lon: '',
      lat: '',
      submitForm: {
        rasterList: this.chooseRasterLayers,
        vectorList: this.chooseVectorLayers,
        map: '',
        currentRaster: '',
        currentVector: ''
      }
    }
  },
  beforeCreate() {
    this.loading = true
    this.$store.dispatch('GridFetchAllMap').then(() => {
      this.loading = false
    }).catch(() => {
      this.loading = false
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
