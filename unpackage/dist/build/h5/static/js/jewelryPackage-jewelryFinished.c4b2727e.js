(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["jewelryPackage-jewelryFinished"],{"108c":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.content[data-v-9ea89274]{min-height:100vh;background-color:#f9f9f9}.content .inventory-top[data-v-9ea89274]{padding-bottom:%?26?%;position:fixed;top:var(--window-top);left:0;right:0;z-index:99;background-color:#fff}.content .inventory-top .top-input[data-v-9ea89274],\r\n.content .inventory-top .item[data-v-9ea89274]{padding:0 %?30?%}.content .inventory-top .inputs[data-v-9ea89274]{margin-top:%?40?%}.content .inventory-top .inputs .item[data-v-9ea89274]{display:flex;justify-content:space-between;align-items:center}.content .inventory-top .inputs .item .item-title[data-v-9ea89274]{font-size:%?28?%;color:#565656;font-weight:700}.content .inventory-top .inputs .item .clrGray[data-v-9ea89274]{display:flex;justify-content:flex-end;align-items:center}.content .inventory-top .inputs .item .clrGray uni-text[data-v-9ea89274]{font-size:%?28?%;color:#c8c8c8}.content .inventory-top .inputs .item .clrGray uni-image[data-v-9ea89274]{width:%?44?%;height:%?44?%;margin-left:%?30?%}.content .inventory-top .inputs .line[data-v-9ea89274]{width:100%;height:%?2?%;margin-top:%?26?%;margin-bottom:%?26?%;background-color:#f9f9f9}.content .inventory-main[data-v-9ea89274]{margin-top:%?30?%;padding:%?400?% %?30?% %?30?%}.content .inventory-main .inventory-num[data-v-9ea89274]{margin-bottom:%?20?%;font-size:%?22?%;color:#aaa}.content .inventory-main .plantList .plant[data-v-9ea89274]{margin-bottom:%?30?%;padding:%?20?% %?20?% %?30?%;border-radius:%?30?%;position:relative;background-color:#fff;font-size:%?26?%}.content .inventory-main .plantList .plant .item .every-name[data-v-9ea89274]{width:100%;display:flex;justify-content:space-between}.content .inventory-main .plantList .plant .item .every-name .bh[data-v-9ea89274]{width:%?350?%;flex:1;overflow:hidden;word-break:keep-all;white-space:nowrap;text-overflow:ellipsis;font-size:%?28?%;font-weight:700;color:#000}.content .inventory-main .plantList .plant .item .row[data-v-9ea89274]{display:flex;align-items:center;color:#999}.content .inventory-main .plantList .plant .item .row .img[data-v-9ea89274]{width:%?166?%;height:%?168?%;margin-right:%?20?%;border-radius:%?30?%}.content .inventory-main .plantList .plant .item .row .cs[data-v-9ea89274]{font-size:%?22?%}.content .inventory-main .plantList .plant .line[data-v-9ea89274]{width:100%;height:%?2?%;margin:%?30?% 0;background-color:#f9f9f9}.content .inventory-main .plantList .plant .price[data-v-9ea89274]{display:flex;justify-content:space-between;flex-wrap:wrap;font-size:%?26?%}.content .inventory-main .plantList .plant .price .price-every[data-v-9ea89274]{margin-top:%?20?%}',""]),t.exports=e},"68f6":function(t,e,i){"use strict";var n=i("714e"),a=i.n(n);a.a},"714e":function(t,e,i){var n=i("108c");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("d79ae31e",n,!0,{sourceMap:!1,shadowMode:!1})},b2da:function(t,e,i){"use strict";i.r(e);var n=i("d223"),a=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=a.a},d223:function(t,e,i){"use strict";(function(t){var n=i("4ea4");i("99af"),i("ac1f"),i("841c"),i("498a"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("aad9")),s={components:{popwndSelect:a.default},data:function(){return{imgUrl:this.$baseJewelleryUrl,haveData:1,keyWord:"",page:1,bShowStock:!1,stockIdx:0,stocks:[],bShowState:!1,stateIdx:3,states:[{id:-1,name:"全部"},{id:0,name:"库存中"},{id:1,name:"运输中"},{id:5,name:"未出售"},{id:4,name:"已出售"}],bShowTag:!1,tagIdx:0,tagList:[],list:[],total:0,haveMore:0}},onLoad:function(){this.stockIdx=0,this.stateIdx=3,0==this.list.length&&uni.getStorageSync("token").length>0&&(t.log("重新获取数据"),this.getStockList(),this.getTagList(),this.search())},onPullDownRefresh:function(){uni.showLoading({title:"正在刷新"}),t.log("获取数据"),this.page=1,this.list=[],this.haveMore=0,this.search(),this.getStockList(),uni.stopPullDownRefresh()},onReachBottom:function(){0==this.haveMore&&(this.page++,this.search())},methods:{search:function(){var e=this;uni.showLoading({title:"加载中..."}),this.soldNum=0,this.reserveNum=0;var i={};i={keyword:this.keyWord.trim()},this.stockIdx>0&&(i.storageId=this.stocks[this.stockIdx].id),this.stateIdx>0&&(i.state=this.states[this.stateIdx].id),this.tagIdx>0&&(i.tag=this.tagList[this.tagIdx]),uni.request({url:this.$baseJewelleryUrl+"/productStockSearch?page="+this.page+"&pageNum=10",method:"POST",header:{"content-type":"application/json",token:uni.getStorageSync("token")},data:i,complete:function(i){if(uni.hideLoading(),t.log("珠宝成品列表"),t.log(i),0!=e.checkBack(i)){if(e.total=i.data.total,0==i.data.list.length)e.haveMore=1;else{var n=e.list.concat(i.data.list);e.list=n}0==e.list.length?(e.haveData=0,uni.showToast({icon:"none",title:"暂无数据"})):e.haveData=1}}})},getStockList:function(){var e=this;uni.request({url:this.$baseJewelleryUrl+"/storageList",header:{"content-type":"application/json",token:uni.getStorageSync("token")},complete:function(i){t.log("库存地列表"),t.log(i),uni.hideLoading(),0!=e.checkBack(i,!0)&&(i.data.length>0&&(e.stocks=i.data),t.log(e.stocks))}})},getTagList:function(){var e=this;uni.request({url:this.$baseJewelleryUrl+"/tagList",header:{"content-type":"application/json",token:uni.getStorageSync("token")},complete:function(i){t.log("标签列表"),t.log(i),uni.hideLoading(),0!=e.checkBack(i,!0)&&i.data.length>0&&(e.tagList=i.data)}})},inputChange:function(){this.page=1,this.list=[],this.haveMore=0,this.search(),uni.pageScrollTo({scrollTop:0,duration:300})},stockChange:function(t){this.stockIdx=t.sel,this.page=1,this.list=[],this.haveMore=0,this.search(),uni.pageScrollTo({scrollTop:0,duration:300})},stateChange:function(t){this.stateIdx=t.sel,this.page=1,this.list=[],this.haveMore=0,this.search(),uni.pageScrollTo({scrollTop:0,duration:300})},tagChange:function(t){this.tagIdx=t.sel,this.page=1,this.list=[],this.haveMore=0,this.search(),uni.pageScrollTo({scrollTop:0,duration:300})},getSaleStateClr:function(t){return 0==t.state?"#54b7eb":1==t.state?"#6bcda5":"#ef5b5b"},getSaleState:function(t){for(var e=0;e<this.states.length;++e){if(t.state==this.states[e].id)return this.states[e].name;if(4==t.state)return"已售"}return""},checkDetails:function(t){uni.navigateTo({url:"./jewelryDetails?id="+t.id})}}};e.default=s}).call(this,i("5a52")["default"])},e753:function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return n}));var n={uniSearchBar:i("657d").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"content"},[n("popwndSelect",{attrs:{visible:t.bShowStock,strTitle:"请选择地点",lst:t.stocks,strName:"name",sel:t.stockIdx},on:{"update:visible":function(e){arguments[0]=e=t.$handleEvent(e),t.bShowStock=e},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.stockChange.apply(void 0,arguments)}}}),n("popwndSelect",{attrs:{visible:t.bShowTag,strTitle:"请选择类型",lst:t.tagList,sel:t.tagIdx},on:{"update:visible":function(e){arguments[0]=e=t.$handleEvent(e),t.bShowTag=e},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.tagChange.apply(void 0,arguments)}}}),n("popwndSelect",{attrs:{visible:t.bShowState,strTitle:"请选择状态",lst:t.states,strName:"name",sel:t.stateIdx},on:{"update:visible":function(e){arguments[0]=e=t.$handleEvent(e),t.bShowState=e},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.stateChange.apply(void 0,arguments)}}}),n("v-uni-view",{staticClass:"inventory-top"},[n("v-uni-view",{staticClass:"top-input"},[n("uni-search-bar",{attrs:{placeholder:"搜索",cancelButton:"none"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.inputChange.apply(void 0,arguments)}},model:{value:t.keyWord,callback:function(e){t.keyWord=e},expression:"keyWord"}})],1),n("v-uni-view",{staticClass:"inputs"},[n("v-uni-view",{staticClass:"item",staticStyle:{flex:"1"}},[n("v-uni-view",{staticClass:"item-title"},[t._v("库存地点")]),n("v-uni-view",{staticClass:"clrGray",staticStyle:{flex:"1"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.bShowStock=!0}}},[0!==t.stocks.length?n("v-uni-text",[t._v(t._s(t.stocks[t.stockIdx].name))]):t._e(),n("v-uni-image",{attrs:{src:i("e8c3b"),mode:"aspectFill"}})],1)],1),n("v-uni-view",{staticClass:"line"}),n("v-uni-view",{staticClass:"item",staticStyle:{flex:"1"}},[n("v-uni-view",{staticClass:"item-title"},[t._v("类型")]),n("v-uni-view",{staticClass:"clrGray",staticStyle:{flex:"1"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.bShowTag=!0}}},[0!==t.tagList.length?n("v-uni-text",[t._v(t._s(t.tagList[t.tagIdx]))]):t._e(),n("v-uni-image",{attrs:{src:i("e8c3b"),mode:"aspectFill"}})],1)],1),n("v-uni-view",{staticClass:"line"}),n("v-uni-view",{staticClass:"item",staticStyle:{flex:"1"}},[n("v-uni-view",{staticClass:"item-title"},[t._v("状态")]),n("v-uni-view",{staticClass:"clrGray",staticStyle:{flex:"1"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.bShowState=!0}}},[n("v-uni-text",[t._v(t._s(t.states[t.stateIdx].name))]),n("v-uni-image",{attrs:{src:i("e8c3b"),mode:"aspectFill"}})],1)],1)],1)],1),0==t.haveData?n("v-uni-view",{staticClass:"no-data"},[n("v-uni-image",{attrs:{src:i("bb08"),mode:"aspectFill"}}),n("v-uni-text",{staticStyle:{"font-size":"30rpx"}},[t._v("暂无数据~")])],1):n("v-uni-view",{staticClass:"inventory-main"},[n("v-uni-view",{staticClass:"inventory-num"},[n("v-uni-view",[t._v("共查询到"+t._s(t.total)+"件商品")])],1),n("v-uni-view",{staticClass:"plantList"},t._l(t.list,(function(e,i){return n("v-uni-view",{key:i,staticClass:"plant"},[n("v-uni-view",{on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.checkDetails(e)}}},[n("v-uni-view",{staticClass:"item"},[n("v-uni-view",{staticClass:"row"},[n("v-uni-view",{staticClass:"img"},[e.img?n("v-uni-image",{staticClass:"img",attrs:{src:t.imgUrl+e.img.split("|")[0],mode:"aspectFill"}}):t._e()],1),n("v-uni-view",{staticStyle:{flex:"1"}},[n("v-uni-view",{staticClass:"every-name"},[n("v-uni-view",{staticClass:"bh"},[t._v(t._s(e.productName))]),0==t.stateIdx?n("v-uni-view",{style:{color:t.getSaleStateClr(e),"font-size":"28rpx","margin-left":"15rpx"}},[t._v(t._s(t.getSaleState(e)))]):t._e()],1),n("v-uni-view",{staticStyle:{margin:"10rpx 0 20rpx 0","font-size":"26rpx"}},[t._v("唯一编号:\n\t\t\t\t\t\t\t\t\t\t"+t._s(e.productNumber))]),0==e.state?n("v-uni-view",[n("v-uni-view",{staticClass:"cs"},[t._v("入库时间: "+t._s(e.stockInTime)+" 【"+t._s(e.storageName)+"】")])],1):4==e.state?n("v-uni-view",[n("v-uni-view",{staticClass:"cs"},[t._v("客户名称:\n\t\t\t\t\t\t\t\t\t\t\t"+t._s(e.customer))]),n("v-uni-view",{staticClass:"cs"},[t._v("销售时间:\n\t\t\t\t\t\t\t\t\t\t\t"+t._s(e.stockOutTime))])],1):t._e()],1)],1),0==e.state||1==e.state?n("v-uni-view",[n("v-uni-view",{staticClass:"line"}),n("v-uni-view",{staticClass:"price"},[n("v-uni-view",{staticStyle:{width:"50%"}},[t._v("成本:\n\t\t\t\t\t\t\t\t\t\t"+t._s(t.getPrice(e.totalCnPrice,"CNY")))]),n("v-uni-view",{staticStyle:{width:"50%","text-align":"right"}},[t._v("加工费:\n\t\t\t\t\t\t\t\t\t\t"+t._s(t.getPrice(e.processCost,"CNY")))]),n("v-uni-view",{staticStyle:{width:"50%"}},[t._v("批发价:\n\t\t\t\t\t\t\t\t\t\t"+t._s(t.getPrice(e.adviceWholesalePrice,"CNY")))]),n("v-uni-view",{staticStyle:{width:"50%","text-align":"right"}},[t._v("零售价:\n\t\t\t\t\t\t\t\t\t\t"+t._s(t.getPrice(e.adviseSellPrice,"CNY")))])],1)],1):t._e(),4==e.state?n("v-uni-view",[n("v-uni-view",{staticClass:"line"}),n("v-uni-view",{staticClass:"price"},[n("v-uni-view",{staticStyle:{width:"50%"}},[t._v("成本: "+t._s(t.getPrice(e.totalCnPrice,"CNY")))]),n("v-uni-view",{staticStyle:{width:"50%","text-align":"right"}},[t._v("销售价:\n\t\t\t\t\t\t\t\t\t\t"+t._s(t.getPrice(e.saleMoney,e.saleCurrency)))]),"CNY"==e.saleCurrency?n("v-uni-view",{staticClass:"price-every",staticStyle:{width:"50%"}},[t._v("利润:\n\t\t\t\t\t\t\t\t\t\t"+t._s(t.getPrice(e.saleMoney-e.totalCnPrice,"CNY")))]):t._e()],1)],1):t._e()],1)],1)],1)})),1)],1)],1)},s=[]},ee34:function(t,e,i){"use strict";i.r(e);var n=i("e753"),a=i("b2da");for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);i("68f6");var o,l=i("f0c5"),c=Object(l["a"])(a["default"],n["b"],n["c"],!1,null,"9ea89274",null,!1,n["a"],o);e["default"]=c.exports}}]);