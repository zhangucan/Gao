<template>
  <div class="app-container">
    <transition name="component-fade" mode="out-in">
      <component v-bind:is="view"></component>
    </transition>
  </div>
</template>
<script>
import BigScreenCard from '../../components/BigScreenCard'
import BigScreenLayout from '../../components/BigScreenLayout'
import BigScreenItem from '../../components/BigScreenItem'
export default {
  name: 'bigscreen',
  components: {
    BigScreenCard,
    BigScreenLayout,
    BigScreenItem
  },
  data() {
    return {
    }
  },
  computed: {
    view() {
      return this.$store.state.bigscreen.currentView
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
