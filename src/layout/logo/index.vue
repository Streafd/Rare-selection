<script setup lang="ts">
//引入设置标题与logo这配置文件
import setting from '@/setting.ts'
</script>

<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>
<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  display: flex;
  align-items: center;
  padding: 10px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  p {
    width: 100%;
    font-size: 20px;
    overflow: hidden;
  }
}
</style>
