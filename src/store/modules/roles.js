import { getRoles } from '@/api/roles'

const state = {
  rolesList: []
}
const mutations = {
  SET_LIST(state, data) {
    state.rolesList = data
  }
}
const actions = {
  async getList({ commit }) {
    const { data } = await getRoles()
    commit('SET_LIST', data)
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
