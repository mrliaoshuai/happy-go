import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },
  {
    path: '/userManagement',
    component: Layout,
    redirect: '/userManagement/userlist',
    name: '用户管理',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/userList',
        name: 'UserList',
        component: () => import('@/views/userList/index.vue'),
        meta: { title: '用户列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/authorityManagement',
    component: Layout,
    redirect: '/authorityManagement/userlist',
    name: 'AuthorityManagement',
    meta: { title: '权限管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/authorityManagement/userlist',
        name: 'RolesList',
        component: () => import('@/views/authorityManagement/rolesList'),
        meta: { title: '角色列表', icon: 'table' }
      },
      {
        path: '/authorityManagement/rightslist',
        name: 'RightsList',
        component: () => import('@/views/authorityManagement/rightsList'),
        meta: { title: '权限列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/goodsManagement',
    component: Layout,
    redirect: '/goodsManagement/goodsList',
    name: 'goodsmanagement',
    meta: { title: '商品管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/goodsManagement/mockgoodslist',
        name: 'GoodsList',
        component: () => import('@/views/goodsManagement/goodsList'),
        meta: { title: '商品列表', icon: 'table' }
      },
      {
        path: '/goodsManagement/categoryparameter',
        name: 'CategoryParameter',
        component: () => import('@/views/goodsManagement/categoryParameter'),
        meta: { title: '分类参数', icon: 'table' }
      },
      {
        path: '/goodsManagement/goodsCategory',
        name: 'GoodsCategory',
        component: () => import('@/views/goodsManagement/goodsCategory'),
        meta: { title: '商品分类', icon: 'table' }
      },
      {
        path: '/goodsManagement/addgoods',
        name: 'AddGoods',
        component: () => import('@/views/goodsManagement/addGoods')
      }
    ]
  },
  {
    path: '/orderManagement',
    component: Layout,
    redirect: '/orderManagement/dataReport',
    meta: { title: '订单管理', icon: 'el-icon-s-help' },
    children: [{
      path: '/orderManagement/dataReport',
      name: 'DataReport',
      component: () => import('@/views/dataReport'),
      meta: { title: '订单列表', icon: 'dashboard' }
    }]
  },
  {
    path: '/dataStatistics',
    component: Layout,
    redirect: 'dataStatistics/orderList',
    meta: { title: '数据统计', icon: 'el-icon-s-help' },
    children: [{
      path: 'dataStatistics/orderList',
      name: 'OrderList',
      component: () => import('@/views/orderList/index.vue'),
      meta: { title: '数据报表', icon: 'dashboard' }
    }]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
