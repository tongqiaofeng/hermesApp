(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["minePackage/integral"],{"2db4":function(e,t,a){},"432a":function(e,t,a){"use strict";var n;a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return i})),a.d(t,"a",(function(){return n}));var o=function(){var e=this,t=e.$createElement;e._self._c},i=[]},"8fa1":function(e,t,a){"use strict";a.r(t);var n=a("ab2b"),o=a.n(n);for(var i in n)"default"!==i&&function(e){a.d(t,e,(function(){return n[e]}))}(i);t["default"]=o.a},ab2b:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{haveMore:0,haveData:1,page:1,memberDetails:[],totalIntegral:null}},onShow:function(){this.getMemberDetails()},onReady:function(){this.hidePageNavInWechatBrowser()},onPullDownRefresh:function(){this.page=1,this.memberDetails=[],this.haveMore=0,this.getMemberDetails(),e.stopPullDownRefresh()},onReachBottom:function(){0==this.haveMore&&(this.page++,this.getMemberDetails())},methods:{getMemberDetails:function(){var t=this;e.showLoading({title:"加载中..."}),e.request({url:this.$baseJewelleryUrl+"/memberDetails?page="+this.page+"&pageNum=10&status=0",header:{"content-type":"application/json",token:e.getStorageSync("token")},complete:function(a){if(console.log("积分明细"),console.log(a),e.hideLoading(),t.totalIntegral=a.data.totalIntegral,0==a.data.length)t.haveMore=1;else{var n=t.memberDetails.concat(a.data.list);t.memberDetails=n}0==t.memberDetails.length?(t.haveData=0,e.showToast({icon:"none",title:"暂无数据"})):t.haveData=1}})}}};t.default=a}).call(this,a("543d")["default"])},b647:function(e,t,a){"use strict";(function(e){a("06ad");n(a("66fd"));var t=n(a("c63b"));function n(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=a,e(t.default)}).call(this,a("543d")["createPage"])},c63b:function(e,t,a){"use strict";a.r(t);var n=a("432a"),o=a("8fa1");for(var i in o)"default"!==i&&function(e){a.d(t,e,(function(){return o[e]}))}(i);a("d0da");var r,l=a("f0c5"),u=Object(l["a"])(o["default"],n["b"],n["c"],!1,null,"32fd8fc4",null,!1,n["a"],r);t["default"]=u.exports},d0da:function(e,t,a){"use strict";var n=a("2db4"),o=a.n(n);o.a}},[["b647","common/runtime","common/vendor"]]]);