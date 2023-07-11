//自定义插件注册全局组件

//引入需要注册全局组件的组件


//引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//定义一个对象接收组件：全局对象
const allGloablComponent ={}
//对外暴露插件对像
export default{
  //务必叫做install方法
  install(app){
    //注册项目全部的全局组价
    Object.keys(allGloablComponent).forEach(key=>{
      //注册为全局组件
      app.component(key,allGloablComponent[key])
    })
    //全局注册elemtent图标组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
}

// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }