<script setup lang="ts">
import { reactive, ref } from 'vue'

//引入element plus 图标
import { User, Lock } from '@element-plus/icons-vue'
import { ElNotification, ElMessage } from 'element-plus'

import { useRouter, useRoute } from 'vue-router'
//获取路由
let $router = useRouter()
let $route = useRoute()
//引入相关小仓库
import useUserStore from '../../store/user'
let userStore = useUserStore()
import { hours } from '@/utlis/nowTime'

//收集表单数据
const from = reactive({
  username: 'admin',
  password: 'atguigu123'
})
let loginForm = ref()
//按钮加载效果
let show = ref(false)
//登录
const login = async () => {
  //保证全部表单校验通过再发请求
  await loginForm.value.validate()

  //加载效果开始
  show.value = true
  try {
    await userStore.getLogin(from)
    show.value = false
    let redirect: any = $route.query.path || '/'
    //跳转到首页
    $router.push({ path: redirect })
    ElNotification({
      type: 'success',
      message: hours(),
      title: '欢迎登录'
    })
  } catch (error: any) {
    ElMessage({
      type: 'error',
      message: error.message
    })
    show.value = false
  }
}

//表单校验规则
const rules = {
  //规则对象属性
  //required，代表这个字段务必要校验的
  //min：文本长度至少多少位
  //max：文本长度最多多少位
  //message：宠物的提示信息
  //trigger:两种触发校验表单的时机 change文本发生变化触发校验，blur失去焦点时触发校验
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'change'
    },
    {
      min: '6',
      max: '8',
      message: '账号长度6-8之间',
      trigger: 'change'
    }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'change' },
    { mix: '6', max: '8', message: '密码长度6-8之间', tirgger: 'change' }
  ]
}
</script>

<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          :model="from"
          :rules="rules"
          class="login_form"
          ref="loginForm"
        >
          <h1>Hello</h1>
          <h2>欢迎来到真品甄选</h2>
          <el-form-item prop="username">
            <el-input
              v-model="from.username"
              :prefix-icon="User"
              placeholder="请输入账号"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="from.password"
              :prefix-icon="Lock"
              placeholder="请输入密码"
              show-Password
            />
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="show"
              type="primary"
              @click="login"
              class="login_btn"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('../../assets/images/background.jpg') no-repeat;
  background-size: cover;
  background-position: center;
  .login_form {
    position: relative;
    width: 80%;
    // height: 30vh;
    top: 30vh;
    background: url('@/assets/images/login_form.png');
    background-size: cover;
    padding: 40px;
    h1 {
      font-size: 40px;
      color: white;
    }
    h2 {
      font-size: 20px;
      color: #fff;
      margin: 20px 0px;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>
