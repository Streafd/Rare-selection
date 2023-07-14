import { defineStore } from 'pinia'
//引入接口
import { reqLogin, reqUserInfo, reqLogOut } from '@/api/user'
//引入数据类型
import type {
  loginResponseData,
  userResponseData,
  loginreqData
} from '@/api/user/type'
import type { UserState } from './modules/type'

import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utlis/token'

import { constantRoute } from '@/router/routers.ts'
let useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      //用户唯一标识token
      token: GET_TOKEN(),
      menuRouter: constantRoute, //仓库存储生成菜单需要的数组
      user: {}
    }
  },
  actions: {
    //用户登录
    async getLogin(data: loginreqData) {
      let result: loginResponseData = await reqLogin(data)
      if (result.code == 200) {
        this.token = result.data as string
        SET_TOKEN(result.data as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    //获取用户信息
    async getUserInfo() {
      let result: userResponseData = await reqUserInfo()
      if (result.code == 200) {
        this.user = { name: result.data.name, avatar: result.data.avatar }
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //退出登录
    async userLogout() {
      let result: any = await reqLogOut()
      if (result.code == 200) {
        this.token = ''
        this.user = {}
        REMOVE_TOKEN()
        return '成功退出'
      } else {
        return Promise.resolve(new Error(result.message))
      }
    }
  },
  getters: {}
})

export default useUserStore
