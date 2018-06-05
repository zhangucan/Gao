import * as mapApi from '../../api/map'
const bigscreen = {
  state: {
    currentView: 'MapCard',
    mapLsit: [],
    mapInfo: null
  },
  mutations: {
    SET_MAP_VIEW: (state, obj) => {
      state.currentView = obj.view
    },
    FETCH_MAP: (state, data) => {
      state.mapInfo = data
    },
    FETCH_ALL_MAP: (state, data) => {
      state.mapLsit = data
    },
    CREATE_MAP_VIEW: (state) => {
      state.mapInfo = null
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
          commit('FETCH_MAP', response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    CreateMapView({ commit, state }) {
      commit('CREATE_MAP_VIEW')
    },
    FetchAllMap({ commit, state }, obj) {
      return new Promise((resolve, reject) => {
        mapApi.fetchMapList().then(response => {
          commit('FETCH_ALL_MAP', response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default bigscreen
