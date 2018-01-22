import axios from 'axios'
// 引入axios的库
// 设置请求的基准路径
// axios.defaults.baseURL = 'http://47.96.21.88:8888/api/private/v1/'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'
// 登录的拦截器 （为了实现登录信息的验证）
axios.interceptors.request.use(function (config) {
  // 实现要拦截的功能
  // 判断当前本地是否存在token
  let token = localStorage.getItem('mytoken')
  if (token) {
    // 我们就和后台进行约定，在传输过程token放在请求头中，默认情况下是使用Authorization 进行约定，也可以自己进行定义 看后台的接口文档。
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 实现登录请求
export const login = (params) => {
  // 这些方法
  return axios.post('login', params).then(res => {
    return res.data
  })
}
// 测试的功能 (测试的请求头)
export const testData = (params) => {
  return axios.get('users', {params: params}).then(res => {
    return res.data
  })
}
