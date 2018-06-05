<template>
  <el-row>
    <sticky :className="'sub-navbar published'">
      <el-button @click="returnMapCard">返回</el-button>
    </sticky>
    <div class="app-container">
    <el-row class="margin-top30">
      <el-col :span="14" :offset="2">
        <el-steps :active="active" finish-status="success">
          <el-step title="基本信息"></el-step>
          <el-step title="影像数据"></el-step>
          <el-step title="矢量数据"></el-step>
          <el-step title="确认信息"></el-step>
        </el-steps>
      </el-col>
      <el-col :span="6" :offset="2">
        <el-button type="primary" @click="previous">上一步</el-button>
        <el-button v-show="!isFinish" @click="next">下一步</el-button>
        <el-button v-show="isFinish" @click="submitMapInfo">完成</el-button>
      </el-col>
    </el-row>
    <transition name="component-fade" mode="out-in">
      <!-- 基本信息 -->
      <el-row class="mapshow" v-if="mapState === 0" key="editing">
        <el-col :span="16" :offset=4>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>基本信息</span>
            </div>
            <el-form ref="mapForm" :model="mapForm" label-width="120px">
              <el-form-item label="地图名称">
                <el-input v-model="mapForm.title" placeholder="地图名称"></el-input>
              </el-form-item>
              <el-form-item label="地图坐标系">
                <el-input placeholder="WGS-1984" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="地图中心点">
                <el-col :span="11">
                  <el-input v-model="mapForm.lon" placeholder="经度"></el-input>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-input v-model="mapForm.lat" placeholder="纬度"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="湿地标签">
                <el-checkbox-group >
                  <el-checkbox label="饮用水" name="type"></el-checkbox>
                  <el-checkbox label="农业" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="简单描述">
                <el-input type="textarea" v-model="mapForm.desc"></el-input>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
      <!-- 影像信息 -->
      <el-row v-if="mapState === 1" key="edited" class="mapshow">
        <el-col :span="9" style="padding-right:20px;">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>影像地址</span>
            </div>
            <el-form ref="rasterForm" :model="rasterForm" label-width="120px">
              <el-form-item label="拍摄时间">
                 <el-date-picker
                  style="width:87%;"
                  size="large"
                  v-model="rasterForm.displayTime"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="发布地址">
                <el-col :span="21">
                  <el-input v-model="rasterForm.address" placeholder="发布地址"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addRaster">增加</el-button>
              </el-form-item>
            </el-form>
          </el-card>
          <el-card class="box-card margin-top20">
            <div slot="header" class="clearfix">
              <span>影像列表</span>
            </div>
            <el-table :data="rasterList" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
              <el-table-column prop="address" class="hidden-content" label="发布地址" min-width="246" align="center"></el-table-column>
              <el-table-column align="center" prop="displayTime" label="日期" min-width="155"></el-table-column>
              <el-table-column label="操作" min-width="150" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="rasterEdit(scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="rasterDelete(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <el-col :span="15">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>地图预览</span>
            </div>
            <map-show mapWidth="100%" mapHeight="600px" :lon="mapForm.lon" :lat="mapForm.lat" :vector-list="vectorList" :raster-list="rasterList" :raster-layer="rasterLayer"></map-show>
          </el-card>
        </el-col>
      </el-row>
      <el-row v-if="mapState === 2" key="edited2" class="mapshow">
        <el-col :span="9" style="padding-right:20px;">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>矢量信息</span>
            </div>
            <el-form ref="vectorForm" :model="vectorForm" label-width="120px">
              <el-form-item label="矢量时间">
                <el-date-picker
                  style="width:87%;"
                  size="large"
                  v-model="vectorForm.displayTime"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="数据类型">
                <el-col :span="21">
                  <el-select v-model="vectorForm.type" placeholder="请选择数据类型">
                    <el-option label="耕地" value="耕地"></el-option>
                    <el-option label="林地" value="林地"></el-option>
                    <el-option label="草地" value="草地"></el-option>
                    <el-option label="道路" value="道路"></el-option>
                    <el-option label="水体" value="水体"></el-option>
                    <el-option label="泥滩地" value="泥滩地"></el-option>
                    <el-option label="建设用地" value="建设用地"></el-option>
                    <el-option label="其它" value="其它"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addVector">增加</el-button>
              </el-form-item>
            </el-form>
          </el-card>
          <el-card class="box-card margin-top20">
            <div slot="header" class="clearfix">
              <span>矢量列表</span>
            </div>
            <el-table :data="vectorList" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
              <el-table-column prop="type" label="数据类型" width="246" align="center"></el-table-column>
              <el-table-column align="center" prop="displayTime" label="日期" width="155"></el-table-column>
              <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="vectorEdit(scope.row, scope.$index)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="vectorDelete(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <el-col :span="15">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>GeoJSON 数据</span>
            </div>
            <div class="editor-container">
              <json-editor ref="jsonEditor" v-model="value"></json-editor>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row v-if="mapState === 3" key="saved" class="mapshow">
        <map-detail :map-desc="mapForm.desc" :map-title="mapForm.title" :lon="mapForm.lon" :lat="mapForm.lat" :raster-list="rasterList" :vector-list="vectorList"></map-detail>
      </el-row>
    </transition>
  </div>
  </el-row>
</template>
<script>
import * as mapApi from '../../api/map'
import * as utils from '../../utils/index'
import Sticky from '@/components/Sticky' // 粘性header组件
import MapShow from '../MapShow/index'
import MapDetail from '../MapDetail/index'
import JsonEditor from '@/components/JsonEditor'
import shortid from 'shortid'
export default {
  components: {
    MapShow,
    JsonEditor,
    MapDetail,
    Sticky
  },
  watch: {
    mapState(val) {
      if (val >= 3) {
        this.isFinish = true
      } else {
        this.isFinish = false
      }
    }
  },
  mounted() {
    this.vectorList = []
    this.rasterList = []
    if (this.mapInfo) {
      const map = this.mapInfo
      const vectorFeatures = this.mapInfo.vectorLayers
      this.mapId = map._id
      this.mapForm.title = map.title
      this.mapForm.lon = map.lon
      this.mapForm.lat = map.lat
      this.mapForm.desc = map.desc
      map.rasterLayers.forEach((item, index) => {
        this.rasterList.push(item)
      })
      vectorFeatures.forEach((item, index) => {
        this.vectorList.push(item)
      })
    }
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '上次输入时间',
          onClick(picker) {
            picker.$emit('pick', new Date(this.originTime))
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      mapInfo: this.$store.state.map.mapInfo,
      isFinish: false,
      value: { 'type': '空' },
      active: 0,
      mapId: null,
      mapState: 0,
      mapForm: {
        title: '',
        lon: '',
        lat: '',
        desc: ''
      },
      rasterForm: {
        displayTime: '',
        address: ''
      },
      originTime: new Date(),
      vectorForm: {
        displayTime: '',
        type: '',
        vectorFeatures: {}
      },
      vectorList: [],
      rasterList: [],
      rasterLayer: '',
      listLoading: false
      // vectorFeature: {}
    }
  },
  methods: {
    returnMapCard() {
      const obj = {
        view: 'MapCard'
      }
      this.$store.dispatch('SetMapView', obj)
    },
    async submitMapInfo() {
      const map = {
        title: this.mapForm.title,
        lon: this.mapForm.lon,
        lat: this.mapForm.lat,
        desc: this.mapForm.desc,
        rasterLayers: this.rasterList,
        vectorLayers: this.vectorList
      }
      if (this.mapId) {
        map._id = this.mapId
        try {
          await mapApi.updateMap(map)
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success'
          })
        } catch (error) {
          this.$notify.error({
            title: '失败',
            message: '更新失败'
          })
        }
      } else {
        try {
          await mapApi.saveMap(map)
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success'
          })
        } catch (error) {
          this.$notify.error({
            title: '失败',
            message: '更新失败'
          })
        }
      }
      const obj = {
        view: 'MapCard'
      }
      this.$store.dispatch('SetMapView', obj)
    },
    rasterEdit(row) {
      this.rasterForm.displayTime = row.displayTime
      this.rasterForm.address = row.address
      this.rasterLayer = row._id
    },
    rasterDelete(index) {
      this.rasterList.splice(index, 1)
      this.rasterForm.displayTime = ''
      this.rasterForm.address = ''
    },
    vectorEdit(row, index) {
      this.vectorForm.displayTime = row.displayTime
      this.value = this.vectorList[index].featurecollection
    },
    vectorDelete(index) {
      this.vectorList.splice(index, 1)
      this.vectorForm.displayTime = ''
      this.vectorForm.type = ''
      this.vectorForm.featurecollection = {}
    },
    next() {
      if (this.active++ > 4) {
        this.active = 4
      } else {
        this.mapState = this.active
      }
    },
    previous() {
      if (this.active-- < 1) {
        this.active = 0
      } else {
        this.mapState = this.active
      }
    },
    addRaster() {
      this.originTime = this.rasterForm.displayTime
      const obj = {
        _id: shortid.generate(),
        address: this.rasterForm.address,
        displayTime: utils.parseTime(this.rasterForm.displayTime, '{y}-{m}-{d}')
      }
      if (obj.address && obj.displayTime) {
        this.rasterList.push(obj)
        this.rasterForm.displayTime = ''
        this.rasterForm.address = ''
      }
    },
    addVector() {
      this.originTime = this.vectorForm.displayTime
      utils.parseJson(this.value).then(data => {
        const obj = {
          _id: shortid.generate(),
          type: this.vectorForm.type,
          displayTime: utils.parseTime(this.vectorForm.displayTime, '{y}-{m}-{d}'),
          featurecollection: data
        }
        this.vectorList.push(obj)
        this.vectorForm.displayTime = ''
        this.vectorForm.type = ''
      }).catch(error => {
        console.log(error)
        this.$message({
          message: 'json 解析错误',
          type: 'warning'
        })
      })
    }
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
.line{
  text-align: center;
}
.mapshow{
  min-height: 600px;
  margin-top: 50px;
}
.el-select {
    width: 100%;
}
.margin-top30{
  margin-top: 30px;
}
.margin-top20{
  margin-top: 20px;
}
.hidden-content{
    width:150px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

</style>
