import Vue from 'vue'
import App from './App.vue'
import 'font-awesome/css/font-awesome.min.css'
import iView from 'iview'
import mavonEditor from 'mavon-editor'
import 'iview/dist/styles/iview.css'
import 'mavon-editor/dist/css/index.css'
import './global.less'
import axios from './http'
import router from './router'
import store from './store/store'
import moment from 'moment'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$moment = moment
Vue.use(iView)
Vue.use(mavonEditor)
moment.locale('zh-cn')

axios.get('/static/config.json').then((res) => {
  Vue.prototype.BASE_URL = res.data.BASE_URL
  axios.defaults.baseURL = res.data.BASE_URL
  axios.defaults.headers.common['Content-Type'] = 'application/json'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
