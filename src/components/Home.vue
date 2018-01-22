<template>
  <el-container>
    <el-aside :style='{width:"auto"}'>
      <div class="logo"></div>
      <el-menu
        router:
        :collapse="isCollapse"
        :unique-opened="true"
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">用户管理</span>
          </template>
          <el-menu-item index="/users">
            <i class="el-icon-menu"></i>
            <span>用户列表</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">权限管理</span>
          </template>
          <el-menu-item index="/role">
            <i class="el-icon-menu"></i>
            <span slot="title">角色列表</span>
          </el-menu-item>
          <el-menu-item index="/auth">
            <i class="el-icon-menu"></i>
            <span slot="title">权限列表</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">商品管理</span>
          </template>
          <el-menu-item index="/product">
            <i class="el-icon-menu"></i>
            <span slot="title">商品列表</span>
          </el-menu-item>
          <el-menu-item index="/category">
            <i class="el-icon-menu"></i>
            <span slot="title">商品分类</span>
          </el-menu-item>
          <el-menu-item index="/param">
            <i class="el-icon-menu"></i>
            <span slot="title">商品参数</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">订单管理</span>
          </template>
          <el-menu-item index="/order">
            <i class="el-icon-menu"></i>
            <span slot="title">订单列表</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">数据统计</span>
          </template>
          <el-menu-item index="/report">
            <i class="el-icon-menu"></i>
            <span slot="title">数据报表</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
  <el-container>
     <el-header>
        <div>
          <i @click="toggleMenu" class="myicon icon-menu btnsize"></i>
          <div class="stitle">电商后台管理系统</div>
          <a href="javascript:;" @click="logout" class="logoutbtn">退出</a>
        </div>
      </el-header>
      <el-main>
        <!-- 这里面的内容是动态的获取到的，每次替换的内容 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import {testData} from '../api/api.js'
export default {
  name: '',
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    logout () {
      // 清除token
      localStorage.removeItem('mytoken')
      // 跳转到登录页 （利用路由的导航编程进行跳转）
      this.$router.push({name: 'login'})
    },
    toggleMenu () {
      // 控制菜单的展开和折叠
      // isCollapse 是自定义的  我们可以控制elementui让它来提供某种事件
      this.isCollapse = !this.isCollapse
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  //  相当于mounted :fucntion(){}
  //  这里面只不过只是使用了语法糖 把：省略了，把函数写成了 箭头函数的而形式
  //  mounted 是当函数挂载之后去执行的 ，渲染主页的内容
  mounted () {
  // 调用接口 进行渲染
    testData({
      query: '',
      pagenum: 1,
      pagesize: 10
    }).then(res => {
      console.log(res)
    })
  }
}

</script>
<!-- 如果你想用样式的话 lang='less' 如果不是内置的支持的话那就是需要在配置文件中添加loader 了 -->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
.btnsize {
    font-size: 36px;
    color: #989898;
    cursor: pointer;
    line-height: 60px;
  }
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container{
    height: 100%;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: left;
    line-height: 60px;
  }
  .el-aside {
    background-color: #545c64;
    color: #333;
    text-align: left;
    display: block;
  }
  .el-main {
    background-color: #ccc;
    color: #333;
    text-align: left;
    overflow: '';
  }
  .logoutbtn {
    position: absolute;
    right: 10px;
    color: orange;
  }
  .el-header {
    background-color: #545c64;
  }
  .logo {
    height:60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #989898;
  }
  .stitle {
    position: absolute;
    font-size: 28px;
    overflow: hidden;
    width: 300px;
    color: #fff;
    left: 600px;
    top: 0px;
  }
</style>
