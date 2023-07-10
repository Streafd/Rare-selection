import { createApp } from 'vue'
import App from './App.vue'
//引入element-plus插件和样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import router from '@/router/index'
import pinia from '@/store/index'

//svg插件需要配置代码
// import 'virtual:svg-icons-register'

//引入全局样式
import '@/styles/index.scss'

//获取应用实例对象
const app=createApp(App)

app.use(ElementPlus,{
  locale:zhCn
})
app.use(router)
app.use(pinia)


//将应用挂载到挂载点上
app.mount('#app')
