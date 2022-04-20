// 环境配置
let BASE_URL = ''
const TIME_OUT = 60000

if (process.env.NODE_ENV === 'development') {
  // 开发环境
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  // 生产环境
  BASE_URL = ''
} else {
  // 测试环境
  BASE_URL = ''
}

export { BASE_URL, TIME_OUT }
