import request from '@/utils/request'
/**
 * @description: 参数列表
 * @param {id:分类id}
 * @param {data:[only,many]}
 */
export const getList = (id, params) => request({ url: `categories/${id}/attributes`, method: 'get', params })
/**
 * @description: 添加动态参数或者静态属性
 * @param data:{
 * attr_name:参数名称
 * attr_sel:[only,many]
 * attr_vals:如果是 many 就需要填写值的选项，以逗号分隔
 * }
 */
export const addList = (id, data) => request({ url: `categories/${id}/attributes`, method: 'post', data })
/**
 * @description: 删除参数
 * @param id:分类 ID
 * @param attrid:参数 ID
 */
export const removeList = (id, attrid) => request({ url: `categories/${id}/attributes/${attrid}`, method: 'delete' })
/**
 * @description: 根据 ID 查询参数
 * @param id:分类 ID
 * @param attrid:属性 ID
 * @param params:{
 * attr_sel:[only,many]
 * attr_vals:如果是 many 就需要填写值的选项，以逗号分隔
 * }
 */
export const getListById = (id, attrid, params) =>
  request({ url: `categories/${id}/attributes/${attrid}`, method: 'get', params })
/**
 * @description:
 * @param data:{
 * attr_name：新属性的名字，
 * attr_sel：属性的类型[many或only]，
 * attr_vals：参数的属性值
 * }
 */
export const editList = (id, attrid, data) =>
  request({ url: `categories/${id}/attributes/${attrid}`, method: 'put', data })
