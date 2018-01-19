<template>
  <!-- 图片 -->
  <div class="info">
  <div class="avatar">
    <img src="../assets/logo.png">
  </div>
  <el-form class="container">
  <el-form-item>
    <el-input type="text" v-model="username"></el-input>
  </el-form-item>
  <el-form-item>
    <el-input  type="password" v-model="password"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="login">登录</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
// 引入调用的接口函数
import {login} from '../api/api.js'
export default {
  name: '',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      let params = {
        username: this.username,
        password: this.password
      }
      // 调用接口的函数
      login(params).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          // 请求成功的时候，服务器会给给我们一个token我们需要把token放在本地存储中
          // 存储token
          // 利用本地存储 setItem(key,value) 它是用追加的方式
          localStorage.setItem('mytoken', res.data.token)

          this.$router.push({
            name: 'home'
          })
        } else {
          // 登陆失败 ，提示信息
          alert('用户或者密码有误')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.info {
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  box-sizing:border-box;
  background-color:#2f4050;
}
.container {
  box-sizing:border-box;
  margin:180px auto 0;
   width:500px;
   height:340px;
   background-color: #fff;
   position:relative;
}
.avatar {
  position:absolute;
  left:50%;
  top:110px;
  width:120px;
  height:120px;
  border:10px solid #fff;
}

</style>
