<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form ref="form" label-width="120px">
        <el-form-item label="选择商品分类:">
          <el-tooltip class="item" effect="dark" content="只允许为三级分类设置相关属性" placement="top">
            <el-cascader
              v-model="value"
              :options="list"
              :props="{ expandTrigger: 'hover', label: 'cat_name', value: 'cat_id' }"
            ></el-cascader>
          </el-tooltip>
        </el-form-item>
      </el-form>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">动态参数</el-menu-item>
        <el-menu-item index="2">静态属性</el-menu-item>
      </el-menu>
      <div class="main">
        <el-button type="primary" :disabled="isDisabled">添加参数</el-button>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-tag
                v-for="(tag, index) in props.row.arr_vals"
                :key="index"
                style="margin-right: 10px"
                closable
                type="success"
                @close="handleClose(tag, props.row)"
              >
                {{ tag }}
              </el-tag>
              <el-input
                v-if="inputVisible"
                ref="saveTagInput"
                v-model="inputValue"
                class="input-new-tag"
                size="small"
                @keyup.enter.native="handleInputConfirm(props.row)"
                @blur="handleInputConfirm(props.row)"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加元素</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="attr_name" label="参数名称"> </el-table-column>
          <el-table-column label="操作"> </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getList, editList } from '@/api/attributes'
export default {
  data() {
    return {
      options: [],
      value: [],
      activeIndex: '1',
      activeIndex2: '1',
      isDisabled: true,
      tableData: [],
      sel: 'many',
      inputVisible: false,
      inputValue: ''
    }
  },
  computed: {
    ...mapState({ list: state => state.categories.categoriesList || [] })
  },
  watch: {
    value() {
      this.searchCategoriesById()
    }
  },
  created() {
    this.getSelectList()
  },
  methods: {
    handleSelect(key) {
      this.sel = key === '1' ? 'many' : 'only'
      this.searchCategoriesById()
    },
    getSelectList() {
      this.$store.dispatch('categories/getList', this.params)
    },
    async searchCategoriesById() {
      if (this.value.length !== 3) return
      const { data } = await getList(this.value[2], { sel: this.sel })
      data.forEach(item => {
        item.arr_vals = item.attr_vals ? item.attr_vals.split(',') : []
      })
      this.tableData = data
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.focus()
      })
    },
    // 添加参数
    async handleInputConfirm(val) {
      if (this.inputValue) {
        const { cat_id, attr_id, attr_vals, attr_name } = val
        const params = {
          attr_name: attr_name,
          attr_sel: this.sel,
          attr_vals: attr_vals + ',' + this.inputValue
        }
        await editList(cat_id, attr_id, params)
        val.arr_vals.push(this.inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    handleClose(tag, val) {
      const { arr_vals, attr_id, attr_name, attr_sel, cat_id } = val
      arr_vals.slice(arr_vals.findIndex(tag))
      console.log(tag, val)
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding-top: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
