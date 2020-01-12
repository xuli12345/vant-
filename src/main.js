import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant';//导入vant组件
import 'vant/lib/index.css';
import { Lazyload } from 'vant';//图片懒加载
Vue.use(Lazyload);
Vue.use(Vant);
//导入路由
import router from "@/router/index"
//导入vuex
import store from "@/store/store"
//导入表单验证插件
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'  //加载语言包应该写成这个样子
import VueI18n from 'vue-i18n';
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh_CN',
})
Vue.use(VeeValidate, {
  i18n,
  i18nRootKey: 'validation',
  dictionary: {
    zh_CN
  }
});
//使用时间格式化
import dayjs from 'dayjs'
dayjs().format();
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs().from(dayjs('1990'))
// 时间过滤器
Vue.filter('formatTime', function(value) {
  return dayjs().from(dayjs(value))
})
// 时间过滤器
Vue.filter('formatTimes', function(value) {
  return dayjs(value).format("YYYY-MM-DD")
})

//使用自己封装的登录插件
import loginPlugs from "@/utils/loginPlugs";
Vue.use(loginPlugs);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
