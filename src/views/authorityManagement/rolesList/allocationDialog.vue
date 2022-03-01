<template>
  <el-dialog title="分配权限" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
    <el-tree
      ref="tree"
      :data="allList"
      show-checkbox
      node-key="id"
      default-expand-all
      :props="defaultProps"
      :default-checked-keys="checkList"
    >
    </el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { accreditRoles } from '@/api/roles'
export default {
  data() {
    return {
      dialogVisible: false,
      list: [],
      checkList: [],
      id: '',
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  computed: {
    ...mapState({ allList: state => state.right.rightTree })
  },
  created() {
    this.getList()
  },
  methods: {
    handleClose(done) {
      this.form = {}
      done()
    },
    show(list) {
      this.id = list.id
      this.list = list.children || []
      this.checkList = []
      this.getcheckList(this.list)
      this.dialogVisible = true
    },
    async submit() {
      const { getCheckedKeys, getHalfCheckedKeys } = this.$refs.tree
      const list = [...getCheckedKeys(), ...getHalfCheckedKeys()].join(',')
      await accreditRoles(this.id, list)
      this.$message.success('数据添加成功')
      this.$emit('success')
      this.dialogVisible = false
    },
    async getList() {
      await this.$store.dispatch('right/getList', 'tree')
    },
    getcheckList(data) {
      data.forEach(item => {
        this.checkList.push(item.id)
        if (item.children) {
          this.getcheckList(item.children)
        }
      })
    }
  }
}
</script>
