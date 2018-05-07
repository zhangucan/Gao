import * as bigscreenApi from '../../api/bigscreen'
const bigscreen = {
  state: {
    currentView: 'BigScreenCard',
    currentLayout: '',
    gridLayout: {}
  },
  mutations: {
    SET_SCREEN_VIEW: (state, obj) => {
      state.currentView = obj.view
      state.currentLayout = obj.title
    },
    FETCH_LAYOUT: (state, data) => {
      state.gridLayout = data
    }
  },
  actions: {
    // 大屏管理当前展示视图
    SetScreenView({ commit }, obj) {
      return new Promise((resolve, reject) => {
        commit('SET_SCREEN_VIEW', obj)
      })
    },
    FetchLayout({ commit, state }) {
      return new Promise((resolve, reject) => {
        bigscreenApi.fetchLayout({ title: state.currentLayout }).then(response => {
          console.log(response)
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
