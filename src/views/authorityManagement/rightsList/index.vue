<template>
  <div>
    <el-card class="box-card">
      <el-table :data="list" style="width: 100%">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="authName" label="权限名称" sortable sort-by="id"> </el-table-column>
        <el-table-column prop="path" label="路径" sortable> </el-table-column>
        <el-table-column prop="level" label="权限等级" sortable>
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'" type="primary">一级</el-tag>
            <el-tag v-if="scope.row.level === '1'" type="warning">二级</el-tag>
            <el-tag v-if="scope.row.level === '2'" type="success">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({ list: state => state.right.rightList })
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.$store.dispatch('right/getList', 'list')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
