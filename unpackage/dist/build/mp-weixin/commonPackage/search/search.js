require('../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["commonPackage/search/search"],{"186d":function(e,t,i){"use strict";var s=i("f11e"),o=i.n(s);o.a},"413b":function(e,t,i){"use strict";var s;i.d(t,"b",(function(){return o})),i.d(t,"c",(function(){return a})),i.d(t,"a",(function(){return s}));var o=function(){var e=this,t=e.$createElement,i=(e._self._c,0!=e.haveData&&"爱马仕"==e.type?e.__map(e.bagSearchList,(function(t,i){var s=e.__get_orig(t),o=e.formatNumberRgx(t.hkdPriceIndi);return{$orig:s,m0:o}})):null),s=0!=e.haveData&&"珠宝"==e.type?e.__map(e.bagSearchList,(function(t,i){var s=e.__get_orig(t),o=0!=t.adviseSellPrice?e.formatNumberRgx(t.adviseSellPrice):null;return{$orig:s,m1:o}})):null;e.$mp.data=Object.assign({},{$root:{l0:i,l1:s}})},a=[]},7757:function(e,t,i){"use strict";i.r(t);var s=i("413b"),o=i("7c7e");for(var a in o)"default"!==a&&function(e){i.d(t,e,(function(){return o[e]}))}(a);i("186d");var n,r=i("f0c5"),l=Object(r["a"])(o["default"],s["b"],s["c"],!1,null,"71985f4c",null,!1,s["a"],n);t["default"]=l.exports},"7c7e":function(e,t,i){"use strict";i.r(t);var s=i("a774"),o=i.n(s);for(var a in s)"default"!==a&&function(e){i.d(t,e,(function(){return s[e]}))}(a);t["default"]=o.a},a774:function(e,t,i){"use strict";(function(e){function s(e,t){var i;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(i=o(e))||t&&e&&"number"===typeof e.length){i&&(e=i);var s=0,a=function(){};return{s:a,n:function(){return s>=e.length?{done:!0}:{done:!1,value:e[s++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,r=!0,l=!1;return{s:function(){i=e[Symbol.iterator]()},n:function(){var e=i.next();return r=e.done,e},e:function(e){l=!0,n=e},f:function(){try{r||null==i.return||i.return()}finally{if(l)throw n}}}}function o(e,t){if(e){if("string"===typeof e)return a(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?a(e,t):void 0}}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,s=new Array(t);i<t;i++)s[i]=e[i];return s}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{imgUrl:this.$baseJewelleryUrl,haveData:1,height:null,topHeight:null,select:0,isUp:0,img1:i("d3b5"),img2:i("0778"),img3:i("2933"),imgFilter1:i("03ef"),imgFilter2:i("d38c"),bagSearchList:[],haveMore:0,page:1,keyword:"",model:"",size:"",sort:"",sizeList:[],jewelleryModelList:[],type:"爱马仕",selList:["爱马仕","珠宝"],tag:"",topConHeight:0}},mounted:function(){var t=this,i=e.createSelectorQuery().in(this);i.select("#search-top").boundingClientRect((function(e){console.log("顶部高度"),console.log(e),t.topConHeight=e.height})).exec()},onLoad:function(t){var i=this;e.getSystemInfo({success:function(e){i.height=e.statusBarHeight}}),console.log("详情"),console.log(t),t.type&&(this.type=0==t.type?"爱马仕":"珠宝",this.model=void 0===t.model?"":JSON.parse(decodeURIComponent(t.model)),this.size=void 0===t.size?"":JSON.parse(decodeURIComponent(t.size)),this.tag=t.tag),this.getBagList(),this.getModelSizeList(),this.getJewelryClassify()},onPullDownRefresh:function(){this.page=1,this.bagSearchList=[],this.haveMore=0,this.getBagList(),e.stopPullDownRefresh()},onReachBottom:function(){0==this.haveMore&&(this.page++,this.getBagList())},onReady:function(){this.hidePageNavInWechatBrowser()},methods:{selTypeChange:function(e){this.type=this.selList[Number(e.detail.value)],this.page=1,this.size="",this.keyword="",this.sort="",this.bagSearchList=[],this.haveMore=0,this.getBagList()},getBagList:function(){var t=this;console.log("要传参啦"),console.log(this.model),e.showLoading({title:"加载中......"}),"爱马仕"==this.type?e.request({method:"POST",url:this.$baseUrl+"/modelSearch",data:{keyword:this.keyword,model:this.model,size:this.size,page:this.page,pageNum:10,sort:this.sort},header:{"content-type":"application/json"},complete:function(i){if(e.hideLoading(),console.log("搜索爱马仕列表"),console.log(i),0==i.data.length)t.haveMore=1;else{var s=t.bagSearchList.concat(i.data);t.bagSearchList=s}0==t.bagSearchList.length?(t.haveData=0,e.showToast({icon:"none",title:"暂无数据"})):t.haveData=1}}):"珠宝"==this.type&&e.request({method:"POST",url:this.$baseJewelleryUrl+"/jewellerySearch?page="+this.page+"&pageNum=10",data:{keyword:this.keyword,tag:this.tag,sort:this.sort},header:{"content-type":"application/json"},complete:function(i){if(e.hideLoading(),console.log("搜索珠宝列表"),console.log(i),0==i.data.length)t.haveMore=1;else{var s=t.bagSearchList.concat(i.data.list);t.bagSearchList=s}0==t.bagSearchList.length?(t.haveData=0,e.showToast({icon:"none",title:"暂无数据"})):t.haveData=1}})},searchInput:function(){if(this.page=1,this.bagSearchList=[],this.select=0,this.isUp=0,this.haveMore=0,this.model="",this.size="",this.tag="",this.sort="",this.getBagList(),"爱马仕"==this.type){var e,t=s(this.modelSizeList);try{for(t.s();!(e=t.n()).done;){var i=e.value;console.log(i.name);var o,a=s(i.list);try{for(a.s();!(o=a.n()).done;){var n=o.value;if(console.log(n.model.indexOf(this.keyword)),-1!==n.model.indexOf(this.keyword))return this.model=n.model,void(this.sizeList=n.sizeList)}}catch(r){a.e(r)}finally{a.f()}}}catch(r){t.e(r)}finally{t.f()}}},filterSel01:function(){this.page=1,this.bagSearchList=[],this.select=0,this.isUp=0,this.haveMore=0,this.sort="",this.getBagList()},filterSel02:function(){this.page=1,this.bagSearchList=[],this.select=1,1==this.isUp?(this.isUp=2,this.sort=-2):(this.isUp,this.isUp=1,this.sort=2),this.haveMore=0,this.getBagList()},filterSel03:function(){var t=this;console.log(this.sizeList.length),"爱马仕"==this.type&&0==this.sizeList.length?this.goToClassify():2==this.select?this.select=3:(this.select=2,this.$nextTick((function(){console.log("顶部高度");var i=e.createSelectorQuery().select(".upAndDown");i.boundingClientRect((function(e){console.log(e),t.topHeight=e.height})).exec()})))},sizeSelect:function(e){this.select=3,this.page=1,this.bagSearchList=[],this.isUp=0,this.sort="",this.haveMore=0,this.size=e,this.getBagList()},tagSelect:function(e){this.select=3,this.page=1,this.bagSearchList=[],this.isUp=0,this.sort="",this.haveMore=0,this.tag=e,this.getBagList()},checkDetails:function(t){console.log(t),"爱马仕"==this.type?e.navigateTo({url:"../../minePackage/details?id="+t.id}):"珠宝"==this.type&&e.navigateTo({url:"../../jewelryPackage/jewelryDetails?id="+t.id})},getModelSizeList:function(){var t=this;e.request({url:this.$baseUrl+"/modelSort",header:{"content-type":"application/json"},complete:function(e){console.log("尺寸列表"),console.log(e),t.modelSizeList=e.data,t.getSizeList()}})},getSizeList:function(){var e,t=s(this.modelSizeList);try{for(t.s();!(e=t.n()).done;){var i,o=e.value,a=s(o.list);try{for(a.s();!(i=a.n()).done;){var n=i.value;n.model==this.model&&(this.sizeList=n.sizeList)}}catch(r){a.e(r)}finally{a.f()}}}catch(r){t.e(r)}finally{t.f()}},getJewelryClassify:function(){var t=this;e.request({url:this.$baseJewelleryUrl+"/jewelleryModelSort",header:{"content-type":"application/json",token:e.getStorageSync("token")},complete:function(e){console.log("珠宝分类"),console.log(e),t.jewelleryModelList=e.data}})},goBack:function(){e.navigateBack({delta:1})},goToClassify:function(){"爱马仕"==this.type?e.switchTab({url:"../../pages/classify/classify"}):"珠宝"==this.type&&e.switchTab({url:"../../pages/classify/classifyJewelry"})}}};t.default=n}).call(this,i("543d")["default"])},c8b8:function(e,t,i){"use strict";(function(e){i("06ad");s(i("66fd"));var t=s(i("7757"));function s(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=i,e(t.default)}).call(this,i("543d")["createPage"])},f11e:function(e,t,i){}},[["c8b8","common/runtime","common/vendor","commonPackage/common/vendor"]]]);