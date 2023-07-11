//小仓库：layout组件相关配置仓库
import { defineStore } from 'pinia'

//引入相关的数据类型
import type { useLayOutState } from './type.ts'

let useLauyOutSettingStore = defineStore('setting', {
  state: (): useLayOutState => {
    return {
      refsh: true //用于刷新效果
    }
  }
})

export default useLauyOutSettingStore
