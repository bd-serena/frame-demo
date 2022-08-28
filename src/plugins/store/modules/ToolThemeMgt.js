const ToolThemeMgt = {
  namespaced: true,
  state: {
    toolColors: {}
  },
  mutations: {
    setToolColors(state, data) {
      state.toolColors = data;
    }
  },
  actions: {
    setToolColors({ commit }, data) {
      commit('setToolColors', data);
    }
  }
}
export default ToolThemeMgt;
