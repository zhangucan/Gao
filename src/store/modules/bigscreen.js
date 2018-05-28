import * as bigscreenApi from '../../api/bigscreen'
import * as mapApi from '../../api/map'
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
      state.gridLayout = data.gridLayout
      state.gridItems = data.gridItems
    },
    FETCH_ALL_LAYOUT: (state, data) => {
      state.layoutList = data.gridLayoutList
    },
    FETCH_GRID_ITEM: (state, gridItem) => {
      if (gridItem.gridType === 'map') {
        if (!gridItem.component.vectorList) gridItem.component.vectorList = []
        if (!gridItem.component.rasterList) gridItem.component.rasterList = []
      }
      state.gridItem = gridItem.gridItem
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
    SET_CURRENT_COMPONENT: (state, data) => {
      state.currentComponent = data
    },
    SAVE_GRID_ITEM: (state, data) => {
      state.gridItem = data
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
    SetCurrentComponent({ commit }, obj) {
      commit('SET_CURRENT_COMPONENT', obj)
    },
    FetchGridItem({ commit, state }, obj) {
      return new Promise((resolve, reject) => {
        bigscreenApi.fetchGridItem({ _id: obj }).then(response => {
          commit('FETCH_GRID_ITEM', response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 大屏管理当前展示视图
    SetScreenView({ commit }, obj) {
      commit('SET_SCREEN_VIEW', obj)
    },
    FetchAllLayout({ commit, state }, obj) {
      return new Promise((resolve, reject) => {
        bigscreenApi.fetchLayoutList().then(response => {
          commit('FETCH_ALL_LAYOUT', response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    CreateLayout({ commit, state }) {
      return new Promise((resolve, reject) => {
        bigscreenApi.createLayout().then(response => {
          commit('FETCH_LAYOUT', response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    FetchLayout({ commit, state }, obj) {
      return new Promise((resolve, reject) => {
        bigscreenApi.fetchLayout(obj).then(response => {
          commit('FETCH_LAYOUT', response)
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
      commit('SAVE_GRID_ITEM', obj)
    }
  }
}
export default bigscreen
