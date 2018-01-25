<template>
<div>
  <!-- 实现面包屑的的导航 -->
  <el-row>
  <el-col :span="24">
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    </el-col>
  </el-row>
  <!-- 实现表格展示数据 -->
   <el-table
  border
  :data="tableData"
  style="width: 100%">
  <el-table-column
    type="index"
    label="#"
    width="50">
  </el-table-column>
  <el-table-column
    prop="authName"
    label="权限名称"
    width="180">
  </el-table-column>
  <el-table-column
    prop="path"
    width="180"
    label="路径">
  </el-table-column>
  <el-table-column
    prop="level"
    width="180"
    label="层级">
    <!-- 想要显示我们只记得东西的时候我们就需要作用域的插槽来实现-->
    <template slot-scope="scope">
      <!-- 根据给的数据0,1,2显示层级 -->
    <span v-if='scope.row.level === "0"'>一级</span>
    <span v-else-if='scope.row.level === "1"'>二级</span>
    <span v-else-if ='scope.row.level === "2"'>三级 </span>
    </template>
  </el-table-column>
</el-table>
</div>
</template>
<script>
import {getRightList} from '../../api/api.js'
export default {
  data () {
    return {
      //  我们能够知道的是数据是动态获取的数据我们就需要调取接口（列表的显示接口）
      tableData: []
    }
  },
  // 利用vue的声明周期我们可以获取数据和模板
  mounted () {
    // 初始化数据的列表 type 的值是说明文档给的
    getRightList({type: 'list'}).then(res => {
      console.log(res)
      if (res.meta.status === 200) {
        // 通过列表我们能够拿到我们想要的数据
        this.tableData = res.data
      }
    })
  }
}
</script>
<style scoped>
.el-breadcrumb {
  background-color: #D3DCE6;
  padding-left:10px;
  height:50px;
  line-height:50px;
}
</style>
