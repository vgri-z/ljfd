export const rules = {
  title: [{ required: true, message: '请输入题目', trigger: 'blur' }],
  type: [{ required: true, message: '请选择题目类型', trigger: 'change' }]
}

export const fillRules = {
  text: [{ required: true, message: '请输入答案内容', trigger: 'blur' }],
  isCorrect: [{ required: true, message: '请选择答案是否必须一致', trigger: 'change' }]
}
