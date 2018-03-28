//  用户模块
import fetch from '../config/axios'

// 创建班级
export const createClass = (postData) => fetch('/class', postData, 'POST', true)

// 更新班级
export const updateClass = (paramData, postData) => fetch(`/class/${paramData.classId}`, postData, 'GET', true)
