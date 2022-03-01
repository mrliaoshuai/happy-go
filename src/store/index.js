import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import roles from './modules/roles'
import right from './modules/right'
import categories from './modules/categories'
import goods from './modules/goods'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    roles,
    right,
    categories,
    goods
  },
  getters
})

export default store
