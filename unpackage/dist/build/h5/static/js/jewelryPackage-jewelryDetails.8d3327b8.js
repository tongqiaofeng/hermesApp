(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["jewelryPackage-jewelryDetails"],{"01ff":function(e,t,i){"use strict";i.r(t);var a=i("8c4d"),r=i("f032");for(var n in r)"default"!==n&&function(e){i.d(t,e,(function(){return r[e]}))}(n);i("8953");var s,l=i("f0c5"),o=Object(l["a"])(r["default"],a["b"],a["c"],!1,null,"2d7ff8bc",null,!1,a["a"],s);t["default"]=o.exports},"1ae3":function(e,t,i){"use strict";i.r(t);var a=i("52c2"),r=i.n(a);for(var n in a)"default"!==n&&function(e){i.d(t,e,(function(){return a[e]}))}(n);t["default"]=r.a},"36ca":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAkCAYAAAD7PHgWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4RTQyRjRBOUZFM0YxMUVCQjAwQkI2RTE4RDdEODQzMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4RTQyRjRBQUZFM0YxMUVCQjAwQkI2RTE4RDdEODQzMCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjhFNDJGNEE3RkUzRjExRUJCMDBCQjZFMThEN0Q4NDMwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjhFNDJGNEE4RkUzRjExRUJCMDBCQjZFMThEN0Q4NDMwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+yQT4jQAAANRJREFUeNrs1EEKwjAQBdAg3YtuuvUIPUaP4K1ceAn3vYDXUahu3elERgiltcl0khnKfPhkkZA8SIhzvGmxKuNhL2yrFffGqkIOcaqQUzgVyDmcKDIWJ4JMxRVFUnFFkEtxWZFcuCxIbhwrMheOBZkbtwhZCkdClsYlIaVwUUhp3F+kFtwocgvtg8lOEBae3aPtmwZ6h56hB0GgP/uElmZ4zXscpYE+ux+qCoAPwmd+gx5n1lygdeK+zzEgJf4xXyPWkLNxymNAAxrQgAY04MqBHwEGAIP2yhS2bGHgAAAAAElFTkSuQmCC"},"467e":function(e,t,i){var a=i("b564");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var r=i("4f06").default;r("420e57b2",a,!0,{sourceMap:!1,shadowMode:!1})},"52c2":function(e,t,i){"use strict";i("a9e3"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={name:"UniSwiperDot",emits:["clickItem"],props:{info:{type:Array,default:function(){return[]}},current:{type:Number,default:0},dotsStyles:{type:Object,default:function(){return{}}},mode:{type:String,default:"default"},field:{type:String,default:""}},data:function(){return{dots:{width:8,height:8,bottom:10,color:"#fff",backgroundColor:"rgba(0, 0, 0, .3)",border:"1px rgba(0, 0, 0, .3) solid",selectedBackgroundColor:"#333",selectedBorder:"1px rgba(0, 0, 0, .9) solid"}}},watch:{dotsStyles:function(e){this.dots=Object.assign(this.dots,this.dotsStyles)},mode:function(e){"indexes"===e?(this.dots.width=20,this.dots.height=20):(this.dots.width=8,this.dots.height=8)}},created:function(){"indexes"===this.mode&&(this.dots.width=20,this.dots.height=20),this.dots=Object.assign(this.dots,this.dotsStyles)},methods:{clickItem:function(e){this.$emit("clickItem",e)}}};t.default=a},"6f8e":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcMAAABACAYAAABm1RwcAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDRDJBMjk1OUZFM0YxMUVCOTAxNzg5QkI0RDcwRDdCNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDRDJBMjk1QUZFM0YxMUVCOTAxNzg5QkI0RDcwRDdCNSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNEMkEyOTU3RkUzRjExRUI5MDE3ODlCQjRENzBEN0I1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkNEMkEyOTU4RkUzRjExRUI5MDE3ODlCQjRENzBEN0I1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+571xVwAACW5JREFUeNrs3f9rXfUdx/Fjmuamd2nSmDZtY9Par7SzdsImDsYQtsm6KYgg+0WYv7ip4A/zj/BXnaCg6PbDYL+Iv4zpcLgJsskQNhBtxbVdqqZN0zQ1SRvzpV2zvV8n53355JN7zj3p1PXe+3zAh6S5N+fe+0Hy8v35dm566uR7SeTr1h6x9iNru61VEgAAmtuitRFrb1h72dqH4YMdwfdd1p6z9oG1J60dJAgBAC1CeXYoyzfl3AvWNviDnUEQvm7tB/QXAKDFqRB81Nr+ZHkU9IpXhs8QhACANvM9a097Ot6WJSQAAO3mMeWgwlCLZdbRHwCANqT8e0RheJS+AAC0saMKwz30AwCgje1RGHbRDwCANtbVQR8AANodYQgAIAzpAgAAYQgAAGEIAABhCAAAYQgAAGEIAABhCAAAYQgAAGEIAABhCAAAYQjgRlddx61HgS9DJ12Adg2OuWvX0q9HejYl/esrydtT51c8fnf/1mRrZUPy2oXR2nP/l/eyo1JNX2fT+q5kwa4Xv14jej/fGdiWvHNxfM2/W9Qf/tnK9hdAGAJNFIS/2H248DkXFueTl0ZPJLurG5Pbem9Ozi3OJSfmLtceP9DTl1Q61tUNAV1/34aNtX8r5LqDMOm23xu0IJVeCz9dJ3RmfjapXppcdW0Fc56FpeXn7qr2JEeuLhZ+tvdnp1f8+4ebh5JvbtpS97m/PH0s/Sz3bdtVqr8AwhBoEgqZf0xfSPZ/rS/998nPZ9KvfZ1dyT4LuVOzM8l5++Mub14cS4Y39CTf7h+shaFCaYuFmaqwegY6K6XCQ45d+iz9em5hLg20Mxa6eQHb6Jqyw96rWpFTpy/XfQ31iVPVG19H/TLz7yurfs/7ESAMgSbzx8mxZGf2x17fe8gpDD+yysmrJ4XGBxZYGoIcrlSTUQurO/oGkktXr+QOR+o5qqhid/Zuzh3KvKtv86qKLS9Efzv2r1XXnbJq8NT85cLffWhobxrief5i78lDUtViHIZhv4R2NghfgDAEmpgPSypoVDX1r+9K9lQ3piFx3ALSHx+zgJqMhibjyuv+weF0uDUOQlV8D267Nb2mhk/LzPeF1/a5wj9fOPt/m7fTUK9XugBhCDR56GluLwypomFJBZuaKCi9uoyl19kynAxXe1YF4WZ7vQfsNXzItSgIFXQKnIkgdDwI089g7+VI9n7q0Xye/25RaK51Rao+g+Y8zxOGIAyB5qUgqhd6CozXxj9Z8bOD2TBq/POxnCBQNbgvW2ijRTFaRPMTqwL7rJLyikpeHRtZsTinKNDiIFxcupYO2RZ9vsVscc3vJkYLr99oUZE7YNXxHb0D6fe+EEhzngBhCDSpcA4uXjUZz49t766mXzU3V3ZI0oNKgahhUC1AUZXoAfnq+MfptVRhTTZYBRqGrKpShZyu86ldJ65MverUc145O1Lquo0W0DgF990D29PvdX1VtWXmOwHCELiBlQ227o61DSHGlZgC6seDO9IAC4dWVWk9OLSn1B7Bnw0fSKs9zVnq+l4hahHLu1MTaSjpZ9/qX94qoSDUgp4yGi2gER9GjRfxAIQh0KLi+TMNCfpCkfCxMmHqAbWYDb+GlZQqLYWbHh+x74vC68TsTPK+Pffdmcn03wpP7YHU1g9VtfcsLYettkF8EQcChIrmUNlnCMIQaGKat1O1FdOimrw//vHcWlEQKARv7705fR1Vg159eZhWOzqTIQvZcbuGhj7vt9f89ZkTuSEWL8DZa1XlLqvgfMuEwraSbeq/Z2AoOW3hupZh3SIKbL3HeL8hWytAGAItSotiwjk08VNa4jBYqBM0GmbUZnRfJKO5Q4XGQ1lw5O330/O1+vSV8Y9XVanazD/UXU2PbNsZBKCurc37H16eTqtK7VlUQIYrXn0lqjb2T9vzvbIMaR+iq9QZElaw6gACzROGc5RP7DqUjM7P8h8NCEOgWSlIvKoLq0EtZgn/4Gtez8MwDoN6FJB6Xrj/7tMsMLZmIearUv3kGfGN+aoowyrwcQscDyhfQao5xviYOFHQqSlAb+/pr4Wngsz3BNYLwzJ0Ws9hC9jqxbG02lS/6Jrj02ytAGEItLztleWVpBoqHC4xLKggy1sM44tTwuFLBddcdkC3zheN/dWCTwt4FH4Kzu9aWGqrhs5OVWvEF9f469SjRTHhApp655Wq+tTP9fr6HwJtsVA4X2+4AoQhcIPScWvaUxgOVWreT1sh3rFQ+bl9H1dueRQ+Gn7Uwpe852vvobZb/N4qRVV5vzm7eqVmGDa6pgJJ1aHvISyi4VQN+SoM6wWhQlbVYpl5RQ3D6lp6fQ236n2PzjFECsIQaEq+gEVDj6qCwjk4ffUDtEXBp6FAnVGq4VNf+XncwqVob6AHoa6nyizP3+wxbcQvu73Caciy0XBtmTt0DBacV1qPFgGpv76/5ZY0jN+6eI7/oNDSuLkvWpbm4BRSCrnD2SITLYyRNyfO1EJGYaLgU+XkIaU7WcgDBVsNNJfmr9FoU7qqLQ1R6vU1X6hN9V8l9cHEGo5TUwXp85+L3McQVIZA8/r71PJK0XABit+1Iq7sVD2+HVQ/CgMFphbbKLjizfU+36aqqexRa7qmhmX9dBlpdHxaWOFeL4W2Pt90wZFuMf98Cm8Nkz48vD/tD06hAWEINJlGQ5HxIdpxoOkP//bpam2RiQeXB4XmF/9gAeHDqOGNeYv25fl1FIjTBbeJEr1O3k15yzqUva/jWZD5+9S9HWM6yPynt+yt3bVD71W3tTo6uCP9H4ODs5tWbQkBCEOgie3NtgwUzeFpKDU+ok0/W8hWhcZB4neYEIVl3oIVhUyjIBRVZh+VqMaKTo7R6+i9eGjf1T9YmztV4MXvsbeza8VRcj7Eqw3+fgA50Gpueurke/+hG9AuNOSow7p9y0PRNoTrvbZMWQCVPS80jyq4evdRvJ7nhp9TFbFOxAmfH/aL5PXJF9lfAGEIAMANhNWkAADCkC4AABCGAAAQhgAAEIYAABCGAAAQhgAAEIYAABCGAAAQhgAAEIYAABCGAAC0bxheoRsAAG1sVmE4Qj8AANrYJwrDN+gHAEAb+5PC8FfWuFsnAKAdKf9eVhges/Yi/QEAaEPKv2O+mvRJlYn0CQCgjbyV5V9ta4VWlN5r7XlrS/QPAKCFLWUV4X1Z/q3YZ6gfPGHtiLVnrf3T2lX6DADQAj63djzLt29Ye8zavD/4XwEGAGTUbGI1huzoAAAAAElFTkSuQmCC"},"73e7":function(e,t,i){"use strict";(function(e){i("c975"),i("ac1f"),i("1276"),i("498a"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{imgUrl:this.$baseJewelleryUrl,role:uni.getStorageSync("role"),token:uni.getStorageSync("token"),jewelryDetails:{},imgSrc:[],imgSrc2:[],imgSrc3:[],dotsStyles:{width:6,height:6,backgroundColor:"#fff",border:"#fff",selectedBackgroundColor:"#b0edd5",selectedBorder:"#b0edd5"},current:0,current2:0,collect1:i("9c0e"),collect2:i("ef56"),isShow:"0",detailId:null,share:{title:"PAULIANA 宝莉安娜高级珠宝",path:"/jewelryPackage/jewelryDetails?id="+this.detailId,imageUrl:"",desc:"",content:""}}},onLoad:function(t){e.log("详情"),e.log(t.id),this.detailId=t.id,this.getDetails()},onReady:function(){this.hidePageNavInWechatBrowser()},onPullDownRefresh:function(){uni.showLoading({title:"正在刷新"}),this.getDetails(),uni.stopPullDownRefresh()},onShareAppMessage:function(e){return this.share.path="/jewelryPackage/jewelryDetails?id="+this.detailId,{title:this.share.title,path:this.share.path,imageUrl:this.share.imageUrl,desc:this.share.desc,content:this.share.content,success:function(e){uni.showToast({title:"分享成功",icon:"none"})},fail:function(e){uni.showToast({title:"分享失败",icon:"none"})}}},onShareTimeline:function(e){return this.share.path="/jewelryPackage/jewelryDetails?id="+this.detailId,{title:this.share.title,path:this.share.path,imageUrl:this.share.imageUrl,desc:this.share.desc,content:this.share.content,success:function(e){uni.showToast({title:"分享成功",icon:"none"})},fail:function(e){uni.showToast({title:"分享失败",icon:"none"})}}},methods:{isShowChange:function(t){e.log(t),"0"==this.isShow?this.isShow="1":"1"==this.isShow&&(this.isShow="0")},swiperChange:function(e){this.current=e.detail.current},swiperChange2:function(e){this.current2=e.detail.current},imagePreview:function(e){uni.previewImage({current:e,urls:this.imgSrc})},imagePreview2:function(e){uni.previewImage({current:e,urls:this.imgSrc2})},imagePreview3:function(e){uni.previewImage({current:e,urls:this.imgSrc3})},getDetails:function(t){var i=this;uni.showLoading({title:"加载中......"}),uni.request({url:this.$baseJewelleryUrl+"/jewelleryInfo?id="+this.detailId,header:{"content-type":"application/json",token:uni.getStorageSync("token")},success:function(t){if(uni.hideLoading(),e.log("pppp"),e.log(t),i.jewelryDetails=t.data.productInfo,uni.setNavigationBarTitle({title:i.jewelryDetails.productName}),i.imgSrc=[],""!=i.jewelryDetails.img&&null!=i.jewelryDetails.img)if(-1==i.jewelryDetails.img.indexOf("|"))i.imgSrc.push(i.imgUrl+"/file/"+i.jewelryDetails.img);else for(var a=i.jewelryDetails.img.split("|"),r=0;r<a.length;r++)i.imgSrc.push(i.imgUrl+"/file/"+a[r].trim());if(i.imgSrc2=[],""!=i.jewelryDetails.designImg&&null!=i.jewelryDetails.designImg)if(-1==i.jewelryDetails.designImg.indexOf("|"))i.imgSrc2.push(i.jewelryDetails.designImg);else for(var n=i.jewelryDetails.designImg.split("|"),s=0;s<n.length;s++)i.imgSrc2.push(n[s].trim());if(i.imgSrc3=[],""!=i.jewelryDetails.detailImg&&null!=i.jewelryDetails.detailImg)if(-1==i.jewelryDetails.detailImg.indexOf("|"))i.imgSrc3.push(i.imgUrl+"/file/"+i.jewelryDetails.detailImg);else for(var l=i.jewelryDetails.detailImg.split("|"),o=0;o<l.length;o++)i.imgSrc3.push(i.imgUrl+"/file/"+l[o].trim());i.jewelryDetails.certs=[];var c=[];c=i.jewelryDetails.certificateNumber.indexOf(",")>0?i.jewelryDetails.certificateNumber.split(","):i.jewelryDetails.certificateNumber.split("，");for(var d=0;d<c.length;++d){var u=c[d].trim();u.length>0&&i.jewelryDetails.certs.push(u)}},fail:function(t){uni.hideLoading(),e.log(t)}})},goIndex:function(){uni.switchTab({url:"../pages/index/index"})},isCollect:function(){var t=this;if(0==uni.getStorageSync("token").length)uni.showToast({title:"请登录",icon:"none",success:function(){uni.switchTab({url:"../pages/mine/mine"})}});else{e.log("添加与取消收藏");var i=[];i.push({id:this.jewelryDetails.id,type:1}),uni.request({method:"POST",url:this.$baseUrl+"/favoriteSave",data:{stockList:i},header:{token:uni.getStorageSync("token")},complete:function(i){e.log("添加与取消收藏"),e.log(i),0!=t.checkBack(i,!0)&&t.getDetails(t.jewelryDetails.id)}})}},serviveClick:function(){uni.navigateTo({url:"../commonPackage/service/service"})}}};t.default=a}).call(this,i("5a52")["default"])},"7dd9":function(e,t,i){"use strict";i.r(t);var a=i("9ed1"),r=i("1ae3");for(var n in r)"default"!==n&&function(e){i.d(t,e,(function(){return r[e]}))}(n);i("dfa8");var s,l=i("f0c5"),o=Object(l["a"])(r["default"],a["b"],a["c"],!1,null,"5b8fce3e",null,!1,a["a"],s);t["default"]=o.exports},8953:function(e,t,i){"use strict";var a=i("fef8"),r=i.n(a);r.a},"8c4d":function(e,t,i){"use strict";i.d(t,"b",(function(){return r})),i.d(t,"c",(function(){return n})),i.d(t,"a",(function(){return a}));var a={uniSwiperDot:i("7dd9").default},r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"details-container"},[a("uni-swiper-dot",{attrs:{info:e.imgSrc,current:e.current,mode:"dot",dotsStyles:e.dotsStyles}},[a("v-uni-swiper",{staticClass:"swiper-box",staticStyle:{height:"750rpx"},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.swiperChange.apply(void 0,arguments)}}},e._l(e.imgSrc,(function(t,i){return a("v-uni-swiper-item",{key:i},[a("v-uni-view",{staticClass:"swiper-item",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.imagePreview(i)}}},[a("v-uni-image",{staticStyle:{width:"100%",height:"750rpx"},attrs:{src:t,mode:"aspectFill"}})],1)],1)})),1)],1),"admin"==e.role&&e.jewelryDetails.designImg?a("v-uni-view",{staticClass:"img-title"},[a("v-uni-view",{staticClass:"title-left"},[a("v-uni-view",{staticClass:"img-line"}),a("v-uni-text",[e._v("设计稿图")])],1),a("v-uni-view",{staticClass:"title-right"},[a("v-uni-checkbox-group",{on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.isShowChange.apply(void 0,arguments)}}},[a("v-uni-label",[a("v-uni-checkbox",{staticStyle:{transform:"scale(0.6)","border-radius":"50%"},attrs:{value:e.isShow,color:"#85dbd0"},model:{value:e.isShow,callback:function(t){e.isShow=t},expression:"isShow"}}),a("v-uni-text",{staticStyle:{"margin-left":"-6rpx"}},[e._v("是否显示")])],1)],1)],1)],1):e._e(),"admin"==e.role&&e.jewelryDetails.designImg&&"1"==e.isShow?a("uni-swiper-dot",{attrs:{info:e.imgSrc2,current:e.current2,mode:"dot",dotsStyles:e.dotsStyles}},[a("v-uni-swiper",{staticClass:"swiper-box",staticStyle:{height:"700rpx"},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.swiperChange2.apply(void 0,arguments)}}},e._l(e.imgSrc2,(function(t,i){return a("v-uni-swiper-item",{key:i},[a("v-uni-view",{staticClass:"swiper-item",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.imagePreview2(i)}}},[a("v-uni-image",{staticStyle:{width:"100%",height:"700rpx"},attrs:{src:t,mode:"aspectFill"}})],1)],1)})),1)],1):e._e(),a("v-uni-view",{staticClass:"product-price"},[0!=e.jewelryDetails.adviseSellPrice?a("v-uni-text",{staticStyle:{"font-size":"22rpx",color:"#85dbd0"}},[e._v("CNY"),a("v-uni-text",{staticStyle:{"font-size":"36rpx"}},[e._v(e._s(" "+e.formatNumberRgx(e.jewelryDetails.adviseSellPrice)))])],1):a("v-uni-text",{staticStyle:{"font-size":"22rpx",color:"#85dbd0"}},[e._v("价格请咨询客服")]),a("v-uni-view",{staticClass:"product-name"},[a("v-uni-view",{staticClass:"name-one"},[a("v-uni-text",{staticStyle:{flex:"1"}},[e._v(e._s(e.jewelryDetails.productName))]),"admin"==e.role?a("v-uni-view",{staticStyle:{"margin-left":"20rpx"}},[a("v-uni-text",[e._v(e._s(""==e.jewelryDetails.storageName||null==e.jewelryDetails.storageName?"":e.jewelryDetails.storageName))])],1):e._e()],1)],1)],1),"admin"==e.role?a("v-uni-view",{staticClass:"product-parameter"},[a("v-uni-view",{staticClass:"parameter"},[e._v("商品信息")]),a("v-uni-view",{staticClass:"parameter-line"}),e.jewelryDetails.productNumber?a("v-uni-view",{staticClass:"parameter-every"},[a("v-uni-text",[e._v("唯一编号")]),a("v-uni-text",[e._v(e._s(e.jewelryDetails.productNumber))])],1):e._e(),e.jewelryDetails.designName?a("v-uni-view",{staticClass:"parameter-every"},[a("v-uni-text",[e._v("设计稿名称")]),a("v-uni-text",[e._v(e._s(e.jewelryDetails.designName))])],1):e._e(),e.jewelryDetails.designerName?a("v-uni-view",{staticClass:"parameter-every"},[a("v-uni-text",[e._v("设计师")]),a("v-uni-text",[e._v(e._s(e.jewelryDetails.designerName))])],1):e._e(),e.jewelryDetails.certs?a("v-uni-view",[e.jewelryDetails.certs.length>0?a("v-uni-view",{staticClass:"parameter-every infoItem"},[a("v-uni-view",[e._v("证书编号：")]),a("v-uni-view",{staticClass:"content"},e._l(e.jewelryDetails.certs,(function(t,i){return a("v-uni-view",{key:i},[a("v-uni-navigator",{attrs:{url:"./materialDetails?productNumber="+t}},[e._v(e._s(t))])],1)})),1)],1):e._e()],1):e._e(),e.jewelryDetails.stockInTime?a("v-uni-view",{staticClass:"parameter-every"},[a("v-uni-text",[e._v("入库时间")]),a("v-uni-text",[e._v(e._s(e.jewelryDetails.stockInTime))])],1):e._e(),e.jewelryDetails.costPrice?a("v-uni-view",{staticClass:"parameter-every"},[a("v-uni-text",[e._v("裸石成本")]),a("v-uni-view",[a("v-uni-text",{staticStyle:{color:"#73d1c6"}},[e._v(e._s(e.jewelryDetails.currency+" "+e.formatNumberRgx(e.jewelryDetails.costPrice)))])],1)],1):e._e(),e.jewelryDetails.processCost?a("v-uni-view",{staticClass:"parameter-every"},[a("v-uni-text",[e._v("加工费")]),a("v-uni-view",[a("v-uni-text",{staticStyle:{color:"#73d1c6"}},[e._v(e._s("CNY "+e.formatNumberRgx(e.jewelryDetails.processCost)))])],1)],1):e._e(),e.jewelryDetails.totalCnRate?a("v-uni-view",{staticClass:"parameter-every"},[a("v-uni-text",[e._v("外币兑人民币汇率")]),a("v-uni-view",[a("v-uni-text",{staticStyle:{color:"#73d1c6"}},[e._v(e._s(e.jewelryDetails.totalCnRate))])],1)],1):e._e(),e.jewelryDetails.totalCnPrice?a("v-uni-view",{staticClass:"parameter-every"},[a("v-uni-text",[e._v("成本人民币金额")]),a("v-uni-view",[a("v-uni-text",{staticStyle:{color:"#73d1c6"}},[e._v(e._s("CNY "+e.formatNumberRgx(e.jewelryDetails.totalCnPrice)))])],1)],1):e._e(),e.jewelryDetails.totalHkRate?a("v-uni-view",{staticClass:"parameter-every"},[a("v-uni-text",[e._v("港币兑人民币汇率")]),a("v-uni-view",[a("v-uni-text",{staticStyle:{color:"#73d1c6"}},[e._v(e._s(e.jewelryDetails.totalHkRate))])],1)],1):e._e(),e.jewelryDetails.totalHkPrice?a("v-uni-view",{staticClass:"parameter-every"},[a("v-uni-text",[e._v("成本港币金额")]),a("v-uni-view",[a("v-uni-text",{staticStyle:{color:"#73d1c6"}},[e._v(e._s("HKD "+e.formatNumberRgx(e.jewelryDetails.totalHkPrice)))])],1)],1):e._e(),e.jewelryDetails.lowestSellPrice?a("v-uni-view",{staticClass:"parameter-every"},[a("v-uni-text",[e._v("最低销售价")]),a("v-uni-view",[a("v-uni-text",{staticStyle:{color:"#73d1c6"}},[e._v(e._s("CNY "+e.formatNumberRgx(e.jewelryDetails.lowestSellPrice)))])],1)],1):e._e(),e.jewelryDetails.adviceWholesalePrice?a("v-uni-view",{staticClass:"parameter-every"},[a("v-uni-text",[e._v("建议批发价")]),a("v-uni-view",[a("v-uni-text",{staticStyle:{color:"#73d1c6"}},[e._v(e._s("CNY "+e.formatNumberRgx(e.jewelryDetails.adviceWholesalePrice)))])],1)],1):e._e(),e.jewelryDetails.tagPrice?a("v-uni-view",{staticClass:"parameter-every"},[a("v-uni-text",[e._v("标签价")]),a("v-uni-view",[a("v-uni-text",{staticStyle:{color:"#73d1c6"}},[e._v(e._s("CNY "+e.formatNumberRgx(e.jewelryDetails.tagPrice)))])],1)],1):e._e(),e.jewelryDetails.saleCommission?a("v-uni-view",{staticClass:"parameter-every"},[a("v-uni-text",[e._v("销售提成")]),a("v-uni-view",[a("v-uni-text",{staticStyle:{color:"#73d1c6"}},[e._v(e._s("CNY "+e.formatNumberRgx(e.jewelryDetails.saleCommission)))])],1)],1):e._e(),e.jewelryDetails.params?a("v-uni-view",{staticClass:"parameter-every"},[a("v-uni-view",{staticStyle:{width:"110px"}},[e._v("参数")]),a("v-uni-text",[e._v(e._s(e.jewelryDetails.params))])],1):e._e(),e.jewelryDetails.totalPriceNote?a("v-uni-view",{staticClass:"parameter-every"},[a("v-uni-view",{staticStyle:{width:"110px"}},[e._v("成本备注")]),a("v-uni-view",[e._v(e._s(e.jewelryDetails.totalPriceNote))])],1):e._e(),e.jewelryDetails.note?a("v-uni-view",{staticClass:"parameter-every"},[a("v-uni-view",{staticStyle:{width:"110px"}},[e._v("产品备注")]),a("v-uni-view",[e._v(e._s(e.jewelryDetails.note))])],1):e._e()],1):e._e(),4==e.jewelryDetails.state&&"admin"==e.role?a("v-uni-view",{staticClass:"product-parameter"},[a("v-uni-view",{staticClass:"parameter"},[e._v("销售信息")]),a("v-uni-view",{staticClass:"parameter-line"}),a("v-uni-view",{staticClass:"parameter-every"},[a("v-uni-text",[e._v("销售时间")]),a("v-uni-text",[e._v(e._s(e.jewelryDetails.stockOutTime))])],1),a("v-uni-view",{staticClass:"parameter-every"},[a("v-uni-text",[e._v("发票号")]),a("v-uni-text",[e._v(e._s(e.jewelryDetails.sellBillNumber))])],1),a("v-uni-view",{staticClass:"parameter-every"},[a("v-uni-text",[e._v("销售金额")]),a("v-uni-view",[a("v-uni-text",{staticStyle:{color:"#73d1c6"}},[e._v(e._s(e.jewelryDetails.saleCurrency+" "+e.formatNumberRgx(e.jewelryDetails.saleMoney)))])],1)],1),a("v-uni-view",{staticClass:"parameter-every"},[a("v-uni-text",[e._v("销售港币金额")]),a("v-uni-view",[a("v-uni-text",{staticStyle:{color:"#73d1c6"}},[e._v(e._s("HKD "+e.formatNumberRgx(e.jewelryDetails.sellTotalHkPrice)))])],1)],1),a("v-uni-view",{staticClass:"parameter-every"},[a("v-uni-text",[e._v("客户名称")]),a("v-uni-text",[e._v(e._s(e.jewelryDetails.customer))])],1),e.jewelryDetails.saleCurrency==e.jewelryDetails.currency?a("v-uni-view",{staticClass:"parameter-every"},[a("v-uni-text",[e._v("利润")]),a("v-uni-view",[a("v-uni-text",{staticStyle:{color:"#73d1c6"}},[e._v(e._s(e.jewelryDetails.saleCurrency+" "+e.formatNumberRgx(e.costPrice(e.jewelryDetails.saleMoney,e.jewelryDetails.costPrice))))])],1)],1):e._e()],1):e._e(),e.jewelryDetails.materialList&&"admin"==e.role?a("v-uni-view",{staticClass:"product-parameter"},[a("v-uni-view",{staticClass:"parameter"},[e._v("原材料列表")]),a("v-uni-view",{staticClass:"parameter-line"}),e._l(e.jewelryDetails.materialList,(function(t,i){return a("v-uni-view",{key:i},[a("v-uni-navigator",{staticClass:"parameter-every",attrs:{url:"./materialDetails?id="+t.id,"hover-class":"none"}},[a("v-uni-text",[e._v(e._s(t.name))]),a("v-uni-text",[e._v(e._s("粒"==t.chargeUnit||"件"==t.chargeUnit?t.number+t.chargeUnit:"数量"+t.number+","+t.weight+t.chargeUnit))])],1)],1)}))],2):e._e(),a("v-uni-view",{staticClass:"product-parameter",staticStyle:{padding:"0 0 160rpx"}},[a("v-uni-view",{staticClass:"parameter",staticStyle:{padding:"30rpx 40rpx 0rpx 40rpx"}},[e._v("产品详情")]),a("v-uni-view",{staticClass:"parameter-line"}),e._l(e.imgSrc3,(function(t,i){return a("v-uni-view",{key:i,on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.imagePreview3(i)}}},[t?a("v-uni-image",{staticStyle:{"vertical-align":"bottom",width:"750rpx"},attrs:{src:t,mode:"widthFix"}}):e._e()],1)}))],2),a("v-uni-view",{staticClass:"product-bottom"},[a("v-uni-view",{staticClass:"bottom-left"},[a("v-uni-view",{staticClass:"left-index",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.goIndex.apply(void 0,arguments)}}},[a("v-uni-image",{staticClass:"index-img",attrs:{src:i("36ca"),mode:"aspectFill"}}),a("v-uni-view",{staticClass:"index-font"},[e._v("首页")])],1),a("v-uni-view",{staticClass:"left-collect",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.isCollect.apply(void 0,arguments)}}},[a("v-uni-image",{staticClass:"index-img",attrs:{src:0==e.jewelryDetails.myFavorite?e.collect1:e.collect2,mode:"aspectFill"}}),a("v-uni-view",{staticClass:"index-font"},[e._v(e._s(0==e.jewelryDetails.myFavorite?"收藏":"已收藏"))])],1)],1),a("v-uni-view",{staticClass:"bottom-right",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.serviveClick.apply(void 0,arguments)}}},[a("v-uni-image",{attrs:{src:i("6f8e"),mode:"aspectFill"}})],1)],1)],1)},n=[]},"9c0e":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAmCAYAAAC29NkdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5MEI0NDQ3REZFM0YxMUVCOUI0RkI0MzQ4NDQ5NzA3NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5MEI0NDQ3RUZFM0YxMUVCOUI0RkI0MzQ4NDQ5NzA3NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjkwQjQ0NDdCRkUzRjExRUI5QjRGQjQzNDg0NDk3MDc3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjkwQjQ0NDdDRkUzRjExRUI5QjRGQjQzNDg0NDk3MDc3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ZeDQxgAAAkNJREFUeNrMmE8oLVEcx8d0EY+wIRYvInT92dwrFD1lQSGyQBYv5U82EhYXKaVsZWEjpVjJ277eSsnCTtm4NzbcDUUphaSXP9+T363pxDhz72/unFOf5twz05nPzDnnd353UsLhsMFc0sGz6sV+v9/2vMkslw22OTvkFhwDfaBaR0EfmKb6rI6Cv0ER1fstdS0EU0BIepuzOgn2gHKpbQTk6SI4/0lbBpjUQfAXCH5xbpJEPRW0m2u5YNRLQRHv2r+5JkSLxhPBOYVrRLgZ8EKw2MGNQ4lEf5WHKAQlJBU7Njh4QDEV9sAZiIILy/HWNsAimxFBtkC6ufX4E6QZ7pUHSThqqV/46OYboNPwpmSBGkIuEyblbt1gx9CnvIIh5IprPkvDILhPNG4xlP+gF3J/5VX8Rvncoodyj6AtJvdVmFki0bcky92BZsjtq8TBDRry1yTJ3YBGyB07CdQ7tHieXZYTIaUecqfx7CRiLrTS3HCjnJJcNJGt7lDMDZojnOWYhvWGYy8WnbUxyl2qPrSTZCGTUTAfPHFnM0FGwVRQxS0YYJ6DAZ3foHJ/qoI5oEznN8g9vLE+zWQLHoBh2h1YForJNF8ioAO0gE36yjClEOeCbr/BazAOasE/Kadbpb8MK/Q7rpExFRdIqdQmguwyta+DF5sUagZUgl23BOukpHaLVvSCgyTi3Pj4JCf6OrIKRiIRM1HBgCVpEEM5BK7iXLlHJNlHCynV+OZrrIrgD9AFmsAJU4j5Aypo+G3j67sAAwBeN25byUsIFwAAAABJRU5ErkJggg=="},"9ed1":function(e,t,i){"use strict";var a;i.d(t,"b",(function(){return r})),i.d(t,"c",(function(){return n})),i.d(t,"a",(function(){return a}));var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"uni-swiper__warp"},[e._t("default"),"default"===e.mode?i("v-uni-view",{key:"default",staticClass:"uni-swiper__dots-box",style:{bottom:e.dots.bottom+"px"}},e._l(e.info,(function(t,a){return i("v-uni-view",{key:a,staticClass:"uni-swiper__dots-item uni-swiper__dots-bar",style:{width:(a===e.current?2*e.dots.width:e.dots.width)+"px",height:e.dots.width/3+"px","background-color":a!==e.current?e.dots.backgroundColor:e.dots.selectedBackgroundColor,"border-radius":"0px"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.clickItem(a)}}})})),1):e._e(),"dot"===e.mode?i("v-uni-view",{key:"dot",staticClass:"uni-swiper__dots-box",style:{bottom:e.dots.bottom+"px"}},e._l(e.info,(function(t,a){return i("v-uni-view",{key:a,staticClass:"uni-swiper__dots-item",style:{width:e.dots.width+"px",height:e.dots.height+"px","background-color":a!==e.current?e.dots.backgroundColor:e.dots.selectedBackgroundColor,border:a!==e.current?e.dots.border:e.dots.selectedBorder},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.clickItem(a)}}})})),1):e._e(),"round"===e.mode?i("v-uni-view",{key:"round",staticClass:"uni-swiper__dots-box",style:{bottom:e.dots.bottom+"px"}},e._l(e.info,(function(t,a){return i("v-uni-view",{key:a,staticClass:"uni-swiper__dots-item ",class:[a===e.current&&"uni-swiper__dots-long"],style:{width:(a===e.current?3*e.dots.width:e.dots.width)+"px",height:e.dots.height+"px","background-color":a!==e.current?e.dots.backgroundColor:e.dots.selectedBackgroundColor,border:a!==e.current?e.dots.border:e.dots.selectedBorder},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.clickItem(a)}}})})),1):e._e(),"nav"===e.mode?i("v-uni-view",{key:"nav",staticClass:"uni-swiper__dots-box uni-swiper__dots-nav",style:{"background-color":e.dotsStyles.backgroundColor,bottom:"0"}},[i("v-uni-text",{staticClass:"uni-swiper__dots-nav-item",style:{color:e.dotsStyles.color}},[e._v(e._s(e.current+1+"/"+e.info.length+" "+e.info[e.current][e.field]))])],1):e._e(),"indexes"===e.mode?i("v-uni-view",{key:"indexes",staticClass:"uni-swiper__dots-box",style:{bottom:e.dots.bottom+"px"}},e._l(e.info,(function(t,a){return i("v-uni-view",{key:a,staticClass:"uni-swiper__dots-item uni-swiper__dots-indexes",style:{width:e.dots.width+"px",height:e.dots.height+"px",color:a===e.current?e.dots.selectedColor:e.dots.color,"background-color":a!==e.current?e.dots.backgroundColor:e.dots.selectedBackgroundColor,border:a!==e.current?e.dots.border:e.dots.selectedBorder},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.clickItem(a)}}},[i("v-uni-text",{staticClass:"uni-swiper__dots-indexes-text"},[e._v(e._s(a+1))])],1)})),1):e._e()],2)},n=[]},b564:function(e,t,i){var a=i("24fb");t=a(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.uni-swiper__warp[data-v-5b8fce3e]{display:flex;flex:1;flex-direction:column;position:relative;overflow:hidden}.uni-swiper__dots-box[data-v-5b8fce3e]{position:absolute;bottom:10px;left:0;right:0;display:flex;flex:1;flex-direction:row;justify-content:center;align-items:center}.uni-swiper__dots-item[data-v-5b8fce3e]{width:8px;border-radius:100px;margin-left:6px;background-color:rgba(0,0,0,.4);cursor:pointer}.uni-swiper__dots-item[data-v-5b8fce3e]:first-child{margin:0}.uni-swiper__dots-default[data-v-5b8fce3e]{border-radius:100px}.uni-swiper__dots-long[data-v-5b8fce3e]{border-radius:50px}.uni-swiper__dots-bar[data-v-5b8fce3e]{border-radius:50px}.uni-swiper__dots-nav[data-v-5b8fce3e]{bottom:0;height:40px;display:flex;flex:1;flex-direction:row;justify-content:flex-start;align-items:center;background-color:rgba(0,0,0,.2)}.uni-swiper__dots-nav-item[data-v-5b8fce3e]{\r\n  /* overflow: hidden;\r\n    text-overflow: ellipsis;\r\n    white-space: nowrap; */font-size:14px;color:#fff;margin:0 15px}.uni-swiper__dots-indexes[data-v-5b8fce3e]{display:flex;justify-content:center;align-items:center}.uni-swiper__dots-indexes-text[data-v-5b8fce3e]{color:#fff;font-size:12px}',""]),e.exports=t},bc08:function(e,t,i){var a=i("24fb");t=a(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.details-container[data-v-2d7ff8bc]{width:100%;background-color:#f9f9f9}.details-container .img-title[data-v-2d7ff8bc]{padding:%?20?% %?40?%;margin-bottom:%?10?%;display:flex;justify-content:space-between;align-items:center;background-color:#fff}.details-container .img-title .title-left[data-v-2d7ff8bc]{display:flex;align-items:center}.details-container .img-title .title-left .img-line[data-v-2d7ff8bc]{width:%?6?%;height:%?26?%;margin-right:%?10?%;background-color:#85dbd0;border-radius:60px}.details-container .img-title .title-left uni-text[data-v-2d7ff8bc]{font-size:%?28?%;color:#c3c3c3}.details-container .img-title .title-right[data-v-2d7ff8bc]{display:flex;align-items:center;color:#c3c3c3;font-size:%?28?%}.details-container .uni-swiper__dots-nav[data-v-2d7ff8bc]{justify-content:flex-end}.details-container .product-price[data-v-2d7ff8bc]{margin-top:%?10?%;padding:%?20?% %?40?%;text-align:left;background-color:#fff}.details-container .product-price .product-name[data-v-2d7ff8bc]{padding:%?16?% %?20?% 0 0}.details-container .product-price .product-name .name-one[data-v-2d7ff8bc]{display:flex;justify-content:space-between}.details-container .product-price .product-name .name-one uni-text[data-v-2d7ff8bc]{color:#303030;font-size:%?30?%}.details-container .product-parameter[data-v-2d7ff8bc]{margin-top:%?20?%;padding:%?30?% %?40?%;background-color:#fff;text-align:left}.details-container .product-parameter .parameter[data-v-2d7ff8bc]{font-size:%?26?%;font-weight:700;color:#303030}.details-container .product-parameter .parameter-line[data-v-2d7ff8bc]{height:%?4?%;margin-top:%?30?%;background-color:#f9f9f9;border-radius:5px}.details-container .product-parameter .infoItem .content[data-v-2d7ff8bc]{flex:1;text-align:right;text-decoration:underline}.details-container .product-parameter .parameter-every[data-v-2d7ff8bc]{margin-top:%?40?%;display:flex;justify-content:space-between;font-size:%?28?%;color:#c3c3c3}.details-container .product-comment[data-v-2d7ff8bc]{margin-top:%?20?%;padding-bottom:%?160?%;background-color:#fff}.details-container .product-bottom[data-v-2d7ff8bc]{position:fixed;bottom:0;left:0;right:0;padding:%?10?% %?20?% %?20?% %?60?%;display:flex;justify-content:space-between;background-color:#fff;border-top:1px solid #f9f9f9}.details-container .product-bottom .bottom-left[data-v-2d7ff8bc]{display:flex}.details-container .product-bottom .bottom-left .index-img[data-v-2d7ff8bc]{width:%?40?%;height:%?38?%}.details-container .product-bottom .bottom-left .index-font[data-v-2d7ff8bc]{margin-top:%?10?%;font-size:%?20?%}.details-container .product-bottom .bottom-left .left-collect[data-v-2d7ff8bc]{margin-left:%?60?%;text-align:center}.details-container .product-bottom .bottom-right[data-v-2d7ff8bc]{width:-webkit-fit-content;width:fit-content}.details-container .product-bottom .bottom-right uni-image[data-v-2d7ff8bc]{width:%?451?%;height:%?80?%;border-radius:%?10?%}.details-container .product-bottom .buy .buy-button[data-v-2d7ff8bc]{padding:%?20?% %?40?%;background-color:#85dbd0;color:#fff;font-size:%?26?%;border-radius:%?60?%}.details-container .product-bottom .buy .buy-details[data-v-2d7ff8bc]{padding:%?20?% %?20?% %?40?%;border-top-left-radius:%?30?%;border-top-right-radius:%?30?%;background-color:#fff}.details-container .product-bottom .buy .buy-details .close[data-v-2d7ff8bc]{display:flex;justify-content:flex-end}.details-container .product-bottom .buy .buy-details .close uni-image[data-v-2d7ff8bc]{width:%?32?%;height:%?32?%}.details-container .product-bottom .buy .buy-details .container[data-v-2d7ff8bc]{display:flex;justify-content:space-between}.details-container .product-bottom .buy .buy-details .container .buy-img[data-v-2d7ff8bc]{margin-right:%?20?%}.details-container .product-bottom .buy .buy-details .container .buy-img uni-image[data-v-2d7ff8bc]{width:%?200?%;height:%?200?%;border-radius:%?30?%}.details-container .product-bottom .buy .buy-details .container .buy-msg[data-v-2d7ff8bc]{padding:%?20?% %?50?% %?20?% 0;display:flex;flex-direction:column;justify-content:space-between}.details-container .product-bottom .buy .buy-details .container .buy-msg .name[data-v-2d7ff8bc]{font-size:%?28?%}.details-container .product-bottom .buy .buy-details .container .buy-msg .price[data-v-2d7ff8bc]{color:#ff8b62}.details-container .product-bottom .buy .buy-details .buy-number[data-v-2d7ff8bc]{display:flex;justify-content:space-between;margin:%?40?% 0;align-items:center}.details-container .product-bottom .buy .buy-details .buy-number uni-text[data-v-2d7ff8bc]{font-size:%?28?%}.details-container .product-bottom .buy .buy-details .buy-sure[data-v-2d7ff8bc]{width:100%;height:%?80?%;line-height:%?80?%;background-color:#85dbd0;color:#fff;font-size:%?26?%;text-align:center;border-radius:%?60?%}',""]),e.exports=t},dfa8:function(e,t,i){"use strict";var a=i("467e"),r=i.n(a);r.a},ef56:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAmCAYAAAC29NkdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCRTUyRDMyM0ZFM0YxMUVCQUNFN0Q2M0FDRTQ0NzQ3RiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCRTUyRDMyNEZFM0YxMUVCQUNFN0Q2M0FDRTQ0NzQ3RiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkJFNTJEMzIxRkUzRjExRUJBQ0U3RDYzQUNFNDQ3NDdGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkJFNTJEMzIyRkUzRjExRUJBQ0U3RDYzQUNFNDQ3NDdGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+nCFz/wAAAd9JREFUeNpiYKA+YGcYxIAXiFcOZgcWA/F/INYZjI5jAeKnUAcuGYwOTII6DoR/A7HUYHIcIxDfRHIgCE8aTA4MRHMcCH8DYsHB4sDTWBwIwg2DwXH2OBwHwu+BmHOgHbgdjwNBOG8gHadDwHH/oUUPy0A5cCkRDgThmIFwnAIQ/yXSgZcpKb8IASYglgRiRaijYLQFEGuRYNdeaFn5AIjvI9FvCTkQhMXRLEem5YCYjYYx8QXNwQ+Q2PdhzaPNREYVvXEOcjQuH0QOA6XteGzRPWsQOO4XEPvgSxN1A+g4UHp0JCbhpgLxPzo7DlQtGpKSuyJIKOcoxS+BWIOcIgCUFn7Q2HH3oUUa2cAamjZo4bjrQCxGjcLUEJpGqOm4c0AsQM0S34yKjnsCxNwMRNazxAIuKnoWFK3fqe1AEyo6kBWItantQGMqNxKMB3MIUt08fhoUMcep6UAnGjUKmKgVxcSmv4NAnAxtcFItoxADVhIIjatA7IVmeQERhXsitRx4B4cFL4A4HYiZcegD1RS90OjEpn8KrTIIaNylhdjaAAiUcMQCVTKKC5KBoDbiAgqG1kzQxnF+kVjUYQXlUMOOUHHkNBTazAKZq0epYU2E+ghkAlBXtgiIg/ApAggwAPbP2L+ZhoccAAAAAElFTkSuQmCC"},f032:function(e,t,i){"use strict";i.r(t);var a=i("73e7"),r=i.n(a);for(var n in a)"default"!==n&&function(e){i.d(t,e,(function(){return a[e]}))}(n);t["default"]=r.a},fef8:function(e,t,i){var a=i("bc08");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var r=i("4f06").default;r("d9af4f16",a,!0,{sourceMap:!1,shadowMode:!1})}}]);