<template>
  <div>
    <sticky :className="'sub-navbar published'">
      <el-dropdown trigger="click">
        <el-button plain>{{view === "CustomeMap"?'地图':'图表'}}
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <el-dropdown-menu class="no-padding" slot="dropdown">
          <el-dropdown-item>
            <el-radio-group style="padding: 10px;" v-model="view">
              <el-radio label="CustomeMap">地图</el-radio>
              <el-radio label="CustomeChart">图表</el-radio>
            </el-radio-group>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button type="primary" @click="saveGridItem">完成修改</el-button>
      <el-button @click="returnBigScreenHome">返回</el-button>
    </sticky>
    <div class="app-container">
      <transition name="component-fade" mode="out-in">
        <component v-bind:is="view"></component>
      </transition>
    </div>
  </div>
</template>
<script>
import CustomeMap from '../CustomeMap'
import CustomeChart from '../CustomeChart'
import MapShow from '../MapShow'
import Sticky from '@/components/Sticky' // 粘性header组件
export default {
  components: {
    MapShow,
    CustomeMap,
    CustomeChart,
    Sticky
  },
  computed: {
  },
  watch: {
  },
  methods: {
    async returnBigScreenHome() {
      this.loading = true
      const obj = {
        view: 'BigScreenLayout'
      }
      await this.$store.dispatch('SetScreenView', obj)
      this.loading = false
    },
    saveGridItem() {
      const _this = this
      let gridType = ''
      this.view === 'CustomeMap' ? gridType = 'map' : gridType = 'chart'
      this.gridItem.gridType = gridType
      _this.$store.dispatch('SaveGridItem')
      _this.$store.dispatch('SetCurrentComponent', this.gridItem.component)
      this.$notify.info({
        title: '保存',
        message: '请记得保存大屏'
      })
    }
  },
  data() {
    return {
      view: '',
      gridItem: this.$store.state.bigscreen.gridItem
    }
  },
  mounted() {
    this.gridItem.gridType === 'map' ? this.view = 'CustomeMap' : this.view = 'CustomeChart'
  },
  beforeCreate() {
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
</style>
