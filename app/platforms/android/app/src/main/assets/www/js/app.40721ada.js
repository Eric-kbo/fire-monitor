(function(e){function t(t){for(var r,a,o=t[0],i=t[1],s=t[2],l=0,f=[];l<o.length;l++)a=o[l],Object.prototype.hasOwnProperty.call(c,a)&&c[a]&&f.push(c[a][0]),c[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);d&&d(t);while(f.length)f.shift()();return u.push.apply(u,s||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,a=1;a<n.length;a++){var o=n[a];0!==c[o]&&(r=!1)}r&&(u.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={app:0},c={app:0},u=[];function o(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-45e4fa55":"6418cdf2","chunk-583f1abc":"8ffc5dcf","chunk-623fe82d":"eadf4c9b","chunk-7343846c":"bbf825e4","chunk-6a2bbe8e":"53f8d50c","chunk-4ed7e77c":"e6e952a0","chunk-5502cf76":"91a93413","chunk-dff625e0":"4c20b37f","chunk-fd189310":"f15f7924"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-45e4fa55":1,"chunk-583f1abc":1,"chunk-623fe82d":1,"chunk-7343846c":1,"chunk-5502cf76":1,"chunk-dff625e0":1,"chunk-fd189310":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-45e4fa55":"b14bfcf7","chunk-583f1abc":"1236a78e","chunk-623fe82d":"8ea42e9b","chunk-7343846c":"2c9d5c34","chunk-6a2bbe8e":"31d6cfe0","chunk-4ed7e77c":"31d6cfe0","chunk-5502cf76":"01884581","chunk-dff625e0":"924c4778","chunk-fd189310":"4d986ec1"}[e]+".css",c=i.p+r,u=document.getElementsByTagName("link"),o=0;o<u.length;o++){var s=u[o],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===c))return t()}var f=document.getElementsByTagName("style");for(o=0;o<f.length;o++){s=f[o],l=s.getAttribute("data-href");if(l===r||l===c)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||c,u=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=r,delete a[e],d.parentNode.removeChild(d),n(u)},d.href=c;var h=document.getElementsByTagName("head")[0];h.appendChild(d)})).then((function(){a[e]=0})));var r=c[e];if(0!==r)if(r)t.push(r[2]);else{var u=new Promise((function(t,n){r=c[e]=[t,n]}));t.push(r[2]=u);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=o(e);var f=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=c[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",f.name="ChunkLoadError",f.type=r,f.request=a,n[1](f)}c[e]=void 0}};var d=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var f=0;f<s.length;f++)t(s[f]);var d=l;u.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"56d7":function(e,t,n){"use strict";n.r(t);n("4d48");var r=n("d1e1"),a=(n("81e6"),n("9ffb")),c=(n("d82d"),n("7278")),u=(n("c3a6"),n("ad06")),o=(n("5246"),n("6b41")),i=(n("a52c"),n("2ed4")),s=(n("537a"),n("ac28")),l=(n("e17f"),n("2241")),f=(n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("2b0e")),d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},h=[],p=(n("034f"),n("2877")),m={},v=Object(p["a"])(m,d,h,!1,null,null,null),b=v.exports,g=(n("4160"),n("d3b7"),n("159b"),n("8c4f"));f["a"].use(g["a"]);var k=[{path:"*",redirect:"/home"},{name:"login",path:"/login",component:function(){return n.e("chunk-5502cf76").then(n.bind(null,"4009"))},meta:{title:"登陆"}},{name:"home",redirect:"/home",component:function(){return n.e("chunk-4ed7e77c").then(n.bind(null,"004a"))},children:[{name:"home",path:"/home",redirect:"/gmap",component:function(){return Promise.all([n.e("chunk-45e4fa55"),n.e("chunk-6a2bbe8e")]).then(n.bind(null,"4570"))},meta:{title:"综合显示"}},{name:"history",path:"/history",component:function(){return Promise.all([n.e("chunk-45e4fa55"),n.e("chunk-583f1abc"),n.e("chunk-7343846c")]).then(n.bind(null,"d2bd"))},meta:{title:"数据中心"}},{name:"gmap",path:"/gmap",component:function(){return n.e("chunk-fd189310").then(n.bind(null,"2ac5"))},meta:{title:"gis模块"}},{name:"tagDetail",path:"/tagDetail",component:function(){return n.e("chunk-dff625e0").then(n.bind(null,"703c"))},meta:{title:"gis模块"}},{name:"warnings",path:"/warnings",component:function(){return Promise.all([n.e("chunk-45e4fa55"),n.e("chunk-583f1abc"),n.e("chunk-623fe82d")]).then(n.bind(null,"21c8"))},meta:{title:"实时告警"}}]}];k.forEach((function(e){e.path=e.path||"/"+(e.name||"")}));var w=new g["a"]({routes:k});w.beforeEach((function(e,t,n){var r=e.meta&&e.meta.title;r&&(document.title=r),n()}));n("c975");var y=n("b85c"),x=(n("96cf"),n("1da1")),O=n("bc3a"),j="http://iot.chntek.com:3410",R="http://iot.chntek.com:3411";function I(){var e=this;this.timer=null,this.account="",this.token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidGVzdCIsImV4cCI6MTYxMTUwMDM3NCwiaXNzIjoiSnd0S2V5TmFtZSIsImF1ZCI6Ikp3dEtleU5hbWUifQ.8nnKmig8Ar5uAC5WDZLxJZEl9mEpPsqbN4YrBt-H_UQ",this.warningsLength=0,this.devices={},this.ids=0,this.regions=function(){var t=Object(x["a"])(regeneratorRuntime.mark((function t(n){var r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,O.get("".concat(R,"/devices/regions"),{params:{account:n},headers:{Authorization:e.token}});case 2:if(r=t.sent,a=r.data,!a.val){t.next=6;break}return t.abrupt("return",a.val);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),this.statusRecent=function(){var t=Object(x["a"])(regeneratorRuntime.mark((function t(n){var r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,O.get("".concat(R,"/devices/status-recent"),{params:{id:n},headers:{Authorization:e.token}});case 2:if(r=t.sent,a=r.data,!a.val){t.next=6;break}return t.abrupt("return",a.val);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),this.statusHistory=function(){var t=Object(x["a"])(regeneratorRuntime.mark((function t(n,r,a,c){var u,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,O.get("".concat(R,"/devices/status-history"),{params:{id:n,date_begin:r,date_end:a,size:c},headers:{Authorization:e.token}});case 2:if(u=t.sent,o=u.data,!o.val){t.next=6;break}return t.abrupt("return",o.val);case 6:case"end":return t.stop()}}),t)})));return function(e,n,r,a){return t.apply(this,arguments)}}(),this.statusPrimary=function(){var t=Object(x["a"])(regeneratorRuntime.mark((function t(n){var r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,O.get("".concat(R,"/devices/primary"),{params:{ids:n},headers:{Authorization:e.token}});case 2:if(r=t.sent,a=r.data,!a.val){t.next=6;break}return t.abrupt("return",a.val);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),this.login=function(){var e=Object(x["a"])(regeneratorRuntime.mark((function e(t,n){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,O.get("".concat(j,"/api/user/login"),{params:{account:t,password:n}});case 2:if(r=e.sent,!r.data.err){e.next=5;break}throw r.data.err;case 5:localStorage.setItem("chntek-account",t),localStorage.setItem("chntek-token",r.data.val.token);case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),this.warrigs=function(){var t=Object(x["a"])(regeneratorRuntime.mark((function t(n,r,a){var c,u;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,O.get("".concat(R,"/devices/warnings"),{params:{id:n,date:r,size:a},headers:{Authorization:e.token}});case 2:if(c=t.sent,u=c.data,!u.val){t.next=6;break}return t.abrupt("return",u.val);case 6:case"end":return t.stop()}}),t)})));return function(e,n,r){return t.apply(this,arguments)}}(),this.transUnitList=Object(x["a"])(regeneratorRuntime.mark((function t(){var n,r,a,c,u,o,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=[],r=Object(y["a"])(e.ids),t.prev=2,r.s();case 4:if((a=r.n()).done){t.next=16;break}if(c=a.value,void 0!=e.devices[c]&&null!=e.devices[c].latitude&&null!=e.devices[c].longitude){t.next=8;break}return t.abrupt("continue",14);case 8:return t.next=10,O.get("".concat(R,"/devices/status-recent"),{params:{id:c}});case 10:for(i in u=t.sent,o=u.data,o.val[0])e.devices[c][i]=o.val[0][i];n.push(e.devices[c]);case 14:t.next=4;break;case 16:t.next=21;break;case 18:t.prev=18,t.t0=t["catch"](2),r.e(t.t0);case 21:return t.prev=21,r.f(),t.finish(21);case 24:return t.abrupt("return",n);case 25:case"end":return t.stop()}}),t,null,[[2,18,21,24]])}))),this.update=Object(x["a"])(regeneratorRuntime.mark((function e(){var t,n,r,a,c,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=window.cordova.plugins.version.getAppVersion(),e.next=3,O.get("".concat(R,"/app/latest"));case 3:if(n=e.sent,r=n.data,!r.err){e.next=8;break}return alert("无法获取最新版本"),e.abrupt("return");case 8:if(-1==r.val.indexOf(t+".apk")){e.next=11;break}return alert("已是最新版本！"),e.abrupt("return");case 11:a=encodeURI(r.val),c="cdvfile://localhost/temporary/tuner.apk",u=new window.FileTransfer,u.download(a,c,(function(e){alert("确认并安装新版本更新！"),window.cordova.plugins.fileOpener2.open("cdvfile://localhost/temporary/tuner.apk","application/vnd.android.package-archive")}),(function(e){console.error("download error: "+e.source+e.target+e.code)}));case 15:case"end":return e.stop()}}),e)})))}document.addEventListener("deviceready",Object(x["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)}))));var E=new I,S=E,A=n("bd0c"),C=n.n(A);f["a"].use(C.a,{ak:"aczIoSxQtHDKl7gLRKWxySCwKOvzXq3u"}),f["a"].use(l["a"]),f["a"].use(s["a"]),f["a"].use(i["a"]),f["a"].use(o["a"]),f["a"].use(u["a"]),f["a"].use(c["a"]),f["a"].use(a["a"]),f["a"].use(r["a"]),f["a"].prototype.$chntek=S,new f["a"]({router:w,el:"#app",render:function(e){return e(b)}}),w.beforeEach((function(e,t,n){var r=localStorage.getItem("chntek-token");r?("/login"==e.path&&n({replace:!0,name:"home"}),n()):"/login"==e.path?n():n({replace:!0,name:"login"})}))},"85ec":function(e,t,n){}});
//# sourceMappingURL=app.40721ada.js.map