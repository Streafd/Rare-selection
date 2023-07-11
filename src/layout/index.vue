<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tbbar/index.vue'
import { useRouter, useRoute } from 'vue-router'
import useUserStore from '@/store/user'
import { ref, provide } from 'vue'

let userStore = useUserStore()
let $router = useRouter()
let $route = useRoute()

const handleSelect = (key: string) => {
  $router.push(key)
}
//给breadcrumb组件传递数据
let isColless = ref(false)
provide('token', isColless)
</script>

<template>
  <div class="layout_contariner">
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="isColless ? 'fold' : ''">
      <!-- logo组件 -->
      <Logo></Logo>
      <el-scrollbar class="scrollbar" native>
        <el-menu
          :default-active="$route.path"
          class="el-menu-demo"
          mode="vertical"
          background-color="#003566"
          text-color="white"
          active-text-color="#00b4d8"
          @select="handleSelect"
          :collapse="isColless"
        >
          <Menu :menuRouter="userStore.menuRouter"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar" :class="isColless ? 'fold' : ''">
      <Tabbar></Tabbar>
    </div>

    <!-- 内容展示区域 -->
    <div class="layout_main" :class="isColless ? 'fold' : ''">
      <Main></Main>
    </div>
  </div>
</template>
<style scoped lang="scss">
.layout_contariner {
  width: 100%;
  height: 100vh;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-backgroundColor;
    color: #fff;
    transition: all 0.3s;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: 0px;
      }
    }
    &.fold {
      width: $base-menu-min-width;
    }
  }
  .layout_tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    color: #000;
    border-bottom: 1px solid #c6c6c6;
    box-shadow: 0px 2px 5px 0px rgba($color: #666, $alpha: 0.2);
    transition: all 0.3s;
    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
  .layout_main {
    position: absolute;
    top: $base-tabbar-height;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    // background-color: aquamarine;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
