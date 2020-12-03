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

// 引入接口
import chntek from "./request/chntek";
Vue.prototype.$chntek = chntek;

// 引入路由
import router from './router';
// 引入全局状态管理(后期增加功能时考虑)
// import store from "./store";
import BaiduMap from 'vue-baidu-map';
Vue.use(BaiduMap, {
  ak: 'K18lYgrmUNVR5tfqNyYuGNr0bEgidM02'
});

Vue.config.productionTip = false;



new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
