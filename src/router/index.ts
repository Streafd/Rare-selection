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

export default router
