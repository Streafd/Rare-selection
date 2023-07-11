<script setup lang="ts">
import useLauOutSettingStore from '@/store/modules/setting.ts'
import { ref, watch, nextTick } from 'vue'

let fale = ref(true)
let useLauOutStore = useLauOutSettingStore()

//监听仓库内部数据是否发生变化，如果变化，说明用户点击过刷新按钮
watch(
  () => useLauOutStore.refsh,
  () => {
    //销毁路由 fale=false
    fale.value = useLauOutStore.refsh
    //获取最新的dom，此时路由组件已经销毁
    nextTick(() => {
      //fale=true,再创建新的路由组件
      fale.value = true
    })
  }
)
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout一级路由组件的子路由 -->
      <component :is="Component" v-if="fale" />
    </transition>
  </router-view>
</template>
<style scoped>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
}
</style>
