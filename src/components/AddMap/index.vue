<template>
  <div class="app-container">
    <el-row>
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
        <el-button @click="next">{{step}}</el-button>
      </el-col>
    </el-row>
    <transition name="component-fade" mode="out-in">
      <el-row class="mapshow" v-if="mapState === 0" key="editing">
        <el-col :span="16" :offset=4>
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
        </el-col>
      </el-row>
      <el-row v-if="mapState === 1" key="edited" class="mapshow">
        <el-col :span="8">
          <el-form ref="rasterForm" :model="rasterForm" label-width="120px">
            <el-form-item label="拍摄时间">
                  <el-date-picker
                    style="width:87%;"
                    v-model="rasterForm.displayTime"
                    type="datetime"
                    size="large"
                    format="yyyy-MM-dd HH-mm-ss"
                    placeholder="选择日期时间">
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
          <el-table :data="rasterList" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
            <el-table-column prop="address" label="发布地址" width="246" align="center"></el-table-column>
            <el-table-column align="center" prop="displayTime" label="日期" width="155"></el-table-column>
            <el-table-column label="操作" width="150">
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
        </el-col>
        <el-col :span="15" :offset="1">
          <map-show mapWidth="100%" mapHeight="600px" :map-url="rasterForm.address" :lon="mapForm.lon" :lat="mapForm.lat"></map-show>
        </el-col>
      </el-row>
      <el-row v-if="mapState === 2" key="edited2" class="mapshow">
        <el-col :span="8">
          <el-form ref="vectorForm" :model="vectorForm" label-width="120px">
            <el-form-item label="矢量时间">
                  <el-date-picker
                    style="width:87%;"
                    v-model="vectorForm.displayTime"
                    type="datetime"
                    size="large"
                    format="yyyy-MM-dd HH-mm-ss"
                    placeholder="选择日期时间">
                  </el-date-picker>
            </el-form-item>
            <el-form-item label="数据类型">
              <el-col :span="21">
                <el-input v-model="vectorForm.type" :disabled="true" placeholder="数据类型"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addVector">增加</el-button>
            </el-form-item>
          </el-form>
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
        </el-col>
        <el-col :span="15" :offset="1">
          <div class="editor-container">
            <json-editor ref="jsonEditor" v-model="value"></json-editor>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="mapState === 3" key="saved" class="mapshow">
        <map-detail :map-desc="mapForm.desc" :map-title="mapForm.title" :lon="mapForm.lon" :lat="mapForm.lat" :raster-list="rasterList" :vector-list="vectorList"></map-detail>
      </el-row>
    </transition>

  </div>
</template>
<script>
import * as utils from '../../utils/index'
import MapShow from '../MapShow/index'
import MapDetail from '../MapDetail/index'
import JsonEditor from '@/components/JsonEditor'
export default {
  components: {
    MapShow,
    JsonEditor,
    MapDetail
  },
  watch: {
    value(val) {
      utils.parseJson(val).then(data => {
        const a = data
        const type = a.type.toLowerCase()
        this.vectorForm.type = type
      }).catch(error => {
        console.log(error)
        this.$message({
          message: 'json 解析错误',
          type: 'warning'
        })
      })
    },
    mapState(val) {
      if (val === 3) {
        this.step = '完成'
      } else {
        this.step = '下一步'
      }
    }
  },
  data() {
    return {
      step: '下一步',
      value: { 'type': '空' },
      active: 0,
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
      vectorForm: {
        displayTime: '',
        type: '',
        vectorFeatures: {}
      },
      vectorList: [],
      rasterList: [],
      listLoading: false
      // vectorFeature: {}
    }
  },
  methods: {
    rasterEdit(row) {
      this.rasterForm.displayTime = row.displayTime
      this.rasterForm.address = row.address
    },
    rasterDelete(index) {
      this.rasterList.splice(index, 1)
      this.rasterForm.displayTime = ''
      this.rasterForm.address = ''
    },
    vectorEdit(row, index) {
      this.vectorForm.displayTime = row.displayTime
      this.value = this.vectorList[index].vectorFeatures
      console.log(this.vectorList)
    },
    vectorDelete(index) {
      console.log(this.vectorList)
      this.vectorList.splice(index, 1)
      this.vectorForm.displayTime = ''
      this.vectorForm.type = ''
      this.vectorForm.vectorFeatures = {}
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
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    addRaster() {
      const obj = {
        address: this.rasterForm.address,
        displayTime: utils.parseTime(this.rasterForm.displayTime)
      }
      if (obj.address && obj.displayTime) {
        this.rasterList.push(obj)
        this.rasterForm.displayTime = ''
        this.rasterForm.address = ''
      }
    },
    addVector() {
      utils.parseJson(this.value).then(data => {
        const type = data.type.toLowerCase()
        const obj = {
          type: type,
          displayTime: utils.parseTime(this.vectorForm.displayTime),
          vectorFeatures: data
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
  },
  created() {
    // this.fetchData()
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
</style>
