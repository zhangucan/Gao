import * as bigscreenApi from '../../api/bigscreen'
import * as mapApi from '../../api/map'
const layout = {
  'gridItems': [
    {
      '_id': '5b138d5001517533f9610317',
      'gridType': 'map',
      'i': '1',
      'x': 0,
      'y': 0,
      'w': 3,
      'h': 4,
      'component': {
        'id': '',
        'rasterLayers': [],
        'vectorLayers': []
      }
    },
    {
      'gridType': 'map',
      'i': '2',
      'x': 0,
      'y': 0,
      'w': 3,
      'h': 4,
      'component': {
        'id': '',
        'rasterLayers': [],
        'vectorLayers': []
      }
    },
    {
      'gridType': 'map',
      'i': '3',
      'x': 0,
      'y': 0,
      'w': 3,
      'h': 4,
      'component': {
        'id': '',
        'rasterLayers': [],
        'vectorLayers': []
      }
    },
    {
      'gridType': 'map',
      'i': '4',
      'x': 0,
      'y': 0,
      'w': 3,
      'h': 4,
      'component': {
        'id': '',
        'rasterLayers': [],
        'vectorLayers': []
      }
    },
    {
      'gridType': 'map',
      'i': '5',
      'x': 0,
      'y': 0,
      'w': 3,
      'h': 4,
      'component': {
        'id': '',
        'rasterLayers': [],
        'vectorLayers': []
      }
    },
    {
      'gridType': 'map',
      'i': '6',
      'x': 0,
      'y': 0,
      'w': 3,
      'h': 4,
      'component': {
        'id': '',
        'rasterLayers': [],
        'vectorLayers': []
      }
    },
    {
      'gridType': 'map',
      'i': '7',
      'x': 0,
      'y': 0,
      'w': 3,
      'h': 4,
      'component': {
        'id': '',
        'rasterLayers': [],
        'vectorLayers': []
      }
    },
    {
      'gridType': 'map',
      'i': '8',
      'x': 0,
      'y': 0,
      'w': 3,
      'h': 4,
      'component': {
        'id': '',
        'rasterLayers': [],
        'vectorLayers': []
      }
    },
    {
      'gridType': 'map',
      'i': '9',
      'x': 0,
      'y': 0,
      'w': 3,
      'h': 4,
      'component': {
        'id': '',
        'rasterLayers': [],
        'vectorLayers': []
      }
    },
    {
      'gridType': 'map',
      'i': '10',
      'x': 0,
      'y': 0,
      'w': 3,
      'h': 4,
      'component': {
        'id': '',
        'rasterLayers': [],
        'vectorLayers': []
      }
    },
    {
      'gridType': 'map',
      'i': '11',
      'x': 0,
      'y': 0,
      'w': 3,
      'h': 4,
      'component': {
        'id': '',
        'rasterLayers': [],
        'vectorLayers': []
      }
    },
    {
      'gridType': 'map',
      'i': '12',
      'x': 0,
      'y': 0,
      'w': 3,
      'h': 4,
      'component': {
        'id': '',
        'rasterLayers': [],
        'vectorLayers': []
      }
    }
  ],
  '_id': '5b138d5001517533f9610316',
  'title': 'test456789',
  'desc': 'test',
  'num': 9
}
const chartList = [
  {
    name: '柱状图',
    type: 'bar',
    children: [
      {
        name: '堆积条形图',
        type: 'duijitiaoxing',
        img: 0
      },
      {
        name: '堆积柱图',
        type: 'duijizhuzhuang',
        img: 2
      },
      {
        name: '双向柱图',
        type: 'shuangxiang',
        img: 1
      },
      {
        name: '系列柱线图',
        type: 'xiliezhuxian',
        img: 25
      }
    ]
  },
  {
    name: '折线图',
    type: 'line',
    children: [
      {
        name: '堆积面积图',
        type: 'duijimianji',
        img: 10
      },
      {
        name: '堆积折线图',
        type: 'duijizhexian',
        img: 11
      },
      {
        name: '传统面积图',
        type: 'chuantongmianji',
        img: 15
      },
      {
        name: '阶梯折线图',
        type: 'jietizhexian',
        img: 17
      }
    ]
  },
  {
    name: '饼图',
    type: 'pie',
    children: [
      {
        name: '南丁格尔图',
        type: 'duijimianji',
        img: 7
      },
      {
        name: '环形图',
        type: 'duijizhexian',
        img: 41
      },
      {
        name: '传统饼图',
        type: 'chuantongmianji',
        img: 42
      }
    ]
  }
]
const bigscreen = {
  state: {
    currentView: 'BigScreenCard',
    gridItem: {},
    currentLayout: '',
    gridLayout: {},
    gridItems: [],
    layoutList: [],
    gridMapList: [],
    chartType: '',
    chartList: chartList,
    currentMap: null,
    currentComponent: null
  },
  mutations: {
    SET_SCREEN_VIEW: (state, obj) => {
      state.currentView = obj.view
    },
    FETCH_LAYOUT: (state, data) => {
      state.gridLayout = data
      state.gridItems = data.gridItems
    },
    FETCH_ALL_LAYOUT: (state, data) => {
      state.layoutList = data
    },
    FETCH_GRID_ITEM: (state, id) => {
      state.gridItem = state.gridItems.find(item => {
        return id === item._id
      })
    },
    SET_SCREEN_MAP: (state, id) => {
      state.currentMap = id
    },
    GRID_FETCH_MAP: (state, data) => {
      const obj = {
        map: data.map,
        vectorFeatures: data.vectorFeatures
      }
      state.mapInfo = obj
    },
    SET_GRID_LAYOUT: (state, data) => {
      state.gridLayout.title = data
    },
    GRID_FETCH_ALL_MAP: (state, data) => {
      state.gridMapList = data
    },
    FETCH_VECTORS: (state, data) => {
      state.gridVectors = data.vectors
    },
    EDIT_CHART: (state, data) => {
      state.gridItem.component.chartType = data
    },
    CLEAR_COMPONENT: (state) => {
      state.gridItem.component = {}
    },
    SET_CURRENT_COMPONENT: (state) => {
      state.currentComponent = state.gridItem.component
    },
    SAVE_GRID_ITEM: (state, data) => {
      const index = state.gridItems.findIndex(item => {
        return state.gridItem._id === item._id
      })
      state.gridItems[index] = state.gridItem
    }
  },
  actions: {
    GridFetchMap({ commit, state }, obj) {
      return new Promise((resolve, reject) => {
        mapApi.fetchMap(obj).then(response => {
          commit('GRID_FETCH_MAP', response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    SetScreenMap({ commit, state }, obj) {
      commit('SET_SCREEN_MAP', obj)
    },
    GridFetchAllMap({ commit, state }, obj) {
      return new Promise((resolve, reject) => {
        mapApi.fetchMapList().then(response => {
          commit('GRID_FETCH_ALL_MAP', response.mapLsit)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    FetchVectors({ commit }, obj) {
      return new Promise((resolve, reject) => {
        bigscreenApi.fetchVectors(obj).then(response => {
          commit('FETCH_VECTORS', response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    SetGridLayout({ commit }, obj) {
      commit('SET_GRID_LAYOUT', obj)
    },
    ClearCurrentComponent({ commit }) {
      commit('CLEAR_CURRENT_COMPONENT')
    },
    SetCurrentComponent({ commit }) {
      commit('SET_CURRENT_COMPONENT')
    },
    FetchGridItem({ commit, state }, obj) {
      commit('FETCH_GRID_ITEM', obj)
    },
    // 大屏管理当前展示视图
    SetScreenView({ commit }, obj) {
      commit('SET_SCREEN_VIEW', obj)
    },
    FetchAllLayout({ commit, state }, obj) {
      return new Promise((resolve, reject) => {
        bigscreenApi.fetchLayoutList().then(response => {
          commit('FETCH_ALL_LAYOUT', response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    CreateLayout({ commit, state }) {
      return new Promise((resolve, reject) => {
        bigscreenApi.createLayout(layout).then(response => {
          commit('FETCH_LAYOUT', response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    FetchLayout({ commit, state }, obj) {
      return new Promise((resolve, reject) => {
        bigscreenApi.fetchLayout(obj).then(response => {
          commit('FETCH_LAYOUT', response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    EditChart({ commit, state }, obj) {
      commit('EDIT_CHART', obj)
    },
    ClearComponent({ commit, state }) {
      commit('CLEAR_COMPONENT')
    },
    SaveGridItem({ commit, state }, obj) {
      commit('SAVE_GRID_ITEM')
    }
  }
}
export default bigscreen
