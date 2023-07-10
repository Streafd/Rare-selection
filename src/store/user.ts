import {defineStore} from 'pinia'
//引入接口
import {reqLogin,reqUserInfo} from '@/api/user'
//引入数据类型
import type {loginForm,loginResponseData} from '@/api/user/type'
import type {UserState} from './modules/type'

import {GET_TOKEN,SET_TOKEN} from '@/utlis/token'
let useUserStore= defineStore('user',{
    state:():UserState=>{
      return{
        //用户唯一标识token
        token:GET_TOKEN()
      }
    },
    actions:{
      //用户登录
      async getLogin(data:loginForm){
        let result:loginResponseData=await reqLogin(data)
        if(result.code==200){
          this.token=(result.data.token as string)
          // localStorage.setItem('token',(result.data.token as string))
          SET_TOKEN(result.data.token as string)
          return 'ok'
        }else{
          return Promise.reject(new Error(result.data.message))
        }
      }
    },
    getters:{}
})

export default useUserStore