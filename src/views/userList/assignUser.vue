<template>
  <el-dialog title="分配角色" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="当前用户">
        <el-input v-model="form.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="当前角色">
        <el-input v-model="form.role_name" disabled></el-input>
      </el-form-item>
      <el-form-item label="分配角色" prop="rid">
        <el-select v-model="form.rid" placeholder="请选择">
          <el-option v-for="item in rolesList" :key="item.id" :label="item.roleName" :value="item.id"> </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="falseDialog">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { dialog } from '@/utils/mixin'
import { userRoles } from '@/api/user'
export default {
  mixins: [dialog],
  data() {
    return {
      form: { username: '', role_name: '', rid: '' },
      rules: {
        rid: [{ required: true, message: '角色不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState({ rolesList: state => state.roles.rolesList || [] })
  },
  created() {
    this.$store.dispatch('roles/getList')
  },
  methods: {
    show(data) {
      this.form = { ...this.form, ...data }
      this.dialogVisible = true
    },
    submit() {
      this.$refs.form.validate(async vali => {
        if (vali) {
          try {
            await userRoles(this.form.id, this.form.rid)
            this.dialogVisible = false
            this.$emit('success')
          } catch (err) {
            console.log(err)
          }
          this.$refs.form.resetFields()
        }
      })
    }
  }
}
</script>
