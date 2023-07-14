//同一管理项目用户相关接口
import requests from '@/utlis/request'
import type { loginreqData, loginResponseData, userResponseData } from './type'

enum API {
  LGOIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout'
}

//登录接口
//<>的第二个类型是约束数据返回的类型
export const reqLogin = (user: loginreqData) =>
  requests.post<any, loginResponseData>(API.LGOIN_URL, user)

//获取用户信息
export const reqUserInfo = () =>
  requests.get<any, userResponseData>(API.USERINFO_URL)

//用户退出登录
export const reqLogOut = () => requests.post<any, any>(API.LOGOUT_URL)
