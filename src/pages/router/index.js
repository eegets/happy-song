import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";

import AdminLayout from "../admin/layout";
import FrontLayout from "../front/layout";
import page from "../router/page";

const router = createRouter({
    history: process.env.IS_ELECTRON ? createWebHashHistory(process.env.BASE_URL) : createWebHistory(process.env.BASE_URL),
    fallback: false,
    scrollBehavior(to, from, savedPosition) {
        // keep-alive 返回缓存页面后记录浏览位置
        if (savedPosition && to.meta.keepAlive) {
            return savedPosition
        }
        // 异步滚动操作
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ left: 0, top: 1 })
            }, 0)
        });
    },
    routes: [
        {
            path: '/',
            name: 'FrontHome',
            component: FrontLayout,
        },
        {
            path: '/admin',
            name: 'Admin',
            component: AdminLayout,
            meta: {title: "首页"},
            redirect: {
                name: "/admin"
            },
            children: [
                {
                    path: "/admin/songs",
                    component: () => import('../admin/pages/songs/Songs'),
                    meta: {title: "Songs"}
                },
                {
                    path: "/admin/stars",
                    component: () => import('../admin/pages/stars/Stars'),
                    meta: {title: "Stars"}
                },
                {
                    path: "/admin/subScreen",
                    component: () => import('../subScreen/SubScreen'),
                    meta: {title: "开启拓展屏"}
                }
            ]
        },

        ...page]
})

export default router
