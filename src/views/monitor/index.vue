<template>
  <div class="container">
    <div class="header"></div>
    <div class="content">
        <grid-layout class="top-30 right10"
          :layout='layout'
          :col-num='12'
          :row-height='30'
          :is-draggable='false'
          :is-resizable='false'
          :is-mirrored='false'
          :vertical-compact='true'
          :margin='[30,30,30,30]'
          :use-css-transforms='true'
      >
          <grid-item class="grid-border" v-for='(item, index) in layout'
            :x='item.x'
            :y='item.y'
            :w='item.w'
            :h='item.h'
            :i='item.i'
            :key='index'>
              <component :is="showView(item.gridType)" :component="item.component"></component>
          </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style>
.header {
  width: 100%;
  height: 10%;
  background-image: url(../assets/img/header.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.content{
  width: 100%;
  height: 100%;
  position: inherit;
  overflow-y: scroll;
}
::-webkit-scrollbar {
  display:none
}

.container{
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-image: url(../assets/img/background.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
