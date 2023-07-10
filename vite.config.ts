import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
//引入svg插件
// import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
// https://vitejs.dev/config/
export default defineConfig(({command})=>{
  return {
    plugins: [vue(),viteMockServe({
      localEnabled: command === 'serve', // 保证在开发阶段可以使用mock接口
    }),],
  resolve:{
    alias:{
      "@":path.resolve("./src")
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "./src/styles/variable.scss";',
      },
    },
  },
  }
})
