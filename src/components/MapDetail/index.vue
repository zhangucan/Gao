<template>
  <el-row>
    <el-col :span="9" style="padding-right:10px;">
      <el-row>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>地图基本信息</span>
          </div>
          <div class="text item">地图名称: {{mapTitle}}</div>
          <div class="text item">地图中心点: {{lon +' : '+ lat}}</div>
          <div class="text item">地图简介: {{mapDesc}}</div>
        </el-card>
      </el-row>
      <el-row style="margin-top: 10px;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>栅格图层</span>
          </div>
          <el-table :data="rasterList" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
            <el-table-column prop="address" label="发布地址" min-width="200" align="center"></el-table-column>
            <el-table-column align="center" prop="displayTime" label="日期" min-width="200"></el-table-column>
            <el-table-column label="操作" min-width="80">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="changeMap(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-row>
      <el-row style="margin-top: 10px;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>矢量图层</span>
          </div>
          <el-table ref="vectorTable" :data="vectorList" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row  @selection-change="handleSelectionChange">
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column prop="type" label="数据类型" min-width="200" align="center"></el-table-column>
            <el-table-column align="center" prop="displayTime" label="日期" min-width="200"></el-table-column>
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
          </el-table>
        </el-card>
      </el-row>
    </el-col>
    <el-col :span="15">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>地图预览</span>
          </div>
          <map-show mapWidth="100%" mapHeight="600px" :raster-list="tempRasterList" :choose-list="chooseList" :raster-layer="rasterLayer" :vector-list="tempVectorList" :lon="lon" :lat="lat"></map-show>
        </el-card>
    </el-col>
  </el-row>
</template>
<script>
import shortid from 'shortid'
import MapShow from '../MapShow/index'
export default {
  methods: {
    changeMap(row) {
      this.$refs.vectorTable.clearSelection()
      this.rasterLayer = row.id
    },
    handleSelectionChange(selection) {
      // this.tempVectorList = val
      this.chooseList = selection.map(item => {
        return item.id
      })
    }
  },
  components: {
    MapShow
  },
  props: {
    mapTitle: {
      type: String
    },
    mapDesc: {
      type: String
    },
    lon: {
      type: String
    },
    lat: {
      type: String
    },
    rasterList: {
      type: Array
    },
    vectorList: {
      type: Array
    },
    currentRaster: {
      type: String
    },
    currentVector: {
      type: String
    }
  },
  computed: {
    tempVectorList() {
      return this.vectorList.map(item => {
        item.id = shortid.generate()
        return item
      })
    },
    tempRasterList() {
      return this.rasterList.map(item => {
        item.id = shortid.generate()
        return item
      })
    }
  },
  data() {
    return {
      rasterLayer: '',
      listLoading: false,
      chooseList: [],
      tempCurrentRaster: this.currentVector
    }
  }
}
</script>
<style lang="scss" scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
  }
</style>
