import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
let routes = [
    {
        path: "/login",
        component: () => import("@/views/login.vue")
    },
    {
        path: "/",
        redirect: "/home"
    },
    {
        path: "/",
        component: () => import("@/components/tabBarLayout.vue"),
        children: [{
            path: "/home",
            component: () => import("@/views/home.vue")
        }, ]
    },
    {
        path:"/search",
        component:()=>import("@/views/search.vue")
    },
    {
        path:"/list/:key",
        component:() =>import("@/views/list.vue")
    },
    {
        path:"/articleDetail/:id",
        component:() =>import("@/views/articleDetail.vue")
    }
]
const router = new VueRouter({
    routes
})
export default router