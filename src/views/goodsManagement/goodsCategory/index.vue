<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-button type="primary" style="margin-bottom: 10px" @click="$refs.refAddDialog.show()">添加分类</el-button>
      <el-table :data="list" style="width: 100%" border row-key="cat_id" :tree-props="{ children: 'children' }">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="cat_name" label="分类"> </el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效" align="center">
          <template>
            <i class="el-icon-success" style="color: #409eff"></i>
          </template>
        </el-table-column>
        <el-table-column prop="cat_level" label="排序" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.cat_level === 0" type="primary">一级</el-tag>
            <el-tag v-if="scope.row.cat_level === 1" type="warning">二级</el-tag>
            <el-tag v-if="scope.row.cat_level === 2" type="success">三级</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="$refs.refEditDialog.show(scope.row)">
              编辑
            </el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeCategory(scope.row.cat_id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="text-align: center; margin-top: 10px"
        :current-page="params.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="params.pagesize"
        layout=" prev, pager, next, jumper,->,total, sizes"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>
    <AddDialog ref="refAddDialog" @success="getList" />
    <EditDialog ref="refEditDialog" @success="getList" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { removeCategories } from '@/api/categories'
import AddDialog from './addDialog.vue'
import EditDialog from './editDialog.vue'
export default {
  components: {
    AddDialog,
    EditDialog
  },
  data() {
    return {
      params: {
        type: [1, 2, 3],
        pagenum: 1,
        pagesize: 5
      }
    }
  },
  computed: {
    ...mapState({
      list: state => state.categories.categoriesList.result || [],
      total: state => state.categories.categoriesList.total
    })
  },
  watch: {
    params: {
      immediate: true,
      deep: true,
      handler() {
        this.getList()
      }
    }
  },
  methods: {
    getList() {
      this.$store.dispatch('categories/getList', this.params)
    },
    handleSizeChange(e) {
      this.params.pagesize = e
    },
    handleCurrentChange(e) {
      this.params.pagenum = e
    },
    async removeCategory(id) {
      const res = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (res === 'confirm') {
        await removeCategories(id)
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
</style>
