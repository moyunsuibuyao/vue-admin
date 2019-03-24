import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import 'font-awesome/css/font-awesome.min.css'
import axios from './http'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(Antd)
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
