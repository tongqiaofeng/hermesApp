(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-cart-shoppingCart"],{"20f9":function(t,e,i){"use strict";(function(t){var n=i("4ea4");i("caad"),i("c975"),i("d81d"),i("2532"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n(i("b85c")),c={data:function(){return{haveData:1,goodsnum:0,page:1,favoriteslist:[],isSelect:0,allFlag:{value:"cb",checked:!0},selList:[],checkedList:[],delList:[]}},onShow:function(){0==uni.getStorageSync("token").length?uni.showToast({title:"请登录",icon:"none",success:function(){uni.switchTab({url:"../mine/mine"})}}):this.favorites()},filters:{picsfilter:function(t){return-1!==t.indexOf("|")?t.substring(0,t.indexOf("|")):t}},onPullDownRefresh:function(){this.favoriteslist=[],this.favorites(),uni.stopPullDownRefresh()},methods:{closeAccount:function(){t.log(this.selList),uni.navigateTo({url:"../../package/confirmAnOrder?productList="+JSON.stringify(this.selList)})},checkChange:function(e){t.log("是否选中"),t.log(e);var i=e.detail.value;this.delList=i,this.selList=[];for(var n=0;n<this.favoriteslist.length;++n){var o=this.favoriteslist[n],c={id:o.stockId,imgSrc:o.pic,name:encodeURIComponent(o.productName),price:o.productPrice,num:1,currency:"HKD"};i.includes(o.id)?(this.selList.push(c),this.$set(o,"checked",!0)):this.$set(o,"checked",!1)}var a=i.length==this.favoriteslist.length;a?this.$set(this.allFlag,"checked",!0):this.$set(this.allFlag,"checked",!1)},changeBook:function(e){var i=this;t.log("全选否"),t.log(e),this.selList=[],this.delList=[],0==e.detail.value.length?(this.favoriteslist.map((function(t){return i.$set(t,"checked",!1)})),this.$set(this.allFlag,"checked",!1)):(this.favoriteslist.map((function(t){i.$set(t,"checked",!0),i.delList.push(t.id),i.selList.push({id:t.stockId,imgSrc:t.pic,name:encodeURIComponent(t.productName),price:t.productPrice,num:1,currency:"HKD"})})),this.$set(this.allFlag,"checked",!0)),t.log(this.selList)},isCheckBox:function(){0==this.isSelect?this.isSelect=1:1==this.isSelect&&(this.isSelect=0)},clickclose:function(){var e=this;uni.request({url:this.$baseUrl+"/shoppingCartDelete",method:"POST",data:{idList:this.delList},header:{"content-type":"application/json",token:uni.getStorageSync("token")},success:function(i){t.log(i.data),uni.showToast({title:"删除成功",icon:"none"}),e.favorites()},fail:function(t){uni.showToast({title:t.data.message,icon:"none"})}})},navto:function(t){0==this.isSelect&&uni.navigateTo({url:"../index/details?id="+t})},favorites:function(){var e=this;this.favoriteslist=[],this.selList=[],this.delList=[],uni.showLoading({title:"加载中..."}),uni.request({url:this.$baseUrl+"/shoppingCartList",header:{"content-type":"application/json",token:uni.getStorageSync("token")},complete:function(i){uni.hideLoading(),t.log("购物车列表"),t.log(i),e.favoriteslist=i.data,e.goodsnum=e.favoriteslist.length;var n,c=(0,o.default)(e.favoriteslist);try{for(c.s();!(n=c.n()).done;){var a=n.value;a.checked=!0,e.selList.push({id:a.stockId,imgSrc:a.pic,name:encodeURIComponent(a.productName),price:a.productPrice,num:1,currency:"HKD"}),e.delList.push(a.id)}}catch(s){c.e(s)}finally{c.f()}e.allFlag.checked=!0,0==e.favoriteslist.length?e.haveData=0:e.haveData=1}})}}};e.default=c}).call(this,i("5a52")["default"])},"460a":function(t,e,i){"use strict";i.r(e);var n=i("988d"),o=i("7191");for(var c in o)"default"!==c&&function(t){i.d(e,t,(function(){return o[t]}))}(c);i("6775");var a,s=i("f0c5"),r=Object(s["a"])(o["default"],n["b"],n["c"],!1,null,"134c817e",null,!1,n["a"],a);e["default"]=r.exports},"614c":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.commodity[data-v-134c817e]{height:100vh;background-color:#f6f6f6}.commodity .title[data-v-134c817e]{height:%?100?%;padding:0 %?40?%;position:fixed;left:0;right:0;display:flex;justify-content:space-between;align-items:center;font-size:%?22?%;z-index:999;background-color:#f6f6f6}.commodity .commoditybox[data-v-134c817e]{margin-bottom:%?20?%;display:flex;align-items:center;position:relative;background-color:#fff}.commodity .commoditybox .box-check[data-v-134c817e]{margin-left:%?10?%}.commodity .commoditybox .box-left[data-v-134c817e]{padding:%?20?% 0 %?20?% %?20?%;display:flex;justify-content:center;align-items:center}.commodity .commoditybox .box-left uni-image[data-v-134c817e]{width:%?180?%;height:%?174?%;border-radius:%?30?%}.commodity .commoditybox .box-right[data-v-134c817e]{padding:%?25?% %?20?% %?30?% %?20?%;display:flex;flex-direction:column;justify-content:space-between}.commodity .commoditybox .box-right .name[data-v-134c817e]{margin-bottom:%?20?%;font-size:%?24?%}.commodity .commoditybox .box-right .price[data-v-134c817e]{font-size:%?26?%;color:#ff8b62}.commodity .bottom[data-v-134c817e]{padding-bottom:%?140?%;font-size:%?24?%;color:#e3e3e3;text-align:center;font-size:%?30?%}.commodity .allCheck[data-v-134c817e]{height:%?100?%;padding:0 %?40?%;position:fixed;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:space-between;background-color:#f9f9f9;font-size:%?28?%}.commodity .allCheck .cart-button-pay[data-v-134c817e],\r\n.commodity .allCheck .cart-button-del[data-v-134c817e]{padding:%?10?% %?50?%;border-radius:%?60?%;color:#fff}.commodity .allCheck .cart-button-pay[data-v-134c817e]{background-color:#85dbd0}.commodity .allCheck .cart-button-del[data-v-134c817e]{background-color:red}',""]),t.exports=e},6775:function(t,e,i){"use strict";var n=i("841d"),o=i.n(n);o.a},7191:function(t,e,i){"use strict";i.r(e);var n=i("20f9"),o=i.n(n);for(var c in n)"default"!==c&&function(t){i.d(e,t,(function(){return n[t]}))}(c);e["default"]=o.a},"841d":function(t,e,i){var n=i("614c");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=i("4f06").default;o("f0593bcc",n,!0,{sourceMap:!1,shadowMode:!1})},"988d":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return c})),i.d(e,"a",(function(){return n}));var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"commodity"},[0==t.haveData?n("v-uni-view",{staticClass:"no-data"},[n("v-uni-image",{attrs:{src:i("bb08"),mode:"aspectFill"}}),n("v-uni-text",{staticStyle:{"font-size":"30rpx"}},[t._v("购物车空空如也，快去逛逛吧~")])],1):n("v-uni-view",[n("v-uni-view",{staticClass:"title"},[n("v-uni-text",[t._v(t._s("共"+t.goodsnum+"件商品"))]),n("v-uni-text",{staticStyle:{"font-size":"26rpx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.isCheckBox.apply(void 0,arguments)}}},[t._v("编辑")])],1),n("v-uni-checkbox-group",{staticStyle:{"padding-top":"100rpx"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.checkChange.apply(void 0,arguments)}}},t._l(t.favoriteslist,(function(e,i){return n("v-uni-view",{key:i,staticClass:"commoditybox"},[n("v-uni-label",{staticClass:"box-check"},[n("v-uni-checkbox",{staticStyle:{transform:"scale(0.7)"},attrs:{value:e.id,checked:e.checked,color:"#85dbd0"}})],1),n("v-uni-view",{staticClass:"box-left",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.navto(e.stockId)}}},[e.pic?n("v-uni-image",{attrs:{src:e.pic,mode:"aspectFill"}}):t._e()],1),n("v-uni-view",{staticClass:"box-right",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.navto(e.stockId)}}},[n("v-uni-view",{staticClass:"name"},[t._v(t._s(e.productName))]),n("v-uni-view",{staticClass:"price"},[t._v(t._s("HKD "+t.formatNumberRgx(e.productPrice)))])],1)],1)})),1),n("v-uni-view",{staticClass:"bottom"},[t._v("没有更多了~")]),n("v-uni-view",{staticClass:"allCheck"},[n("v-uni-checkbox-group",{on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.changeBook.apply(void 0,arguments)}}},[n("v-uni-label",[n("v-uni-view",[n("v-uni-checkbox",{staticStyle:{transform:"scale(0.7)"},attrs:{color:"#85dbd0",checked:t.allFlag.checked,value:t.allFlag.value}}),t._v("全选")],1)],1)],1),0==t.isSelect?n("v-uni-view",{staticClass:"cart-button-pay",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.closeAccount.apply(void 0,arguments)}}},[t._v("结算")]):n("v-uni-view",{staticClass:"cart-button-del",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickclose.apply(void 0,arguments)}}},[t._v("删除")])],1)],1)],1)},c=[]},b85c:function(t,e,i){"use strict";i("a4d3"),i("e01a"),i("d28b"),i("d3b7"),i("3ca3"),i("ddb0"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=c;var n=o(i("06c5"));function o(t){return t&&t.__esModule?t:{default:t}}function c(t,e){var i;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(i=(0,n.default)(t))||e&&t&&"number"===typeof t.length){i&&(t=i);var o=0,c=function(){};return{s:c,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:c}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,s=!0,r=!1;return{s:function(){i=t[Symbol.iterator]()},n:function(){var t=i.next();return s=t.done,t},e:function(t){r=!0,a=t},f:function(){try{s||null==i["return"]||i["return"]()}finally{if(r)throw a}}}}},bb08:function(t,e,i){t.exports=i.p+"static/img/no.ada49a16.png"}}]);