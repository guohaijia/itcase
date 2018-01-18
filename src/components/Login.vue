<template>
  <div>
   <h1> 登录 </h1>
   <span>用户名</span>
   <input type="text" v-model='username'>
   <br>
   <span>密码</span>
   <input type="password" v-model='password'>
   <br>
   <input type="button" value="点击" @click='login'>

  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login: function () { }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
