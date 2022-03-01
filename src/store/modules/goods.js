import { getGoods } from '@/api/goods'

const state = {
  goodsList: {}
}
const mutations = {
  SET_LIST(state, data) {
    state.goodsList = data
  }
}
const actions = {
  async getList({ commit }, params) {
    const { data } = await getGoods(params)
    commit('SET_LIST', data)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
