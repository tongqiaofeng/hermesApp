(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["minePackage-inventory"],{"0c51":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.content[data-v-38ce04f1]{min-height:100vh;background-color:#f9f9f9}.content .inventory-top[data-v-38ce04f1]{padding-bottom:%?26?%;position:fixed;top:var(--window-top);left:0;right:0;z-index:99;background-color:#fff}.content .inventory-top .top-input[data-v-38ce04f1],\r\n.content .inventory-top .item[data-v-38ce04f1]{padding:0 %?30?%}.content .inventory-top .inputs[data-v-38ce04f1]{margin-top:%?40?%}.content .inventory-top .inputs .item[data-v-38ce04f1]{display:flex;justify-content:space-between;align-items:center}.content .inventory-top .inputs .item .item-title[data-v-38ce04f1]{font-size:%?28?%;color:#565656;font-weight:700}.content .inventory-top .inputs .item .clrGray[data-v-38ce04f1]{display:flex;justify-content:flex-end;align-items:center}.content .inventory-top .inputs .item .clrGray uni-text[data-v-38ce04f1]{font-size:%?28?%;color:#c8c8c8}.content .inventory-top .inputs .item .clrGray uni-image[data-v-38ce04f1]{width:%?44?%;height:%?44?%;margin-left:%?30?%}.content .inventory-top .inputs .line[data-v-38ce04f1]{width:100%;height:%?2?%;margin-top:%?26?%;margin-bottom:%?26?%;background-color:#f9f9f9}.content .inventory-main[data-v-38ce04f1]{margin-top:%?30?%;padding:%?430?% %?30?% %?30?%}.content .inventory-main .inventory-num[data-v-38ce04f1]{margin-bottom:%?20?%;font-size:%?22?%;color:#aaa}.content .inventory-main .plantList .plant[data-v-38ce04f1]{margin-bottom:%?30?%;padding:%?20?% %?20?% %?30?%;border-radius:%?30?%;position:relative;background-color:#fff;font-size:%?26?%}.content .inventory-main .plantList .plant .item .every-name[data-v-38ce04f1]{width:100%;display:flex;justify-content:space-between}.content .inventory-main .plantList .plant .item .every-name .bh[data-v-38ce04f1]{width:%?350?%;flex:1;overflow:hidden;word-break:keep-all;white-space:nowrap;text-overflow:ellipsis;font-size:%?28?%;font-weight:700;color:#000}.content .inventory-main .plantList .plant .item .row[data-v-38ce04f1]{display:flex;align-items:center;color:#999}.content .inventory-main .plantList .plant .item .row .img[data-v-38ce04f1]{width:%?166?%;height:%?168?%;margin-right:%?20?%;border-radius:%?30?%}.content .inventory-main .plantList .plant .item .row .cs[data-v-38ce04f1]{font-size:%?22?%}.content .inventory-main .plantList .plant .line[data-v-38ce04f1]{width:100%;height:%?2?%;margin:%?30?% 0;background-color:#f9f9f9}.content .inventory-main .plantList .plant .price[data-v-38ce04f1]{display:flex;justify-content:space-between;flex-wrap:wrap;font-size:%?26?%}.content .inventory-main .plantList .plant .price .price-every[data-v-38ce04f1]{margin-top:%?20?%}',""]),t.exports=e},5007:function(t,e,i){"use strict";var n=i("c302"),s=i.n(n);s.a},"53f9":function(t,e,i){"use strict";i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}));var n={uniSearchBar:i("657d").default},s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"content"},[n("popwndSelect",{attrs:{visible:t.bShowUser,strTitle:"请选择用户",lst:t.usersList,strName:"username",sel:t.userIdx},on:{"update:visible":function(e){arguments[0]=e=t.$handleEvent(e),t.bShowUser=e},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.userChange.apply(void 0,arguments)}}}),n("popwndSelect",{attrs:{visible:t.bShowStock,strTitle:"请选择地点",lst:t.stocks,sel:t.stockIdx},on:{"update:visible":function(e){arguments[0]=e=t.$handleEvent(e),t.bShowStock=e},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.stockChange.apply(void 0,arguments)}}}),n("popwndSelect",{attrs:{visible:t.bShowState,strTitle:"请选择状态",lst:t.states,strName:"name",sel:t.stateIdx},on:{"update:visible":function(e){arguments[0]=e=t.$handleEvent(e),t.bShowState=e},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.stateChange.apply(void 0,arguments)}}}),n("v-uni-view",{staticClass:"inventory-top"},[n("v-uni-view",{staticClass:"top-input"},[n("uni-search-bar",{attrs:{placeholder:"搜索",cancelButton:"none"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.inputChange.apply(void 0,arguments)}},model:{value:t.keyWord,callback:function(e){t.keyWord=e},expression:"keyWord"}})],1),n("v-uni-view",{staticClass:"inputs"},[n("v-uni-view",{staticClass:"item",staticStyle:{flex:"1"}},[n("v-uni-view",{staticClass:"item-title"},[t._v("用户")]),n("v-uni-view",{staticClass:"clrGray",staticStyle:{flex:"1"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.bShowUser=!0}}},[0!==t.usersList.length?n("v-uni-text",[t._v(t._s(t.usersList[t.userIdx].username))]):t._e(),n("v-uni-image",{attrs:{src:i("e8c3b"),mode:"aspectFill"}})],1)],1),n("v-uni-view",{staticClass:"line"}),n("v-uni-view",{staticClass:"item",staticStyle:{flex:"1"}},[n("v-uni-view",{staticClass:"item-title"},[t._v("库存地点")]),n("v-uni-view",{staticClass:"clrGray",staticStyle:{flex:"1"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.bShowStock=!0}}},[n("v-uni-text",[t._v(t._s(t.stocks[t.stockIdx]))]),n("v-uni-image",{attrs:{src:i("e8c3b"),mode:"aspectFill"}})],1)],1),n("v-uni-view",{staticClass:"line"}),n("v-uni-view",{staticClass:"item",staticStyle:{flex:"1"}},[n("v-uni-view",{staticClass:"item-title"},[t._v("状态")]),n("v-uni-view",{staticClass:"clrGray",staticStyle:{flex:"1"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.bShowState=!0}}},[n("v-uni-text",[t._v(t._s(t.states[t.stateIdx].name))]),n("v-uni-image",{attrs:{src:i("e8c3b"),mode:"aspectFill"}})],1)],1)],1)],1),0==t.haveData?n("v-uni-view",{staticClass:"no-data"},[n("v-uni-image",{attrs:{src:i("bb08"),mode:"aspectFill"}}),n("v-uni-text",{staticStyle:{"font-size":"30rpx"}},[t._v("暂无数据~")])],1):n("v-uni-view",{staticClass:"inventory-main"},[n("v-uni-view",{staticClass:"inventory-num"},[n("v-uni-view",[t._v("共查询到"+t._s(t.total)+"件商品"),0==t.stateIdx?n("v-uni-text",[t._v("：其中可售"+t._s(t.sold1Total)+"件，预留"+t._s(t.reserveNum)+"件，已售"+t._s(t.soldNum)+"件")]):t._e()],1)],1),n("v-uni-view",{staticClass:"plantList"},t._l(t.list,(function(e,i){return n("v-uni-view",{key:i,staticClass:"plant"},[n("v-uni-view",{on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.checkDetails(e)}}},[n("v-uni-view",{staticClass:"item"},[n("v-uni-view",{staticClass:"row"},[n("v-uni-image",{staticClass:"img",attrs:{src:e.pic.trim(),mode:"aspectFill"}}),n("v-uni-view",{staticStyle:{flex:"1"}},[n("v-uni-view",{staticClass:"every-name"},[n("v-uni-view",{staticClass:"bh"},[t._v(t._s(e.name))]),0==t.stateIdx?n("v-uni-view",{style:{color:t.getSaleStateClr(e),"font-size":"28rpx","margin-left":"15rpx"}},[t._v(t._s(t.getSaleState(e)))]):t._e()],1),n("v-uni-view",{staticStyle:{margin:"10rpx 0 20rpx 0","font-size":"26rpx"}},[t._v("货号: "+t._s(e.productCode))]),0==e.sold?n("v-uni-view",{staticClass:"cs"},[t._v("成本价:\n\t\t\t\t\t\t\t\t\t\t"+t._s(t.getPrice(e.hkdCost,"HKD")))]):t._e(),1==e.sold?n("v-uni-view",[n("v-uni-view",{staticClass:"cs"},[t._v("入库时间: "+t._s(e.createTime)+" 【"+t._s(e.stockLoc)+"】")])],1):3==e.sold||4==e.sold?n("v-uni-view",[3==e.sold||4==e.sold?n("v-uni-view",{staticClass:"cs"},[t._v("客户名称:\n\t\t\t\t\t\t\t\t\t\t\t"+t._s(e.customer))]):t._e(),3==e.sold||4==e.sold?n("v-uni-view",{staticClass:"cs"},[t._v("销售时间:\n\t\t\t\t\t\t\t\t\t\t\t"+t._s(e.soldTime))]):t._e()],1):t._e()],1)],1),1==e.sold?n("v-uni-view",[n("v-uni-view",{staticClass:"line"}),n("v-uni-view",{staticClass:"price"},[n("v-uni-view",{staticStyle:{width:"50%"}},[t._v("成本价: "+t._s(t.getPrice(e.hkdCost,"HKD")))]),n("v-uni-view",{staticStyle:{width:"50%","text-align":"right"}},[t._v("同行价:\n\t\t\t\t\t\t\t\t\t\t"+t._s(t.getPrice(e.hkdPricePeer,"HKD")))]),n("v-uni-view",{staticClass:"price-every",staticStyle:{width:"50%"}},[t._v("散客价:\n\t\t\t\t\t\t\t\t\t\t"+t._s(t.getPrice(e.hkdPriceIndi,"HKD")))])],1)],1):t._e(),2==e.sold||3==e.sold||4==e.sold?n("v-uni-view",[n("v-uni-view",{staticClass:"line"}),n("v-uni-view",{staticClass:"price"},[n("v-uni-view",{staticStyle:{width:"50%"}},[t._v("成本价: "+t._s(t.getPrice(e.hkdCost,"HKD")))]),n("v-uni-view",{staticStyle:{width:"50%","text-align":"right"}},[t._v("销售价:\n\t\t\t\t\t\t\t\t\t\t"+t._s(t.getPrice(e.hkdPriceTran,"HKD")))]),n("v-uni-view",{staticClass:"price-every",staticStyle:{width:"50%"}},[t._v("利润:\n\t\t\t\t\t\t\t\t\t\t"+t._s(t.getPrice(e.hkdPriceTran-e.hkdCost,"HKD")))])],1)],1):t._e()],1)],1)],1)})),1)],1)],1)},a=[]},"6bb3":function(t,e,i){"use strict";i.r(e);var n=i("53f9"),s=i("f19e2");for(var a in s)"default"!==a&&function(t){i.d(e,t,(function(){return s[t]}))}(a);i("5007");var o,c=i("f0c5"),r=Object(c["a"])(s["default"],n["b"],n["c"],!1,null,"38ce04f1",null,!1,n["a"],o);e["default"]=r.exports},c302:function(t,e,i){var n=i("0c51");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var s=i("4f06").default;s("e1ac4aaa",n,!0,{sourceMap:!1,shadowMode:!1})},e1c0:function(t,e,i){"use strict";(function(t){var n=i("4ea4");i("99af"),i("ac1f"),i("841c"),i("498a"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=n(i("aad9")),a={components:{popwndSelect:s.default},data:function(){return{haveData:1,keyWord:"",page:1,bShowUser:!1,userIdx:0,usersList:[],bShowStock:!1,stockIdx:0,stocks:[],bShowState:!1,stateIdx:2,states:[{id:-1,name:"全部"},{id:0,name:"采购中"},{id:1,name:"存货"},{id:2,name:"客人预留"},{id:3,name:"已出售"}],list:[],total:0,sold1Total:0,reserveNum:0,soldNum:0,haveMore:0}},onLoad:function(){this.stateIdx=2,0==this.list.length&&uni.getStorageSync("token").length>0&&(t.log("重新获取数据"),this.getUserList(),this.getStockList())},onPullDownRefresh:function(){uni.showLoading({title:"正在刷新"}),t.log("获取数据"),this.page=1,this.list=[],this.haveMore=0,this.getUserList(),this.getStockList(),uni.stopPullDownRefresh()},onReachBottom:function(){0==this.haveMore&&(this.page++,this.search())},methods:{search:function(){var t=this;uni.showLoading({title:"加载中..."}),this.soldNum=0,this.reserveNum=0;var e={};e={keyword:this.keyWord.trim(),userId:0,page:this.page,pageNum:10},"peer"==uni.getStorageSync("role")?e.userId=0:e.userId=this.usersList[this.userIdx].id,this.stateIdx>0&&(e.sold=this.states[this.stateIdx].id),this.stockIdx>0&&(e.stockLoc=this.stocks[this.stockIdx]),uni.request({url:this.$baseFileUrl+"/stockSearch",method:"POST",header:{"content-type":"application/json",token:uni.getStorageSync("token")},data:e,complete:function(e){if(uni.hideLoading(),0!=t.checkBack(e)){if(t.total=e.data.total,t.sold1Total=e.data.sold1Total,t.reserveNum=e.data.sold2Total,t.soldNum=e.data.soldTotal,0==e.data.list.length)t.haveMore=1;else{var i=t.list.concat(e.data.list);t.list=i}0==t.list.length?(t.haveData=0,uni.showToast({icon:"none",title:"暂无数据"})):t.haveData=1}}})},getStockList:function(){var t=this;uni.request({url:this.$baseFileUrl+"/stockLocList",header:{"content-type":"application/json",token:uni.getStorageSync("token")},data:{},complete:function(e){uni.hideLoading(),0!=t.checkBack(e,!0)&&e.data.length>0&&(t.stocks=e.data)}})},getUserList:function(){var e=this;uni.request({url:this.$baseFileUrl+"/userList",header:{"content-type":"application/json",token:uni.getStorageSync("token")},data:{},complete:function(i){uni.hideLoading(),0!=e.checkBack(i,!0)&&(i.data.length>0&&(e.usersList=i.data),t.log("用户"),t.log(e.usersList),e.search())}})},inputChange:function(){this.page=1,this.list=[],this.haveMore=0,this.search(),uni.pageScrollTo({scrollTop:0,duration:300})},userChange:function(t){this.userIdx=t.sel,this.page=1,this.list=[],this.haveMore=0,this.search(),uni.pageScrollTo({scrollTop:0,duration:300})},stockChange:function(t){this.stockIdx=t.sel,this.page=1,this.list=[],this.haveMore=0,this.search(),uni.pageScrollTo({scrollTop:0,duration:300})},stateChange:function(t){this.stateIdx=t.sel,this.page=1,this.list=[],this.haveMore=0,this.search(),uni.pageScrollTo({scrollTop:0,duration:300})},getSaleStateClr:function(t){return 0==t.sold?"#54b7eb":1==t.sold?"#6bcda5":2==t.sold?"#ff8b62":(t.sold,"#ef5b5b")},getSaleState:function(t){for(var e=0;e<this.states.length;++e){if(t.sold==this.states[e].id)return this.states[e].name;if(4==t.sold)return"已售"}return""},checkDetails:function(t){uni.navigateTo({url:"../pages/index/details?id="+t.id})}}};e.default=a}).call(this,i("5a52")["default"])},f19e2:function(t,e,i){"use strict";i.r(e);var n=i("e1c0"),s=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=s.a}}]);