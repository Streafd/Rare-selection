import { defineStore } from 'pinia'

import type { ResponseData } from '@/api/product/attr/type.ts'
import type { categoryC1 } from '@/store/modules/type.ts'

//引入相关请求接口
import {
  reqCategory1,
  reqCategory2,
  reqCategory3
} from '@/api/product/attr/index.ts'

let useCategoruStore = defineStore('category', {
  state: (): categoryC1 => {
    return {
      c1Arr: [],
      c1Id: '',
      c2Arr: [],
      c2Id: '',
      c3Arr: [],
      c3Id: ''
    }
  },
  actions: {
    //获取一级分类
    async getC1() {
      let result: ResponseData = await reqCategory1()
      if (result.code == 200) {
        this.c1Arr = result.data
        return 'ok'
      } else {
        return Promise.reject(result.message)
      }
    },
    //获取二级分类
    async getC2() {
      let result: ResponseData = await reqCategory2(this.c1Id)
      if (result.code == 200) {
        this.c2Arr = result.data
      }
    },
    //获取三级分类
    async getC3() {
      let result: ResponseData = await reqCategory3(this.c2Id)
      if (result.code == 200) {
        this.c3Arr = result.data
      }
    }
  },
  getters: {}
})

export default useCategoruStore
