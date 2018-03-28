//  用户模块
import fetch from '../config/axios'

// 登录接口
export const login = (paramData, postData) => fetch('/login', postData, 'POST')

// 获取用户的基本信息
export const getUserInfo = (paramData, postData) => fetch(`/user/${paramData.userId}`, postData, 'GET')

// 登录接口
export const logout = (data) => fetch('/lk/logout', data, 'POST')
