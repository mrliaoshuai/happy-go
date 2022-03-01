import request from '@/utils/request'
/**
 * @description: 商品列表数据
 * @param {
 * query:查询参数
 * pagenum:当前页码 req
 * pagesize:每页显示条数 req
 * }
 */
export const getGoods = (params) => request({ url: '/goods', method: 'get', params })
/**
* @description: 添加商品
* @param {
* id:商品 ID,req
* goods_name:商品名称,req
* goods_price:价格,req
* goods_number:数量,req
* goods_weight:重量,req
* goods_introduce:介绍,
* pics:上传的图片临时路径（对象）,
* attrs:商品的参数（数组）
* }
*/
export const addGoods = (data) => request({ url: '/goods', method: 'post', data })
/**
 * @description: 根据 ID 查询商品
 * @param {id:商品 ID}
 */
export const searchGoodsById = (id) => request({ url: `goods/${id}`, method: 'get' })
/**
* @description: 编辑提交商品
* @param id:商品 ID,req
* @param {
* goods_name:商品名称,req
* goods_price:价格,req
* goods_number:数量,req
* goods_weight:重量,req
* goods_introduce:介绍,
* pics:上传的图片临时路径（对象）,
* attrs:商品的参数（数组）
* }
*/
// ({ url: `goods/${id}`, method: 'put', data })
export const editGoods = (id, data) => request({ url: `goods/${id}`, method: 'put', data })
/**
 * @description: 删除商品
 * @param id 商品 ID
 * @return {*}
 */
export const removeGoods = (id) => request({ url: `goods/${id}`, method: 'delete' })
