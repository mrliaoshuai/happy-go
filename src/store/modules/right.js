import { getRight } from '@/api/right'
const state = {
  rightTree: [],
  rightList: []
}
const mutations = {
  SET_TREE(state, data) {
    state.rightTree = data
  },
  SET_LIST(state, data) {
    state.rightList = data
  }
}
const actions = {
  async getList({ commit }, type = 'tree') {
    const { data } = await getRight(type)
    type === 'tree' ? commit('SET_TREE', data) : commit('SET_LIST', data)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
