<template>
  <div>
    主页
  </div>
</template>

<script>
import {testData} from '../api/api.js'
export default {
  name: '',
  data () {
    return {}
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
