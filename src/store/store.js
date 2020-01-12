import Vue from "vue";
import Vuex from "vuex";
//导入封装好的本地保存token的文件
//* as 全部导入改对象
import * as author from "@/utils/author";
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: author.getAuthor(), //这里的获取的方法要与定义的方法一一对应
    },
    mutations: {
        setToken(state, token) {

            author.setAuthor(token) //这里要用author的方法保存到author.js中
            //讲数据保存到vuex中 
            state.token = token;
        }
    }

})

export default store;