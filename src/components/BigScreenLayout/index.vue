<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4" :offset="20">
        <el-button type="primary" @click="saveGridItem">完成修改</el-button>
        <el-button @click="returnBigScreenHome">返回</el-button>
      </el-col>
    </el-row>
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
      </grid-item>
    </grid-layout>
  </div>
</template>
<script>
import VueGridLayout from 'vue-grid-layout'
import * as bigscreenApi from '../../api/bigscreen'
var GridLayout = VueGridLayout.GridLayout
var GridItem = VueGridLayout.GridItem
export default {
  methods: {
    async showDetail(item) {
      this.loading = true
      const obj = {
        view: 'BigScreenItem'
      }
      await this.$store.dispatch('FetchGridItem', { _id: item._id })
      await this.$store.dispatch('SetCurrentComponent', this.$store.state.bigscreen.gridItem.component)
      this.loading = false
      await this.$store.dispatch('SetScreenView', obj)
    },
    saveGridItem() {
      const obj = {
        gridLayout: this.$store.state.bigscreen.gridLayout,
        gridItems: this.$store.state.bigscreen.gridItems
      }
      bigscreenApi.saveGridLayout(obj).then(err => {
        if (err) throw err
      }).catch(err => {
        console.log(err)
      })
    },
    returnBigScreenHome() {
      const obj = {
        view: 'BigScreenCard'
      }
      this.loading = true
      this.$store.dispatch('SetScreenView', obj)
      this.loading = false
    }
  },
  components: {
    GridLayout,
    GridItem
  },
  computed: {
    layout() {
      return [...this.$store.state.bigscreen.gridItems]
    }
  },
  beforeCreate() {
  }
}
</script>
<style lang="scss">
.grid{
  background: #adbed4;
  border-radius: 4px 
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
  float: left;
  padding: 5px 5px;
}
</style>
