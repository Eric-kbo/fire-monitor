//解决es6兼容
import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';

// 引入矢量字体图标和全局样式
import '@/assets/fonts/iconfont.css';
import "@/common/common.scss";
// 引入UI库
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
Vue.use(VueMaterial);

// 引入echarts
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;

// 引入转换接口
import chntek from "./request/chntek";
Vue.prototype.$chntek = chntek;

// 引入模拟接口(读取本地模拟数据)
import http from "./request/http";
Vue.prototype.$http = http;

// 引入路由
import router from './router';

// 引入全局状态管理(后期增加功能时考虑)
import store from "./store";

import BaiduMap from 'vue-baidu-map';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false;
Vue.use(Antd);

Vue.use(BaiduMap, {
  ak: 'aczIoSxQtHDKl7gLRKWxySCwKOvzXq3u'
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
