export const dialog = {
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    falseDialog() {
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    handleClose(done) {
      this.$refs.form.resetFields()
      done()
    }
  }
}
