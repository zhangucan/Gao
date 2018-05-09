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
      console.log(data)
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
        mapApi.fetchMap(obj).then(response => {
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
          commit('FETCH_ALL_MAP', response.mapLsit)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default bigscreen
