import axios from 'axios'
import { Message, Spin } from 'iview'

// 请求拦截
axios.interceptors.request.use(config => {
  Spin.show()
  const token = localStorage.getItem('sanmiToken')
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
  Spin.hide()
  return response
}, (error) => {
  // 获取错误状态码
  console.log(error)
  const { status } = error.response
  Spin.hide()
  switch (status) {
    case 401:
      Message.error('token失效，请重新登录')
      break
    case 404:
      Message.error('找不到接口地址')
      break
    case 504:
      Message.error('超时')
      break
    case 500:
      Message.error('服务端出错，请重启或修复服务端')
      break
    default:
      Message.error(error.response.data)
  }
  return Promise.reject(error)
})

export default axios
