// email的正则
export const regEmail = /^(([_\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([_\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?))$/

// 手机号的reg
export const regPhone = /^1(3|5|8)[0-9]{9}$/

export const elUsername = [
  { required: true, message: '用户名不能为空', trigger: 'blur' },
  { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' },
  { pattern: /^[0-9A-z]{4,16}$/, message: '用户名必须为合法字符', trigger: 'blur' }
]
export const elPassword = [
  { required: true, message: '密码不能为空', trigger: 'blur' },
  { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
  { pattern: /^[0-9A-z]{6,16}$/, message: '密码必须为合法字符', trigger: 'blur' }
]
export const elEmail = [
  { required: true, message: '邮箱不能为空', trigger: 'blur' },
  { pattern: regEmail, message: '邮箱必须为合法字符', trigger: 'blur' }
]
export const elMobile = [
  { required: true, message: '手机号不能为空', trigger: 'blur' },
  { pattern: regPhone, message: '手机号必须为合法字符', trigger: 'blur' }
]
export function formatDate(date) {
  const t = new Date(date)
  const y = (t.getFullYear() + '').padStart(2, '0')
  const m = (t.getMonth() + 1 + '').padStart(2, '0')
  const d = (t.getDay() + '').padStart(2, '0')
  const h = (t.getHours() + '').padStart(2, '0')
  const mm = (t.getMinutes() + '').padStart(2, '0')
  const s = (t.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${h}:${mm}:${s}`
}
