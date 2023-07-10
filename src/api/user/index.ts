//同一管理项目用户相关接口
import requests from "@/utlis/request";
import {loginForm,loginResponseData,userResponseData} from './type'
// export const reqUseLogin=(user)=>{
//   return requests.post('/user/login',user)
// }
enum API{
  LOGIN_URL="/user/login",
  USERINFO_URL="/user/info"
}

//登录接口
export const reqLogin=(user:loginForm)=> requests.post<any,loginResponseData>(API.LOGIN_URL,user)
//用户信息接口方法
export const reqUserInfo =()=> requests.get<any,userResponseData>(API.USERINFO_URL)
