//定义商品管理接口
import requests from '@/utlis/request.ts'

import type { TradeMarkResponseData, addTrademark } from './trademark.ts'

enum API {
  BSETRADMARK_URL = '/admin/product/baseTrademark/save',
  DELETE_URL = '/admin/product/baseTrademark/remove/',
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update'
}

//获取品牌列表接口
export const reqTrademarkList = (page: number, limit: number) =>
  requests.get<any, TradeMarkResponseData>(
    `${API.TRADEMARK_URL}${page}/${limit}`
  )

//添加|修改品牌接口
export const reqAddTradmark = (data: addTrademark) => {
  //有id，则修改品牌接口
  if (data.id) {
    return requests.put<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    return requests.post<any, any>(API.BSETRADMARK_URL, data)
  }
}

//删除品牌
export const reqDeleteTrademark = (id: number) =>
  requests.delete<any, any>(`${API.DELETE_URL}${id}`)
