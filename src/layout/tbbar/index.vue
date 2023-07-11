<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>

<template>
  <div class="tabbar">
    <div class="tabbar-flex">
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="tabbar-flex">
      <Setting />
    </div>
  </div>
</template>
<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
}
</style>
