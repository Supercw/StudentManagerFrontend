import router from '../../router'
import store from '../../store'
import {
    Message
} from 'element-ui'

import storage from '../../config/storageHelp'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({
    showSpinner: false
}) // NProgress Configuration

function hasPermission(roleType, permissionRoles) {
    if (roleType === 4 || roleType === 2 || roleType === 3 || roleType === 1) {
        return true
    } else {
        return false
    }
}

// 不需要token
const whiteList = ['/login']

const checkAuth = () => {
    if (storage.token) {
        // console.log('storage.token', storage.token)
        return true
    } else {
        return false
    }
};
// 权限校验
router.beforeEach((to, from, next) => {
    NProgress.start()
    // 有token
    if (checkAuth()) {
        // console.log('to.path', to.path)
        if (to.path === '/login') {
            // next({
            //     path: '/'
            // })
            next()
            NProgress.done()
        } else {
            // 判断当前用户是否已拉取完user_info信息
            // console.log('当前路由角色', to.path, store.getters.roleType)
            if (store.getters.roleType === -1) {
                // 获取用户信息
                store.dispatch('GetUserInfo').then(() => {
                    // 根据用户的角色动态生成路由
                    store.dispatch('GenerateRouterByRoleType').then(() => {
                        // 根据roles权限生成可访问的路由表
                        // console.log('动态生成的路由', store.getters.addRouters)
                        // 动态添加可访问路由表
                        router.addRoutes(store.getters.addRouters)
                        // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                        next({ ...to,
                            replace: true
                        })
                    })
                }).catch(() => {
                    // console.log('LogOut')
                    store.dispatch('LogOut').then(() => {
                        Message.error('Verification failed, please login again')
                        next({
                            path: '/login'
                        })
                    })
                })
            } else {
                // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
                if (hasPermission(store.getters.roleType, to.meta.roleType)) {
                    next()
                } else {
                    next({
                        path: '/401',
                        replace: true,
                        query: {
                            noGoBack: true
                        }
                    })
                }
            }
        }
    } else {
        // 没有token
        console.log('no token', storage.token)
        if (whiteList.indexOf(to.path) !== -1) {
            // 在免登录白名单，直接进入
            next()
        } else {
            // 既没token,又不在免登陆的名单中，全部重定向到登录页
            next('/login')
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done() // finish progress bar
})
