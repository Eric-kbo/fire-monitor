import Vue from 'vue';
import App from './App';
import {router} from './router';
import {Tabbar, TabbarItem, NavBar} from 'vant';
// 引入转换接口
import chntek from "./request/chntek";

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);


Vue.prototype.$chntek = chntek;

new Vue({
    router,
    el: '#app',
    render: h => h(App)
});
