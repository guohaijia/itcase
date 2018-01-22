<template>
<div>
<el-row>
  <el-col :span="24">
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    </el-col>
</el-row>
<el-input placeholder="请输入内容"  class="search">
    <el-button slot="append" icon="el-icon-search"></el-button>
</el-input>
<el-button type="success" plain>成功按钮</el-button>
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
    prop="username"
    label="姓名"
    width="180">
  </el-table-column>
  <el-table-column
    prop="email"
    width="180"
    label="邮箱">
  </el-table-column>
  <el-table-column
    prop="mobile"
    width="180"
    label="电话">
  </el-table-column>
  <el-table-column
    prop="mg_state"
    width="180"
    label="用户状态">
  </el-table-column>
  <el-table-column
    width="280"
    label="操作">
  </el-table-column>
</el-table>
<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 3, 5, 10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
</el-pagination>
</div>
</template>
<script>
import {getUsersData} from '../../api/api.js'
export default {
  data () {
    return {
      query: '',
      currentPage: 1, // 当前页码
      pagesize: 3, // 每页显示条数
      total: 0, // 数据总条数
      tableData: [] // 实际的表格列表数据
    }
  },
  methods: {
    handleSizeChange (val) {
    // 改变每页的条数
      this.pagesize = val
      this.initList()
    },
    handleCurrentChange (val) {
    // 改变当前的页码
      this.currentPage = val
      this.initList()
    },
    // 每次都要刷新所以我们需要把刷新提取出来
    initList () {
      // 初始化数据
      getUsersData({
        query: this.query,
        pagenum: this.currentPage,
        pagesize: this.pagesize
      }).then(res => {
        if (res.meta.status === 200) {
          this.tableData = res.data.users
          this.total = res.data.total
          this.currentPage = res.data.pagenum
        }
      })
    }
  },
  // 利用vue的生命周期的性质我们能够获取到资源和模板
  mounted () {
    this.initList()
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
.el-pagination {
  background-color: #D3DCE6;
  padding-top: 10px;
  height: 35px;
  line-height: 35px;
}
.search {
width:300px;
}
</style>
