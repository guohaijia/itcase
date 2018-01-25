<template>
<div>
  <!-- 导航 -->
  <el-row>
  <el-col :span="24">
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    </el-col>
  </el-row>
  <!-- 添加用户 -->
  <el-button type="success" plain >添加用户</el-button>
  <!-- 表格 -->
  <el-table
  border
  :data="tableData"
  style="width: 100%">
  <el-table-column type="expand">
      <template slot-scope="scope">
        <el-row :key="item.id" v-for="item in scope.row.children">
            <el-col :span="3">
              <!-- closable 是表示标签的可移除的属性 -->
              <!-- 想要关闭 -->
              <!-- 存在标签的删除事件 -->
              <el-tag @close="delectX(scope.row,item.id)" closable>{{item.authName}}</el-tag>
              <i v-if="item.children.length>0" class="el-icon-arrow-right arrow"></i>
            </el-col>
            <el-col :span="21">
              <el-row class="authlist" :key="tag.id" v-for="tag in item.children">
                <el-col :span="4">
                  <!-- closable 是表示标签的可移除的属性 -->
                  <el-tag  type="success" @close="delectX(scope.row,tag.id)" closable>{{tag.authName}}</el-tag>
                  <i v-if="tag.children.length>0" class="el-icon-arrow-right arrow"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag :key="btn.id" type="warning" @close="delectX(scope.row,btn.id)" closable v-for="btn in tag.children">{{btn.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
      </template>
    </el-table-column>
  <el-table-column
    type="index"
    label="#"
    width="50">
  </el-table-column>
  <el-table-column
    prop="roleName"
    label="角色名称"
    width="280">
  </el-table-column>
  <el-table-column
    prop="roleDesc"
    width="280"
    label="描述">
  </el-table-column>
  <el-table-column
    width="280"
    label="操作">
    <template slot-scope="scope">
        <el-button size="small" type="primary" icon="el-icon-edit" ></el-button>
        <el-button size="small" type="danger" icon="el-icon-delete"></el-button>
        <el-button size="small" type="warning" icon="el-icon-check" @click='giveGrant(scope.row)'></el-button>
    </template>
  </el-table-column>
</el-table>
<!-- 授权角色-->
    <el-dialog
        title="授权角色"
        :visible="dialogVisible4Grant"
        @close='closeUserDialog'
        width="50%"
        >
        <el-tree
          ref='mytree'
          :props="treeProps"
          :data="dataTree"
          node-key="id"
          :default-checked-keys="selectTree"
          default-expand-all
          show-checkbox
         >
        </el-tree>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible4Grant = false">取 消</el-button>
        <el-button type="primary" @click="submitGrant">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>
<script>
import {getRolesList, deleteRoles, getRightList, giveRoles} from '../../api/api.js'
export default {
  //  数据 data :function （）{ return {} }
  data () {
    return {
      tableData: [ ],
      dialogVisible4Grant: false,
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      dataTree: [],
      selectTree: [],
      arr: [],
      currentuser: ''
    }
  },
  methods: {
    // 关闭X
    closeUserDialog () {
      this.dialogVisible4Grant = false
    },
    // 变更权限
    submitGrant () {
      // 首先要获取所有选中的节点列表
      // 获取所有选中节点的数据对象列表
      let list = this.$refs['mytree'].getCheckedNodes()
      console.log(list)
      // 我们只需要id所以就需要进行过滤
      let ids = list.map(item => {
        return item.id + ',' + item.pid
      })
      console.log(ids) // 会有很多重复的id 所以要进行数组的去重
      // es6 提供了去重的方法
      // 数组去重(Set只允许放不重复的数据)Set的参数是数组
      // 数组ids.join(',').split(',')是变成一个数组
      let tmp = new Set(ids.join(',').split(','))
      console.log(tmp)
      // 变成字符串
      let result = [...tmp].join(',')
      console.log(result)
      // 发送请求调用接口
      // 当我提交的时候我需要知道是谁
      giveRoles({ roleId: this.currentuser, rids: result }).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          // 关闭弹窗
          this.dialogVisible4Grant = false
          // 刷新列表
          this.initList()
          // 给出提示的信息
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
        }
      })
    },
    // 2 显示默认的数据（selectTree）
    // 要找出你要默认显示的id（三级id)可以使用遍历来实现也可以使用递归
    // 递归的本质是函数调用，不过要事先知道退出的条件
    // 获取默认的选中的信息 (arr 是引用的数据类型在函数的结尾加上return也行，不加也行)
    _getThirdRightId (data, arr) {
      data.forEach((item) => {
        if (!item.children) {
          // 不存在childern 就说明是最后的节点
          arr.push(item.id)
        } else {
          // 说明存在childern 就继续进行遍历
          this._getThirdRightId(item.children, arr)
          console.log(arr)
        }
      })
    },
    // 授权 当你点击的时候就需要初始化tree的信息
    giveGrant (row) {
      console.log(row)
      // 1 初始化dataTree
      //  动态获取数组中的数据
      getRightList({type: 'tree'}).then(res => {
        if (res.meta.status === 200) {
          // 初始化数据
          this.dataTree = res.data
          // 每次都把要初始化的数据进行清空
          this.selectTree = []
          // 获取树形结构的默认选中
          this._getThirdRightId(row.children, this.selectTree)
          // 显示弹窗
          this.dialogVisible4Grant = true
          // 当前的用户
          this.currentuser = row.id
        }
      })
    },
    // 删除权限
    delectX (row, rightId) {
      // 发送请求，调用接口
      deleteRoles({ roleId: row.id, rightId: rightId }).then(res => {
        // console.log(res)
        if (res.meta.status === 200) {
          // 删除成功
          // 刷新列表
          this.initList()
          // 提示信息
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
        }
      })
    },
    // 初始化 (显示数据)
    initList () {
      getRolesList().then(res => {
        // console.log(res)
        // 获取数据之后我们就需要把数据填充这里
        this.tableData = res.data
      })
    }
  },
  //  钩子函数
  mounted () {
    // 显示数据
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
</style>
