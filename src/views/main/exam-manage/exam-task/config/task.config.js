export const editRules = {
  name: [
    {
      required: true,
      message: '请输入考试名称',
      trigger: 'blur'
    }
  ],
  totalScore: [
    {
      required: true,
      message: '请输入考试总分',
      trigger: 'blur'
    }
  ],
  startTime: [
    {
      required: true,
      message: '请选择开始时间',
      trigger: 'change'
    }
  ],
  endTime: [
    {
      required: true,
      message: '请选择结束时间',
      trigger: 'change'
    }
  ],
  organizationIds: [
    {
      required: true,
      message: '请选择工厂',
      trigger: 'change'
    }
  ],
  singleQuantity: [
    {
      required: true,
      message: '请输入单选题数量',
      trigger: 'blur'
    }
  ],
  multiQuantity: [
    {
      required: true,
      message: '请输入多选题数量',
      trigger: 'blur'
    }
  ],
  clozeQuantity: [
    {
      required: true,
      message: '请输入填空题数量',
      trigger: 'blur'
    }
  ],
  trueFalseQuantity: [
    {
      required: true,
      message: '请输入判断题数量',
      trigger: 'blur'
    }
  ],
  questionCount: [
    {
      required: true,
      message: '请输入总题数',
      trigger: 'blur'
    }
  ]
}
