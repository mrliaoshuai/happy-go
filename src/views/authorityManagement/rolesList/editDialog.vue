<template>
  <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName"></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="form.roleDesc" @keyup.enter.native="submit"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="falseDialog">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { dialog } from '@/utils/mixin'
import { editRoles } from '@/api/roles'
export default {
  name: 'EditDialog',
  mixins: [dialog],
  data() {
    return {
      form: { roleName: '', roleDesc: '' },
      id: '',
      rules: {
        roleName: [
          { required: true, message: '角色名不能为空', trigger: 'blur' },
          { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    show(list) {
      this.form.roleName = list.roleName
      this.form.roleDesc = list.roleDesc
      this.id = list.id
      this.dialogVisible = true
    },
    submit() {
      this.$refs.form.validate(async vali => {
        if (vali) {
          try {
            await editRoles(this.id, this.form)
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
