<template>
  <div>
    <sticky :className="'sub-navbar published'">
      <el-button type="success" @click="saveGridItem">完成修改</el-button>
      <el-button type="danger" @click="deleteGridItem">删除</el-button>
      <el-button @click="returnBigScreenHome">返回</el-button>
    </sticky>
    <el-row class="createPost-main-container">
      <el-col :span="15" class="_content _panel">
        <grid-layout
        :layout='layout'
        :col-num='12'
        :row-height='30'
        :is-draggable='true'
        :is-resizable='true'
        :is-mirrored='false'
        :vertical-compact='true'
        :margin='[30,30,30,30]'
        :use-css-transforms='true'
      >
          <grid-item class="grid" v-for='(item, index) in layout'
            :x='item.x'
            :y='item.y'
            :w='item.w'
            :h='item.h'
            :i='item.i'
            :key='index'>
            <button class="pan-btn blue-btn detail" @click="showDetail(item)">修改内容</button>
            <div class="card-num">{{item.i}}</div>
          </grid-item>
        </grid-layout>
      </el-col>
      <el-col :span="8" :offset="1" class="_content">
        <el-form ref="mapForm" :model="gridLayout" label-width="120px">
          <MDinput name="name" style="margin-bottom: 80px;" v-model="gridLayout.title" required :maxlength="100">标题</MDinput>
          <MDinput name="name" style="margin-bottom: 80px;" v-model="gridLayout.desc" required :maxlength="100">简单描述</MDinput>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import VueGridLayout from 'vue-grid-layout'
import * as bigscreenApi from '../../api/bigscreen'
import Sticky from '@/components/Sticky' // 粘性header组件
import MDinput from '@/components/MDinput'
var GridLayout = VueGridLayout.GridLayout
var GridItem = VueGridLayout.GridItem
export default {
  methods: {
    async confirmEdit() {
    },
    async showDetail(item) {
      const obj = {
        view: 'BigScreenItem'
      }
      await this.$store.dispatch('FetchGridItem', item._id)
      await this.$store.dispatch('SetCurrentComponent')
      await this.$store.dispatch('SetScreenView', obj)
    },
    async deleteGridItem() {
      const _this = this
      try {
        await bigscreenApi.deleteGridLayout(this.gridLayout._id)
        _this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success'
        })
        const obj = {
          view: 'BigScreenCard'
        }
        this.$store.dispatch('SetScreenView', obj)
      } catch (error) {
        _this.$notify.error({
          title: '失败',
          message: '删除失败'
        })
      }
    },
    async saveGridItem() {
      if (this.gridLayout._id) {
        try {
          this.gridLayout.map = this.$store.state.bigscreen.currentMap
          await bigscreenApi.updateGridLayout(this.gridLayout)
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
    },
    returnBigScreenHome() {
      const obj = {
        view: 'BigScreenCard'
      }
      this.$store.dispatch('SetScreenView', obj)
    }
  },
  components: {
    GridLayout,
    MDinput,
    GridItem,
    Sticky
  },
  data() {
    return {
      edit: false,
      cardNum: 0,
      gridLayout: this.$store.state.bigscreen.gridLayout,
      min: this.$store.state.bigscreen.gridLayout.num
    }
  },
  computed: {
    layout() {
      return [...this.gridLayout.gridItems]
    }
  },
  mounted() {
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .title-prompt{
    position: absolute;
    right: 0px;
    font-size: 12px;
    top:10px;
    color:#ff4949;
  }
  .createPost-main-container {
      padding: 40px 45px 20px 50px;
  }
.grid{
  background: #adbed4;
  border-radius: 4px 
}
._panel{
  border: solid;
  border-radius: 5px;
}
._content{
  min-height: 83vh;
}
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}
.component-item{
  min-height: 100px;
}
.detail{
  padding: 5px 5px;
}
.card-num{
  font-size: 150px;
  text-align: center;
  color: rgba(255,255,255,.5);
}
</style>
