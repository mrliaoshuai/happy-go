<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-button type="primary" @click="$refs.refAdd.show()">添加角色</el-button>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="children" type="expand">
          <template slot-scope="scope">
            <el-row
              v-for="(item1, index1) in scope.row.children"
              :key="item1.id"
              :class="['list1', index1 === 0 ? 'border-top' : '']"
            >
              <!-- 一级列表 -->
              <el-col :span="4">
                <el-tag closable type="primary" @close="removeRolesRights(scope.row, item1.id)">
                  {{ item1.authName }}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="20">
                <el-row
                  v-for="(item2, index2) in item1.children"
                  :key="item2.key"
                  :class="['list2', index2 === 0 ? 'list2-none' : '']"
                >
                  <!-- 二级列表 -->
                  <el-col :span="6">
                    <el-tag closable type="warning" @close="removeRolesRights(scope.row, item2.id)">
                      {{ item2.authName }}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级列表 -->
                  <el-col :span="18">
                    <el-tag
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      class="table-tag"
                      closable
                      type="success"
                      @close="removeRolesRights(scope.row, item3.id)"
                    >
                      {{ item3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column label="操作" prop="id" width="300">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="$refs.refEdit.show(scope.row)">
              编辑
            </el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="remove(scope.row.id)">删除</el-button>
            <el-button size="mini" type="warning" icon="el-icon-setting" @click="$refs.refAllocation.show(scope.row)">
              分配权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <AddDialog ref="refAdd" @success="getList" />
    <EditDialog ref="refEdit" @success="getList" />
    <AllocationDialog ref="refAllocation" @success="getList" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { removeRoles, removeRolesRights } from '@/api/roles'
import EditDialog from './editDialog.vue'
import AllocationDialog from './allocationDialog.vue'
import AddDialog from './addDialog.vue'
export default {
  name: 'RolesList',
  components: {
    EditDialog,
    AllocationDialog,
    AddDialog
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({ list: state => state.roles.rolesList || [] })
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.$store.dispatch('roles/getList')
    },
    async remove(id) {
      const res = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (res === 'confirm') {
        await removeRoles(id)
        this.getList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }
    },
    async removeRolesRights(scope, rightId) {
      const { data } = await removeRolesRights(scope.id, rightId)
      scope.children = data
    }
  }
}
</script>

<style lang="scss" scoped>
.list1 {
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}
.list2 {
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 0;
}
.list2-none {
  border-top: none;
}
.border-top {
  border-top: 1px solid #ccc;
}
.table-tag {
  margin: 5px;
}
</style>
