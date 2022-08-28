const tabRightMenu = {
  namespaced: true,
  state: {
    count: 0,
    isdisabled: true
  },
  getters: {

  },
  mutations: {
    setIsDisabled(state, data) {
      state.isdisabled = data.isdisabled
    }
  }
}
export default tabRightMenu
