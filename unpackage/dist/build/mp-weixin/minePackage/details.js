(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["minePackage/details"],{"3d31":function(e,t,a){"use strict";var i=a("8aae"),n=a.n(i);n.a},"7cb0":function(e,t,a){"use strict";a.r(t);var i=a("e5bf"),n=a.n(i);for(var s in i)"default"!==s&&function(e){a.d(t,e,(function(){return i[e]}))}(s);t["default"]=n.a},"8aae":function(e,t,a){},a871:function(e,t,a){"use strict";(function(e){a("06ad");i(a("66fd"));var t=i(a("ac0a"));function i(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=a,e(t.default)}).call(this,a("543d")["createPage"])},ac0a:function(e,t,a){"use strict";a.r(t);var i=a("cddb"),n=a("7cb0");for(var s in n)"default"!==s&&function(e){a.d(t,e,(function(){return n[e]}))}(s);a("3d31");var r,o=a("f0c5"),c=Object(o["a"])(n["default"],i["b"],i["c"],!1,null,"a6112878",null,!1,i["a"],r);t["default"]=c.exports},cddb:function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return s})),a.d(t,"a",(function(){return i}));var i={uniSwiperDot:function(){return a.e("uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot").then(a.bind(null,"f128"))}},n=function(){var e=this,t=e.$createElement,a=(e._self._c,"admin"==e.role?e.formatNumberRgx(e.bagDetails.hkdPriceIndi):null),i="admin"==e.role?e.formatNumberRgx(e.bagDetails.priceIndi):null,n="admin"!=e.role?e.formatNumberRgx(e.bagDetails.hkdPriceIndi):null,s="admin"==e.role?e.ensignReSel(e.bagDetails.stockLoc):null,r=e.bagDetails.stockStat?e.bagDetails.stockStat.split("|"):null,o=(e.bagDetails.createTime||e.bagDetails.cost||e.bagDetails.pricePeer||e.bagDetails.note)&&e.bagDetails.cost?e.formatNumberRgx(e.bagDetails.hkdCost):null,c=(e.bagDetails.createTime||e.bagDetails.cost||e.bagDetails.pricePeer||e.bagDetails.note)&&e.bagDetails.cost&&"admin"==e.role?e.formatNumberRgx(e.bagDetails.cost):null,l=(e.bagDetails.createTime||e.bagDetails.cost||e.bagDetails.pricePeer||e.bagDetails.note)&&e.bagDetails.pricePeer&&0!=e.bagDetails.pricePeer?e.formatNumberRgx(e.bagDetails.hkdPricePeer):null,g=(e.bagDetails.createTime||e.bagDetails.cost||e.bagDetails.pricePeer||e.bagDetails.note)&&e.bagDetails.pricePeer&&0!=e.bagDetails.pricePeer&&"admin"==e.role?e.formatNumberRgx(e.bagDetails.pricePeer):null,u=""==e.bagDetails.soldTime&&0==e.bagDetails.priceTran&&""==e.bagDetails.customer||!e.bagDetails.priceTran?null:e.formatNumberRgx(e.bagDetails.hkdPriceTran),d=""==e.bagDetails.soldTime&&0==e.bagDetails.priceTran&&""==e.bagDetails.customer||!e.bagDetails.priceTran||"admin"!=e.role?null:e.formatNumberRgx(e.bagDetails.priceTran),m=""==e.bagDetails.soldTime&&0==e.bagDetails.priceTran&&""==e.bagDetails.customer||!e.bagDetails.priceTran?null:e.formatNumberRgx(e.bagDetails.hkdPriceTran-e.bagDetails.hkdCost),h=""==e.bagDetails.soldTime&&0==e.bagDetails.priceTran&&""==e.bagDetails.customer||!e.bagDetails.priceTran||"admin"!=e.role?null:e.formatNumberRgx(e.bagDetails.priceTran-e.bagDetails.cost);e.$mp.data=Object.assign({},{$root:{m0:a,m1:i,m2:n,m3:s,l0:r,m4:o,m5:c,m6:l,m7:g,m8:u,m9:d,m10:m,m11:h}})},s=[]},e5bf:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={data:function(){return{role:e.getStorageSync("role"),token:e.getStorageSync("token"),bagDetails:{},imgSrc:[],imgSrc2:[],dotsStyles:{width:6,height:6,backgroundColor:"#fff",border:"#fff",selectedBackgroundColor:"#b0edd5",selectedBorder:"#b0edd5"},current:0,current2:0,collect1:a("9172"),collect2:a("122e"),isShow:"0",detailId:null,share:{title:"PAULIANA 宝莉安娜高级珠宝",path:"/minePackage/details?id="+this.detailId,imageUrl:"",desc:"",content:""},buyAmount:1,commentText:"",comments:[{id:1,avatar:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Ffront%2F625%2Fw750h675%2F20181203%2FSpxg-hpfycet1340001.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632368686&t=d5b13d9d26b2d4e3c68869b7ebf9a0a2",nickname:"name#zzz",content:"我是评论。",addTime:"2021-07-02 16:32:07",isLike:"0",likeNums:26,layer:1,superNickname:null,superCommentId:null,children:[{id:2,avatar:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20181223%2F20%2F1545567880-shRzoBCgMS.jpeg&refer=http%3A%2F%2Fimage.biaobaiju.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632368686&t=f13fdaeeea26a9418a8e1f9c4a9871cb",nickname:"程序猿2",content:"我是回复。",addTime:"2021-07-04 16:36:07",isLike:"0",likeNums:23,layer:2,superNickname:"name#zzz",superCommentId:1},{id:3,avatar:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201412%2F29%2F20141229151653_HiM8B.thumb.700_0.jpeg&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632368686&t=61f92b50ef164aafbeb129dbdb18b369",nickname:"马老师",content:"我是回复的回复。",addTime:"2021-07-05 17:32:07",isLike:"1",likeNums:22,layer:3,superNickname:"程序猿2",superCommentId:1}]},{id:4,avatar:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171221%2F2a14e6b09df846a1908379c06045ba96.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632637245&t=c19e2df2da655bef5167ce9cf53ff77e",nickname:"昵称超长常常常常常长常常常常常",content:"我是评论2222。",addTime:"2021-05-02 12:12:17",isLike:"0",likeNums:23,layer:1,superNickname:null,superCommentId:null,children:[]}]}},onLoad:function(e){console.log("详情"),console.log(e.id),this.detailId=e.id,this.getDetails(e.id)},onReady:function(){this.hidePageNavInWechatBrowser()},onPullDownRefresh:function(){e.showLoading({title:"正在刷新"}),this.getDetails(this.detailId),e.stopPullDownRefresh()},onShareAppMessage:function(t){return this.share.path="/minePackage/details?id="+this.detailId,{title:this.share.title,path:this.share.path,imageUrl:this.share.imageUrl,desc:this.share.desc,content:this.share.content,success:function(t){e.showToast({title:"分享成功",icon:"none"})},fail:function(t){e.showToast({title:"分享失败",icon:"none"})}}},onShareTimeline:function(t){return this.share.path="/minePackage/details?id="+this.detailId,{title:this.share.title,path:this.share.path,imageUrl:this.share.imageUrl,desc:this.share.desc,content:this.share.content,success:function(t){e.showToast({title:"分享成功",icon:"none"})},fail:function(t){e.showToast({title:"分享失败",icon:"none"})}}},methods:{commentLike:function(e){console.log("返回点击的评论信息",e)},commentSend:function(e,t){console.log("发送",e,t)},lower:function(){console.log("到底了")},reply:function(e,t,a,i,n){console.log(e,t,a,i,n)},isShowChange:function(e){console.log(e),"0"==this.isShow?this.isShow="1":"1"==this.isShow&&(this.isShow="0")},swiperChange:function(e){this.current=e.detail.current},swiperChange2:function(e){this.current2=e.detail.current},imagePreview:function(t){e.previewImage({current:t,urls:this.imgSrc})},imagePreview2:function(t){e.previewImage({current:t,urls:this.imgSrc2})},getDetails:function(t){var a=this;e.showLoading({title:"加载中......"}),e.request({url:this.$baseFileUrl+"/stockInfo?id="+t,header:{"content-type":"application/json",token:e.getStorageSync("token")},success:function(t){e.hideLoading(),console.log("pppp"),console.log(t),a.bagDetails=t.data,e.setNavigationBarTitle({title:a.bagDetails.name});var i=t.data.pics.split("|");a.imgSrc=[];for(var n=0;n<i.length-1;n++)a.imgSrc.push(i[n].trim());if(a.imgSrc2=[],""!==t.data.privateImg&&null!==t.data.privateImg)for(var s=t.data.privateImg.split("|"),r=0;r<s.length-1;r++)a.imgSrc2.push(s[r].trim())},fail:function(t){e.hideLoading(),console.log(t)}})},goIndex:function(){e.switchTab({url:"../pages/index/index"})},isCollect:function(){var t=this;if(0==e.getStorageSync("token").length)e.showToast({title:"请登录",icon:"none",success:function(){e.switchTab({url:"../pages/mine/mine"})}});else{console.log("添加与取消收藏");var a=[];a.push({id:this.bagDetails.id,type:0}),e.request({method:"POST",url:this.$baseUrl+"/favoriteSave",data:{stockList:a},header:{token:e.getStorageSync("token")},complete:function(e){console.log("添加与取消收藏"),console.log(e),0!=t.checkBack(e,!0)&&t.getDetails(t.bagDetails.id)}})}},serviveClick:function(){e.navigateTo({url:"./service/service?id="+this.bagDetails.id})}}};t.default=i}).call(this,a("543d")["default"])}},[["a871","common/runtime","common/vendor"]]]);