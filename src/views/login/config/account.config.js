// 登录表单验证规则
export const rules = {
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
    // { pattern: /^[a-zA-Z0-9]{3,10}$/, message: '用户名为5-10个数字或字母', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
    // {
    //   pattern: /^[a-zA-Z0-9]{6,16}$/,
    //   message: '密码为6-16个数字或者字母',
    //   trigger: 'blur'
    // }
  ]
}
