import Vue from 'vue'
import App from './App'
import store from './store';
import uView from '@/node_modules/uview-ui'
Vue.prototype.$store = store
Vue.use(uView)

Vue.config.productionTip = false

Vue.prototype.$baseUrl = 'http://192.168.0.164:8081/wechat/api';
Vue.prototype.$baseFileUrl = 'http://192.168.0.164:8081/stock';
Vue.prototype.$baseJewelleryUrl = 'http://192.168.0.164:8081/jewellery/api';

// Vue.prototype.$baseUrl = 'https://hk.wistechx.cn/HermesNewApi/wechat/api';
// Vue.prototype.$baseFileUrl = 'https://hk.wistechx.cn/HermesApi';
// Vue.prototype.$baseJewelleryUrl = 'https://hk.wistechx.cn/HermesNewApi/jewellery/api';

// H5跳转小程序，微信官方推出的开放标签<wx-open-launch-weapp>
Vue.config.ignoredElements.push('wx-open-launch-weapp')

Vue.prototype.checkBack = function(ret, bShwoTip = 1) {
	console.log('状态码判断')
	console.log(ret)
	if (ret.statusCode == 200) {
		return true;
	} else if (bShwoTip == 1) {
		if (ret.statusCode == 400)
			uni.showToast({
				icon: 'none',
				title: ret.data.message,
				duration: 2000
			});
		else if (ret.statusCode == 300)
			uni.showToast({
				icon: 'none',
				title: '请登录后再操作',
				duration: 2000
			});
		else
			uni.showToast({
				icon: 'none',
				title: "操作失败，请重试",
				duration: 2000
			});
	}

	return false;
}

Vue.prototype.$onLaunched = new Promise(resolve => {
	console.log('这是啥');
	console.log(resolve);
	Vue.prototype.$isResolve = resolve;
	// console.log()
	// uni.closeSocket()
	// getApp().globalData.userId = uni.getStorageSync('userId');
	// getApp().globalData.token = uni.getStorageSync('token');
	// this.chat_connectServer()
})

Vue.prototype.checkLogin = function() {
	console.log('要去登录')
	if (uni.getStorageSync('token').length == 0) {
		uni.showToast({
			title: '请先登录',
			icon: 'none'
		})
		uni.switchTab({
			url: '/pages/mine/mine'
		})
		return true
	} else {
		return false
	}
}

Vue.prototype.setUserInfo = function(ret) {
	console.log('用户信息')
	console.log(ret);
	if (ret.data.id == null)
		return;

	let userInfo = {};
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
	uni.setStorageSync("totalIntegral", userInfo.totalIntegral)

}

// 千分价格
Vue.prototype.formatNumberRgx = function(num) {
	if (num == "" || num == null || num == 0) {
		return 0;
	} else {
		let parts = num.toString().split(".");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return parts.join(".");
	}
}

// 国旗
Vue.prototype.ensignSel = function(currency) {
	// console.log(currency)
	switch (currency) {
		case "CNY":
			return require("./static/imgs/common/CN.png")
			break;
		case "HKD":
			return require("./static/imgs/common/HK.png")
			break;
		case "USD":
			return require("./static/imgs/common/mei.png")
			break;
		case "EUR":
			return require("./static/imgs/common/ou.png")
			break;
		case "GBP":
			return require("./static/imgs/common/ying.png")
			break;
		case "AUD":
			return require("./static/imgs/common/ao.png")
			break;
	}
}

// 币种
Vue.prototype.currencySel = function(currency) {
	// console.log(currency)
	switch (currency) {
		case "1":
			return "CNY"
			break;
		case "2":
			return "HKD"
			break;
		case "3":
			return "USD"
			break;
		case "4":
			return "EUR"
			break;
		case "5":
			return "GBP"
			break;
		case "6":
			return "AUD"
			break;
	}
}

/// 地区
Vue.prototype.regionSel = function(region) {
	// console.log(region)
	switch (region) {
		case "香港":
			return "HK"
			break;
		case "大陆":
			return "CN"
			break;
		case "金边":
			return "KH"
			break;
		case "海外":
			return "ABD"
			break;
		case "成都":
			return "CN"
			break;
		default:
			return "ABD"
			break;
	}
}

// 地区国旗
Vue.prototype.ensignReSel = function(region) {
	// console.log(region)
	switch (region) {
		case "大陆":
			return require("./static/imgs/common/CN.png")
			break;
		case "成都":
			return require("./static/imgs/common/CN.png")
			break;
		case "香港":
			return require("./static/imgs/common/HK.png")
			break;
		case "金边":
			return require("./static/imgs/common/KH.png")
			break;
		case "海外":
			return require("./static/imgs/common/mei.png")
			break;
		default:
			return require("./static/imgs/common/mei.png")
			break;
	}
}

Vue.prototype.getPrice = function(num, currency, noPrice) {
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
Vue.prototype.costPrice = function(num1, num2) {
	let sq1, sq2, multiple;
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
}

//判断浏览器是否是微信浏览器
//微信浏览器中打开H5隐藏顶部导航方法
Vue.prototype.hidePageNavInWechatBrowser = () => {
	//#ifdef H5
	if (navigator.userAgent.toLowerCase().match(/MicroMessenger/i) ==
		"micromessenger") {
		let pageNav = document.getElementsByTagName("uni-page-head");
		if (pageNav && pageNav[0]) {
			pageNav[0].style.display = "none";
		};
		return true
	}
	//#endif
};

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})

app.$mount()
var g_pingpangTimes = null;
var closeTimes = null;
var g_firstInit = true;
var settime = null;

//连接服务器
Vue.prototype.chat_connectServer = function() {

	console.log('token', getApp().globalData.token);
	let token = getApp().globalData.token;
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
		success: (res) => {
			console.log(res)
		},
		fail: (res) => {
			console.log(res)
		}
	});

	this.chat_recvFromServer();


	uni.onSocketOpen(function(res) {
		console.log('WebSocket连接成功！', res);
		if (closeTimes != null) {
			clearTimeout(closeTimes)
			closeTimes = null;
		}
		that.chat_checkinServer();
		g_pingpangTimes = setInterval(() => {
			that.chat_checkinServer()
		}, 30000);
		
		if(uni.getStorageSync('token') == '' || uni.getStorageSync('token') == null){
			clearInterval(g_pingpangTimes)
		}

		that.chat_updateUserListCmd();
	});

	uni.onSocketError(function(res) {
		console.log('WebSocket连接失败');
		closeTimes = setTimeout(() => {
			that.chat_connectServer();
		}, 4000)

	});

	uni.onSocketClose(function() {

	})
}

//发送心路包
Vue.prototype.chat_checkinServer = function() {
	var that = this;

	let msg = {
		type: "checkin",
		token: getApp().globalData.token,
		//#ifdef APP-PLUS
		cid: getApp().globalData.cid
		//#endif
	}
	uni.sendSocketMessage({
		data: JSON.stringify(msg),
		success: (res) => {
			console.log('发送心跳成功', res);
		},

		fail: (err) => {
			console.log("发送心跳失败", err)
			that.chat_connectServer();
		}
	});
}

//处理接收到的消息
Vue.prototype.chat_recvFromServer = function() {

	uni.onSocketMessage((res) => {
		console.log('我收到消息', JSON.parse(res.data))
		console.log('收到消息' + JSON.parse(res.data).type);
		// console.log("m--",getApp().globalData.userList)
		var data = JSON.parse(res.data);
		if (data.type == 'historyOverview') {
			data.msgList = [];
			getApp().globalData.userList.push(data);
		} else if (data.type == 'historyAdmin') {
			getApp().globalData.adminList.push(data);
		} else if (data.type == 'history') {
			let userIdx = this.chat_findUser(getApp().globalData.chatUserId);
			let temp = getApp().globalData.userList[userIdx].msgList
			if (userIdx > -1) {
				getApp().globalData.userList[userIdx].msgList = []
				temp.unshift(data);
				let obj = {};
				let peon = temp.reduce((cur, next) => {
					obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
					return cur;
				}, [])
				console.log(peon);
				getApp().globalData.userList[userIdx].msgList = peon
			}
		} else if (data.type == 'message') {
			//更新用户列表与消息列表
			// console.log("messagestart",getApp().globalData.userList)
			this.chat_recvNewMsg(data);
			this.chat_updatePage('chat');
			this.chat_updatePage('list');
			this.chat_reddot()
		} else if (data.type == 'messageAdmin') {
			getApp().globalData.adminList.push(data);
		} else if (data.type == 'user') {
			//更新用户头像
			this.chat_updateUserPic(data);
		} else if (data.type == 'historyOverview-end') {
			this.chat_updatePage('list');
			this.chat_reddot()
			if (g_firstInit == true) {
				let page = this.chat_getCurPage();
				if (page == 'chat') {
					this.chat_getMsgHistoryCmd(getApp().globalData.chatUserId, false, 0, 'notadd');
				}
			} else {
				g_firstInit = false;
			}

		} else if (data.type == 'history-end') {
			this.chat_updatePage('chat');
			let userIdx = this.chat_findUser(getApp().globalData.chatUserId);
			if (userIdx > -1) {
				if (getApp().globalData.userList[userIdx].num > 0)
					this.chat_readMsgCmd(getApp().globalData.chatUserId);
				getApp().globalData.userList[userIdx].msgListSendMark = true;
			}
		} else if (data.type == 'read-success') {
			this.chat_readMsgSuccess(data);
			this.chat_updatePage('list');
			this.chat_reddot()
		} else if (data.type == 'delete-success') {
			this.chat_updateMsgState(data);
			this.chat_updatePage('list');
			this.chat_updatePage('chat');
			this.chat_reddot()
		} else if (data.type == 'deleteAdmin-success') {
			this.chat_updateMsgState(data);
		}
	})
}

//处理新消息
Vue.prototype.chat_recvNewMsg = function(data) {
	let page = this.chat_getCurPage();
	uni.setStorageSync('addmore', false)
	if (data.sender == getApp().globalData.userId) {
		//自己发的消息
		if (true) {
			//当前登录端发的消息
			//更新用户列表
			let userIdx = this.chat_findUser(data.receiver);
			if (userIdx > -1) {
				//更新该用户
				getApp().globalData.userList[userIdx].contentType = data.contentType;
				getApp().globalData.userList[userIdx].contentText = data.contentText;
				getApp().globalData.userList[userIdx].time = data.time;
				getApp().globalData.userList[userIdx].id = data.id;
				//把元素移动到前面
				if (userIdx > 0) {
					let user = getApp().globalData.userList[userIdx];
					getApp().globalData.userList.splice(userIdx, 1);
					getApp().globalData.userList.unshift(user);
				}
			} else {

			}

			//更新消息状态
			this.chat_updateMsgState(data);

		} else {
			//其他登录端发的消息
		}
	} else {
		//别人发给我的消息
		//更新用户列表
		let userIdx = this.chat_findUser(data.sender);

		if (userIdx > -1) {
			//用户列表已有该用户，更新该用户
			getApp().globalData.userList[userIdx].contentType = data.contentType;
			getApp().globalData.userList[userIdx].contentText = data.contentText;
			getApp().globalData.userList[userIdx].time = data.time;
			getApp().globalData.userList[userIdx].id = data.id;
			//将消息添加到消息列表里
			data.type = 'history';
			// data.readStatus = 0;
			// getApp().globalData.userList[userIdx].msgList.push(data);

			if (page == 'chat' && data.sender == getApp().globalData.chatUserId) {
				//当前正在与该用户聊天
				//阅读消息
				data.readStatus = 0;
				this.chat_readMsgCmd(getApp().globalData.chatUserId);
				console.log("正在聊天")
				// getApp().globalData.msgbox=false;
				// uni.setStorageSync('msgbox',false)
				store.commit('changemsgbox', false)
			} else {
				data.readStatus = 1;
				let pages = getCurrentPages() // 获取栈实例
				let currentRoute = pages[pages.length - 1].route;
				++getApp().globalData.userList[userIdx].num;
				if (currentRoute == 'pages/message/chat/chat/chat')
					store.commit('changemsgbox', true)
				console.log("其他用户", getApp().globalData.userList[userIdx])
				// console.log('currentRoute',currentRoute)
				settime = setTimeout((() => {
					store.commit('changemsgbox', false)
				}), 3000)

			}

			getApp().globalData.userList[userIdx].msgList.push(data);
			// console.log("messageend",getApp().globalData.userList)
			//把元素移动到前面
			if (userIdx > 0) {
				let user = getApp().globalData.userList[userIdx];
				getApp().globalData.userList.splice(userIdx, 1);
				getApp().globalData.userList.unshift(user);
			}
		} else {
			//用户列表中没有该用户，将用户添加到用户列表中
			let user = {};
			user.type = 'historyOverview';
			user.userId = data.sender;
			user.num = 1;
			user.contentType = data.contentType;
			user.contentText = data.contentText;
			user.receiver = getApp().globalData.userId;
			user.time = data.time;
			user.username = null;
			user.head_pic = null;

			data.readStatus = 1
			user.msgList = [];
			user.msgList.push(data);
			getApp().globalData.userList.unshift(user);

			//获取用户头像
			this.chat_getUserInfoCmd(data.sender);
		}
		// console.log("收到消息num",getApp().globalData.userList[userIdx])
		uni.getSystemInfo({
			success(res) {
				if (res.platform == 'ios') {
					// plus.runtime.openURL("app-settings://");
				} else if (res.platform == 'android') {
					uni.vibrateShort({
						success: function() {
							console.log('success');
						}
					});
				}
			}
		})

	}
}

//根据userId从UserList中查找用户
Vue.prototype.chat_findUser = function(userId) {
	// console.log("查找",getApp().globalData.userList)
	for (let i = 0; i < getApp().globalData.userList.length; ++i) {
		if (getApp().globalData.userList[i].userId == userId)
			return i;
	}
	return -1;
}
Vue.prototype.admin_findmsg = function(id) {
	console.log("查找系统id", getApp().globalData.adminList)
	for (let i = 0; i < getApp().globalData.adminList.length; ++i) {
		if (getApp().globalData.adminList[i].id == id)
			return i;
	}
	return -1;
}
//发送消息
Vue.prototype.chat_sendToServer = function(msg) {
	uni.sendSocketMessage({
		data: JSON.stringify(msg),
		success: function(res) {
			console.log("发送成功", msg)
		},

		fail: function(res) {
			console.log("发送失败", res)
		}
	});
}

//发送提取用户列表命令
Vue.prototype.chat_updateUserListCmd = function() {
	let msg = {
		type: "historyOverview",
		token: getApp().globalData.token,
	}
	console.log('chat_updateUserListCmd', msg);
	getApp().globalData.userList = [];
	this.chat_sendToServer(msg);
}
Vue.prototype.chat_updateAdminListCmd = function() {
	let msg = {
		type: "historyAdmin",
		token: getApp().globalData.token,
	}
	console.log('chat_updateadminListCmd', msg);
	getApp().globalData.adminList = [];
	this.chat_sendToServer(msg);
}
Vue.prototype.chat_deleteAdminList = function(data) {
	let msg = {
		type: "deleteAdmin",
		token: getApp().globalData.token,
		id: data.id
	}
	console.log('chat_deleteAdminList', msg);
	let index = this.admin_findmsg(data.id)
	getApp().globalData.adminList.splice(index, 1)
	this.chat_sendToServer(msg);
}
Vue.prototype.chat_sendAdminList = function(type, content) {
	let msg = {
		type: "messageAdmin",
		token: getApp().globalData.token,
		receiver: userId,
		contentType: type,
		contentText: content,
	}
	console.log('messageAdmin')
	this.chat_sendToServer(msg);
}


Vue.prototype.chat_updateUserMsg = function(userId) {
	if (getApp().globalData.userList == undefined) getApp().globalData.userList = []
	let userIdx = this.chat_findUser(userId);
	console.log('chat_updateUserMsg', userId, userIdx)
	if (userIdx > -1) {
		console.log(getApp().globalData.userList[userIdx].msgList, !getApp().globalData.userList[userIdx]
			.msgListSendMark)
		if (getApp().globalData.userList[userIdx].msgList.length == 0 || !getApp().globalData.userList[userIdx]
			.msgListSendMark)
			this.chat_getMsgHistoryCmd(userId, false, 0, 'notadd');
		else
			this.chat_updatePage('chat');

		if (getApp().globalData.userList[userIdx].num > 0)
			this.chat_readMsgCmd(userId);
	}
}

//发送提取聊天记录命令:loadMore
Vue.prototype.chat_getMsgHistoryCmd = function(userId, loadMore = true, chatid, addmore) {
	let msgStartId = chatid;
	let userIdx = this.chat_findUser(userId);
	console.log("加载更多", addmore)
	if (addmore == 'add')
		uni.setStorageSync('addmore', true)
	else
		uni.setStorageSync('addmore', false)
	if (userIdx > -1 && loadMore) {
		if (getApp().globalData.userList[userIdx].msgList.length > 0) {
			msgStartId = getApp().globalData.userList[userIdx].msgList[0].id;
			// getApp().globalData.userList[userIdx].msgList=[]
			console.log(msgStartId)
		}
	}
	let msg = {
		type: "history",
		token: getApp().globalData.token,
		userId: userId,
		id: msgStartId,
		num: 20,
	}
	console.log('history')
	this.chat_sendToServer(msg);
}

//给指定用户发送消息
Vue.prototype.chat_sendMsgToUserCmd = function(userId, content, type) {
	let msg = {
		type: "message",
		token: getApp().globalData.token,
		receiver: userId,
		contentType: type,
		contentText: content,
	}
	console.log('message')
	this.chat_sendToServer(msg);

	let userIdx = this.chat_findUser(userId);
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
		let user = {};
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
}

//更新消息状态
Vue.prototype.chat_updateMsgState = function(data) {
	if (data.type == 'message') {
		let userIdx = this.chat_findUser(data.receiver);
		if (userIdx > -1) {
			for (let i = getApp().globalData.userList[userIdx].msgList.length - 1; i >= 0; --i) {
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
		let userIdx = this.chat_findUser(data.sender);
		if (userIdx > -1) { //别人撤回
			for (let i = getApp().globalData.userList[userIdx].msgList.length - 1; i >= 0; --i) {
				if (getApp().globalData.userList[userIdx].msgList[i].id == data.id) {
					console.log('消息已撤销', getApp().globalData.userList[userIdx].msgList[i])
					if (getApp().globalData.userList[userIdx].msgList[i].readStatus == 1) {
						let num = getApp().globalData.userList[userIdx].num
							--num
						getApp().globalData.userList[userIdx].num = num < 0 ? 0 : num
					}
					getApp().globalData.userList[userIdx].time = new Date().toISOString()
					getApp().globalData.userList[userIdx].msgList[i].readStatus = -2; //显示撤回

					if (i == getApp().globalData.userList[userIdx].msgList.length - 1) {
						getApp().globalData.userList[userIdx].contentText = '[对方撤回了一条消息]';
					}
					break;
				}
			}
			if (getApp().globalData.userList[userIdx].msgList.length == 0) {
				getApp().globalData.userList[userIdx].contentText = '[对方撤回了一条消息]';
				let num = getApp().globalData.userList[userIdx].num
					--num
				getApp().globalData.userList[userIdx].num = num < 0 ? 0 : num
				let msgListobj = {
					readStatus: -2,
					time: new Date().toISOString(),
					type: 'history',
					sender: data.sender
				}
				getApp().globalData.userList[userIdx].msgList[0] = msgListobj;
				getApp().globalData.userList[userIdx].time = new Date().toISOString()
			}
		}

		userIdx = this.chat_findUser(data.receiver);
		if (userIdx > -1) { //自己撤回
			for (let i = getApp().globalData.userList[userIdx].msgList.length - 1; i >= 0; --i) {
				if (getApp().globalData.userList[userIdx].msgList[i].id == data.id) {
					getApp().globalData.userList[userIdx].msgList[i].readStatus = -2;
					if (i == getApp().globalData.userList[userIdx].msgList.length - 1) {
						getApp().globalData.userList[userIdx].contentText = '[你撤回了一条消息]';
					}
					break;
				}
			}
		}
	} else if (data.type == 'deleteAdmin-success') {
		//删除消息
		let userIdx = this.admin_findmsg(data.id);
		getApp().globalData.adminList.splice(userIdx, 1)
	}
}

//发送消息已读命令
Vue.prototype.chat_readMsgCmd = function(userId) {
	let msg = {
		type: "read",
		token: getApp().globalData.token,
		userId: userId
	}
	console.log('read')
	this.chat_sendToServer(msg);
}

//已阅读消息
Vue.prototype.chat_readMsgSuccess = function(data) {
	let userIdx = this.chat_findUser(data.userId);
	if (userIdx > -1) {
		getApp().globalData.userList[userIdx].num = 0;
	}
}

//删除消息命令
Vue.prototype.chat_deleteMsgCmd = function(userId, msgId) {
	let msg = {
		type: "delete",
		token: getApp().globalData.token,
		receiver: userId,
		id: msgId
	}
	console.log('delete')
	console.log(msg);
	this.chat_sendToServer(msg);
}

//获取用户信息
Vue.prototype.chat_getUserInfoCmd = function(userId) {
	let msg = {
		type: "user",
		token: getApp().globalData.token,
		userId: userId
	}
	console.log('read')
	this.chat_sendToServer(msg);
}

//更新用户头像
Vue.prototype.chat_updateUserPic = function(data) {
	let userIdx = this.chat_findUser(data.id);
	if (userIdx > -1) {
		//更新该用户
		getApp().globalData.userList[userIdx].username = data.username;
		getApp().globalData.userList[userIdx].head_pic = data.head_pic;

		// getApp().globalData.msgbox=true;
		store.commit('changemsgbox', true)
		console.log("其他用户")
		// this.chat_updatePage('chat')
		settime = setTimeout((() => {
			store.commit('changemsgbox', false)
		}), 3000)

		// readIdx = this.chat_findUser(data.id);
		// if(readIdx > -1){
		// 	for(let i = getApp().globalData.userList[readIdx].msgList.length-1; i >= 0; --i){
		// getApp().globalData.userList[readIdx].msgList[i].readStatus=0}
		// }
	}
}

//获取当前页面
Vue.prototype.chat_getCurPage = function() {
	var pages = getCurrentPages() // 获取栈实例
	let currentRoute = pages[pages.length - 1].route;
	// console.log('currentRoute',currentRoute)
	if (currentRoute == 'pages/message/message')
		return 'list';
	else if (currentRoute == 'pages/message/chat/chat/chat')
		return 'chat';
	else
		return '';
}

//刷新页面
Vue.prototype.chat_updatePage = function(page) {
	let curPage = this.chat_getCurPage();
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
}
Vue.prototype.chat_reddot = function() {
	let redindex = this.findreddot()
	if (redindex > -1) {
		uni.showTabBarRedDot({
			index: 3
		})
	} else {
		uni.hideTabBarRedDot({
			index: 3
		})
	}
}
Vue.prototype.findreddot = function() {
	for (let i = 0; i < getApp().globalData.userList.length; ++i) {
		if (getApp().globalData.userList[i].num > 0)
			return i;
	}
	return -1;
}
