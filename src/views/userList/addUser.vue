<template>
  <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
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
import { elMobile, elUsername, elPassword, elEmail } from '@/utils/const'
import { addUser } from '@/api/user'
import { dialog } from '@/utils/mixin'
export default {
  mixins: [dialog],
  data() {
    return {
      form: { username: 'admin', password: '123123', email: '123@qq.com', mobile: '18300000000' },
      rules: {
        username: elUsername,
        password: elPassword,
        email: elEmail,
        mobile: elMobile
      }
    }
  },
  methods: {
    show() {
      this.dialogVisible = true
    },
    // 提交数据
    submit() {
      this.$refs.form.validate(async a => {
        if (a) {
          try {
            await addUser(this.form)
            this.dialogVisible = false
            this.$emit('success')
            this.$message.success('用户添加成功')
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
