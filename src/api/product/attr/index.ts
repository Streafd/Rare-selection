//获取平台属性的接口
import requests from '@/utlis/request.ts'

import type { ResponseData, AttrResponseData, Attr } from './type.ts'
enum API {
  CATEGORY1_URL = '/admin/product/getCategory1',
  CATEGORY2_URL = '/admin/product/getCategory2/',
  CATEGORY3_URL = '/admin/product/getCategory3/',
  ATTRINFOLIST_URL = '/admin/product/attrInfoList/',
  SAVEATTRINFO_URL = '/admin/product/saveAttrInfo',
  DELETE_URL = '/admin/product/deleteAttr/'
}

//获取到一级属性
export const reqCategory1 = () =>
  requests.get<any, ResponseData>(API.CATEGORY1_URL)
//获取到二级属性
export const reqCategory2 = (id: number | string) =>
  requests.get<any, ResponseData>(API.CATEGORY2_URL + id)
//获取到三级属性
export const reqCategory3 = (id: number | string) =>
  requests.get<any, ResponseData>(API.CATEGORY3_URL + id)

//获取商品属性接口
export const reqAttrInfoList = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string
) =>
  requests.get<any, AttrResponseData>(
    `${API.ATTRINFOLIST_URL}${category1Id}/${category2Id}/${category3Id}`
  )

//添加|修改商品属性
export const reqSaveAttrInfo = (data: Attr) =>
  requests.post<any, any>(API.SAVEATTRINFO_URL, data)

//删除商品属性
export const reqDelete = (attrld: number) =>
  requests.delete<any, any>(API.DELETE_URL + attrld)
