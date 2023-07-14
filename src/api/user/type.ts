//定义用户相关数据类型

//登录接口需要携带参数ts类型
export interface loginreqData {
  username: string
  password: string
}

//定义全部接口返回数据都拥有(公共)的ts类型
export interface ResponseData {
  code: number
  message: string
  ok: Boolean
}

//登录接口返回的数据类型,继承定义ResponseData的数据类型
export interface loginResponseData extends ResponseData {
  data: string
}

//用户信息接口返回的数据类型
export interface userResponseData extends ResponseData {
  data: {
    router: string[]
    button: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
