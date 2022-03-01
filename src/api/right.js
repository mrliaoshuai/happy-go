import request from '@/utils/request'

export const getRight = type => request({ url: `/rights/${type}`, method: 'get' })

export const getMenus = () => request({ url: `/menus`, method: 'get' })

