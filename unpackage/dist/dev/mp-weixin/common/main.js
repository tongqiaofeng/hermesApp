(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/main"],[
/* 0 */
/*!********************************************************!*\
  !*** G:/aa-tong/my-project/push-msg/hermesApp/main.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, createApp) {__webpack_require__(/*! uni-pages */ 5);var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ 6));
var _store = _interopRequireDefault(__webpack_require__(/*! ./store */ 12));
var _uviewUi = _interopRequireDefault(__webpack_require__(/*! @/node_modules/uview-ui */ 20));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
_vue.default.prototype.$store = _store.default;
_vue.default.use(_uviewUi.default);

_vue.default.config.productionTip = false;

_vue.default.prototype.$baseUrl = 'http://192.168.0.164:8081/wechat/api';
_vue.default.prototype.$baseFileUrl = 'http://192.168.0.164:8081/stock';
_vue.default.prototype.$baseJewelleryUrl = 'http://192.168.0.164:8081/jewellery/api';

// Vue.prototype.$baseUrl = 'https://hk.wistechx.cn/HermesNewApi/wechat/api';
// Vue.prototype.$baseFileUrl = 'https://hk.wistechx.cn/HermesApi';
// Vue.prototype.$baseJewelleryUrl = 'https://hk.wistechx.cn/HermesNewApi/jewellery/api';

// H5跳转小程序，微信官方推出的开放标签<wx-open-launch-weapp>
_vue.default.config.ignoredElements.push('wx-open-launch-weapp');

_vue.default.prototype.checkBack = function (ret) {var bShwoTip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  console.log('状态码判断');
  console.log(ret);
  if (ret.statusCode == 200) {
    return true;
  } else if (bShwoTip == 1) {
    if (ret.statusCode == 400)
    uni.showToast({
      icon: 'none',
      title: ret.data.message,
      duration: 2000 });else

    if (ret.statusCode == 300)
    uni.showToast({
      icon: 'none',
      title: '请登录后再操作',
      duration: 2000 });else


    uni.showToast({
      icon: 'none',
      title: "操作失败，请重试",
      duration: 2000 });

  }

  return false;
};

_vue.default.prototype.$onLaunched = new Promise(function (resolve) {
  console.log('这是啥');
  console.log(resolve);
  _vue.default.prototype.$isResolve = resolve;
  // console.log()
  // uni.closeSocket()
  // getApp().globalData.userId = uni.getStorageSync('userId');
  // getApp().globalData.token = uni.getStorageSync('token');
  // this.chat_connectServer()
});

_vue.default.prototype.checkLogin = function () {
  console.log('要去登录');
  if (uni.getStorageSync('token').length == 0) {
    uni.showToast({
      title: '请先登录',
      icon: 'none' });

    uni.switchTab({
      url: '/pages/mine/mine' });

    return true;
  } else {
    return false;
  }
};

_vue.default.prototype.setUserInfo = function (ret) {
  console.log('用户信息');
  console.log(ret);
  if (ret.data.id == null)
  return;

  var userInfo = {};
  userInfo.userId = ret.data.id;
  userInfo.userRole = ret.data.role;
  userInfo.userToken = ret.data.token;
  userInfo.userNick = ret.data.nick;
  userInfo.userHeadPic = ret.data.headPic;
  userInfo.phoneNumber = ret.data.username;
  userInfo.totalIntegral = ret.data.totalIntegral;

  console.log(userInfo);

  getApp().globalData.userInfo = userInfo;
  uni.setStorageSync('userId', userInfo.userId);
  uni.setStorageSync("token", userInfo.userToken);
  uni.setStorageSync("role", userInfo.userRole);
  uni.setStorageSync("nick", userInfo.userNick);
  uni.setStorageSync("headPic", userInfo.userHeadPic);
  uni.setStorageSync("phoneNumber", userInfo.phoneNumber);
  uni.setStorageSync("totalIntegral", userInfo.totalIntegral);

};

// 千分价格
_vue.default.prototype.formatNumberRgx = function (num) {
  if (num == "" || num == null || num == 0) {
    return 0;
  } else {
    var parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
};

// 国旗
_vue.default.prototype.ensignSel = function (currency) {
  // console.log(currency)
  switch (currency) {
    case "CNY":
      return __webpack_require__(/*! ./static/imgs/common/CN.png */ 143);
      break;
    case "HKD":
      return __webpack_require__(/*! ./static/imgs/common/HK.png */ 144);
      break;
    case "USD":
      return __webpack_require__(/*! ./static/imgs/common/mei.png */ 145);
      break;
    case "EUR":
      return __webpack_require__(/*! ./static/imgs/common/ou.png */ 146);
      break;
    case "GBP":
      return __webpack_require__(/*! ./static/imgs/common/ying.png */ 147);
      break;
    case "AUD":
      return __webpack_require__(/*! ./static/imgs/common/ao.png */ 148);
      break;}

};

// 币种
_vue.default.prototype.currencySel = function (currency) {
  // console.log(currency)
  switch (currency) {
    case "1":
      return "CNY";
      break;
    case "2":
      return "HKD";
      break;
    case "3":
      return "USD";
      break;
    case "4":
      return "EUR";
      break;
    case "5":
      return "GBP";
      break;
    case "6":
      return "AUD";
      break;}

};

/// 地区
_vue.default.prototype.regionSel = function (region) {
  // console.log(region)
  switch (region) {
    case "香港":
      return "HK";
      break;
    case "大陆":
      return "CN";
      break;
    case "金边":
      return "KH";
      break;
    case "海外":
      return "ABD";
      break;
    case "成都":
      return "CN";
      break;
    default:
      return "ABD";
      break;}

};

// 地区国旗
_vue.default.prototype.ensignReSel = function (region) {
  // console.log(region)
  switch (region) {
    case "大陆":
      return __webpack_require__(/*! ./static/imgs/common/CN.png */ 143);
      break;
    case "成都":
      return __webpack_require__(/*! ./static/imgs/common/CN.png */ 143);
      break;
    case "香港":
      return __webpack_require__(/*! ./static/imgs/common/HK.png */ 144);
      break;
    case "金边":
      return __webpack_require__(/*! ./static/imgs/common/KH.png */ 149);
      break;
    case "海外":
      return __webpack_require__(/*! ./static/imgs/common/mei.png */ 145);
      break;
    default:
      return __webpack_require__(/*! ./static/imgs/common/mei.png */ 145);
      break;}

};

_vue.default.prototype.getPrice = function (num, currency, noPrice) {
  // console.log(num)
  if (noPrice == undefined)
  noPrice = '--';
  if (num == null || num == "null" || num == "" || num == 0)
  return noPrice;

  num = String(num);

  var parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return currency + ' ' + parts.join(".");
};

// 利润
_vue.default.prototype.costPrice = function (num1, num2) {
  var sq1, sq2, multiple;
  try {
    sq1 = num1.toString().split(".")[1].length;
  } catch (e) {
    sq1 = 0;
  }
  try {
    sq2 = num2.toString().split(".")[1].length;
  } catch (e) {
    sq2 = 0;
  }
  multiple = Math.pow(10, Math.max(sq1, sq2) + 1);
  return (num1 * multiple - num2 * multiple) / multiple;
};

//判断浏览器是否是微信浏览器
//微信浏览器中打开H5隐藏顶部导航方法
_vue.default.prototype.hidePageNavInWechatBrowser = function () {










};

_App.default.mpType = 'app';

var app = new _vue.default(_objectSpread({
  store: _store.default },
_App.default));


createApp(app).$mount();
var g_pingpangTimes = null;
var closeTimes = null;
var g_firstInit = true;
var settime = null;

//连接服务器
_vue.default.prototype.chat_connectServer = function () {

  console.log('token', getApp().globalData.token);
  var token = getApp().globalData.token;
  if (token == '') return;
  if (g_pingpangTimes != null) {
    clearInterval(g_pingpangTimes);
    g_pingpangTimes = null;
  }

  var that = this;

  uni.connectSocket({
    // url: 'ws://hk.wistechx.cn/HermesNewApi:8090/chat',
    url: 'ws://192.168.0.164:8090/chat',
    //url: 'ws://test.wistechx.cn:8089/chat',
    success: function success(res) {
      console.log(res);
    },
    fail: function fail(res) {
      console.log(res);
    } });


  this.chat_recvFromServer();


  uni.onSocketOpen(function (res) {
    console.log('WebSocket连接成功！', res);
    if (closeTimes != null) {
      clearTimeout(closeTimes);
      closeTimes = null;
    }
    that.chat_checkinServer();
    g_pingpangTimes = setInterval(function () {
      that.chat_checkinServer();
    }, 30000);

    if (uni.getStorageSync('token') == '' || uni.getStorageSync('token') == null) {
      clearInterval(g_pingpangTimes);
    }

    that.chat_updateUserListCmd();
  });

  uni.onSocketError(function (res) {
    console.log('WebSocket连接失败');
    closeTimes = setTimeout(function () {
      that.chat_connectServer();
    }, 4000);

  });

  uni.onSocketClose(function () {

  });
};

//发送心路包
_vue.default.prototype.chat_checkinServer = function () {
  var that = this;

  var msg = {
    type: "checkin",
    token: getApp().globalData.token };




  uni.sendSocketMessage({
    data: JSON.stringify(msg),
    success: function success(res) {
      console.log('发送心跳成功', res);
    },

    fail: function fail(err) {
      console.log("发送心跳失败", err);
      that.chat_connectServer();
    } });

};

//处理接收到的消息
_vue.default.prototype.chat_recvFromServer = function () {var _this = this;

  uni.onSocketMessage(function (res) {
    console.log('我收到消息', JSON.parse(res.data));
    console.log('收到消息' + JSON.parse(res.data).type);
    // console.log("m--",getApp().globalData.userList)
    var data = JSON.parse(res.data);
    if (data.type == 'historyOverview') {
      data.msgList = [];
      getApp().globalData.userList.push(data);
    } else if (data.type == 'historyAdmin') {
      getApp().globalData.adminList.push(data);
    } else if (data.type == 'history') {
      var userIdx = _this.chat_findUser(getApp().globalData.chatUserId);
      var temp = getApp().globalData.userList[userIdx].msgList;
      if (userIdx > -1) {
        getApp().globalData.userList[userIdx].msgList = [];
        temp.unshift(data);
        var obj = {};
        var peon = temp.reduce(function (cur, next) {
          obj[next.id] ? "" : obj[next.id] =  true && cur.push(next);
          return cur;
        }, []);
        console.log(peon);
        getApp().globalData.userList[userIdx].msgList = peon;
      }
    } else if (data.type == 'message') {
      //更新用户列表与消息列表
      // console.log("messagestart",getApp().globalData.userList)
      _this.chat_recvNewMsg(data);
      _this.chat_updatePage('chat');
      _this.chat_updatePage('list');
      _this.chat_reddot();
    } else if (data.type == 'messageAdmin') {
      getApp().globalData.adminList.push(data);
    } else if (data.type == 'user') {
      //更新用户头像
      _this.chat_updateUserPic(data);
    } else if (data.type == 'historyOverview-end') {
      _this.chat_updatePage('list');
      _this.chat_reddot();
      if (g_firstInit == true) {
        var page = _this.chat_getCurPage();
        if (page == 'chat') {
          _this.chat_getMsgHistoryCmd(getApp().globalData.chatUserId, false, 0, 'notadd');
        }
      } else {
        g_firstInit = false;
      }

    } else if (data.type == 'history-end') {
      _this.chat_updatePage('chat');
      var _userIdx = _this.chat_findUser(getApp().globalData.chatUserId);
      if (_userIdx > -1) {
        if (getApp().globalData.userList[_userIdx].num > 0)
        _this.chat_readMsgCmd(getApp().globalData.chatUserId);
        getApp().globalData.userList[_userIdx].msgListSendMark = true;
      }
    } else if (data.type == 'read-success') {
      _this.chat_readMsgSuccess(data);
      _this.chat_updatePage('list');
      _this.chat_reddot();
    } else if (data.type == 'delete-success') {
      _this.chat_updateMsgState(data);
      _this.chat_updatePage('list');
      _this.chat_updatePage('chat');
      _this.chat_reddot();
    } else if (data.type == 'deleteAdmin-success') {
      _this.chat_updateMsgState(data);
    }
  });
};

//处理新消息
_vue.default.prototype.chat_recvNewMsg = function (data) {
  var page = this.chat_getCurPage();
  uni.setStorageSync('addmore', false);
  if (data.sender == getApp().globalData.userId) {
    //自己发的消息
    if (true) {
      //当前登录端发的消息
      //更新用户列表
      var userIdx = this.chat_findUser(data.receiver);
      if (userIdx > -1) {
        //更新该用户
        getApp().globalData.userList[userIdx].contentType = data.contentType;
        getApp().globalData.userList[userIdx].contentText = data.contentText;
        getApp().globalData.userList[userIdx].time = data.time;
        getApp().globalData.userList[userIdx].id = data.id;
        //把元素移动到前面
        if (userIdx > 0) {
          var user = getApp().globalData.userList[userIdx];
          getApp().globalData.userList.splice(userIdx, 1);
          getApp().globalData.userList.unshift(user);
        }
      } else {

      }

      //更新消息状态
      this.chat_updateMsgState(data);

    } else {}
  } else {
    //别人发给我的消息
    //更新用户列表
    var _userIdx2 = this.chat_findUser(data.sender);

    if (_userIdx2 > -1) {
      //用户列表已有该用户，更新该用户
      getApp().globalData.userList[_userIdx2].contentType = data.contentType;
      getApp().globalData.userList[_userIdx2].contentText = data.contentText;
      getApp().globalData.userList[_userIdx2].time = data.time;
      getApp().globalData.userList[_userIdx2].id = data.id;
      //将消息添加到消息列表里
      data.type = 'history';
      // data.readStatus = 0;
      // getApp().globalData.userList[userIdx].msgList.push(data);

      if (page == 'chat' && data.sender == getApp().globalData.chatUserId) {
        //当前正在与该用户聊天
        //阅读消息
        data.readStatus = 0;
        this.chat_readMsgCmd(getApp().globalData.chatUserId);
        console.log("正在聊天");
        // getApp().globalData.msgbox=false;
        // uni.setStorageSync('msgbox',false)
        _store.default.commit('changemsgbox', false);
      } else {
        data.readStatus = 1;
        var pages = getCurrentPages(); // 获取栈实例
        var currentRoute = pages[pages.length - 1].route;
        ++getApp().globalData.userList[_userIdx2].num;
        if (currentRoute == 'pages/message/chat/chat/chat')
        _store.default.commit('changemsgbox', true);
        console.log("其他用户", getApp().globalData.userList[_userIdx2]);
        // console.log('currentRoute',currentRoute)
        settime = setTimeout(function () {
          _store.default.commit('changemsgbox', false);
        }, 3000);

      }

      getApp().globalData.userList[_userIdx2].msgList.push(data);
      // console.log("messageend",getApp().globalData.userList)
      //把元素移动到前面
      if (_userIdx2 > 0) {
        var _user = getApp().globalData.userList[_userIdx2];
        getApp().globalData.userList.splice(_userIdx2, 1);
        getApp().globalData.userList.unshift(_user);
      }
    } else {
      //用户列表中没有该用户，将用户添加到用户列表中
      var _user2 = {};
      _user2.type = 'historyOverview';
      _user2.userId = data.sender;
      _user2.num = 1;
      _user2.contentType = data.contentType;
      _user2.contentText = data.contentText;
      _user2.receiver = getApp().globalData.userId;
      _user2.time = data.time;
      _user2.username = null;
      _user2.head_pic = null;

      data.readStatus = 1;
      _user2.msgList = [];
      _user2.msgList.push(data);
      getApp().globalData.userList.unshift(_user2);

      //获取用户头像
      this.chat_getUserInfoCmd(data.sender);
    }
    // console.log("收到消息num",getApp().globalData.userList[userIdx])
    uni.getSystemInfo({
      success: function success(res) {
        if (res.platform == 'ios') {
          // plus.runtime.openURL("app-settings://");
        } else if (res.platform == 'android') {
          uni.vibrateShort({
            success: function success() {
              console.log('success');
            } });

        }
      } });


  }
};

//根据userId从UserList中查找用户
_vue.default.prototype.chat_findUser = function (userId) {
  // console.log("查找",getApp().globalData.userList)
  for (var i = 0; i < getApp().globalData.userList.length; ++i) {
    if (getApp().globalData.userList[i].userId == userId)
    return i;
  }
  return -1;
};
_vue.default.prototype.admin_findmsg = function (id) {
  console.log("查找系统id", getApp().globalData.adminList);
  for (var i = 0; i < getApp().globalData.adminList.length; ++i) {
    if (getApp().globalData.adminList[i].id == id)
    return i;
  }
  return -1;
};
//发送消息
_vue.default.prototype.chat_sendToServer = function (msg) {
  uni.sendSocketMessage({
    data: JSON.stringify(msg),
    success: function success(res) {
      console.log("发送成功", msg);
    },

    fail: function fail(res) {
      console.log("发送失败", res);
    } });

};

//发送提取用户列表命令
_vue.default.prototype.chat_updateUserListCmd = function () {
  var msg = {
    type: "historyOverview",
    token: getApp().globalData.token };

  console.log('chat_updateUserListCmd', msg);
  getApp().globalData.userList = [];
  this.chat_sendToServer(msg);
};
_vue.default.prototype.chat_updateAdminListCmd = function () {
  var msg = {
    type: "historyAdmin",
    token: getApp().globalData.token };

  console.log('chat_updateadminListCmd', msg);
  getApp().globalData.adminList = [];
  this.chat_sendToServer(msg);
};
_vue.default.prototype.chat_deleteAdminList = function (data) {
  var msg = {
    type: "deleteAdmin",
    token: getApp().globalData.token,
    id: data.id };

  console.log('chat_deleteAdminList', msg);
  var index = this.admin_findmsg(data.id);
  getApp().globalData.adminList.splice(index, 1);
  this.chat_sendToServer(msg);
};
_vue.default.prototype.chat_sendAdminList = function (type, content) {
  var msg = {
    type: "messageAdmin",
    token: getApp().globalData.token,
    receiver: userId,
    contentType: type,
    contentText: content };

  console.log('messageAdmin');
  this.chat_sendToServer(msg);
};


_vue.default.prototype.chat_updateUserMsg = function (userId) {
  if (getApp().globalData.userList == undefined) getApp().globalData.userList = [];
  var userIdx = this.chat_findUser(userId);
  console.log('chat_updateUserMsg', userId, userIdx);
  if (userIdx > -1) {
    console.log(getApp().globalData.userList[userIdx].msgList, !getApp().globalData.userList[userIdx].
    msgListSendMark);
    if (getApp().globalData.userList[userIdx].msgList.length == 0 || !getApp().globalData.userList[userIdx].
    msgListSendMark)
    this.chat_getMsgHistoryCmd(userId, false, 0, 'notadd');else

    this.chat_updatePage('chat');

    if (getApp().globalData.userList[userIdx].num > 0)
    this.chat_readMsgCmd(userId);
  }
};

//发送提取聊天记录命令:loadMore
_vue.default.prototype.chat_getMsgHistoryCmd = function (userId) {var loadMore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var chatid = arguments.length > 2 ? arguments[2] : undefined;var addmore = arguments.length > 3 ? arguments[3] : undefined;
  var msgStartId = chatid;
  var userIdx = this.chat_findUser(userId);
  console.log("加载更多", addmore);
  if (addmore == 'add')
  uni.setStorageSync('addmore', true);else

  uni.setStorageSync('addmore', false);
  if (userIdx > -1 && loadMore) {
    if (getApp().globalData.userList[userIdx].msgList.length > 0) {
      msgStartId = getApp().globalData.userList[userIdx].msgList[0].id;
      // getApp().globalData.userList[userIdx].msgList=[]
      console.log(msgStartId);
    }
  }
  var msg = {
    type: "history",
    token: getApp().globalData.token,
    userId: userId,
    id: msgStartId,
    num: 20 };

  console.log('history');
  this.chat_sendToServer(msg);
};

//给指定用户发送消息
_vue.default.prototype.chat_sendMsgToUserCmd = function (userId, content, type) {
  var msg = {
    type: "message",
    token: getApp().globalData.token,
    receiver: userId,
    contentType: type,
    contentText: content };

  console.log('message');
  this.chat_sendToServer(msg);

  var userIdx = this.chat_findUser(userId);
  if (userIdx > -1) {
    var curDate = new Date();
    msg.type = 'history';
    msg.sender = getApp().globalData.userId;
    msg.time = curDate.toISOString();
    msg.readStatus = -1; //-1，发送中，-2，已撤销
    getApp().globalData.userList[userIdx].msgList.push(msg);
  } else {
    //与新用户聊天，用户列表中没有该用户，将用户添加到用户列表中
    var curDate = new Date();
    var user = {};
    user.type = 'historyOverview';
    user.userId = userId;
    user.num = 0;
    user.contentType = 0;
    user.contentText = content;
    user.receiver = userId;
    user.time = curDate.toISOString();
    user.username = null;
    user.head_pic = null;

    user.msgList = [];
    msg.type = 'history';
    msg.sender = getApp().globalData.userId;
    msg.time = curDate.toISOString();
    msg.readStatus = -1; //-1，发送中，-2，已撤销
    user.msgList.push(msg);
    getApp().globalData.userList.unshift(user);

    //获取用户头像
    this.chat_getUserInfoCmd(user.receiver);
  }
  // console.log("timeee",getApp().globalData.userList[userIdx].msgList)
};

//更新消息状态
_vue.default.prototype.chat_updateMsgState = function (data) {
  if (data.type == 'message') {
    var userIdx = this.chat_findUser(data.receiver);
    if (userIdx > -1) {
      for (var i = getApp().globalData.userList[userIdx].msgList.length - 1; i >= 0; --i) {
        if (getApp().globalData.userList[userIdx].msgList[i].readStatus == -1) {
          if (getApp().globalData.userList[userIdx].msgList[i].contentType == data.contentType &&
          getApp().globalData.userList[userIdx].msgList[i].contentText == data.contentText) {
            getApp().globalData.userList[userIdx].msgList[i].readStatus = 0;
            getApp().globalData.userList[userIdx].msgList[i].id = data.id;
            break;
          }
        }
      }
    }
  } else if (data.type == 'delete-success') {
    //删除消息
    var _userIdx3 = this.chat_findUser(data.sender);
    if (_userIdx3 > -1) {//别人撤回
      for (var _i = getApp().globalData.userList[_userIdx3].msgList.length - 1; _i >= 0; --_i) {
        if (getApp().globalData.userList[_userIdx3].msgList[_i].id == data.id) {
          console.log('消息已撤销', getApp().globalData.userList[_userIdx3].msgList[_i]);
          if (getApp().globalData.userList[_userIdx3].msgList[_i].readStatus == 1) {
            var num = getApp().globalData.userList[_userIdx3].num;
            --num;
            getApp().globalData.userList[_userIdx3].num = num < 0 ? 0 : num;
          }
          getApp().globalData.userList[_userIdx3].time = new Date().toISOString();
          getApp().globalData.userList[_userIdx3].msgList[_i].readStatus = -2; //显示撤回

          if (_i == getApp().globalData.userList[_userIdx3].msgList.length - 1) {
            getApp().globalData.userList[_userIdx3].contentText = '[对方撤回了一条消息]';
          }
          break;
        }
      }
      if (getApp().globalData.userList[_userIdx3].msgList.length == 0) {
        getApp().globalData.userList[_userIdx3].contentText = '[对方撤回了一条消息]';
        var _num = getApp().globalData.userList[_userIdx3].num;
        --_num;
        getApp().globalData.userList[_userIdx3].num = _num < 0 ? 0 : _num;
        var msgListobj = {
          readStatus: -2,
          time: new Date().toISOString(),
          type: 'history',
          sender: data.sender };

        getApp().globalData.userList[_userIdx3].msgList[0] = msgListobj;
        getApp().globalData.userList[_userIdx3].time = new Date().toISOString();
      }
    }

    _userIdx3 = this.chat_findUser(data.receiver);
    if (_userIdx3 > -1) {//自己撤回
      for (var _i2 = getApp().globalData.userList[_userIdx3].msgList.length - 1; _i2 >= 0; --_i2) {
        if (getApp().globalData.userList[_userIdx3].msgList[_i2].id == data.id) {
          getApp().globalData.userList[_userIdx3].msgList[_i2].readStatus = -2;
          if (_i2 == getApp().globalData.userList[_userIdx3].msgList.length - 1) {
            getApp().globalData.userList[_userIdx3].contentText = '[你撤回了一条消息]';
          }
          break;
        }
      }
    }
  } else if (data.type == 'deleteAdmin-success') {
    //删除消息
    var _userIdx4 = this.admin_findmsg(data.id);
    getApp().globalData.adminList.splice(_userIdx4, 1);
  }
};

//发送消息已读命令
_vue.default.prototype.chat_readMsgCmd = function (userId) {
  var msg = {
    type: "read",
    token: getApp().globalData.token,
    userId: userId };

  console.log('read');
  this.chat_sendToServer(msg);
};

//已阅读消息
_vue.default.prototype.chat_readMsgSuccess = function (data) {
  var userIdx = this.chat_findUser(data.userId);
  if (userIdx > -1) {
    getApp().globalData.userList[userIdx].num = 0;
  }
};

//删除消息命令
_vue.default.prototype.chat_deleteMsgCmd = function (userId, msgId) {
  var msg = {
    type: "delete",
    token: getApp().globalData.token,
    receiver: userId,
    id: msgId };

  console.log('delete');
  console.log(msg);
  this.chat_sendToServer(msg);
};

//获取用户信息
_vue.default.prototype.chat_getUserInfoCmd = function (userId) {
  var msg = {
    type: "user",
    token: getApp().globalData.token,
    userId: userId };

  console.log('read');
  this.chat_sendToServer(msg);
};

//更新用户头像
_vue.default.prototype.chat_updateUserPic = function (data) {
  var userIdx = this.chat_findUser(data.id);
  if (userIdx > -1) {
    //更新该用户
    getApp().globalData.userList[userIdx].username = data.username;
    getApp().globalData.userList[userIdx].head_pic = data.head_pic;

    // getApp().globalData.msgbox=true;
    _store.default.commit('changemsgbox', true);
    console.log("其他用户");
    // this.chat_updatePage('chat')
    settime = setTimeout(function () {
      _store.default.commit('changemsgbox', false);
    }, 3000);

    // readIdx = this.chat_findUser(data.id);
    // if(readIdx > -1){
    // 	for(let i = getApp().globalData.userList[readIdx].msgList.length-1; i >= 0; --i){
    // getApp().globalData.userList[readIdx].msgList[i].readStatus=0}
    // }
  }
};

//获取当前页面
_vue.default.prototype.chat_getCurPage = function () {
  var pages = getCurrentPages(); // 获取栈实例
  var currentRoute = pages[pages.length - 1].route;
  // console.log('currentRoute',currentRoute)
  if (currentRoute == 'pages/message/message')
  return 'list';else
  if (currentRoute == 'pages/message/chat/chat/chat')
  return 'chat';else

  return '';
};

//刷新页面
_vue.default.prototype.chat_updatePage = function (page) {
  var curPage = this.chat_getCurPage();
  // console.log('刷新页面',page,curPage)
  if (curPage == page) {
    if (page == 'list') {
      uni.$emit('user-list-update', {});
      // console.log("$emit--list")
    } else if (page == 'chat') {
      uni.$emit('user-msg-update', {});
      // console.log("$emit--chat")
    }
  }
  /* 
    let p = this.chat_getCurPage();
    if(p == page){
    	var pages = getCurrentPages();
    	var curPage = pages[pages.length-1];
    	curPage.flushData();
    	
    	uni.$emit('user-list-update', {});
    } */
};
_vue.default.prototype.chat_reddot = function () {
  var redindex = this.findreddot();
  if (redindex > -1) {
    uni.showTabBarRedDot({
      index: 3 });

  } else {
    uni.hideTabBarRedDot({
      index: 3 });

  }
};
_vue.default.prototype.findreddot = function () {
  for (var i = 0; i < getApp().globalData.userList.length; ++i) {
    if (getApp().globalData.userList[i].num > 0)
    return i;
  }
  return -1;
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createApp"]))

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/*!********************************************************!*\
  !*** G:/aa-tong/my-project/push-msg/hermesApp/App.vue ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ 7);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=scss& */ 9);
/* harmony import */ var _Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 11);
var render, staticRenderFns, recyclableRender, components
var renderjs





/* normalize component */

var component = Object(_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null,
  false,
  components,
  renderjs
)

component.options.__file = "App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 7 */
/*!*********************************************************************************!*\
  !*** G:/aa-tong/my-project/push-msg/hermesApp/App.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Download_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=script&lang=js& */ 8);
/* harmony import */ var _Download_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Download_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Download_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Download_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Download_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 8 */
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!G:/aa-tong/my-project/push-msg/hermesApp/App.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default =
{
  globalData: {
    testData: '全局变量',
    userInfo: {
      userId: 0,
      userRole: '',
      userToken: '',
      userNick: '',
      userHeadPic: '',
      phoneNumber: '' },

    isWithinProgram: true,
    cid: null },

  onLaunch: function onLaunch() {var _this = this;
    var token = uni.getStorageSync('token');
    if (token) {
      setTimeout(function () {
        getApp().globalData.token = token;
        getApp().globalData.userId = uni.getStorageSync('userId');
        /*在应用安装后第一次运行时应该调用5+ API的plus.push.getClientInfo方法获取客户端标识，
                                                                   并将此标识提交到开发者的业务服务器进行注册设备，以便在用户登录时可绑定设备，实现向登录用户推送专属消息。*/







        _this.chat_connectServer();
      }, 1000);
    }






















































































    // 获取小程序更新机制兼容 
    if (uni.canIUse('getUpdateManager')) {
      console.log('可更新');
      var updateManager = uni.getUpdateManager();
      // 检查是否有新版本发布
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          console.log('有新版本');
          //小程序有新版本，则静默下载新版本，做好更新准备
          updateManager.onUpdateReady(function () {
            uni.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              cancelText: "稍后进行",
              confirmText: "立即更新",
              confirmColor: "#85dbd0",
              success: function success(res) {
                if (res.confirm) {
                  //新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate();
                }
              } });

          });

          // 新的版本下载失败
          updateManager.onUpdateFailed(function () {
            uni.showModal({
              title: '温馨提示',
              content: '新版本已经上线，请您删除当前小程序，重新搜索打开' });

          });
        }
      });
    } else {
      console.log('不可更新');
      // 提示用户在最新版本的客户端上体验
      uni.showModal({
        title: '温馨提示',
        content: '当前微信版本过低，可能无法使用该功能，请升级到最新版本后重试~' });

    }


    this.getUserMsg();
    uni.onKeyboardHeightChange(function (res) {
      _this.$store.commit('changeKeyboardHeight', res.height);
      console.log('键盘高度变化', res);
    });
  },
  onShow: function onShow() {
    // 当 uni-app 启动，或从后台进入前台显示
    console.log("App Show");



  },
  onHide: function onHide() {
    // 当 uni-app 从前台进入后台
    console.log("App Hide");



  },
  methods: {
    // 获取用户信息
    getUserMsg: function getUserMsg() {var _this2 = this;
      var token = uni.getStorageSync('token');
      console.log('是否需要获取信息');
      // console.log(token);

      if (token.length !== 0) {
        uni.request({
          url: this.$baseFileUrl + '/userMsg',
          method: 'GET',
          header: {
            'content-type': 'application/json',
            'token': token },

          complete: function complete(ret) {
            console.log("tttt", ret, token);
            if (_this2.checkBack(ret, true) == true) {
              _this2.setUserInfo(ret);
              console.log('resolve');
              console.log(_this2.$isResolve());
              _this2.$isResolve();
            } else {
              _this2.$isResolve();
            }
          } });

      }
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 9 */
/*!******************************************************************************************!*\
  !*** G:/aa-tong/my-project/push-msg/hermesApp/App.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Download_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Download_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Download_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=style&index=0&lang=scss& */ 10);
/* harmony import */ var _Download_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Download_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Download_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Download_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Download_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Download_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Download_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Download_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Download_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Download_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Download_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Download_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Download_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Download_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Download_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 10 */
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!G:/aa-tong/my-project/push-msg/hermesApp/App.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })
],[[0,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/main.js.map