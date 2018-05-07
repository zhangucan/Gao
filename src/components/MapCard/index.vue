<template>
  <el-row>
    <el-col :span="5" v-for="(item, index) in mapList" :key="index" :offset="index > 0 ? 2 : 0">
      <el-card :body-style="{ padding: '0px' }">
        <img src="../../../static/bigscreen/baiguihu.png" class="image">
        <div style="padding: 14px;">
          <span>test</span>
          <div class="bottom clearfix">
            <time class="time">2018-05-05 20:20</time>
            <el-button type="text" class="button">查看</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="5" :offset="1" style="text-align: center; cursor:pointer">
      <el-card :body-style="{ padding: '0px' }">
        <i class="el-icon-plus add-srceen" @click="addMap()"></i>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
export default {
  computed: {
    mapList() {
      if (this.$store.state.map.mapList) {
        return [...this.$store.state.map.mapList]
      } else {
        return []
      }
    }
  },
  methods: {
    setView() {
      const obj = { // 数据暂时写死
        view: 'BigScreenLayout',
        title: '白龟山湿地公园'
      }
      this.$store.dispatch('SetMapView', obj).then(() => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    addMap() {
      const obj = {
        view: 'AddMap',
        title: '地图'
      }
      this.$store.dispatch('SetMapView', obj).then(() => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    initMapView() {

    }
  },
  beforeCreate() {
    this.$store.dispatch('FetchAllMap').then(() => {
      this.loading = false
    }).catch(() => {
      this.loading = false
    })
  }
}
</script>
<style lang="scss" scoped>
.grid-demo {
  background: #d3dce6;
  border-radius: 4px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
.add-srceen {
  font-size: 255px;
  color: #ccc;
}
.add-srceen:hover {
  color: #989898 
}
</style>

