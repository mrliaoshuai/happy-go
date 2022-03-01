<template>
  <div class="app-container">
    <el-card class="box-card">
      <div style="margin-bottom: 10px">
        <el-input
          v-model="query"
          style="width: 400px; margin-right: 10px"
          placeholder="请输入内容"
          class="input-with-select"
          @keyup.enter.native="getList"
        >
          <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
        </el-input>
        <el-button type="primary" @click="$router.push('/goodsManagement/addgoods')">添加商品</el-button>
      </div>
      <el-table :data="list" style="width: 100%" border>
        <el-table-column prop="goods_name" label="商品类容" width="300" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="goods_price" label="商品价格（元）"> </el-table-column>
        <el-table-column prop="goods_number" label="商品数量"> </el-table-column>
        <el-table-column prop="add_time" label="创建时间" :formatter="formatTime"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="$refs.refEditDialog.show(scope.row)">
              编辑
            </el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeGoods(scope.row.goods_id)">
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
    <EditDialog ref="refEditDialog" @success="getList" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { formatDate } from '@/utils/const'
import EditDialog from './eidtDialog.vue'
import { removeGoods } from '@/api/goods'
export default {
  components: {
    EditDialog
  },
  data() {
    return {
      query: '',
      params: { pagenum: 1, pagesize: 5 }
    }
  },
  computed: {
    ...mapState({
      list: state => state.goods.goodsList.goods || [],
      total: state => state.goods.goodsList.total
    })
  },
  watch: {
    params: {
      immediate: true,
      deep: 2,
      handler() {
        this.getList()
      }
    }
  },
  methods: {
    handleSizeChange(e) {
      this.params.pagesize = e
    },
    handleCurrentChange(e) {
      this.params.pagenum = e
    },
    getList() {
      const params = { query: this.query, ...this.params }
      this.$store.dispatch('goods/getList', params)
    },
    formatTime({ add_time }) {
      return formatDate(add_time * 1000)
    },
    async removeGoods(id) {
      const res = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (res === 'confirm') {
        await removeGoods(id)
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
