
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/classify/classify","pages/mine/mine","pages/index/details","pages/search/search","pages/mine/register","pages/mine/login","pages/mine/password","pages/mine/updateMyMsg","pages/mine/updatePhone","pages/service/service","pages/collectGoods/collectGoods","pages/footprint/footprint","pages/mine/inventory"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"","navigationBarBackgroundColor":"#f9f9f9","backgroundColor":"#f9f9f9"},"tabBar":{"color":"#c3c3c3","selectedColor":"#85dbd0","backgroundColor":"#FFFFFF","borderStyle":"black","list":[{"pagePath":"pages/index/index","text":"首页","iconPath":"static/imgs/tabBar/index.png","selectedIconPath":"static/imgs/tabBar/index01.png"},{"pagePath":"pages/classify/classify","text":"分类","iconPath":"static/imgs/tabBar/classify.png","selectedIconPath":"static/imgs/tabBar/classify01.png"},{"pagePath":"pages/mine/mine","text":"我的","iconPath":"static/imgs/tabBar/mine.png","selectedIconPath":"static/imgs/tabBar/mine01.png"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"包治百病","compilerVersion":"3.2.3","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"包治百病 BZBB.COM","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#85dbd0","enablePullDownRefresh":true,"navigationStyle":"custom","titleView":false}},{"path":"/pages/classify/classify","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"分类","enablePullDownRefresh":true}},{"path":"/pages/mine/mine","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","navigationStyle":"custom","titleView":false}},{"path":"/pages/index/details","meta":{},"window":{"navigationBarTitleText":"详情","enablePullDownRefresh":true,"titleView":false}},{"path":"/pages/search/search","meta":{},"window":{"navigationBarTitleText":"商品搜索","navigationBarBackgroundColor":"#fff","navigationStyle":"custom","enablePullDownRefresh":true,"titleView":false}},{"path":"/pages/mine/register","meta":{},"window":{"navigationBarTitleText":"注册","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#fff","navigationStyle":"custom","titleView":false}},{"path":"/pages/mine/login","meta":{},"window":{"navigationBarTitleText":"登录","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#fbfbfb","navigationStyle":"custom","titleView":false}},{"path":"/pages/mine/password","meta":{},"window":{"navigationBarTitleText":"重置密码","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#fbfbfb","navigationStyle":"custom","titleView":false}},{"path":"/pages/mine/updateMyMsg","meta":{},"window":{"navigationBarTitleText":"个人信息","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#f9f9f9","titleView":false}},{"path":"/pages/mine/updatePhone","meta":{},"window":{"navigationBarTitleText":"修改手机号","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#f9f9f9","titleView":false}},{"path":"/pages/service/service","meta":{},"window":{"navigationBarTitleText":"联系客服","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#f9f9f9","titleView":false}},{"path":"/pages/collectGoods/collectGoods","meta":{},"window":{"navigationBarTitleText":"商品收藏","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#f9f9f9","titleView":false,"bounce":"none"}},{"path":"/pages/footprint/footprint","meta":{},"window":{"navigationBarTitleText":"浏览记录","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#f9f9f9","titleView":false}},{"path":"/pages/mine/inventory","meta":{},"window":{"navigationBarTitleText":"库存查询","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#f9f9f9","enablePullDownRefresh":true,"titleView":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});