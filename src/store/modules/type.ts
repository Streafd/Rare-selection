import type { RouteRecordRaw } from 'vue-router'
import type { categoryObj } from '@/api/product/attr/type.ts'
//定义user小仓库数据state类型
interface userInfo {
  name?: string
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

//定义三级分类小仓库数据state类型
export interface useC1 {
  code: number
  message: string
  ok: Boolean
  data: []
}
export interface categoryC1 {
  c1Id: number | string
  c2Id: number | string
  c3Id: number | string
  c1Arr: categoryObj[]
  c2Arr: categoryObj[]
  c3Arr: categoryObj[]
}
