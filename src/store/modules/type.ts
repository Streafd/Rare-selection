import type { RouteRecordRaw } from 'vue-router'

//定义小仓库数据state类型
interface userInfo {
  username?: string
  avatar?: string
}
export interface UserState {
  token: string | null
  menuRouter: RouteRecordRaw[]
  user: userInfo
}

//定义setting小仓库数据state类型
export interface useLayOutState {
  refsh: Boolean
}
