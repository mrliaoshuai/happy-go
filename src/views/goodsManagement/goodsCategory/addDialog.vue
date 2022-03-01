<template>
  <el-dialog title="添加参数" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="分类名称" prop="cat_name">
        <el-input v-model="form.cat_name"></el-input>
      </el-form-item>
      <el-form-item label="父级分类">
        <el-popover
          placement="top-start"
          title="提示"
          width="200"
          trigger="hover"
          content="如果不选择会添加一级分类，选择一个添加二级分类，选择两个添加三级分类"
        >
          <el-cascader
            slot="reference"
            v-model="form.cat_pid"
            :options="list"
            :clearable="true"
            :filterable="true"
            :props="{ expandTrigger: 'hover', checkStrictly: true, label: 'cat_name', value: 'cat_id' }"
          ></el-cascader>
        </el-popover>
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
import { getCategories, addCategories } from '@/api/categories'
export default {
  mixins: [dialog],
  data() {
    return {
      form: { cat_name: '', cat_pid: [] },
      rules: {
        cat_name: [
          { required: true, message: '分类名不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
      },
      list: []
    }
  },
  computed: {
    params() {
      const p = {}
      switch (this.form.cat_pid.length) {
        case 0:
          p.cat_pid = 0
          p.cat_level = 0
          break
        case 1:
          p.cat_pid = this.form.cat_pid[0]
          p.cat_level = 1
          break
        case 2:
          p.cat_pid = this.form.cat_pid[1]
          p.cat_level = 2
          break
        default:
          p.cat_pid = 0
          p.cat_level = 0
      }
      p.cat_name = this.form.cat_name
      return p
    }
  },
  methods: {
    show() {
      this.dialogVisible = true
      this.list = []
      this.getList()
    },
    async getList() {
      const { data } = await getCategories({ type: 2 })
      this.list = data
    },
    submit() {
      this.$refs.form.validate(async vali => {
        if (vali) {
          try {
            await addCategories(this.params)
            this.list = []
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
