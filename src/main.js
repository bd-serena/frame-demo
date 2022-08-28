import Vue from 'vue'
import App from './App.vue'
import router from './plugins/router'
import store from './plugins/store/store'
import VCharts from 'v-charts'
import './plugins/element.js'
import fontIcon from 'bd-font-icons'
import './assets/css/reset.css'
import './utils/themeControl/variables/resetCompt.scss'

Vue.config.productionTip = false
Vue.use(fontIcon)
Vue.use(VCharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
