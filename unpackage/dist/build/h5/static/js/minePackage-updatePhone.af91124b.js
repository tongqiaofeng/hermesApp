(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["minePackage-updatePhone"],{1458:function(n,t,e){"use strict";e.r(t);var a=e("a299"),o=e("3f91");for(var i in o)"default"!==i&&function(n){e.d(t,n,(function(){return o[n]}))}(i);e("f7f8");var c,u=e("f0c5"),s=Object(u["a"])(o["default"],a["b"],a["c"],!1,null,"06f6bc00",null,!1,a["a"],c);t["default"]=s.exports},"22a4":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={data:function(){return{newPhone:"",newCode:"",time:"获取验证码",count:59,isGeting:!1,disable:!1,countDown:null}},onReady:function(){this.hidePageNavInWechatBrowser()},methods:{updatePhoneNumber:function(){""==this.newPhone?uni.showToast({title:"请输入新手机号",icon:"none"}):""==this.newCode?uni.showToast({title:"请输入验证码",icon:"none"}):(uni.setStorageSync("newPhone",this.newPhone),uni.navigateTo({url:"./updateMyMsg"}))},getCode:function(){var t=this;""==this.newPhone?uni.showToast({title:"请输入手机号/邮箱",icon:"none"}):(uni.showLoading({title:"验证码获取中..."}),uni.request({method:"GET",url:this.$baseUrl+"/smsCodeGet",header:{"content-type":"application/json"},data:{phoneNumber:this.newPhone},complete:function(e){uni.hideLoading(),200==e.statusCode&&(t.countDown=setInterval((function(){t.count<1?(t.isGeting=!1,t.disable=!1,t.time="获取验证码",t.count=59,n.log(t.time),clearInterval(t.countDown),t.countDown=null):(t.isGeting=!0,t.disable=!0,t.time=t.count--+"s后可重发")}),1e3)),0!=t.checkBack(e,!0)&&t.$isResolve()}}))}}};t.default=e}).call(this,e("5a52")["default"])},"23d3":function(n,t,e){var a=e("24fb");t=a(!1),t.push([n.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.update-phone-container[data-v-06f6bc00]{width:100%;height:100vh;background-color:#f9f9f9}.update-phone-container .update-phone[data-v-06f6bc00]{height:%?86?%;padding:0 %?40?%;margin-top:1px;display:flex;justify-content:space-between;align-items:center;background-color:#fff}.update-phone-container .update-phone .phone-left[data-v-06f6bc00]{display:flex;align-items:center;flex:1}.update-phone-container .update-phone .phone-left .update-font[data-v-06f6bc00]{font-size:%?28?%;color:#000;font-weight:700}.update-phone-container .update-phone .phone-left .update-input[data-v-06f6bc00]{flex:1;color:#c3c3c3;font-size:%?28?%}.update-phone-container .update-phone .phone-right[data-v-06f6bc00]{color:#000;font-size:%?28?%}.update-phone-container .update-phone .codeGeting[data-v-06f6bc00]{color:#c3c3c3}.update-phone-container .update-button[data-v-06f6bc00]{width:90%;height:%?125?%;margin:0 auto;margin-top:%?50?%}.update-phone-container .update-button uni-image[data-v-06f6bc00]{width:100%;height:%?125?%}',""]),n.exports=t},"3f91":function(n,t,e){"use strict";e.r(t);var a=e("22a4"),o=e.n(a);for(var i in a)"default"!==i&&function(n){e.d(t,n,(function(){return a[n]}))}(i);t["default"]=o.a},"544c":function(n,t,e){n.exports=e.p+"static/img/save.df96b46d.png"},a299:function(n,t,e){"use strict";var a;e.d(t,"b",(function(){return o})),e.d(t,"c",(function(){return i})),e.d(t,"a",(function(){return a}));var o=function(){var n=this,t=n.$createElement,a=n._self._c||t;return a("v-uni-view",{staticClass:"update-phone-container"},[a("v-uni-view",{staticClass:"update-phone"},[a("v-uni-view",{staticClass:"phone-left"},[a("v-uni-text",{staticClass:"update-font"},[n._v("手机号/邮箱：")]),a("v-uni-input",{staticClass:"update-input",attrs:{type:"text",placeholder:"请输入要绑定的新手机号/邮箱"},model:{value:n.newPhone,callback:function(t){n.newPhone=t},expression:"newPhone"}})],1)],1),a("v-uni-view",{staticClass:"update-phone"},[a("v-uni-view",{staticClass:"phone-left"},[a("v-uni-text",{staticClass:"update-font"},[n._v("验证码：")]),a("v-uni-input",{staticClass:"update-input",attrs:{type:"text",placeholder:"请输入验证码"},model:{value:n.newCode,callback:function(t){n.newCode=t},expression:"newCode"}})],1),a("v-uni-button",{staticClass:"phone-right",class:{codeGeting:n.isGeting},staticStyle:{border:"none"},attrs:{type:"text",plain:!0,size:"mini",disabled:n.disable},on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.getCode.apply(void 0,arguments)}}},[n._v(n._s(n.time))])],1),a("v-uni-view",{staticClass:"update-button"},[a("v-uni-image",{attrs:{src:e("544c"),mode:"aspectFill"},on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.updatePhoneNumber.apply(void 0,arguments)}}})],1)],1)},i=[]},ac84:function(n,t,e){var a=e("23d3");"string"===typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);var o=e("4f06").default;o("c14a2d5e",a,!0,{sourceMap:!1,shadowMode:!1})},f7f8:function(n,t,e){"use strict";var a=e("ac84"),o=e.n(a);o.a}}]);