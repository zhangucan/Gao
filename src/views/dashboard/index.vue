<template>
    <div class="app-container calendar-list-container">
      <div class="filter-container">
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="根据用户名搜索" v-model="listQuery.title">
        </el-input>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
              <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">添加</el-button>
      </div>
      <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" :fit="true" highlight-current-row
      style="width: 100%">
        <el-table-column type="expand" align="center">
          <template slot-scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item label="用户名">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="用户密码">
                <template v-if="props.row.edit">
                  <el-input class="edit-input" size="small" v-model="props.row.password"></el-input>
                </template>
                <span v-else>{{ props.row.password }}</span>
              </el-form-item>
              <el-form-item label="用户角色">
                <template v-if="props.row.edit">
                  <el-select class="filter-item" v-model="props.row.role" placeholder="用户角色">
                    <el-option v-for="(item, index) in roles" :key="index" :label="item.title" :value="item.value">
                    </el-option>
                  </el-select>
                </template>
                <span v-else>{{ props.row.role }}</span>
              </el-form-item>
              <el-form-item label="大屏权限">
                <template v-if="props.row.edit">
                  <el-checkbox-group 
                    v-model="props.row.gridLayouts">
                    <el-checkbox v-for="(item, index) in gridLayoutList" :label="item._id" :key="index">{{item.title}}</el-checkbox>
                  </el-checkbox-group>
                </template>
                <span v-else>{{ props.row.gridLayouts }}</span>
              </el-form-item>
              <el-form-item>
                <template v-if="props.row.edit">
                  <el-button type="success" @click="confirmEdit(props.row)" size="small" icon="el-icon-circle-check-outline">确定</el-button>
                  <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(props.row)">取消</el-button>
                </template>
                <el-button v-else type="primary" @click='props.row.edit=!props.row.edit' size="small" icon="el-icon-edit">编辑</el-button>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户名">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="密码">
          <template slot-scope="scope">
            <span>{{scope.row.password}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="权限">
          <template slot-scope="scope">
            <span>{{scope.row.role}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="权限2">
          <template slot-scope="scope">
            <span>{{scope.row.gridLayouts}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="添加新用户" :visible.sync="dialogFormVisible">
        <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="100px" style=' margin-left:50px;'>
          <el-form-item label="用户名" prop="name" placeholder="用户名">
            <el-input v-model="temp.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" placeholder="密码">
            <el-input v-model="temp.password"></el-input>
          </el-form-item>
          <el-form-item label="用户角色" prop="role">
            <el-select class="filter-item" v-model="temp.role" placeholder="用户角色">
              <el-option v-for="(item, index) in roles" :key="index" :label="item.title" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="大屏权限">
              <el-checkbox-group 
                v-model="temp.gridLayouts">
                <el-checkbox v-for="(item, index) in gridLayoutList" :label="item._id" :key="index">{{item.title}}</el-checkbox>
              </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="createData">添加</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import * as userApi from '../../api/user'
import * as bigscreenApi from '../../api/bigscreen'
export default {
  name: 'dashboard',
  data() {
    return {
      gridLayoutList: [],
      directives: {
      },
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      roles: [{
        title: '管理员',
        value: 'admin'
      },
      {
        title: '普通用户',
        value: 'vister'
      }],
      rules: {
        name: [{ required: true, message: '用户名不为空', trigger: 'change' }],
        password: [{ required: true, message: '密码不为空', trigger: 'change' }],
        role: [{ required: true, message: '角色不为空', trigger: 'change' }]
      },
      dialogFormVisible: false,
      temp: {
        name: '',
        password: '',
        role: '',
        gridLayouts: []
      }
    }
  },
  methods: {
    async getList() {
      this.listLoading = true
      try {
        const temp = await userApi.getUserList(this.listQuery)
        this.list = temp.data.map(item => {
          item.edit = false
          item.originalPassword = item.password
          item.originalRole = item.role
          item.originalGridLayouts = item.gridLayouts
          return item
        })
        this.listLoading = false
      } catch (error) {
        this.$message({
          message: '数据获取失败，请刷新页面',
          type: 'warning'
        })
      }
    },
    resetTemp() {
      this.temp = {
        name: '',
        password: '',
        role: '',
        gridLayouts: []
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    async createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          try {
            userApi.saveUser(this.temp).then(() => {
              this.list.unshift(this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            })
          } catch (error) {
            this.$notify({
              title: '失败',
              message: error,
              type: 'false',
              duration: 2000
            })
          }
        }
      })
    },
    cancelEdit(row) {
      row.gridLayouts = row.originalGridLayouts
      row.role = row.originalRole
      row.password = row.originalPassword
      row.edit = false
      this.$message({
        message: '取消更改',
        type: 'warning'
      })
    },
    async confirmEdit(row) {
      row.edit = false
      row.originalTitle = row.title
      row.originalGridLayouts = row.gridLayouts
      row.originalRole = row.role
      row.originalPassword = row.password
      await userApi.updateUser(row)
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }
  },
  async mounted() {
    try {
      const data = await bigscreenApi.fetchLayoutList()
      this.gridLayoutList = data.gridLayoutList
      await this.getList()
    } catch (error) {
      this.$message({
        message: '初始化页面失败，请刷新页面',
        type: 'warning'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .table-expand .el-form-item>div{
    text-align: center
  }
  .el-input{
    width: 400px;
  }
</style>
