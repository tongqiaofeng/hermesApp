export default class Chat{
	
	
	constructor(chatServerUrl, appID, userListRoute, userChatRoute, chatTabIdx){
		//帐号信息
		this.userId = '';
		this.token = '';
		this.cid = '';
		this.platform = uni.getSystemInfoSync().osName;
		this.userName = '';
		this.headPic = '';
		this.isUpdateUserInfo = false;
		
		//其他
		this.g_pingpangTimes = null;
		this.g_firstInit = true;
		this.g_socketTask = null;
		this.g_socketLiveTime = 0; //socket最后收到消息时间
		
		//初始化信息
		this.chatServerUrl = chatServerUrl;//'ws://127.0.0.1:8089/chat';
		this.appID = appID;//'TopTime';
		this.userListRoute = userListRoute;//'chat/list';
		this.userChatRoute = userChatRoute;//'chat/chat';
		this.chatTabIdx = chatTabIdx;
		
		//聊天信息
		this.userList = [];
		this.adminList = [];
		this.curChatUserId = '';
		
		//#ifdef APP-PLUS
		let pinf = plus.push.getClientInfo();
		this.cid = pinf.clientid; //客户端标识
		//#endif
		
		console.log(uni.getSystemInfoSync());
		
	}
	
	setUserInfo(userId, token, userName, headPic){
		if(userId.indexOf('tempChat') == -1){
			userId = this.appID + '_' + userId;
		}
		if(this.userId != userId || this.token != token){
			this.userId = userId;
			this.token = token;
			this.userName = userName;
			this.headPic = headPic;
			if(userId.length > 0)
				this.connectServer();
			else
				this.closeConnect();
				
			console.log(this.userId);
		}
	}
	
	//
	getUserList(){
		return this.userList;
	}
	
	isSelf(userId){
		//alert(this.userId + '_'+userId);
		if(this.userId == userId) return true;
		else return false;
	}
	
	setCurChatUserId(userId){
		this.curChatUserId = userId;
	}
	
	///连接服务器
	connectServer() {
		console.log('chat_connectServer');
		if (this.token == '') return;
		
		if (this.g_socketTask != null) {
			this.g_socketTask.close();
			this.g_socketTask = null;
		}
		this.g_firstInit = true;
		this.g_socketLiveTime = 0;
		this.isUpdateUserInfo = false;
	
		var that = this;
	
		this.g_socketTask = uni.connectSocket({
			url: this.chatServerUrl,
			success: (res) => {
				console.log('success' + res)
			},
			fail: (res) => {
				console.log('fail' + res)
			}
		});
	
		this.recvFromServer();
	
		uni.onSocketOpen(function(res) {
			console.log('WebSocket连接成功！', res);
			this.g_socketLiveTime = new Date().getTime();
			that.checkinServer();
	
			that.updateUserListCmd();
		});
	
		uni.onSocketError(function(res) {
			console.log('WebSocket连接失败');
			that.reConnectServer();
		});
	
		uni.onSocketClose(function() {
			console.log('WebSocket关闭');
			that.reConnectServer();
		})
	
		if (this.g_pingpangTimes == null) {
			this.g_pingpangTimes = setInterval(() => {
				that.checkinServer();
				let curTime = new Date().getTime();
				if ((curTime - this.g_socketLiveTime) / 1000 > 30) {
					//连续三次没收到心跳包，就重连
					that.connectServer();
				}
			}, 10000)
		}
		
	}
	
	closeConnect(){
		if (this.g_socketTask != null) {
			this.g_socketTask.close();
			this.g_socketTask = null;
		}
		if(this.g_pingpangTimes != null){
			clearInterval(this.g_pingpangTimes);
			this.g_pingpangTimes = null;
		}
		this.userId = '';
		this.token = '';
	}


	//重连
	reConnectServer() {
		this.g_socketLiveTime = 0;
	}	
	
	//发送心路包
	checkinServer() {
		var that = this;
		let msg = {
			type: "checkin",
			cid: this.cid
		}
		if(that.sendToServer(msg) == false){
			that.reConnectServer();
		}
	}
	
	//更新用户名和头像
	updateUserInfo() {
		if(this.isUpdateUserInfo == false){
			let msg = {
				type: "updateUserInfo",
				username: this.userName,
				head_pic: this.headPic,
				cid: this.cid,
				platform: this.platform,
			}
			
			this.sendToServer(msg);
		}
		
		
	}
	
	//处理接收到的消息
	recvFromServer() {
	
		uni.onSocketMessage((res) => {
			this.g_socketLiveTime = new Date().getTime();
			console.log('收到消息' + JSON.parse(res.data).type);
			var data = JSON.parse(res.data);
			if (data.type == 'checkin-success') {
				this.updateUserInfo();
			} else if (data.type == 'historyOverview') {
				data.msgList = [];
				this.userList.push(data);
			} else if (data.type == 'historyAdmin') {
				this.adminList.push(data);
			} else if (data.type == 'history') {
				let userIdx = this.findUser(this.curChatUserId);
				if (userIdx > -1) {
					this.userList[userIdx].msgList.unshift(data);
				}
			} else if (data.type == 'message') {
				//更新用户列表与消息列表
				this.recvNewMsg(data);
				this.updatePage('chat');
				this.updatePage('list');
	
			} else if (data.type == 'messageAdmin') {
				this.adminList.push(data);
			} else if (data.type == 'user') {
				//更新用户头像
				this.updateUserPic(data);
			} else if (data.type == 'historyOverview-end') {
				this.updatePage('list');
	
				if (this.g_firstInit == true) {
					let page = this.getCurPage();
					if (page == 'chat') {
						this.getMsgHistoryCmd(this.curChatUserId, false);
					}
				}
				this.g_firstInit = false;
			} else if (data.type == 'history-end') {
				this.updatePage('chat');
	
				let userIdx = this.findUser(this.curChatUserId);
				if (userIdx > -1) {
					if (this.userList[userIdx].num > 0)
						this.readMsgCmd(this.curChatUserId);
					this.userList[userIdx].msgListSendMark = true;
				}
			} else if (data.type == 'read-success') {
				this.readMsgSuccess(data);
				this.updatePage('list');
	
			} else if (data.type == 'delete-success') {
				this.updateMsgState(data);
				this.updatePage('list');
				this.updatePage('chat');
	
			} else if (data.type == 'deleteAdmin-success') {
				this.updateMsgState(data);
			} else if (data.type == 'updateUserInfo-success') {
				this.isUpdateUserInfo = true;
			}
		})
	}

//处理新消息
recvNewMsg(data) {
	let page = this.getCurPage();
	if (data.sender == this.userId) {
		//自己发的消息

		//更新用户列表
		let userIdx = this.findUser(data.receiver);
		if (userIdx > -1) {
			//更新该用户
			this.userList[userIdx].contentType = data.contentType;
			this.userList[userIdx].contentText = data.contentText;
			this.userList[userIdx].time = data.time;
			this.userList[userIdx].id = data.id;

			//判断是否是当前客户端发送的消息
			if (this.findMsg(userIdx, data.msgInfo)) {
				//当前登录端发的消息
				//更新消息状态
				this.updateMsgState(data);
			} else {
				//其他登录端发的消息
				//将消息添加到消息列表里
				data.type = 'history';
				data.readStatus = 0;
				this.userList[userIdx].msgList.push(data);
			}

			//把元素移动到前面
			if (userIdx > 0) {
				let user = this.userList[userIdx];
				this.userList.splice(userIdx, 1);
				this.userList.unshift(user);
			}


		} else {

		}
	} else {
		//别人发给我的消息
		//更新用户列表
		let userIdx = this.findUser(data.sender);
		let userName = data.sender;
		if (userIdx > -1) {
			userName = this.userList[userIdx].username;
			//用户列表已有该用户，更新该用户
			this.userList[userIdx].contentType = data.contentType;
			this.userList[userIdx].contentText = data.contentText;
			this.userList[userIdx].time = data.time;
			this.userList[userIdx].id = data.id;
			//将消息添加到消息列表里
			data.type = 'history';
			data.readStatus = 0;
			this.userList[userIdx].msgList.push(data);

			if (page == 'chat' && data.sender == this.curChatUserId) {
				//当前正在与该用户聊天
				//阅读消息
				data.readStatus = 0;
				this.readMsgCmd(this.curChatUserId);
				console.log("正在聊天")
			} else {
				data.readStatus = 1;
				let pages = getCurrentPages() // 获取栈实例
				let currentRoute = pages[pages.length - 1].route;
				++this.userList[userIdx].num;
			}

			//把元素移动到前面
			if (userIdx > 0) {
				let user = this.userList[userIdx];
				this.userList.splice(userIdx, 1);
				this.userList.unshift(user);
			}
		} else {
			//用户列表中没有该用户，将用户添加到用户列表中
			let user = {};
			user.type = 'historyOverview';
			user.userId = data.sender;
			user.num = 1;
			user.contentType = data.contentType;
			user.contentText = data.contentText;
			user.receiver = this.userId;
			user.time = data.time;
			user.username = null;
			user.head_pic = null;

			data.readStatus = 1
			user.msgList = [];
			user.msgList.push(data);
			this.userList.unshift(user);

			//获取用户头像
			this.getUserInfoCmd(data.sender);
		}
		//console.log("收到消息num",this.userList[userIdx])
		//console.log(userName);
		//uni.vibrateLong({});
		//#ifdef APP-PLUS
		if(getApp().globalData.isWithinProgram == false){
			let text = data.contentText;
			if(data.contentType == 1) text = '[图片]';
			plus.push.createMessage(text, "", { title: userName });
		}
		//#endif

	}
}

//根据msgInfo查找消息
findMsg(userIdx, msgInfo) {
	for (let i = this.userList[userIdx].msgList.length - 1, j = 0; i >= 0 && j < 20; --i, ++j) {
		if (this.userList[userIdx].msgList[i].readStatus == -1) {
			if (this.userList[userIdx].msgList[i].msgInfo == msgInfo) {
				return true;
			}
		}
	}

	return false;
}

//根据userId从UserList中查找用户
findUser(userId) {
	for (let i = 0; i < this.userList.length; ++i) {
		if (this.userList[i].userId == userId)
			return i;
	}
	return -1;
}
admin_findmsg(id) {
	console.log("查找系统id", this.adminList)
	for (let i = 0; i < this.adminList.length; ++i) {
		if (this.adminList[i].id == id)
			return i;
	}
	return -1;
}
//发送消息
sendToServer(msg) {
	
	msg.token = this.token;
	msg.appID = this.appID;

	//alert(JSON.stringify(msg)) 
	uni.sendSocketMessage({
		data: JSON.stringify(msg),
		success: function() {
			return true;
		},

		fail: function(res) {
			return false;
		}
	});
}

//发送提取用户列表命令
updateUserListCmd() {
	let msg = {
		type: "historyOverview",
	}
	console.log('chat_updateUserListCmd');
	this.userList = [];
	this.sendToServer(msg);
}
updateAdminListCmd() {
	let msg = {
		type: "historyAdmin",
	}
	this.adminList = [];
	this.sendToServer(msg);
}
deleteAdminList(data) {
	let msg = {
		type: "deleteAdmin",
		id: data.id
	}
	let index = this.admin_findmsg(data.id)
	this.adminList.splice(index, 1)
	this.sendToServer(msg);
}
sendAdminList(type, content) {
	let msg = {
		type: "messageAdmin",
		receiver: userId,
		contentType: type,
		contentText: content,
	}
	console.log('messageAdmin')
	this.sendToServer(msg);
}

updateUserMsg(userId) {
	let userIdx = this.findUser(userId);
	if (userIdx > -1) {
		if (this.userList[userIdx].msgList.length == 0 || !this.userList[userIdx]
			.msgListSendMark)
			this.getMsgHistoryCmd(userId, false);
		else{
			this.updatePage('chat');
		}

		if (this.userList[userIdx].num > 0)
			this.readMsgCmd(userId);
	}
}

//发送提取聊天记录命令:loadMore
getMsgHistoryCmd(userId, loadMore = true) {
	let msgStartId = 0;
	let userIdx = this.findUser(userId);
	if (userIdx > -1) {
		if (loadMore) {
			if (this.userList[userIdx].msgList.length > 0) {
				msgStartId = this.userList[userIdx].msgList[0].id;
			}
		} else {
			this.userList[userIdx].msgList = [];
		}

	}
	let msg = {
		type: "history",
		userId: userId,
		id: msgStartId,
		num: 20,
	}
	console.log('history')
	this.sendToServer(msg);
}

//给指定用户发送消息
sendMsgToUserCmd(userId, content, type) {
	let msg = {
		type: "message",
		receiver: userId,
		contentType: type,
		contentText: content,
		senderName: this.userName,
		msgInfo: this.getMsgUUID()
	}
	console.log('message')
	this.sendToServer(msg);

	let userIdx = this.findUser(userId);
	if (userIdx > -1) {
		var curDate = new Date();
		msg.type = 'history';
		msg.sender = this.userId;
		msg.time = curDate.toISOString();
		msg.readStatus = -1; //-1，发送中，-2，已撤销
		this.userList[userIdx].msgList.push(msg);
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
		msg.sender = this.userId;
		msg.time = curDate.toISOString();
		msg.readStatus = -1; //-1，发送中，-2，已撤销
		user.msgList.push(msg);
		this.userList.unshift(user);

		//获取用户头像
		this.getUserInfoCmd(user.receiver);
	}
}

//更新消息状态
updateMsgState(data) {
	if (data.type == 'message') {
		let userIdx = this.findUser(data.receiver);
		if (userIdx > -1) {
			for (let i = this.userList[userIdx].msgList.length - 1; i >= 0; --i) {
				if (this.userList[userIdx].msgList[i].readStatus == -1) {
					if (this.userList[userIdx].msgList[i].msgInfo == data.msgInfo) {
						this.userList[userIdx].msgList[i].readStatus = 0;
						this.userList[userIdx].msgList[i].id = data.id;
						console.log('发送成功');
						break;
					}
				}
			}
		}
	} else if (data.type == 'delete-success') {
		//删除消息
		let userIdx = this.findUser(data.sender);
		if (userIdx > -1) { //别人撤回
			for (let i = this.userList[userIdx].msgList.length - 1; i >= 0; --i) {
				if (this.userList[userIdx].msgList[i].id == data.id) {
					this.userList[userIdx].msgList[i].readStatus = -2;
					if (i == this.userList[userIdx].msgList.length - 1) {
						this.userList[userIdx].contentText = '[对方撤回了一条消息]';
					}
					break;
				}
			}
		}

		userIdx = this.findUser(data.receiver);
		if (userIdx > -1) { //自己撤回
			for (let i = this.userList[userIdx].msgList.length - 1; i >= 0; --i) {
				if (this.userList[userIdx].msgList[i].id == data.id) {
					this.userList[userIdx].msgList[i].readStatus = -2;
					if (i == this.userList[userIdx].msgList.length - 1) {
						this.userList[userIdx].contentText = '[你撤回了一条消息]';
					}
					break;
				}
			}
		}
	} else if (data.type == 'deleteAdmin-success') {
		//删除消息
		let userIdx = this.admin_findmsg(data.id);
		this.adminList.splice(userIdx, 1)
	}
}

//发送消息已读命令
readMsgCmd(userId) {
	let msg = {
		type: "read",
		userId: userId
	}
	console.log('read')
	this.sendToServer(msg);
}

//已阅读消息
readMsgSuccess(data) {
	let userIdx = this.findUser(data.userId);
	if (userIdx > -1) {
		this.userList[userIdx].num = 0;
	}
}

//删除消息命令
deleteMsgCmd(userId, msgId) {
	let msg = {
		type: "delete",
		receiver: userId,
		id: msgId
	}
	console.log('delete')
	this.sendToServer(msg);
}

//获取用户信息
getUserInfoCmd(userId) {
	let msg = {
		type: "user",
		userId: userId
	}
	console.log('read')
	this.sendToServer(msg);
}

//更新用户头像
updateUserPic(data) {
	let userIdx = this.findUser(data.id);
	if (userIdx > -1) {
		//更新该用户
		this.userList[userIdx].username = data.username;
		this.userList[userIdx].head_pic = data.head_pic;
	}
}

//获取当前页面
getCurPage() {
	var pages = getCurrentPages() // 获取栈实例
	let currentRoute = pages[pages.length - 1].route;
	if (currentRoute == this.userListRoute)
		return 'list';
	else if (currentRoute == this.userChatRoute)
		return 'chat';
	else
		return '';
}

//刷新页面
updatePage(page) {
	let curPage = this.getCurPage();
	if (curPage == page) {
		if (page == 'list') {
			uni.$emit('user-list-update', {});
		} else if (page == 'chat') {
			uni.$emit('user-msg-update', {});
		}
	}
	/* 
	let p = this.getCurPage();
	if(p == page){
		var pages = getCurrentPages();
		var curPage = pages[pages.length-1];
		curPage.flushData();
		
		uni.$emit('user-list-update', {});
	} */
}

getMsgUUID() {
	var s = [];
	var hexDigits = "0123456789abcdefABCDEFJKLMNXYZOP";
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 32), 1);
	}
	var uuid = s.join("");
	return uuid;
}

updateReddot() {
	let bRed = false;
	for (let i = 0; i < this.userList.length; ++i) {
		if (this.userList[i].num > 0) {
			bRed = true;
			break;
		}
	}

	if (bRed) {
		uni.showTabBarRedDot({
			index: this.chatTabIdx
		});
	} else {
		uni.hideTabBarRedDot({
			index: this.chatTabIdx
		});
	}
}

};