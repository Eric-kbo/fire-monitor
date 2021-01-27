import Vue from 'vue';
import App from './App';
import {router} from './router';
import {Tabbar, TabbarItem, NavBar} from 'vant';
// 引入转换接口
import chntek from "./request/chntek";
import BaiduMap from 'vue-baidu-map';

Vue.use(BaiduMap, {
    ak: 'aczIoSxQtHDKl7gLRKWxySCwKOvzXq3u'
});
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);


Vue.prototype.$chntek = chntek;

new Vue({
    router,
    el: '#app',
    render: h => h(App)
});

router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('chntek-token')
    if (token) {
        if (to.path == '/login') {
            next({
                replace: true,
                name: 'home',
            })
        }
        next()
    } else {
        if (to.path == '/login') {
            next()
        } else {
            next({
                replace: true,
                name: 'login',
            })
        }
    }
})