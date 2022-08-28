const leftTree = {
  namespaced: true,
  state: {
    count: 0,
    nodeData: {},
    businessNode: {}
  },
  getters: {

  },
  mutations: {
    setCurrNodeData(state, node) {
      state.nodeData = node
    },
    setBusinessNode(state, node) {
      state.businessNode = node
    }
  },
  actions: {
    setCurrNodeData({ commit }, node) {
      commit('setCurrNodeData', node)
    },
    setBusinessNode({ commit }, node) {
      commit('setBusinessNode', node)
    }
  }
}
export default leftTree
