const focus = {}
focus.install = function (Vue, options) {
  Vue.directive('focus', {
    inserted: function (el) {
      console.log(el)
      el.focus()
    }
  })
}
export default focus
