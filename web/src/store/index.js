// 状态管理(仓库)

// 引入
import Vue from "vue";
import Vuex from "vuex";
// 全局调用
Vue.use(Vuex);

import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
// 配置，导出store
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {}
});
