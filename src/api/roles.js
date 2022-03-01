import request from '@/utils/request'

/**
 * @description: 角色列表
 */
export const getRoles = () => request({ url: '/roles', method: 'get' })
/**
 * @description 添加角色
 * @param data:{roleName:req,roleDesc:}
 */
export const addRoles = data => request({ url: '/roles', method: 'post', data })
/**
 * @description: 根据 ID 查询角色
 * @param id 角色 ID
 */
export const searchRolesById = id => request({ url: `/roles/${id}`, method: 'get' })
/**
 * @description 编辑提交角色
 * @param data:{roleName:must,roleDesc:''}
 * @param id:
 */
export const editRoles = (id, data) => request({ url: `/roles/${id}`, method: 'put', data })
/**
 * @description: 删除角色
 * @param id 角色 ID
 */
export const removeRoles = (id) => request({ url: `/roles/${id}`, method: 'delete' })
/**
 * @description: 角色授权
 * @param roleId 角色 ID
 * @param rids 权限 ID 列 reg: 101,104,105,116,117
 */
export const accreditRoles = (roleId, rids) => request({ url: `roles/${roleId}/rights`, data: { rids }, method: 'post' })
/**
 * @description: 删除角色指定权限
 * @param roleId 角色 ID
 * @param rightId 权限 ID
 */
export const removeRolesRights = (roleId, rightId) => request({ url: `roles/${roleId}/rights/${rightId}`, method: 'delete' })
