import * as VueRouter from "vue-router";

const routes = [
    {path: "/", component: () => import("../pages/Index.vue"), name: "首页"},
    {path: "/team", component: () => import("../pages/Team.vue"), name: "队伍"},
    {path: "/user", component: () => import("../pages/User.vue"), name: "用户"},
    {path: '/login', component: () => import('../pages/UserLogin.vue'), name: '登录'},
    {path: "/search", component: () => import("../pages/Search.vue"), name: "搜索"},
    {path: '/user/edit', component: () => import('../pages/EditUser.vue'), name: '修改信息'},
    {path: '/user/list', component: () => import('../pages/SearchResult.vue'), name: '用户列表'},
];

export default VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
});
