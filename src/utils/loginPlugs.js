//自动义封装登录的插件
import store from "@/store/store"
import Vue from 'vue'
import router from '@/router/index'
import {
    Dialog
} from 'vant';
// 全局注册
Vue.use(Dialog);

var loginPlugs = {};
loginPlugs.install = function (Vue) {
    Vue.prototype.$login = function () {
        let user = store.state.token;

        if (!user || !user.token) {
            Dialog.confirm({
                    title: "注意",
                    message: "此操作需要先登录"
                })
                .then(() => {
                    router.push("/login");

                })
                .catch(() => {
                    return;
                });
        } else {
            console.log("用户登录了");
        }

    }
}

//导出插件
export default loginPlugs;