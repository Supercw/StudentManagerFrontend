import { getDepartments } from '../../service/config'

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
        }
    }
}

export default config
