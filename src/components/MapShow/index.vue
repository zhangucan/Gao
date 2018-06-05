<template>
  <div ref="basicMapbox" :style="mapSize"></div>
</template>
<script>
import mapboxgl from 'mapbox-gl'
import * as util from '../../utils/index'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
export default {
  props: {
    mapWidth: {
      type: String
    },
    mapHeight: {
      type: String
    },
    lon: {
      type: String
    },
    lat: {
      type: String
    },
    rasterList: {
      type: Array
    },
    chooseList: {
      type: Array
    },
    vectorList: {
      type: Array
    },
    rasterLayer: {
      type: String
    }
  },
  data() {
    return {
      originRasterList: [],
      originVectorList: [],
      map: {}
    }
  },
  watch: {
    chooseList: {
      handler(val) {
        const _this = this
        _this.originVectorList.forEach(item => {
          _this.map.setLayoutProperty(`line${item}`, 'visibility', 'none')
          _this.map.setLayoutProperty(`point${item}`, 'visibility', 'none')
          _this.map.setLayoutProperty(`area${item}`, 'visibility', 'none')
        })
        val.forEach(item => {
          _this.map.setLayoutProperty(`line${item}`, 'visibility', 'visible')
          _this.map.setLayoutProperty(`point${item}`, 'visibility', 'visible')
          _this.map.setLayoutProperty(`area${item}`, 'visibility', 'visible')
        })
        _this.originVectorList = [...val]
      }
    },
    rasterList: {
      handler(val) {
        const _this = this
        const temp = util.diffArr(val, _this.originRasterList)
        temp.forEach(item => {
          _this.fetchRasterLayer(item)
        })
        _this.originRasterList = [...val]
      }
    },
    vectorList: {
      handler(val) {
        const _this = this
        const temp = val.map(item => {
          return item._id
        })
        const temp2 = util.diffArr(temp, _this.originVectorList)
        temp2.forEach(item => {
          const temp3 = val.find(item2 => {
            return item === item2._id
          })
          if (temp3) _this.fetchVectorLayer(temp3)
        })
        _this.originRasterList = [...temp]
      }
    },
    rasterLayer(val, oldVal) {
      if (oldVal !== '') {
        this.map.setLayoutProperty(`raster${oldVal}`, 'visibility', 'none')
      }
      if (val !== '') {
        this.map.setLayoutProperty(`raster${val}`, 'visibility', 'visible')
      }
    }
  },
  methods: {
    init() {
      const lon = this.lon || 120.165
      const lat = this.lat || 20.74
      const _this = this
      mapboxgl.accessToken = 'pk.eyJ1Ijoiemhhbmd1Y2FuIiwiYSI6ImNqaGhiMDNsOTA3bTQzNnJ4MWlvcnB3Z2sifQ.6TRDunIBxcLu9vuU4yuNhQ'
      this.map = new mapboxgl.Map({
        container: this.$refs.basicMapbox,
        style: 'mapbox://styles/mapbox/dark-v9',
        center: [lon, lat],
        zoom: 11
      })
      const language = new MapboxLanguage({
        defaultLanguage: 'zh'
      })
      this.map.addControl(new mapboxgl.NavigationControl(), 'top-left')
      this.map.addControl(language)
      _this.map.on('load', function() {
        if (_this.rasterList && _this.rasterList.length > 0) {
          _this.rasterList.forEach((item, index) => {
            _this.fetchRasterLayer(item)
          })
          _this.originRasterList = [..._this.rasterList]
        }
        if (_this.vectorList && _this.vectorList.length > 0) {
          _this.vectorList.forEach((item, index) => {
            _this.fetchVectorLayer(item)
          })
          _this.originVectorList = _this.vectorList.map(item => {
            return item._id
          })
        }
      })
    },
    fetchRasterLayer(item) {
      this.map.addLayer({
        'id': `raster${item._id}`,
        'source': {
          'type': 'raster',
          'tiles': [`${item.address}` + '/zxyTileImage.png?prjCoordSys={"epsgCode":3857}&z={z}&x={x}&y={y}'],
          'tileSize': 256
        },
        'type': 'raster'
      })
      this.map.setLayoutProperty(`raster${item._id}`, 'visibility', 'none')
    },
    fetchVectorLayer(item) {
      this.map.addSource(`vector${item._id}`, {
        type: 'geojson',
        data: item.featurecollection
      })
      this.map.addLayer({
        'id': `line${item._id}`,
        'type': 'line',
        'source': `vector${item._id}`,
        'paint': {
          'line-color': '#B42222',
          'line-width': 1
        },
        'filter': ['==', '$type', 'LineString']
      })
      this.map.addLayer({
        'id': `area${item._id}`,
        'type': 'fill',
        'source': `vector${item._id}`,
        'paint': {
          'fill-color': '#B42222',
          'fill-opacity': 0.4
        },
        'filter': ['==', '$type', 'Polygon']
      })
      this.map.addLayer({
        'id': `point${item._id}`,
        'type': 'circle',
        'source': `vector${item._id}`,
        'paint': {
          'circle-radius': 6,
          'circle-color': '#B42222'
        },
        'filter': ['==', '$type', 'Point']
      })
      this.map.setLayoutProperty(`area${item._id}`, 'visibility', 'none')
      this.map.setLayoutProperty(`point${item._id}`, 'visibility', 'none')
      this.map.setLayoutProperty(`line${item._id}`, 'visibility', 'none')
    }
  },
  computed: {
    mapSize() {
      const styleObj = {
        width: this.mapWidth,
        height: this.mapHeight
      }
      return styleObj
    }
  },
  mounted() {
    this.init()
  }
}
</script>
<style>
@import url('../../../node_modules/mapbox-gl/dist/mapbox-gl.css');
</style>
<style lang="scss" scoped>

</style>
