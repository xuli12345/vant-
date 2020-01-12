import axios from "axios";
//导入store获取token在请求头中添加headers
import store from "@/store/store";

const request = axios.create({
    baseURL: ' http://ttapi.research.itcast.cn/app/',
})
//用于根据refresh_token刷新用户token
const request_token = axios.create({
    baseURL: ' http://ttapi.research.itcast.cn/app/',
})
//请求拦截器
request.interceptors.request.use(function (config) {
    //在vuex中取出token对象 判断用户是否有登录
    let token = store.state.token;
    if (token && token.token) {
        config.headers.Authorization = `Bearer ${token.token}`
    }
    return config;
}, function (error) {

    return Promise.reject(error);
});

// 响应拦截器
request.interceptors.response.use(function (response) {
    return response.data || response;
}, async function (error) {
    //   console.log(error.response.status)
    //刷新用户token
    let refresh_token = store.state.token.refresh_token;
    if (error.response.status === 401) {
        let res = await request_token({
            url: "v1_0/authorizations",
            method: "PUT",
            headers: {
                Authorization: `Bearer ${refresh_token}`
            }

        })
        //得到新token
        let token= res.data.data.token;
        //保存token到vuex 
        store.commit("setToken",{
            token,
            refresh_token
        })
        //再次发送请求到服务器
        return request(error.config)
      
    }
    return Promise.reject(error);
});



export default request