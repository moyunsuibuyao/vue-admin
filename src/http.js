// import Vue from 'vue'
import axios from 'axios'
import { message } from 'ant-design-vue'
import router from './router'

// 请求拦截
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('sanmiToken')
  // 加载动画
  if (token) {
    // 设置请求头
    config.headers.Authorization = token
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(response => {
  return response
}, (error) => {
  // 获取错误状态码
  const { status } = error.response
  if (status === 401) {
    message.error('token失效，请重新登录')
    localStorage.removeItem('sanmiToken')
    localStorage.removeItem('defaultSelectedMenuItem')
    localStorage.removeItem('defaultOpenKeys')
    router.push('/login')
  }
  if (status === 404) {
    message.error('找不到接口地址')
  }
  if (status === 504) {
    message.error('超时')
  }

  return Promise.reject(error)
})

export default axios
