<template>
  <div class="app-container">
    <transition name="component-fade" mode="out-in">
        <keep-alive>
          <component v-bind:is="view"></component>
        </keep-alive>
    </transition>
  </div>
</template>
<script>
import MapCard from '../../components/MapCard'
import MapDetail from '../../components/MapDetail'
import AddMap from '../../components/AddMap'
export default {
  name: 'bigscreen',
  components: {
    MapCard,
    MapDetail,
    AddMap
  },
  data() {
    return {
    }
  },
  computed: {
    view() {
      return this.$store.state.map.currentView
    }
  },
  methods: {
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
