<template>
  <div class="app-container userList">
    <!-- 主体区 -->
    <el-card class="box-card">
      <el-input
        v-model="params.query"
        style="width: 400px"
        placeholder="用户名查找"
        class="input-with-select"
        @change="getList"
      >
        <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
      </el-input>
      <el-button style="margin-left: 10px" type="primary" @click="$refs.refAddUser.show()">添加用户</el-button>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="username" label="姓名" width="80"> </el-table-column>
        <el-table-column prop="user_img" label="头像" width="80">
          <template slot-scope="scope">
            <img :src="scope.row.user_img || '/images/none.jpg'" alt="" />
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"> </el-table-column>
        <el-table-column prop="mobile" label="电话" width="100"> </el-table-column>
        <el-table-column prop="role_name" label="角色" width="180"> </el-table-column>
        <el-table-column prop="mg_state" label="状态" width="180">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="操作">
          <template slot-scope="scope">
            <el-tooltip content="编辑角色" placement="top-end" :enterable="false">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="$refs.refEditUser.show(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="删除角色" placement="top-end" :enterable="false">
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeUser(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip content="角色分配" placement="top-end" :enterable="false">
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-scissors"
                @click="$refs.refAssignUser.show(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="params.pagenum"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="params.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>
    <!-- dialog -->
    <AddUser ref="refAddUser" @success="getList" />
    <EditUser ref="refEditUser" @success="getList" />
    <AssignUser ref="refAssignUser" @success="getList" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { removeUser } from '@/api/user'
import AddUser from './addUser'
import EditUser from './editUser'
import AssignUser from './assignUser'
export default {
  name: 'UserList',
  components: {
    AddUser,
    EditUser,
    AssignUser
  },
  data() {
    return {
      form: {},
      params: {
        query: '',
        pagenum: 1,
        pagesize: 2
      }
    }
  },
  computed: {
    ...mapState({
      list: state => state.user.usersAll.users || [],
      pagenum: state => state.user.usersAll.pagenum || '1',
      total: state => state.user.usersAll.total || 1
    })
  },
  created() {
    this.getList()
  },
  methods: {
    handleSizeChange(val) {
      this.params.pagesize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.params.pagenum = val
      this.getList()
    },
    getList() {
      this.$store.dispatch('user/getUsersAll', this.params)
    },
    async removeUser(id) {
      const res = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (res === 'confirm') {
        await removeUser(id)
        this.getList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.userList {
  img {
    width: 40px;
    height: 40px;
    border-radius: 5px;
  }
}
</style>
