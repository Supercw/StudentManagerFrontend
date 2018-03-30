import { getDepartments, getProfessionals } from '../../service/config'

const config = {
    state: {
        departments: [], // 院系数据
        professionals: [] // 专业数据
    },
    mutations: {
        // 保存院系信息
        SET_DEPARTMENTA(state, departments) {
            // console.log('departments', departments)
            state.departments = departments
        },
        // 保存专业信息
        SET_PROFESSIONAL(state, professionals) {
            // console.log('departments', departments)
            state.professionals = professionals
        }
    },
    actions: {
        // 获取院系数据
        GetDepartmentsData({
            dispatch,
            commit,
            state,
            rootState
        }, data) {
            return new Promise((resolve, reject) => {
                getDepartments({}).then(res => {
                    // console.log('getDepartments', res)
                    if (res.code === 10000) {
                        commit('SET_DEPARTMENTA', res.data)
                        resolve(res.data)
                    } else {
                        reject(res)
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取专业数据
        GetProfessionalsData({
            dispatch,
            commit,
            state,
            rootState
        }, data) {
            return new Promise((resolve, reject) => {
                getProfessionals({}).then(res => {
                    // console.log('getDepartments', res)
                    if (res.code === 10000) {
                        commit('SET_PROFESSIONAL', res.data)
                        resolve(res.data)
                    } else {
                        reject(res)
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}

export default config
