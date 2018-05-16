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
      },
      {
        name: '堆积柱线图',
        type: 'duijizhuxian',
        img: 999
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
    layoutList: [],
    gridMapList: [],
    chartList: chartList,
    currentMap: null
  },
  mutations: {
    SET_SCREEN_VIEW: (state, obj) => {
      state.currentView = obj.view
    },
    FETCH_LAYOUT: (state, data) => {
      state.gridLayout = data
    },
    FETCH_ALL_LAYOUT: (state, data) => {
      state.layoutList = data.gridItems
    },
    FETCH_GRID_ITEM: (state, data) => {
      state.gridItem = data.gridItem
    },
    GRID_FETCH_MAP: (state, data) => {
      const obj = {
        map: data.map,
        vectorFeatures: data.vectorFeatures
      }
      state.mapInfo = obj
    },
    GRID_FETCH_ALL_MAP: (state, data) => {
      state.gridMapList = data
    },
    FETCH_VECTORS: (state, data) => {
      state.gridVectors = data.vectors
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
    FetchGridItem({ commit }, obj) {
      return new Promise((resolve, reject) => {
        bigscreenApi.fetchGridItem(obj).then(response => {
          commit('FETCH_GRID_ITEM', response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 大屏管理当前展示视图
    SetScreenView({ commit }, obj) {
      return new Promise((resolve, reject) => {
        commit('SET_SCREEN_VIEW', obj)
      })
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
    FetchLayout({ commit, state }, obj) {
      return new Promise((resolve, reject) => {
        bigscreenApi.fetchLayout(obj).then(response => {
          const data = response.gridItems
          commit('FETCH_LAYOUT', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default bigscreen
