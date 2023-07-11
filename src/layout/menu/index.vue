<script setup lang="ts">
defineProps(['menuRouter'])
const goRouter = (vc) => {}
</script>

<!-- 递归组件必须要有name，采用vue2的方式声明name，且语言必须相同，添加lang="ts" -->
<script lang="ts">
export default {
  name: 'Menu'
}
</script>
<template>
  <!-- 循环路由，根据判断生成对相应的菜单 -->
  <template v-for="item in menuRouter" :key="item.path">
    <!-- 没有子二级路由 -->
    <el-menu-item
      v-if="!item.children && !item.meta.hidden"
      :index="item.path"
      @click="goRouter"
    >
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
    <!-- 有子路由且只有一个 -->
    <el-menu-item
      v-if="item.children && item.children.length == 1"
      :index="item.children[0].path"
    >
      <el-icon>
        <component :is="item.children[0].meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ item.children[0].meta.title }}</span>
      </template>
    </el-menu-item>
    <!-- 有子路由，数量且大于1 -->
    <el-sub-menu
      :index="item.path"
      v-if="item.children && item.children.length > 1"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <!-- 组件自己调用自己，递归组件-->
      <Menu :menuRouter="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>
<style scoped></style>
