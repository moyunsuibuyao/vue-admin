import axios from 'axios'
import { Spin, Message } from 'iview'
import router from './router'

// 请求拦截
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('sanmiToken')
  // 加载动画
  Spin.show()
  if (token) {
    // 设置请求头
    config.header.Authorization = token
  }
  return config;
}, error => {
  return Promise.reject(error)
});

// 响应拦截
axios.interceptors.response.use(response => {
  // 结束动画
  Spin.hide()
  return response
}, error => {
  Spin.hide()
  Message.error(error.response.data)

  // 获取错误状态码
  const { status } = error.response
  if (status === 401) {
    Message.error('token失效，请重新登录')
    localStorage.removeItem('sanmiToken')
    router.push('/login')
  }

  return Promise.reject(error)
})

export default axios
