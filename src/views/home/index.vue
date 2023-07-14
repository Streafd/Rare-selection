<script setup lang="ts">
//引入组合式API函数的生命周期

import useUserStore from '@/store/user.ts'
import { hours } from '@/utlis/nowTime.ts'
let useStore = useUserStore()
</script>

<template>
  <div>
    <h1>{{ useStore.user.name }}</h1>
    <hr />
    <p>{{ hours() }}</p>
  </div>
</template>
<style scoped></style>
