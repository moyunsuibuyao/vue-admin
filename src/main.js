import Vue from 'vue'
import App from './App.vue'
import 'font-awesome/css/font-awesome.min.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './global.less'
import axios from './http'
import router from './router'
import store from './store/store'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(iView)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
