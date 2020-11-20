import Vue from 'vue';
import App from './App.vue';
import '@/assets/fonts/iconfont.css';
import "@/common/common.css";
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);


import http from "./request/http";
Vue.prototype.$http = http;

import router from './router';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
