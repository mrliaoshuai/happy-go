import request from '@/utils/request'
/**
 * @description: 商品分类数据列表
 * @param params:{
 * type:[1,2,3]  1，2，3 分别表示显示一层二层三层,
 * pagenum:当前页码值
 * pagesize:每页显示多少条数据
 * }
 */
export const getCategories = (params) => request({ url: '/categories', method: 'get', params })
/**
 * @description: 添加分类
 * @param data:{
 * cat_pid:分类父 ID,
 * cat_name:分类名称,
 * cat_level:分类层级}
 */
export const addCategories = (data) => request({ url: '/categories', method: 'post', data })
/**
 * @description: 根据 id 查询分类
 * @param id 分类 ID
 */
export const searchCategories = (id) => request({ url: `/categories/${id}`, method: 'get' })
/**
 * @description: 编辑提交分类
 * @param id 分类 ID
 * @param data:{cat_name:分类名称}
 */
export const editCategories = (id, data) => request({ url: `/categories/${id}`, method: 'put', data })
/**
 * @description: 删除分类
 * @param id 分类 ID
 */
export const removeCategories = (id) => request({ url: `/categories/${id}`, method: 'delete' })
