import Vue from 'vue'
import Router from 'vue-router'

// 懒加载

const layout = r => require.ensure([], () => r(require('../page/layout')), 'layout')

// 登录
const login = r => require.ensure([], () => r(require('../page/login')), 'login')

// dashboard
const dashboard = r => require.ensure([], () => r(require('../page/dashboard')), 'dashboard')

// documentation
const documentation = r => require.ensure([], () => r(require('../page/documentation')), 'documentation')


// -----example
// form
const form = r => require.ensure([], () => r(require('../page/example/form')), 'form')
// table
const table = r => require.ensure([], () => r(require('../page/example/table')), 'table')
const complexTable = r => require.ensure([], () => r(require('../page/example/table/complexTable')), 'complexTable')
const drapTable = r => require.ensure([], () => r(require('../page/example/table/drapTable')), 'drapTable')


// errorPage
// 无权限
const errorPage401 = r => require.ensure([], () => r(require('../page/errorPage/401')), 'errorPage401')
// 找不到页面
const errorPage404 = r => require.ensure([], () => r(require('../page/errorPage/404')), 'errorPage404')

// svg图标
const svgIcons = r => require.ensure([], () => r(require('../page/svgIcons')), 'svgIcons')

// 班级管理
const createClass = r => require.ensure([], () => r(require('../page/class/createClass')), 'createClass')
const editClass = r => require.ensure([], () => r(require('../page/class/editClass')), 'editClass')
const queryClass = r => require.ensure([], () => r(require('../page/class/queryClass')), 'queryClass')

// 学生管理
const createStudent = r => require.ensure([], () => r(require('../page/student/createStudent')), 'createStudent')
const editStudent = r => require.ensure([], () => r(require('../page/student/editStudent')), 'editStudent')
const queryStudent = r => require.ensure([], () => r(require('../page/student/queryStudent')), 'queryStudent')

// 教师管理
const createTeacher = r => require.ensure([], () => r(require('../page/teacher/createTeacher')), 'createTeacher')
const editTeacher = r => require.ensure([], () => r(require('../page/teacher/editTeacher')), 'editTeacher')
const queryTeacher = r => require.ensure([], () => r(require('../page/teacher/queryTeacher')), 'queryTeacher')

// 课程管理
const createArrangCourse = r => require.ensure([], () => r(require('../page/course/createArrangCourse')), 'createArrangCourse')
const editArrangCourse = r => require.ensure([], () => r(require('../page/course/editArrangCourse')), 'editArrangCourse')
const queryArrangCourse = r => require.ensure([], () => r(require('../page/course/queryArrangCourse')), 'queryArrangCourse')

// 成绩管理
const createCourseScore = r => require.ensure([], () => r(require('../page/score/createCourseScore')), 'createCourseScore')
const editCourseScore = r => require.ensure([], () => r(require('../page/score/editCourseScore')), 'editCourseScore')
const queryCourseScore = r => require.ensure([], () => r(require('../page/score/queryCourseScore')), 'queryCourseScore')

// 教务员管理
const createAcdemic = r => require.ensure([], () => r(require('../page/acdemicDean/createAcdemic')), 'createAcdemic')
const editAcdemic = r => require.ensure([], () => r(require('../page/acdemicDean/editAcdemic')), 'editAcdemic')
const queryAcdemic = r => require.ensure([], () => r(require('../page/acdemicDean/queryAcdemic')), 'queryAcdemic')

// 系统管理
const changePassword = r => require.ensure([], () => r(require('../page/system/changePassword')), 'changePassword')
const resetPassword = r => require.ensure([], () => r(require('../page/system/resetPassword')), 'resetPassword')

/**
 * 配置详解
 * hidden: true 路由不会再侧边栏出现 如401，login等页面(默认 false)
 * redirect: 'noredirect' 表示该路由不会在面包屑导航中出现
 */

Vue.use(Router)

export const constantRouterMap = [{
    path: '/login',
    component: login,
    hidden: true
}, {
    path: '/404',
    component: errorPage404,
    hidden: true
}, {
    path: '/401',
    component: errorPage401,
    hidden: true
}, {
    path: '',
    component: layout,
    redirect: 'dashboard',
    name: 'dashboard',
    hidden: false,
    meta: {
        title: 'dashboard',
        icon: 'dashboard'
    },
    children: [{
        path: 'dashboard',
        component: dashboard,
        name: 'dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: false }
    }]
}]

// 动态权限
export const asyncRouterMap = [{
    path: '/example',
    component: layout,
    redirect: 'noredirect',
    hidden: true,
    name: 'example',
    meta: {
        title: 'example',
        icon: 'example'
    },
    children: [{
        path: 'form',
        component: form,
        name: 'testForm',
        meta: { title: 'form', icon: 'form', noCache: false }
    }, {
        path: '/example/table',
        component: table,
        redirect: 'noredirect',
        name: 'table',
        meta: { title: 'Table', icon: 'table' },
        children: [{
            path: 'complex-table',
            component: complexTable,
            name: 'complexTable',
            meta: { title: 'complexTable', icon: 'table', noCache: true }
        }, {
            path: 'drap-table',
            component: drapTable,
            name: 'drapTable',
            meta: { title: 'dragTable', icon: 'table', noCache: false }
        }]
    }]
}, {
    path: '/documentation',
    component: layout,
    redirect: '/documentation/index',
    hidden: true,
    children: [{
        path: 'index',
        component: documentation,
        name: 'documentation',
        meta: { title: 'documentation', icon: 'documentation', noCache: true }
    }]
}, {
    path: '/error',
    component: layout,
    redirect: 'noredirect',
    hidden: true,
    name: 'errorPages',
    meta: {
        title: 'errorPages',
        icon: '404'
    },
    children: [
        { path: '401', component: errorPage401, name: 'page401', meta: { title: 'page401', noCache: true } },
        { path: '404', component: errorPage404, name: 'page404', meta: { title: 'page404', noCache: true } }
    ]
}, {
    path: '/icon',
    component: layout,
    redirect: 'noredirect',
    hidden: true,
    children: [
        { path: 'index', component: svgIcons, name: 'icon', meta: { title: 'icons', icon: 'icon', noCache: true } }
    ]
}, {
    path: '/class',
    component: layout,
    redirect: 'noredirect',
    name: 'class',
    meta: {
        title: 'class',
        icon: 'documentation'
    },
    children: [{
        path: 'queryClass',
        component: queryClass,
        name: 'queryClass',
        meta: { title: 'queryClass', icon: 'documentation', noCache: true }
    }, {
        path: 'createClass',
        component: createClass,
        name: 'createClass',
        meta: { title: 'createClass', icon: 'documentation', noCache: true }
    }, {
        path: 'editClass',
        component: editClass,
        name: 'editClass',
        meta: { title: 'editClass', icon: 'documentation', noCache: true }
    }]
}, {
    path: '/student',
    component: layout,
    redirect: 'noredirect',
    name: 'student',
    meta: {
        title: 'student',
        icon: 'documentation'
    },
    children: [{
        path: 'queryStudent',
        component: queryStudent,
        name: 'queryStudent',
        meta: { title: 'queryStudent', icon: 'documentation', noCache: true }
    }, {
        path: 'createStudent',
        component: createStudent,
        name: 'createStudent',
        meta: { title: 'createStudent', icon: 'documentation', noCache: true }
    }, {
        path: 'editStudent',
        component: editStudent,
        name: 'editStudent',
        meta: { title: 'editStudent', icon: 'documentation', noCache: true }
    }]
}, {
    path: '/teacher',
    component: layout,
    redirect: 'noredirect',
    name: 'teacher',
    meta: {
        title: 'teacher',
        icon: 'documentation'
    },
    children: [{
        path: 'queryTeacher',
        component: queryTeacher,
        name: 'queryTeacher',
        meta: { title: 'queryTeacher', icon: 'documentation', noCache: true }
    }, {
        path: 'createTeacher',
        component: createTeacher,
        name: 'createTeacher',
        meta: { title: 'createTeacher', icon: 'documentation', noCache: true }
    }, {
        path: 'editTeacher',
        component: editTeacher,
        name: 'editTeacher',
        meta: { title: 'editTeacher', icon: 'documentation', noCache: true }
    }]
}, {
    path: '/course',
    component: layout,
    redirect: 'noredirect',
    name: 'course',
    meta: {
        title: 'course',
        icon: 'documentation'
    },
    children: [{
        path: 'queryArrangCourse',
        component: queryArrangCourse,
        name: 'queryArrangCourse',
        meta: { title: 'queryArrangCourse', icon: 'documentation', noCache: true }
    }, {
        path: 'createArrangCourse',
        component: createArrangCourse,
        name: 'createArrangCourse',
        meta: { title: 'createArrangCourse', icon: 'documentation', noCache: true }
    }, {
        path: 'editArrangCourse',
        component: editArrangCourse,
        name: 'editArrangCourse',
        meta: { title: 'editArrangCourse', icon: 'documentation', noCache: true }
    }]
}, {
    path: '/score',
    component: layout,
    redirect: 'noredirect',
    name: 'score',
    meta: {
        title: 'score',
        icon: 'documentation'
    },
    children: [{
        path: 'queryCourseScore',
        component: queryCourseScore,
        name: 'queryCourseScore',
        meta: { title: 'queryCourseScore', icon: 'documentation', noCache: true }
    }, {
        path: 'createCourseScore',
        component: createCourseScore,
        name: 'createCourseScore',
        meta: { title: 'createCourseScore', icon: 'documentation', noCache: true }
    }, {
        path: 'editCourseScore',
        component: editCourseScore,
        name: 'editCourseScore',
        meta: { title: 'editCourseScore', icon: 'documentation', noCache: true }
    }]
}, {
    path: '/acdemicDean',
    component: layout,
    redirect: 'noredirect',
    name: 'acdemicDean',
    meta: {
        title: 'acdemicDean',
        icon: 'documentation'
    },
    children: [{
        path: 'queryAcdemic',
        component: queryAcdemic,
        name: 'queryAcdemic',
        meta: { title: 'queryAcdemic', icon: 'documentation', noCache: true }
    }, {
        path: 'createAcdemic',
        component: createAcdemic,
        name: 'createAcdemic',
        meta: { title: 'createAcdemic', icon: 'documentation', noCache: true }
    }, {
        path: 'editAcdemic',
        component: editAcdemic,
        name: 'editAcdemic',
        meta: { title: 'editAcdemic', icon: 'documentation', noCache: true }
    }]
}, {
    path: '/system',
    component: layout,
    redirect: 'noredirect',
    name: 'system',
    meta: {
        title: 'system',
        icon: 'documentation'
    },
    children: [{
        path: 'changePassword',
        component: changePassword,
        name: 'changePassword',
        meta: { title: 'changePassword', icon: 'documentation', noCache: true }
    }, {
        path: 'resetPassword',
        component: resetPassword,
        name: 'resetPassword',
        meta: { title: 'resetPassword', icon: 'documentation', noCache: true }
    }]
}, {
    path: '*',
    redirect: '/404',
    hidden: true
}]

const router = new Router({
    // mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            if (to && to.name === 'home') {
                sessionStorage.setItem('homePosition', savedPosition.y)
            }
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    },
    routes: constantRouterMap
});

export default router
