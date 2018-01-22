import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import user from '@/components/user/user'
// 启用路由
Vue.use(Router)
export default new Router({
  routes: [

    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      redirect: '/Welcome', // 重定向到子路由
      children: [
        {path: '/Welcome', component: Welcome},
        {path: '/users', component: user}
      ]
    }
  ]
})
