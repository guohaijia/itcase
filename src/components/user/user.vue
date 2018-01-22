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
  <!-- 点击按钮的时候触发事件 先去引用的文档那寻找，如果找不到的话就在自己进行绑定 -->
  <el-table-column
    prop="mg_state"
    width="180"
    label="用户状态">
    <template slot-scope="scope">
        <!-- <div>{{scope.row.mg_state}}</div> -->
        <!-- 根据作用域插槽，我们模仿别人写的额，我们要根据我们的情况进行调整 我们要显示的是状态 是true还是false,就可以进行控制开合关 -->
        <el-switch  @change='toggleUser(scope.row)'
          v-model="scope.row.mg_state">
        </el-switch>
    </template>
  </el-table-column>
  <el-table-column
    width="280"
    label="操作">
    <template slot-scope="scope">
        <el-button size="small" type="primary" icon="el-icon-edit"></el-button>
        <el-button size="small" type="danger" icon="el-icon-delete"></el-button>
        <el-button size="small" type="warning" icon="el-icon-check"></el-button>
    </template>

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
import {getUsersData, toggleUserState} from '../../api/api.js'
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
    // 控制用户的开关
    toggleUser (data) {
      // 进行接口的调用
      toggleUserState({
        uId: data.id, // 用户的id
        state: data.mg_state // 用户当前状态
      }).then(res => {
        if (res.meta.status === 200) {
          // 操作成功(提示信息)
          this.$message({
            message: res.meta.msg,
            type: 'success'
          })
        }
      })
    },
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
