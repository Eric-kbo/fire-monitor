import Vue from "vue";
import VueRouter from "vue-router";

// 注册路由插件 VueRouter 使其全局可用
Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: { name: 'home' }
  },
  {
    name: 'home',
    path: "/home",
    component: () => import('../views/home.vue')
  },
  {
    name: 'gmap',
    path: "/gmap",
    component: () => import('../views/gmap.vue')
  },
  {
    name: 'plot',
    path: "/plot",
    component: () => import('../views/plot.vue')
  },
  {
    name: 'log',
    path: "/log",
    component: () => import('../views/log.vue')
  },
  {
    name: 'detail',
    path: "/detail",
    component: () => import('../components/detail.vue')
  },
];

// 路由路径拼接
routes.forEach(route => {
  route.path = route.path || "/" + route.name || "";
});

// 路径自动获取函数
function getAbsolutePath() {
  let path = location.pathname;
  return path.substring(0, path.lastIndexOf('/') + 1);
}
// 最后创建路由对象，设置切换方式，设置路由得base，导入路由表
const router = new VueRouter({
  // 使用什么方式切换路由
  mode: "history", //  history  hash
  // vue-router里提供了一个base的属性，代表应用的基目录
  base: getAbsolutePath(),
  routes
});

// 导出路由
export default router;