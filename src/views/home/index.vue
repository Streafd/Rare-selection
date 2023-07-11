<script setup lang="ts">
//引入组合式API函数的生命周期
import { onMounted } from 'vue'

import useUserStore from '@/store/user.ts'
import { hours } from '@/utlis/nowTime.ts'
let useStore = useUserStore()
onMounted(() => {
  //获取用户信息
  useStore.getUserInfo()
})
</script>

<template>
  <div>
    <h1>{{ useStore.user.username }}</h1>
    <hr />
    <p>{{ hours() }}</p>
  </div>
</template>
<style scoped></style>
