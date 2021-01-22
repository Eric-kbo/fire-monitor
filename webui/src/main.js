import Vue from 'vue';
import App from './App';
import {router} from './router';
import {Tabbar, TabbarItem, NavBar} from 'vant';

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);


new Vue({
    router,
    el: '#app',
    render: h => h(App)
});
