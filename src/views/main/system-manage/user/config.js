export const addRules = {
  userName: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      pattern: /^(?=.*[a-z])/,
      message: '密码至少包含一个小写字母',
      trigger: 'blur'
    },
    {
      pattern: /^(?=.*[A-Z])/,
      message: '密码至少包含一个大写字母',
      trigger: 'blur'
    },
    {
      pattern: /^(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]/,
      message: '密码至少包含一个特殊字符',
      trigger: 'blur'
    }
    // {
    //   pattern: /^\d{6,16}$/,
    //   message: '密码至少需要6位',
    //   trigger: 'blur'
    // }
    // {
    //   pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}/,
    //   message: '密码至少需要6位，至少包含一个大写字母，一个小写字母，一个特殊字符'
    // }
  ],
  givenName: [
    {
      required: true,
      message: '请输入姓名',
      trigger: 'blur'
    }
  ],
  phoneNumber: [
    // {
    //   required: true,
    //   message: '请输入手机号',
    //   trigger: 'blur'
    // },
    {
      pattern: /^(0|86|17951)?(1[3-9])[0-9]{9}$/,
      message: '请输入正确的手机号',
      trigger: 'blur'
    }
  ]
}

export const resetRules = {
  currentPassword: [
    {
      required: true,
      message: '请输入原密码'
    }
  ],
  newPassword: [
    {
      required: true,
      message: '请输入新密码'
    }
  ],
  confirmPassword: [
    {
      required: true,
      message: '请确认密码'
    }
  ]
}
