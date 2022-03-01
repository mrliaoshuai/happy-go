<template>
  <el-dialog title="商品修改" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="商品名称" prop="goods_name">
        <el-input v-model="form.goods_name"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="goods_price">
        <el-input v-model.number="form.goods_price"></el-input>
      </el-form-item>
      <el-form-item label="重量" prop="goods_weight">
        <el-input v-model.number="form.goods_weight"></el-input>
      </el-form-item>
      <el-form-item label="数量" prop="goods_number">
        <el-input v-model.number="form.goods_number"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { editGoods, searchGoodsById } from '@/api/goods'
export default {
  data() {
    return {
      dialogVisible: false,
      list: {},
      form: { goods_name: '', goods_price: '', goods_weight: '', goods_number: '' },
      rules: {
        goods_name: [
          { required: true, message: '商品名称不能为空', trigger: 'blur' },
          { min: 2, max: 60, message: '长度在 2 到 60 个字符', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '价格不能为空', trigger: 'blur' },
          { type: 'number', message: '价格必须为数字', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '重量不能为空', trigger: 'blur' },
          { type: 'number', message: '重量必须为数字', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '数量不能为空', trigger: 'blur' },
          { type: 'number', message: '数量必须为数字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleClose(done) {
      this.form = {}
      done()
    },
    async show(scope) {
      this.list = scope
      const { data } = await searchGoodsById(scope.goods_id)
      this.form = data
      this.dialogVisible = true
    },
    submit() {
      this.$refs.form.validate(async vali => {
        if (vali) {
          try {
            await editGoods(this.form.goods_id, this.form)
            this.list.goods_name = this.form.goods_name
            this.list.goods_price = this.form.goods_price
            this.list.goods_weight = this.form.goods_weight
            this.list.goods_number = this.form.goods_number
            this.dialogVisible = false
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
