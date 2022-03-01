import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(id) {
  return request({
    url: `users/${id}`,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
// 用户数据列表
export const getUsersAll = (params) => request({
  url: 'users',
  method: 'get',
  params
})
// 添加用户
export const addUser = (data) => request({ url: '/users', method: 'post', data })
// 编辑用户提交
export const editUser = (id, data) => request({ url: `/users/${id}`, method: 'put', data })
// 根据 ID 查询用户信息
export const removeUser = (id) => request({ url: `/users/${id}`, method: 'delete' })
/**
 * @description: 分配用户角色
 * @param id 用户id
 * @param rid 角色id
 */
export const userRoles = (id, rid) => request({ url: `/users/${id}/role`, data: { rid }, method: 'put' })
/**
 * @description: 修改用户状态
 * @param uid 用户id
 * @param type {boolean} 用户状态
 */
export const userState = (uid, type) => request({ url: `users/${uid}/state/${type}`, method: 'put' })
