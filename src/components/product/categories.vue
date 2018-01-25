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
    <el-button type="success" plain @click='dialogVisible4add= true'>添加分类</el-button>
    <!-- 表格 -->
    <div>
    <!-- 样式 -->
    <!-- columns表示所有的列，tree-structure表示数据格式，data-source表示实际的列表数据，deleteCate处理删除操作，showForm处理编辑操作，refresh处理刷新操作 -->
    <tree-grid :columns="columns" :tree-structure="true" :data-source="dataSource" @deleteCate="deleteCategory" @showForm="showEditForm" @refresh="initList"></tree-grid>
    </div>
    <!-- 分页 -->
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
import TreeGrid from './TreeGrid.vue'
//  创建组件的
export default {
  data () {
    return {
      total: 0,
      currentPage: 1,
      pagesize: 5,
      dataSource: [ ],
      columns: [{
        text: '分类名称',
        dataIndex: 'cat_name',
        width: 500
      }, {
        text: '是否有效',
        dataIndex: 'cat_deleted',
        width: 100
      }, {
        text: '排序',
        dataIndex: 'cat_level',
        width: 100
      }]
    }
  },
  methods: {
    handleSizeChange () {
      console.log(1)
    },
    handleCurrentChange () {
      console.log(2)
    },
    showForm () {
      console.log(3)
    },
    refresh () {
      console.log(4)
    },
    deleteCate () {
      console.log(5)
    }
  },
  components: {
    TreeGrid
  }
}
</script>
<style scope>
.el-breadcrumb {
  background-color: #D3DCE6;
  padding-left:10px;
  height:50px;
  line-height:50px;
}
</style>
