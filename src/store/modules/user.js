import { login, logout, getInfo, getRSAkey } from '@/api/login'
import { getToken, setToken, removeToken, encrypt } from '@/utils/auth'

const user = {
  state: {
    _id: '',
    token: getToken(),
    name: '',
    avatar: '',
    role: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER_ID: (state, _id) => {
      state._id = _id
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, role) => {
      state.role = role
    }
  },

  actions: {
    async Login({ commit }, userInfo) {
      const rsa = await getRSAkey()
      const password = encrypt(rsa.key, userInfo.password)
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, password).then(response => {
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          commit('SET_USER_ID', data._id)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state._id).then(response => {
          const data = response.data
          if (data.role) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.role)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
        try {
          logout(state.token)
        } catch (error) {
          reject(error)
        }
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
