export default function useNameValue(key) {
  switch (key) {
    case 'name':
      return '危险源或潜在事件'

    case 'accident':
      return '可能发生的事故类型及后果'

    case 'emergencySolution':
      return '工程控制措施'

    case 'engineeringSolution':
      return '管理措施'

    case 'managementSolution':
      return '培训教育措施'

    case 'protection':
      return '个体防护'

    case 'riskLevel':
      return '风险分级'

    case 'trainingSolution':
      return '建议新增(改进)措施'

    case 'suggestions':
      return '应急措施'
  }
}
