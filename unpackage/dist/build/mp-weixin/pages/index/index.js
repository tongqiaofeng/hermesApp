(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{2733:function(e,t,i){"use strict";var n=i("2bba"),a=i.n(n);a.a},"2bba":function(e,t,i){},"2c45":function(e,t,i){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={data:function(){return{haveData:1,isShow:!1,imgUrl:this.$baseUrl,labelImgUrl:this.$baseJewelleryUrl,page:1,bagOrJewelleryList:[],modelList:[],tagList:[],haveMore:0,slogan:"",indexTitle:"",share:{title:"PAULIANA 宝莉安娜高级珠宝",path:"/pages/index/index",imageUrl:"",desc:"",content:""},isMobile:!1,isWechat:!1,isJump:0}},onShow:function(){if(window){console.log("平台"),this.isMobile=!0;var e=window.navigator.userAgent.toLowerCase();"micromessenger"==e.match(/MicroMessenger/i)||e.match(/_SQ_/i),this.isWechat=!0}else this.isMobile=!1},onLoad:function(){this.getList()},onPullDownRefresh:function(){this.page=1,this.bagOrJewelleryList=[],this.haveMore=0,this.getList(),e.stopPullDownRefresh()},onReachBottom:function(){0==this.haveMore&&(this.page++,this.getList())},onReady:function(){this.hidePageNavInWechatBrowser()},onShareAppMessage:function(t){return{title:this.share.title,path:this.share.path,imageUrl:this.share.imageUrl,desc:this.share.desc,content:this.share.content,success:function(t){e.showToast({title:"分享成功",icon:"none"})},fail:function(t){e.showToast({title:"分享失败",icon:"none"})}}},onShareTimeline:function(t){return{title:this.share.title,path:this.share.path,imageUrl:this.share.imageUrl,desc:this.share.desc,content:this.share.content,success:function(t){e.showToast({title:"分享成功",icon:"none"})},fail:function(t){e.showToast({title:"分享失败",icon:"none"})}}},methods:{downloadApk:function(){var e=window.navigator.userAgent.toLowerCase();"micromessenger"==e.match(/MicroMessenger/i)||"_sq_"==e.match(/_SQ_/i)?this.isJump=1:this.isJump=2},downloadClick:function(){var t=this;this.isJump=0,e.showLoading({title:"APP后台下载中..."}),setInterval((function(){e.hideLoading()}),1500);var i=e.getSystemInfoSync().platform,n={type:i};e.request({url:this.$baseUrl+"/versionGet",data:n,complete:function(e){console.log("下载"),console.log(e);var i=e.data.url.split("/"),n=i[i.length-1];if(console.log(n),t.browserIsIe()){var a=document.createElement("iframe");a.src=e.data.url,a.style.display="none",document.body.appendChild(a)}else{var o=document.createElement("a");o.setAttribute("href",e.data.url),o.setAttribute("download",n),o.click()}}})},browserIsIe:function(){return!(!window.ActiveXObject&&!("ActiveXObject"in window))},cancelJump:function(){this.isJump=0},modelCheck:function(t){console.log(t),e.navigateTo({url:"../../commonPackage/search/search?model="+encodeURIComponent(JSON.stringify(t))+"&type=0"})},labelCheck:function(t){console.log(t),e.navigateTo({url:"../../commonPackage/search/search?tag="+t+"&type=1"})},checkDetails:function(t){console.log(t),0==t.type?e.navigateTo({url:"../../minePackage/details?id="+t.id}):1==t.type&&e.navigateTo({url:"../../jewelryPackage/jewelryDetails?id="+t.id})},getList:function(){var t=this;e.showLoading({title:"加载中......"}),e.request({url:this.$baseUrl+"/indexMsgGet",header:{"content-type":"application/json"},data:{page:this.page,pageNum:10},complete:function(i){if(e.hideLoading(),console.log("首页数据"),console.log(i),t.modelList=i.data.modelList,t.tagList=i.data.tagList,t.slogan=i.data.slogan,t.indexTitle=i.data.title,0==i.data.bagOrJewelleryList.length)t.haveMore=1;else{var n=t.bagOrJewelleryList.concat(i.data.bagOrJewelleryList);t.bagOrJewelleryList=n}0==t.bagOrJewelleryList.length?(t.haveData=0,e.showToast({icon:"none",title:"暂无数据"})):t.haveData=1,t.isShow=!0}})}}};t.default=i}).call(this,i("543d")["default"])},"8c46":function(e,t,i){"use strict";i.r(t);var n=i("2c45"),a=i.n(n);for(var o in n)"default"!==o&&function(e){i.d(t,e,(function(){return n[e]}))}(o);t["default"]=a.a},bed6:function(e,t,i){"use strict";i.r(t);var n=i("c4dd"),a=i("8c46");for(var o in a)"default"!==o&&function(e){i.d(t,e,(function(){return a[e]}))}(o);i("2733");var s,r=i("f0c5"),l=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,"628169bc",null,!1,n["a"],s);t["default"]=l.exports},c4dd:function(e,t,i){"use strict";var n;i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return o})),i.d(t,"a",(function(){return n}));var a=function(){var e=this,t=e.$createElement,i=(e._self._c,e.isShow&&0!=e.haveData?e.__map(e.bagOrJewelleryList,(function(t,i){var n=e.__get_orig(t),a=0==t.type&&t.img?t.img.trim():null,o=1==t.type&&t.img?t.img.trim():null,s=0!=t.adviseSellPrice?e.formatNumberRgx(t.adviseSellPrice):null;return{$orig:n,g0:a,g1:o,m0:s}})):null);e.$mp.data=Object.assign({},{$root:{l0:i}})},o=[]},ff56:function(e,t,i){"use strict";(function(e){i("06ad");n(i("66fd"));var t=n(i("bed6"));function n(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=i,e(t.default)}).call(this,i("543d")["createPage"])}},[["ff56","common/runtime","common/vendor"]]]);