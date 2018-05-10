import * as bigscreenApi from '../../api/bigscreen'
import * as mapApi from '../../api/map'
const bigscreen = {
  state: {
    currentView: 'BigScreenCard',
    gridItem: {},
    currentLayout: '',
    gridLayout: {},
    layoutList: [],
    gridMapList: [],
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
