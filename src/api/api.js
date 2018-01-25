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
// 测试的功能 (测试的请求头) 用户列表数据
// export const getUsersData = (params) => {
//   return axios.get('users', {params: params}).then(res => {
//     console.log(res)
//     return res.data
//   })
// }
export const getUsersData = (params) => {
  return axios.get('users', {params: params}).then(res => {
    return res.data
  })
}
// 用户的管理（状态的改变）put 经常用于修改的逻辑
export const toggleUserState = (params) => {
  console.log(params)
  return axios.put('users/ ' + params.uId + '/state/' + params.state).then(res => {
    console.log(res.data)
    return res.data
  })
}
// 添加用户的接口
export const addUser = (params) => {
  return axios.post('users', params).then(res => {
    return res.data
  })
}
// 根据id 查询用户的信息
export const getUserId = (params) => {
  return axios.get('users/' + params.id).then(res => {
    return res.data
  })
}
// 编辑提交数据
export const editUser = (params) => {
  return axios.put('users/' + params.id, params).then(res => {
    return res.data
  })
}
// 删除用户的数据
export const delectUser = (params) => {
  return axios.delete('users/' + params.id, params).then(res => {
    return res.data
  })
}
// 权限管理-权限列表（所有权限列表）
export const getRightList = (params) => {
  return axios.get('rights/' + params.type).then(res => {
    return res.data
  })
}
//  角色管理的角色列表要注意是否需要传参
export const getRolesList = (params) => {
  return axios.get('roles').then(res => {
    return res.data
  })
}
// 删除角色的权限
export const deleteRoles = (params) => {
  return axios.delete('roles/' + params.roleId + '/rights/' + params.rightId).then(res => {
    return res.data
  })
}
//  角色授权
export const giveRoles = (params) => {
  return axios.post('roles/' + params.roleId + '/rights', params).then(res => {
    return res.data
  })
}
// 用户的分配角色的请求
export const submitRoles = (params) => {
  return axios.put('users/' + params.id + '/role', params).then(res => {
    return res.data
  })
}
//  左侧菜单的权限
export const getMenus = (params) => {
  return axios.get('menus').then(res => {
    return res.data
  })
}
