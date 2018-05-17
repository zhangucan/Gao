<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8">
        <el-select v-model="view" placeholder="选择类型">
          <el-option label="地图" value="CustomeMap"></el-option>
          <el-option label="图表" value="CustomeChart"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4" :offset="12">
        <el-button type="primary" @click="saveGridItem">完成修改</el-button>
        <el-button @click="returnBigScreenHome">返回</el-button>
      </el-col>
    </el-row>

    <transition name="component-fade" mode="out-in">
      <component v-bind:is="view"></component>
    </transition>

  </div>
</template>
<script>
import CustomeMap from '../CustomeMap'
import CustomeChart from '../CustomeChart'
import MapShow from '../MapShow'
import * as bigscreenApi from '../../api/bigscreen'
export default {
  components: {
    MapShow,
    CustomeMap,
    CustomeChart
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
      let gridType = ''
      this.view === 'CustomeMap' ? gridType = 'map' : gridType = 'chart'
      this.$store.state.bigscreen.gridItem.gridType = gridType
      bigscreenApi.saveGridItem(this.$store.state.bigscreen.gridItem).then((err, data) => {
        if (err) throw err
      })
    }
  },
  data() {
    return {
      view: ''
    }
  },
  mounted() {
    this.$store.state.bigscreen.gridItem.gridType === 'map' ? this.view = 'CustomeMap' : this.view = 'CustomeChart'
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
