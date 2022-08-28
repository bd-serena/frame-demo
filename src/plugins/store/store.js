import Vue from 'vue'
import Vuex from 'vuex'
// import router from '../router'
import leftTree from './modules/leftTree'
import tab from './modules/tab'
import tabRightMenu from "./modules/tabRightMenu"
import mainFrame from './modules/mainFrame'
import ToolThemeMgt from './modules/ToolThemeMgt.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    leftTree,
    tab,
    mainFrame,
    tabRightMenu,
    ToolThemeMgt
  },
  state: {
  },
  mutations: {
  },
  getters: {

  },
  actions: {
  }
})
