// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入element-ui
import ElementUI from 'element-ui'
//  引入主题
import 'element-ui/lib/theme-chalk/index.css'
// 启用ElementUi
Vue.use(ElementUI)

Vue.config.productionTip = false
//  全局的导航过滤 （其实就是路由的拦截器）
//  下面这个方法是每一router 在执行之前都会进行判断的。
router.beforeEach((to, from, next) => {
  let user = localStorage.getItem('mytoken')
  if (user) {
  // 如果token存在的话，按照正常的程序进行跳转
    next()
  } else {
    // 说明没有登录过
    // 判断当前页是不是登录页，如果不是就进入跳转到登录页，如果是就正常运行就好了
    if (to.path !== '/') {
      next({ path: '/' })
    } else {
      next()
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: create => create(App)
})
