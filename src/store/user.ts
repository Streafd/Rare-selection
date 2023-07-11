import { defineStore } from 'pinia'
//引入接口
import { reqLogin, reqUserInfo } from '@/api/user'
//引入数据类型
import type { loginForm, loginResponseData } from '@/api/user/type'
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
    async getLogin(data: loginForm) {
      let result: loginResponseData = await reqLogin(data)
      if (result.code == 200) {
        this.token = result.data.token as string
        // localStorage.setItem('token',(result.data.token as string))
        SET_TOKEN(result.data.token as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
    //获取用户信息
    async getUserInfo() {
      let result = await reqUserInfo()
      console.log(result)
      if (result.code == 200) {
        this.user = result.data.checkUser
        return 'ok'
      } else {
        return Promise.reject(result.message)
      }
    },
    //退出登录
    userLogout() {
      //目前没有mock接口
      this.token = ''
      this.user = {}
      REMOVE_TOKEN()
      return Promise.resolve('成功退出')
    }
  },
  getters: {}
})

export default useUserStore
