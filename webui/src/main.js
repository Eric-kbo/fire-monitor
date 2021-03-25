import Vue from 'vue';
import App from './App';
import {router} from './router';
import {Tabbar, TabbarItem, NavBar, Icon, Popover, Col, Row, Dialog} from 'vant';
// 引入转换接口
import chntek from "./utils/chntek";
import BaiduMap from 'vue-baidu-map';

Vue.use(BaiduMap, {
    ak: 'aczIoSxQtHDKl7gLRKWxySCwKOvzXq3u'
});
// 全局注册
Vue.use(Dialog);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Icon);
Vue.use(Popover);
Vue.use(Col);
Vue.use(Row);


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