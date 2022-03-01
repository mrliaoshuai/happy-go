<template>
  <div>
    <el-button type="primary" @click="but"></el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    but() {
      // this.$Myalert('nihao')
      this.$Myconfirm('dadd')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
