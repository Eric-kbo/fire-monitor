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
    component: () => import('../views/home.vue')
  },
  {
    name: 'gmap',
    component: () => import('../views/gmap.vue')
  },
  {
    name: 'realtime',
    component: () => import('../views/realtime.vue')
  },
  {
    name: 'history',
    component: () => import('../views/history.vue')
  },
  {
    name: 'stat',
    component: () => import('../views/stat.vue')
  },
  {
    name: 'detail',
    component: () => import('../views/detail.vue')
  },
];

// 路由路径拼接
routes.forEach(route => {
  route.path = route.path || "/" + route.name || "";
});


// 路径自动获取函数
function getAbsolutePath() {
  let path = location.pathname;
  // 截取到路径的最后一个/
  return path.substring(0, path.lastIndexOf('/') + 1);
}
// 最后创建路由对象，设置切换方式，设置路由的base，导入路由表
const router = new VueRouter({
  // 使用什么方式切换路由
  mode: "history", //  history  hash
  // vue-router里提供了一个base的属性，代表应用的基目录
  base: getAbsolutePath(),
  routes
});

// 切换路由的时候滚动条复位
router.afterEach(() => {
  window.scrollTo(0, 0);
});

// 导出路由
export default router;