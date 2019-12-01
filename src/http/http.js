
import axios from "axios";
//导入store获取token在请求头中添加headers
import store from "@/store/store";

const request = axios.create({
    baseURL: ' http://ttapi.research.itcast.cn/app/',
})

//请求拦截器
request.interceptors.request.use(function (config) {
    //在vuex中取出token对象 判断用户是否有登录
   let token= store.state.token;
   if(token&&token.token){
       config.headers.Authorization=`Bearer ${token.token}`
   }
    return config;
}, function (error) {

    return Promise.reject(error);
});

// 响应拦截器
request.interceptors.response.use(function (response) {
    return response.data || response;
}, function (error) {

    return Promise.reject(error);
});



export default request
   





