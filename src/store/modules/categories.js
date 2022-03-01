import { getCategories } from '@/api/categories'
const state = {
  categoriesList: []
}
const mutations = {
  GET_LIST(state, data) {
    state.categoriesList = data
  }
}
const actions = {
  async getList({ commit }, params) {
    const { data } = await getCategories(params)
    console.log(data)
    commit('GET_LIST', data)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
