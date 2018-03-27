/**
 * 权限状态管理
 */

import { SET_ROUTERS } from './mutations_types'

import {
    asyncRouterMap,
    constantRouterMap
} from '../../../router'

import role from '../../../config/role'

// 初始化state状态
const state = {
    routers: constantRouterMap, // 固定路由
    addRouters: [] // 动态路由,根据权限匹配
}

const getters = {
    addRouters: (state, getters, rootState) => {
        return state.addRouters
    },
    permissionRouter: (state, getters, rootState) => {
        return state.routers
    }
}

const actions = {
    // 根据用户角色，动态生成路由
    GenerateRouterByRoleType({
        dispatch,
        commit,
        state,
        rootState
    }, data) {
        return new Promise(resolve => {
            const roleType = rootState.user.roleType
            // console.log('GenerateRouterByRoleType', roleType)
            let accessedRouters
            if (roleType === role.type.ADMIN) {
                accessedRouters = asyncRouterMap
            } else {
                accessedRouters = filterAsyncRouter(asyncRouterMap, roleType)
            }
            commit(SET_ROUTERS, accessedRouters)
            resolve()
        })
    }
}

const mutations = {
    SET_ROUTERS(state, routers) {
        // console.log('SET_ROUTERS', routers)
        state.addRouters = routers
        state.routers = constantRouterMap.concat(routers)
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roleType) {
    const accessedRouters = asyncRouterMap.filter(route => {
        if (hasPermission(roleType, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roleType)
            }
            return true
        }
        return false
    })
    return accessedRouters
}

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roleType, route) {
    return true
    // if (route.meta && route.meta.roles) {
    //     return roles.some(role => route.meta.roles.indexOf(role) >= 0)
    // } else {
    //     return true
    // }
}

export default {
    state,
    getters,
    actions,
    mutations
}
