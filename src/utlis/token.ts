//封装本地存储数据和读取

//存储
export const SET_TOKEN =(token:string)=> localStorage.setItem('token',token)
//读取
export const GET_TOKEN =()=> localStorage.getItem('token')
//只删除token
export const REMOVE_TOKEN=()=>localStorage.removeItem('token')