//引入axios网络请求库
import http from  "@/http/http";
/**
 * 获取code的方法
 * @param {*} param0 
 */
function getCode({mobile}){
    return http({
        url:"v1_0/sms/codes/"+mobile,
        method:"get",
   
        
    })
}
/**
 * @param 添加一个登录的方法
 * 
 */
 function userLogin({mobile,code}){
  return http({//记得要将数据return出去否则外面拿到的就是默认值undefined
         url:"v1_0/authorizations",
         method:"post",
         data:{
             mobile:mobile,
             code:code
         }
     })
 }
 export {
    getCode,
    userLogin,
 }