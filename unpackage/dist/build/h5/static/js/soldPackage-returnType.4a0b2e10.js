(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["soldPackage-returnType"],{"23dd":function(t,e,r){var n=r("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.return-type-container[data-v-3616099a]{height:100vh;background-color:#f9f9f9}.return-type-container .return-type-product[data-v-3616099a]{margin-top:%?2?%;padding:%?20?% %?40?%;display:flex;justify-content:space-between;align-items:center;background-color:#fff}.return-type-container .return-type-product .product-font[data-v-3616099a]{display:flex;align-items:center}.return-type-container .return-type-product .product-font .font[data-v-3616099a]{max-width:%?490?%;margin-left:%?20?%;font-size:%?24?%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#c3c3c3}.return-type-container .return-type-product .product-right[data-v-3616099a]{margin-left:%?20?%}.return-type-container .return-type-product .product-right uni-image[data-v-3616099a]{width:%?32?%;height:%?32?%}.return-type-container .return-type-every[data-v-3616099a]{margin:%?40?%;padding:%?50?% %?30?%;display:flex;justify-content:space-between;align-items:center;background-color:#fff;border-radius:%?10?%}.return-type-container .return-type-every .every-left[data-v-3616099a]{display:flex}.return-type-container .return-type-every .every-left .left-img[data-v-3616099a]{width:%?44?%;height:%?44?%}.return-type-container .return-type-every .every-left .left-main[data-v-3616099a]{margin-left:%?40?%}.return-type-container .return-type-every .every-left .left-main .main-top[data-v-3616099a]{font-size:%?32?%}.return-type-container .return-type-every .every-left .left-main .main-bottom[data-v-3616099a]{margin-top:%?20?%;font-size:%?24?%;color:#c3c3c3}.return-type-container .return-type-every .every-right uni-image[data-v-3616099a]{width:%?32?%;height:%?32?%}',""]),t.exports=e},"652d":function(t,e,r){"use strict";r.r(e);var n=r("aaf0"),a=r.n(n);for(var i in n)"default"!==i&&function(t){r.d(e,t,(function(){return n[t]}))}(i);e["default"]=a.a},"6ee5":function(t,e,r){"use strict";var n=r("a536"),a=r.n(n);a.a},a536:function(t,e,r){var n=r("23dd");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=r("4f06").default;a("333b70ab",n,!0,{sourceMap:!1,shadowMode:!1})},aaf0:function(t,e,r){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={data:function(){return{returnParams:{},productParams:{}}},onLoad:function(e){t.log(JSON.parse(e.productParams)),this.returnParams=JSON.parse(e.params),this.productParams=JSON.parse(e.productParams)},methods:{checkLogic:function(){t.log("查看物流")},returnProductAndPrice:function(){uni.navigateTo({url:"priceAndProduct?retParams="+JSON.stringify(this.returnParams)+"&type=1"})},returnPrice:function(){uni.navigateTo({url:"priceAndProduct?retParams="+JSON.stringify(this.returnParams)+"&type=0"})},statusDecide:function(t){switch(t){case-2:return"交易取消";case-1:return"超时交易关闭";case 0:return"未付款";case 1:return"商品已付款";case 2:return"商品已发货";case 3:return"商品已签收"}}}};e.default=r}).call(this,r("5a52")["default"])},bb9d:function(t,e,r){"use strict";r.r(e);var n=r("d176"),a=r("652d");for(var i in a)"default"!==i&&function(t){r.d(e,t,(function(){return a[t]}))}(i);r("6ee5");var c,u=r("f0c5"),s=Object(u["a"])(a["default"],n["b"],n["c"],!1,null,"3616099a",null,!1,n["a"],c);e["default"]=s.exports},c203:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABA0lEQVRYR+3UPw7CIBQGcOgJXF08gImJA4+2cXL1AJ7FwURH7+IBXDuZ9I910RN4AvcWDINJwwS8V5uYMgPfjw8CZwMPPnA+GwFjA84NVFU1VUrttdZZHMdnqsfrDKjret40zdMEa623VAhngAnO8/zIOT9QIrwAfSC8AdSIIAAlIhhAhUABKBBoABZBArARbduu0zTNXD6rXgBKKZEkye1nAMwHhW4AE24aQgGw4ShAN5xzvgGAi8ud23OCGuiGM8ZWUsprSHhQA9bJFwDwCA33Blgnn0kpX5hwL0BRFEvG2N0siqJoIoR4Y8O9AGZyWZYnANhRBH/3CHqEI2Bs4K8a+AANvpMhVLEYbgAAAABJRU5ErkJggg=="},d176:function(t,e,r){"use strict";var n;r.d(e,"b",(function(){return a})),r.d(e,"c",(function(){return i})),r.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"return-type-container"},[n("v-uni-view",{staticClass:"return-type-product",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.checkLogic.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"product-font"},[n("v-uni-view",[n("v-uni-image",{staticStyle:{width:"100rpx",height:"100rpx","border-radius":"10rpx"},attrs:{src:t.productParams.pic,mode:"aspectFill"}})],1),n("v-uni-text",{staticClass:"font"},[t._v(t._s(t.statusDecide(t.productParams.state)+" | 物流"))])],1),n("v-uni-view",{staticClass:"product-right"},[n("v-uni-image",{attrs:{src:r("c203"),mode:"aspectFill"}})],1)],1),n("v-uni-view",{staticClass:"return-type-every",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.returnProductAndPrice.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"every-left"},[n("v-uni-image",{staticClass:"left-img",attrs:{src:r("e8c3b"),mode:"aspectFill"}}),n("v-uni-view",{staticClass:"left-main"},[n("v-uni-view",{staticClass:"main-top"},[n("v-uni-text",[t._v("我要退货退款")])],1),n("v-uni-view",{staticClass:"main-bottom"},[n("v-uni-text",[t._v("已收到货，需要退还已收到的货物")])],1)],1)],1),n("v-uni-view",{staticClass:"every-right"},[n("v-uni-image",{attrs:{src:r("c203"),mode:"aspectFill"}})],1)],1),n("v-uni-view",{staticClass:"return-type-every",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.returnPrice.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"every-left"},[n("v-uni-image",{staticClass:"left-img",attrs:{src:r("e8c3b"),mode:"aspectFill"}}),n("v-uni-view",{staticClass:"left-main"},[n("v-uni-view",{staticClass:"main-top"},[n("v-uni-text",[t._v("我要退款(无需退货)")])],1),n("v-uni-view",{staticClass:"main-bottom"},[n("v-uni-text",[t._v("未收到货，或与商家协商之后申请")])],1)],1)],1),n("v-uni-view",{staticClass:"every-right"},[n("v-uni-image",{attrs:{src:r("c203"),mode:"aspectFill"}})],1)],1)],1)},i=[]},e8c3b:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMkMzMUIwNUZFNDAxMUVCOUQ1N0I5NDEzMjQyRDFBNCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMkMzMUIwNkZFNDAxMUVCOUQ1N0I5NDEzMjQyRDFBNCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjIyQzMxQjAzRkU0MDExRUI5RDU3Qjk0MTMyNDJEMUE0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjIyQzMxQjA0RkU0MDExRUI5RDU3Qjk0MTMyNDJEMUE0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+IocV9gAAArRJREFUeNrUmc2LUlEYh18vNX3ZtU1MLWP8gJKKNhHMJkYlphZCRB8b/wRpY3cj6s4GofSPqBa1KwgF25S0iphFgTq0jHE2OVNaE0i/186VZHS6eu89Hl948AN9fTz3fN33eDqdDlkML7gOroKL4AzwgUM0WfwCbfAFfARvwCvw3cqXPRaE/eABuAuOkTvxAzwFD0FzWuHDIAvugwWSE7vgMciAn5MIL4Hn4tLPIrir3BrV2tqID18C72YoS+K33wqXfYW5v74GizT7WBQu/nHCR0Q3OEnqBLu8EG57hHmAXSD14rxwGxp0PMg+g4OkZvwGZ3kQmi1sKCxLws0wW/g4Hr+6uCg4ubic5hZenQNZEo6rLLxiJ0u326VqtUqtVkuG9MoBMQqnjnQ6TbVajXw+HxWLRQoGg67OGJqYIaaOdrs9eEwmk1Sv190UXmJh3U6GVCpFuq7LktY1uzuxQCDQ7wqSpBc0J7KEQiFp0ppTiWRJa04mkyGtOX3Jxkk3m001hU3pUqk0JJ3P59UV7t8J+P0UDocHr5Vu4V6vR7lcrr8CmhGLxdQUNmUrlcrgvUgkQoZhqCc8TjabzZKmaWoJy5B1TFiWrCm867RsNBp1RZZdOeO2nQyFQmGPbCaTcUOWY5uzbtjJUC6XZclybHDmdTsZEokEeb1eisfjbstyrPNd8208eUbzEXfm6TafKz6n+PrtzEkLc8F7xyxVcYXwE6ldqjoHGuYI4a3UI4Vbl6vyDX7ybwWeS5rv7dYp3JgZwBXRh4eW5i64CbYUkt0STp1xewnuGtfApgKym8Kl+b/NzwewbHdBcaAbLAsXS7s1/leXwZoYoTJngzXx2yPvqawcLAa4IgXugaMuifL4eUJ/DxYb+33QM+HR7Q0aPro9McXcza34jYaPbl+SxaPbPwIMANXNEQSOOhw1AAAAAElFTkSuQmCC"}}]);