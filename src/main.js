import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'
import * as Icons from '@element-plus/icons'

// 引入样式
import 'element-plus/theme-chalk/index.css'
import 'normalize.css'
import './assets/css/index.less'

const app = createApp(App)
app.use(store)
setupStore()
app.use(router)

// 国际化
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
app.use(ElementPlus, {
  locale: zhCn
})

app.mount('#app')

// 注册element-icon全局组件
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key])
})
