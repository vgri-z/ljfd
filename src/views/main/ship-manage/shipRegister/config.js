export const rules = {}

export const applicantRules = {
  identityCardName: [
    {
      required: true,
      message: '请输入租赁人姓名'
    }
  ],
  identityCardNumber: [
    {
      required: true,
      message: '请输入证件号'
    }
  ],
  identityCardTypeId: [
    {
      required: true,
      message: '请选择证件类型'
    }
  ],
  phoneNumber: [
    {
      required: true,
      message: '请输入联系电话'
    }
  ],
  address: [
    {
      required: true,
      message: '请输入联系地址'
    }
  ]
}
