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
<el-input  v-model='query' placeholder="请输入内容"  class="search">
    <el-button  @click='queryHandler' slot="append" icon="el-icon-search"></el-button>
</el-input>
<el-button type="success" plain @click='dialogVisible4add= true'>添加用户</el-button>
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
        <el-button size="small" type="primary" icon="el-icon-edit" @click='editHandler(scope.row)'></el-button>
        <el-button size="small" type="danger" icon="el-icon-delete" @click='delectHandler(scope.row)'></el-button>
        <el-button size="small" type="warning" icon="el-icon-check" @click='giveRole(scope.row)'></el-button>
    </template>

  </el-table-column>
</el-table>
<!--利用element实现分页  -->
<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 3, 5, 10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
</el-pagination>
<!-- 添加用户的弹窗 -->
<el-dialog
  title="添加用户"
  :visible="dialogVisible4add"
  @close='closeUserDialog("add")'
  width="50%"
  >
  <el-form :model="user" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="user.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password" >
    <el-input type="password" v-model="user.password"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email" >
    <el-input v-model="user.email"></el-input>
  </el-form-item>
  <el-form-item label="电话" prop="mobile">
    <el-input v-model="user.mobile"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible4add = false">取 消</el-button>
    <el-button type="primary" @click="submitUser">确 定</el-button>
  </span>
</el-dialog>
<!--编辑的操作的弹窗 -->
<el-dialog
  title="编辑用户"
  :visible="dialogVisible4edit"
  @close='closeUserDialog("role")'
  width="50%"
  >
  <el-form :model="euser" :rules="rules" ref="ruleFormedit" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="username">
    <el-button plain type="info">{{euser.username}}</el-button>
  </el-form-item>
  <el-form-item label="邮箱" prop="email" >
    <el-input v-model="euser.email"></el-input>
  </el-form-item>
  <el-form-item label="电话" prop="mobile">
    <el-input v-model="euser.mobile"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible4edit = false">取 消</el-button>
    <el-button type="primary" @click="submitEdite">确 定</el-button>
  </span>
</el-dialog>
<!-- 授权的弹窗 -->
<el-dialog
  title="分配角色"
  :visible="dialogVisible4Role"
  @close='closeUserDialog("role")'
  width="50%"
  >
  <div>
    <span>当前用户：</span> <span>{{usersname}}</span><br>
    <span>请选择角色：</span><el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in roleList"
      :key="item.id"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible4Role = false">取 消</el-button>
    <el-button type="primary" @click="submitRole">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>
<script>
import {getUsersData, toggleUserState, addUser, getUserId, editUser, delectUser} from '../../api/api.js'
export default {
  data () {
    return {
      roleList: {
        value: 'id',
        label: 'authName'
      },
      query: '',
      currentPage: 1, // 当前页码
      pagesize: 3, // 每页显示条数
      total: 0, // 数据总条数
      tableData: [], // 实际的表格列表数据
      dialogVisible4add: false,
      dialogVisible4edit: false,
      dialogVisible4Role: false,
      user: {
        username: '',
        password: '',
        eamil: '',
        mobile: ''
      },
      euser: {
        username: '',
        eamil: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //  提交角色
    submitRole () {
      console.log(1)
    },
    //  分配角色
    giveRole (row) {
      console.log(row)
      this.dialogVisible4Role = true
    },
    //  实现删除的功能
    delectHandler (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用接口
        delectUser({id: row.id}).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 刷新列表
          this.initList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    //  实现用户的编辑模式，修改数据导出数据库
    submitEdite () {
      // form 表单要警醒验证
      this.$refs['ruleFormedit'].validate((valid) => {
        if (valid) {
          // 通过验证，调用接口
          editUser(this.euser).then(res => {
            console.log(res)
            if (res.meta.status === 200) {
              // 关闭窗口
              this.dialogVisible4edit = false
              // 刷新页面
              this.initList()
            }
          })
        }
      })
    },
    editHandler (row) {
      console.log(row)
      // 编辑需要两部才能实现，1查出当前的数据，2.提交导数据库
      // 实现编辑的查出当前的数据
      getUserId({id: row.id}).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          // 填充表单
          this.euser.id = res.data.id
          this.euser.username = res.data.username
          this.euser.email = res.data.email
          this.euser.mobile = res.data.mobile
          // 显示显示弹框
          this.dialogVisible4edit = true
        }
      })
    },
    // X的退出
    closeUserDialog (flag) {
      if (flag === 'add') {
        this.dialogVisible4add = false
      } else if (flag === 'edit') {
        this.dialogVisible4edit = false
      } else if (flag === 'role') {
        this.dialogVisible4Role = false
      }
    },
    //  实现添加的功能
    submitUser () {
      // form 表单要警醒验证
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          // 通过验证，调用接口
          addUser(this.user).then(res => {
            if (res.meta.status === 201) {
              // 关闭弹窗
              this.dialogVisible4add = false
              // 刷新列表
              this.initList()
            }
          })
        }
      })
    },
    // 关键字搜索 的主要的思想就是利用v-model 双向绑定当点击搜索的时候，触发事件就直接返回渲染的数据即可，就实现了搜索的功能
    queryHandler () {
      this.initList()
    },
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
