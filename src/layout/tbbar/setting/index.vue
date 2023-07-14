<script setup lang="ts">
import useLauOutSettingStore from '@/store/modules/setting.ts'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'

//引入user小仓库
import useUserStore from '@/store/user.ts'
let useStore = useUserStore()

let $router = useRouter()
let $route = useRoute()
let useLauOutStore = useLauOutSettingStore()

//刷线按钮回调
const changeRefsh = () => {
  useLauOutStore.refsh = !useLauOutStore.refsh
}
//全屏模式回调
const fullScreen = () => {
  //dom对象的一个属性：可以用来判断当前是不是全屏模式
  let full = document.fullscreenElement
  //切换全屏模式,谷歌浏览器适配，不同浏览器的方式不一样
  if (!full) {
    //文旦根节点的方法requestFullscreen(),实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    //退出全屏模式
    document.exitFullscreen()
  }
}

//退出按钮
const exit = async () => {
  //1.需要向服务器发送请求
  //2.清除token
  //3.返回登录页
  try {
    let msg = await useStore.userLogout()
    $router.push({ path: '/login', query: { path: $route.path } })
    ElMessage({
      type: 'success',
      message: msg
    })
  } catch (error) {}
}
</script>

<template>
  <!-- 设置 -->
  <el-row>
    <el-button icon="Refresh" circle @click="changeRefsh" />
    <el-button icon="FullScreen" circle @click="fullScreen" />
    <el-button icon="Setting" circle />
  </el-row>
  <!-- 头像 -->
  <img :src="useStore.user.avatar" class="avatar" />
  <!-- 下拉框 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ useStore.user.name }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="exit">
          <el-icon>
            <component is="SwitchButton"></component>
          </el-icon>
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<style scoped lang="scss">
.avatar {
  width: 30px;
  height: 30px;
  // background-color: pink;
  border: 1px solid #c6c6c6;
  border-radius: 50%;
  text-align: center;
  line-height: 32px;
  margin: 0px 10px 0px 20px;
}
</style>
