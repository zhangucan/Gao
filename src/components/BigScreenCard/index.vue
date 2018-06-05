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
      <el-col :span="5" class="margin15" v-for="(item, index) in layoutList" :key="index">
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
          <i class="el-icon-plus add-srceen" @click="addScreen()"></i>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
export default {
  data() {
    return {
      loading: false
    }
  },
  computed: {
    layoutList() {
      return this.$store.state.bigscreen.layoutList
    }
  },
  methods: {
    async setView(id) {
      const obj = {
        view: 'BigScreenLayout'
      }
      NProgress.start()
      this.loading = !this.loading
      await this.$store.dispatch('FetchLayout', id)
      await this.$store.dispatch('SetScreenView', obj)
      this.loading = !this.loading
      NProgress.done()
    },
    async addScreen() {
      const obj = {
        view: 'BigScreenLayout'
      }
      NProgress.start()
      this.loading = !this.loading
      await this.$store.dispatch('CreateLayout')
      await this.$store.dispatch('SetScreenView', obj)
      NProgress.done()
    }
  },

  async beforeCreate() {
    await this.$store.dispatch('FetchAllLayout')
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
  color: #989898;
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

