(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2dd8b974"],{1e3:function(t,e,o){"use strict";o.r(e);var s={name:"detail",data:()=>({model:{}}),methods:{goto(t){this.$route.name!=t&&this.$router.replace({name:t})}},beforeRouteEnter(t,e,o){o(e=>{console.log(t),e.model=t.params})}},a=(o("8519"),o("2877")),i=Object(a.a)(s,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"detail"},[o("md-button",{on:{click:function(e){return t.goto("warn")}}},[t._v("返回")]),o("div",{staticClass:"display-flex alert-message"},[t._m(0),o("div",{staticClass:"flex_1"},[o("p",[t._v("设备: "+t._s(t.model.id))]),o("p",[t._v("地点: "+t._s(0==t.model.location?"未获取到地点":t.model.location))]),o("p",[t._v("类型: "+t._s(t.model.warning_type))]),o("p",{staticClass:"text-right time"},[t._v(t._s(t.model.date_time))])])])],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"icon-box"},[e("i",{staticClass:"iconfont iconjinggao alert-logo"})])}],!1,null,"149a4e54",null);e.default=i.exports},8519:function(t,e,o){"use strict";o("edf6")},edf6:function(t,e,o){}}]);