
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/classify/classify","pages/classify/classifyJewelry","pages/message/message","pages/message/chat/chat/chat","pages/mine/mine","pages/mine/login","jewelryPackage/jewelryFinished","jewelryPackage/jewelryMaterial","jewelryPackage/saleReport","jewelryPackage/jewelryDetails","jewelryPackage/materialDetails","minePackage/inventory","minePackage/collectGoods","minePackage/footprint","minePackage/password","minePackage/updateMyMsg","minePackage/updatePhone","minePackage/details","minePackage/integral","commonPackage/service/service","commonPackage/search/search","commonPackage/openWechat"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"","navigationBarBackgroundColor":"#f9f9f9","backgroundColor":"#f9f9f9"},"tabBar":{"color":"#c3c3c3","selectedColor":"#85dbd0","backgroundColor":"#FFFFFF","borderStyle":"black","list":[{"pagePath":"pages/index/index","text":"首页","iconPath":"static/imgs/tabBar/index.png","selectedIconPath":"static/imgs/tabBar/index01.png"},{"pagePath":"pages/classify/classify","text":"爱马仕","iconPath":"static/imgs/tabBar/classifyBag.png","selectedIconPath":"static/imgs/tabBar/classifyBag01.png"},{"pagePath":"pages/classify/classifyJewelry","text":"珠宝","iconPath":"static/imgs/tabBar/classify.png","selectedIconPath":"static/imgs/tabBar/classify01.png"},{"pagePath":"pages/message/message","text":"消息","iconPath":"static/imgs/tabBar/message.png","selectedIconPath":"static/imgs/tabBar/message01.png"},{"pagePath":"pages/mine/mine","text":"我的","iconPath":"static/imgs/tabBar/mine.png","selectedIconPath":"static/imgs/tabBar/mine01.png"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"PAULIANA","compilerVersion":"3.3.11","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"PAULIANA 宝莉安娜高级珠宝","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#85dbd0","enablePullDownRefresh":true,"navigationStyle":"custom","titleView":false}},{"path":"/pages/classify/classify","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"爱马仕","enablePullDownRefresh":true}},{"path":"/pages/classify/classifyJewelry","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"珠宝","enablePullDownRefresh":true}},{"path":"/pages/message/message","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"消息"}},{"path":"/pages/message/chat/chat/chat","meta":{},"window":{"enablePullDownRefresh":false,"navigationStyle":"custom","popGesture":"none"}},{"path":"/pages/mine/mine","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","navigationStyle":"custom","titleView":false}},{"path":"/pages/mine/login","meta":{},"window":{"navigationBarTitleText":"登录","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#fbfbfb","navigationStyle":"custom","titleView":false}},{"path":"/jewelryPackage/jewelryFinished","meta":{},"window":{"navigationBarTitleText":"珠宝成品库存查询","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#f9f9f9","enablePullDownRefresh":true,"navigationStyle":"custom","titleView":false}},{"path":"/jewelryPackage/jewelryMaterial","meta":{},"window":{"navigationBarTitleText":"珠宝原材料库存查询","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#f9f9f9","enablePullDownRefresh":true,"navigationStyle":"custom","titleView":false}},{"path":"/jewelryPackage/saleReport","meta":{},"window":{"navigationBarTitleText":"珠宝销售报表","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#f9f9f9","enablePullDownRefresh":true,"navigationStyle":"custom","titleView":false}},{"path":"/jewelryPackage/jewelryDetails","meta":{},"window":{"navigationBarTitleText":"成品详情","enablePullDownRefresh":true,"titleView":false}},{"path":"/jewelryPackage/materialDetails","meta":{},"window":{"navigationBarTitleText":"原材料详情","enablePullDownRefresh":true,"titleView":false}},{"path":"/minePackage/inventory","meta":{},"window":{"navigationBarTitleText":"爱马仕库存查询","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#f9f9f9","enablePullDownRefresh":true,"navigationStyle":"custom","titleView":false}},{"path":"/minePackage/collectGoods","meta":{},"window":{"navigationBarTitleText":"商品收藏","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#f9f9f9","enablePullDownRefresh":true,"titleView":false}},{"path":"/minePackage/footprint","meta":{},"window":{"navigationBarTitleText":"浏览记录","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#f9f9f9","enablePullDownRefresh":true,"titleView":false}},{"path":"/minePackage/password","meta":{},"window":{"navigationBarTitleText":"重置密码","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#fbfbfb","navigationStyle":"custom","titleView":false}},{"path":"/minePackage/updateMyMsg","meta":{},"window":{"navigationBarTitleText":"个人信息","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#f9f9f9","titleView":false}},{"path":"/minePackage/updatePhone","meta":{},"window":{"navigationBarTitleText":"修改手机号","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#f9f9f9","titleView":false}},{"path":"/minePackage/details","meta":{},"window":{"navigationBarTitleText":"详情","enablePullDownRefresh":true,"titleView":false}},{"path":"/minePackage/integral","meta":{},"window":{"navigationBarTitleText":"积分详情","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#f9f9f9","enablePullDownRefresh":true,"titleView":false}},{"path":"/commonPackage/service/service","meta":{},"window":{"navigationBarTitleText":"联系客服","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#f9f9f9","titleView":false}},{"path":"/commonPackage/search/search","meta":{},"window":{"navigationBarTitleText":"商品搜索","navigationBarBackgroundColor":"#fff","navigationStyle":"custom","enablePullDownRefresh":true,"titleView":false}},{"path":"/commonPackage/openWechat","meta":{},"window":{"navigationBarTitleText":"打开微信小程序","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#f9f9f9","titleView":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});