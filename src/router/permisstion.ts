//路由鉴权
import router from './index.ts'

//进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
//取消进度条转圈的效果
nprogress.configure({ showSpinner: false })

//引入user小仓库
import useUserStore from '@/store/user.ts'

//全局前置路由
router.beforeEach(async (to: any, from: any, next: any) => {
  //标题
  document.title = '真品甄选-' + to.meta.title
  let useStore = useUserStore()
  nprogress.start()

  //先判断用户是否登录
  if (useStore.token) {
    if (to.path == '/login') {
      next({ path: '/home' })
    } else {
      //判断是否有用户信息
      if (useStore.user.username) {
        next()
      } else {
        try {
          await useStore.getUserInfo()
          next()
        } catch (error) {
          //token过期
          //用户手动修改本地存储token
          //要退出登录->情空存储
          //返回login
          useStore.userLogout()
          next({ path: '/login', redirect: to.path })
        }
      }
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

//全局后置路由
router.afterEach((to, from, next) => {
  nprogress.done()
})
