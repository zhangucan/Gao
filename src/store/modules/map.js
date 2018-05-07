import * as mapApi from '../../api/map'
const bigscreen = {
  state: {
    currentView: 'MapCard',
    mapLsit: []
  },
  mutations: {
    SET_MAP_VIEW: (state, obj) => {
      state.currentView = obj.view
    },
    FETCH_MAP: (state, data) => {
      state.gridLayout = data
    },
    FETCH_ALL_MAP: (state, data) => {
      state.mapLsit = data
    }
  },
  actions: {
    // 地图管理当前展示视图
    SetMapView({ commit }, obj) {
      return new Promise((resolve, reject) => {
        commit('SET_MAP_VIEW', obj)
      })
    },
    FetchMap({ commit, state }, obj) {
      return new Promise((resolve, reject) => {
        mapApi.fetchMap({ title: state.currentLayout }).then(response => {
          console.log(response)
          const data = response.gridItems
          commit('FETCH_LAYOUT', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    FetchAllMap({ commit, state }, obj) {
      return new Promise((resolve, reject) => {
        mapApi.fetchMap().then(response => {
          console.log(response.mapLsit)
          const data = response.mapList
          commit('FETCH_ALL_MAP', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default bigscreen
