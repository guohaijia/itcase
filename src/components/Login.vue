<template>
  <!-- 图片 -->
  <div class="info">
  <div class="avatar">
  </div>
  <!-- ref 就是类似于id 是唯一的标识 ref表示组件的名称，用于直接的操作dom -->
  <el-form  ref="loginForm" class="container" :rules="rules" :model="form">
  <div class="userInfo">
  <el-form-item>
    <el-input prefix-icon="icon-user-check" type="text" v-model="form.username" placeholder="用户名" prop="username"></el-input>
  </el-form-item>
  <el-form-item>
    <el-input prefix-icon="icon-key" type="password" v-model="form.password" placeholder="密码" prop="password"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="login">登录</el-button>
  </el-form-item>
  </div>
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
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入完整的用户信息', trigger: 'blur' }
        ],
        password: [
          {
            required: true, message: '请输入正确的密码', trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    login: function () {
      // 在调用接口之前进行表单的验证操作
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          // 通过表单的验证
          // 调用接口的函数
          let params = {
            username: this.form.username,
            password: this.form.password
          }
          login(params).then(res => {
            console.log(res)
            if (res.meta.status === 200) {
              // 请求成功的时候，服务器会给给我们一个token我们需要把token放在本地存储中
              // 存储token
              // 利用本地存储setItem(key,value) 它是用追加的方式
              localStorage.setItem('mytoken', res.data.token)
              this.$router.push({name: 'home'})
            } else {
              // 登陆失败 ，提示信息
              this.$message({
                message: res.meta.msg,
                type: 'error'
              })
            }
          })
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
  /*top:0; left:0; right:0;bottom:0;是一种布局的方式 ，为了实现全屏*/
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
  margin-left:-70px;
  width:120px;
  height:120px;
  border:10px solid #fff;
  border-radius:50%;
  box-shadow:0 1px 5px #ccc;
  overflow:hidden;
  background-color:pink;
  background-size:cover;
 background-image: url('../assets/logo.png');
  z-index:9999;
}
.userInfo {
  /*固定定位是基于父盒子的定位*/
  position:absolute;
  width:400px;
  margin:100px 50px;
  text-align:center;
}

</style>
