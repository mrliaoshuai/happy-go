<template>
  <el-dialog title="修改用户" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="form.mobile" @keyup.enter.native="submit"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="falseDialog">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { editUser } from '@/api/user'
import { elMobile, elEmail } from '@/utils/const'
import { dialog } from '@/utils/mixin'
export default {
  mixins: [dialog],
  data() {
    return {
      form: { username: '', email: '', mobile: '' },
      id: '',
      rules: {
        email: elEmail,
        mobile: elMobile
      }
    }
  },
  methods: {
    show(form) {
      this.id = form.id
      this.form.username = form.username
      this.form.email = form.email
      this.form.mobile = form.mobile
      this.dialogVisible = true
    },
    submit() {
      this.$refs.form.validate(async vali => {
        if (vali) {
          try {
            await editUser(this.id, this.form)
            this.dialogVisible = false
            this.$message.success('修改成功')
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
