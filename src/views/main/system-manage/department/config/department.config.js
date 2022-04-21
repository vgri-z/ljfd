export const editUserRules = {
  name: [
    {
      required: true,
      message: '请输入机构名称',
      trigger: 'blur'
    }
  ],
  isHasFactory: [
    {
      required: true,
      message: '请选择是否拥有工厂',
      trigger: 'blur'
    }
  ]
}
