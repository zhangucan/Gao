<template>
  <div>
    <transition name="slide-fade">
      <div id="dataLoading" v-show="loading">
        <a target="_blank" href="javascript:;">
          <img src="//cdn-service.datav.aliyun.com/datav-static/1.6.24_1/image/loading.gif">
        </a>
      </div>
    </transition>
    <el-row v-show="!loading">
      <el-col :span="5" class="margin15" v-for="(item, index) in mapList" :key="index" >
        <el-card :body-style="{ padding: '0px' }">
          <img src="../../../static/bigscreen/baiguihu.png" class="image">
          <div style="padding: 14px;">
            <span>{{item.title}}</span>
            <div class="bottom clearfix">
              <time class="time">2018-05-05 20:20</time>
              <el-button type="text" class="button" @click="setView(item._id)">查看</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5" class="margin15" style="text-align: center; cursor:pointer">
        <el-card :body-style="{ padding: '0px' }">
          <i class="el-icon-plus add-srceen" @click="addMap()"></i>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
export default {
  computed: {
    mapList() {
      return this.$store.state.map.mapLsit
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async setView(id) {
      const obj = {
        view: 'AddMap'
      }
      this.loading = !this.loading
      await this.$store.dispatch('FetchMap', id)
      await this.$store.dispatch('SetMapView', obj)
      this.loading = !this.loading
    },
    addMap() {
      const obj = {
        view: 'AddMap',
        title: '地图'
      }
      this.$store.dispatch('CreateMapView')
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
    NProgress.start()
    this.loading = true
    this.$store.dispatch('FetchAllMap').then(() => {
      this.loading = false
    }).catch(() => {
      this.loading = false
    })
    NProgress.done()
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
.margin15{
  margin: 15px;
}
#dataLoading {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0f2a42;
}
#dataLoading img {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -60px 0 0 -60px;
  width: 120px;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>

