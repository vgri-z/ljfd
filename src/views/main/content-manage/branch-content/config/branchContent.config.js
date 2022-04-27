export const resetRules = {
  name: [
    {
      required: true,
      message: '请输入危险源或潜在事件',
      trigger: 'blur'
    }
  ],
  riskLevel: [
    {
      required: true,
      message: '请输入风险分级',
      trigger: 'blur'
    }
  ],
  accident: [
    {
      required: true,
      message: '请输入可能发生的事故类型及后果',
      trigger: 'blur'
    }
  ],
  emergencySolution: [
    {
      required: true,
      message: '请输入工程控制措施',
      trigger: 'blur'
    }
  ],
  engineeringSolution: [
    {
      required: true,
      message: '请输入管理措施',
      trigger: 'blur'
    }
  ],
  managementSolution: [
    {
      required: true,
      message: '请输入培训教育措施',
      trigger: 'blur'
    }
  ],
  protection: [
    {
      required: true,
      message: '请输入个体防护',
      trigger: 'blur'
    }
  ],
  suggestions: [
    {
      required: true,
      message: '请输入应急措施',
      trigger: 'blur'
    }
  ],
  trainingSolution: [
    {
      required: true,
      message: '请输入建议新增(改进)措施',
      trigger: 'blur'
    }
  ],
  organizationId: [
    {
      required: true,
      message: '请选择机构',
      trigger: 'blur'
    }
  ],
  organizationNames: [
    {
      required: true,
      message: '请选择建议新增(改进)措施',
      trigger: 'change'
    }
  ]
}

export const addAreaRules = {
  name: [
    {
      required: true,
      message: '请输入名称',
      trigger: 'blur'
    }
  ]
}
