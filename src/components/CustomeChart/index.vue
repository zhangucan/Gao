<template>
  <transition name="component-fade" mode="out-in">
    <component v-bind:is="view"></component>
  </transition>
</template>
<script>
import ChooseChart from '../ChooseChart'
import EditChart from '../EditChart'
export default {
  components: {
    ChooseChart,
    EditChart
  },
  data() {
    return {
      view: '',
      gridItem: this.$store.state.bigscreen.gridItem
    }
  },
  mounted() {
    if (this.gridItem.gridType === 'map') {
      this.view = 'ChooseChart'
    } else {
      if (this.gridItem.component.chartType) {
        this.view = 'EditChart'
      } else {
        this.view = 'ChooseChart'
      }
    }
    this.$root.Bus.$on('changeChartView', content => {
      this.view = content
    })
  }
}
</script>
<style lang="scss" scoped>

</style>
