import { createRouter, createWebHashHistory } from 'vue-router'

import { constantRoute } from './routers'

//引入user小仓库
import useUserStore from '@/store/user.ts'

let router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoute,
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})
router.beforeEach((to, from, next) => {
  let { token, user } = useUserStore()
  // console.log(token)
  // if (token) {
  //   console.log(1)
  // }
  //先判断token是否存在
  // if(!token){
  //   if()
  // }else{
  //   next()
  // }
  console.log(to)
  console.log(from)
  next()
})

export default router
