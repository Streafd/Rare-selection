import axios from 'axios'
import { ElMessage } from 'element-plus'

//引入用户相关仓库
import useUserStore from '@/store/user.ts'

//创建axios实例
let requests = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径上会携带api
  timeout: 5000 //超时时间设置
})

//请求拦截器
requests.interceptors.request.use((config) => {
  //获取用户相关的仓库，获取仓库的token，登录成功后携带给服务器
  let useStore = useUserStore()
  if (useStore.token) {
    //config配置对象，headers属性请求头
    config.headers.token = useStore.token
  }
  return config
})

//响应拦截器
requests.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => {
    //失败回调：处理http网络错误
    //定义一个变量：存储网络出错信息
    let message = ''
    let status = error.response.status

    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现问题'
        break
    }
    // 提示错误信息
    ElMessage({
      type: 'error',
      message
    })
    return Promise.reject(error)
  }
)

export default requests
