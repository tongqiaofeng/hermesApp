(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/login"],{"083c":function(e,n,o){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={data:function(){return{selectLogin:0,userData:{phoneNumber:"",code:"",psw:""},loginPhoneRules:{phoneNumber:{rules:[{required:!0,errorMessage:"请输入手机号",trigger:"blur"}]},code:{rules:[{required:!0,errorMessage:"请输入验证码",trigger:"blur"}]}},loginPswRules:{phoneNumber:{rules:[{required:!0,errorMessage:"请输入账号",trigger:"blur"}]},psw:{rules:[{required:!0,errorMessage:"请输入密码"}]}},time:"获取验证码",count:59,isGeting:!1,disable:!1,countDown:null}},methods:{getCode:function(){var n=this;""==this.userData.phoneNumber?e.showToast({title:"请输入手机号/邮箱",icon:"none"}):(e.showLoading({title:"验证码获取中..."}),e.request({method:"GET",url:this.$baseUrl+"/smsCodeGet",header:{"content-type":"application/json"},data:{phoneNumber:this.userData.phoneNumber},complete:function(o){e.hideLoading(),200==o.statusCode&&(n.countDown=setInterval((function(){n.count<1?(n.isGeting=!1,n.disable=!1,n.time="获取验证码",n.count=59,console.log(n.time),clearInterval(n.countDown),n.countDown=null):(n.isGeting=!0,n.disable=!0,n.time=n.count--+"s后可重发")}),1e3)),0!=n.checkBack(o,!0)&&n.$isResolve()}}))},userLoginPhone:function(){var n=this;this.$refs.loginFormPhone.validate().then((function(o){console.log("表单数据",o),e.showLoading({title:"登录中......"}),e.request({method:"POST",url:n.$baseUrl+"/wechatLogin",header:{"content-type":"application/json"},data:{username:n.userData.phoneNumber,code:n.userData.code},complete:function(o){console.log("登录啦"),console.log(o),e.hideLoading(),0!=n.checkBack(o,!0)&&(e.setStorageSync("userAddress",JSON.stringify(o.data.address)),n.setUserInfo(o),n.$isResolve(),e.switchTab({url:"./mine"}))}})})).catch((function(e){console.log("表单错误",e)}))},userLoginPsw:function(){var n=this;this.$refs.loginFormPsw.validate().then((function(o){console.log("表单数据",o),e.showLoading({title:"登录中......"}),e.request({method:"POST",url:n.$baseUrl+"/wechatLogin",header:{"content-type":"application/json"},data:{username:n.userData.phoneNumber,psw:n.userData.psw},complete:function(o){console.log("登录啦"),console.log(o),e.hideLoading(),0!=n.checkBack(o,!0)&&(e.setStorageSync("userAddress",JSON.stringify(o.data.address)),n.setUserInfo(o),n.$isResolve(),e.switchTab({url:"./mine"}))}})})).catch((function(e){console.log("表单错误",e)}))},selectLoginPhone:function(e){console.log(e),this.selectLogin=0},selectLoginPsw:function(){this.selectLogin=1}}};n.default=o}).call(this,o("543d")["default"])},"1a38":function(e,n,o){"use strict";o.d(n,"b",(function(){return s})),o.d(n,"c",(function(){return r})),o.d(n,"a",(function(){return t}));var t={uniForms:function(){return Promise.all([o.e("common/vendor"),o.e("uni_modules/uni-forms/components/uni-forms/uni-forms")]).then(o.bind(null,"f425"))},uniFormsItem:function(){return Promise.all([o.e("common/vendor"),o.e("uni_modules/uni-forms/components/uni-forms-item/uni-forms-item")]).then(o.bind(null,"042a"))}},s=function(){var e=this,n=e.$createElement;e._self._c},r=[]},"484f":function(e,n,o){},"551c":function(e,n,o){"use strict";(function(e){o("06ad");t(o("66fd"));var n=t(o("803c"));function t(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=o,e(n.default)}).call(this,o("543d")["createPage"])},"5e98":function(e,n,o){"use strict";o.r(n);var t=o("083c"),s=o.n(t);for(var r in t)"default"!==r&&function(e){o.d(n,e,(function(){return t[e]}))}(r);n["default"]=s.a},"6add":function(e,n,o){"use strict";var t=o("484f"),s=o.n(t);s.a},"803c":function(e,n,o){"use strict";o.r(n);var t=o("1a38"),s=o("5e98");for(var r in s)"default"!==r&&function(e){o.d(n,e,(function(){return s[e]}))}(r);o("6add");var i,u=o("f0c5"),a=Object(u["a"])(s["default"],t["b"],t["c"],!1,null,"aa89c856",null,!1,t["a"],i);n["default"]=a.exports}},[["551c","common/runtime","common/vendor"]]]);