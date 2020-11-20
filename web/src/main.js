import Vue from 'vue';
import App from './App.vue';
// 引入矢量字体图标和全局样式
import '@/assets/fonts/iconfont.css';
import "@/common/common.css";
// 引入UI库
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
Vue.use(VueMaterial);


// 引入echarts
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;

// 按需引入echarts中的图表(后期针对性优化再考虑)
// import echarts from "echarts/lib/echarts";
// import "echarts/lib/chart/bar";
// import "echarts/lib/component/tooltip";
// import "echarts/lib/component/title";

// 引入接口
import http from "./request/http";
Vue.prototype.$http = http;

// 引入路由
import router from './router';
// 引入全局状态管理(后期增加功能时考虑)
// import store from "./store";

Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
