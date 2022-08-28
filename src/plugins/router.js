import Vue from 'vue'
import Router from 'vue-router'
import MainFrame from '../views/MainFrame'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'MainFrame',
      component: MainFrame
    }
  ]
})
