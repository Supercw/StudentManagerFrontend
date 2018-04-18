import { getUserInfo, logout } from '../../../service/user'
import storage from '../../../config/storageHelp'

// 初始化state状态
const state = {
    user: {}, // 当前用户
    roleType: -1, // 权限默认是 -1
    name: '',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
}

const getters = {
    currentUserInfo: (state, getters, rootState) => {
        return state.user
    },
    roleType: (state) => {
        return state.roleType
    }
}

const actions = {
    // 获取用户信息
    GetUserInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            let paramData = {
                userId: storage.userId
            }
            getUserInfo(paramData, {}).then(res => {
                // console.log('getUserInfo', res)
                if (res.code === 10000) {
                    commit('SAVE_USER_INFO', res.data)
                    resolve()
                } else {
                    reject(res)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 登出
    LogOut({ commit, state }) {
        return new Promise((resolve, reject) => {
            commit('CLEAR_LOGIN_INFO')
            resolve()
            // logout().then(() => {
            //     commit('CLEAR_LOGIN_INFO')
            //     resolve()
            // }).catch(error => {
            //     console.log(error)
            //     resolve()
            // })
        })
    }
}

const mutations = {
    // 保存用户信息
    SAVE_USER_INFO(state, userInfo) {
        console.log('userInfo', userInfo)
        state.user = userInfo
        if (userInfo.roleType) {
            // 保存角色
            state.roleType = userInfo.roleType
        }
    },
    // 保存登录信息,token,userId
    SAVE_LOGIN_INFO(state, loginInfo) {
        console.log('loginInfo', loginInfo)
        state.user = loginInfo
        if (loginInfo.roleType) {
            // 设置角色
            // state.roleType = loginInfo.roleType
        }
        if (loginInfo.id) {
            storage.userId = loginInfo.id
        }
        if (loginInfo.token) {
            storage.token = loginInfo.token
        }
        storage.save()
    },
    // 清除登录信息
    CLEAR_LOGIN_INFO(state, data) {
        state.roleType = -1
        storage.token = ''
        storage.userId = ''
        storage.save()
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
