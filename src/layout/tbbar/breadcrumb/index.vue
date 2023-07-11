<script setup lang="ts">
import { ref, inject } from 'vue'
import { useRoute } from 'vue-router'

let $route = useRoute()
const add = () => {
  console.log($route.matched)
}

//接收layout组件传递过来的
let isColless = inject('token')

//点击图标，是否折叠菜单
let changeIcon = () => {
  isColless.value = !isColless.value
}
</script>

<template>
  <!-- 折叠效果 -->
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <!-- <Expand v-if="!isColless" />
    <Fold v-else /> -->
    <component :is="!isColless ? 'Expand' : 'Fold'"></component>
  </el-icon>
  <!-- 面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- 面包动态展示路由名字和标题和图标 -->
    <template v-for="(item, index) in $route.matched" :key="item.path">
      <el-breadcrumb-item :to="item.path" v-if="item.path !== '/'">
        <el-icon style="margin: 0px 2px 0px 2px; vertical-align: bottom">
          <component :is="item.meta.icon"></component>
        </el-icon>
        {{ item.meta.title }}</el-breadcrumb-item
      >
    </template>
  </el-breadcrumb>
</template>
<style scoped></style>
