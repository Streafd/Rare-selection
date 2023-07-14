//定义trademark数据类型

//返回数据公共类型
export interface ResponseData {
  code: number
  message: string
  ok: Boolean
}
//已有品牌的ts数据类型
export interface TradeMark {
  id?: number
  tmName: string
  logoUrl: string
}
//包含全部品牌数据的ts类型
export type Records = TradeMark[]

//获取已有全部品牌的数据ts类型
export interface TradeMarkResponseData extends ResponseData {
  data: {
    current: number
    size: number
    total: number
    searchCount: boolean
    records: Records
  }
}

//添加|修改品牌ts类型
export interface addTrademark {
  id?: number
  tmName: string
  logoUrl: string
}
