<template>
  <el-dialog title="分类参数修改" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="分类名称" prop="cat_name">
        <el-input ref="input" v-model="form.cat_name" v-focus></el-input>
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
import { editCategories } from '@/api/categories'
export default {
  mixins: [dialog],
  data() {
    return {
      form: { cat_name: '' },
      cat_id: '',
      rules: {
        cat_name: [
          { required: true, message: '分类名不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    show(scope) {
      this.form.cat_name = scope.cat_name
      this.cat_id = scope.cat_id
      this.dialogVisible = true
    },
    submit() {
      this.$refs.form.validate(async vali => {
        if (vali) {
          try {
            await editCategories(this.cat_id, this.form)
            this.dialogVisible = false
            this.$emit('success')
          } catch (err) {
            return err
          }
          this.$refs.form.resetFields()
        }
      })
    }
  }
}
</script>
