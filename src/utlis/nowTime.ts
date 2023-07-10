//登录时间判断:早上|上午|下午|晚上

export const hours=()=>{
  let time:number= new Date().getHours()
  let message:string=''
  if(time<=9){
    message='早上好'
  }else if(time<=12){
    message='上午号'
  }else if(time<=18){
    message='下午好'
  }else{
    message='晚上好'
  }
  return message
}