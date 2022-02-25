<script>
	export default {
		globalData: {
			testData: '全局变量',
			userInfo: {
				userId: 0,
				userRole: '',
				userToken: '',
				userNick: '',
				userHeadPic: '',
				phoneNumber: ''
			},
			isWithinProgram: true,
			cid: null
		},
		onLaunch() {
			let token = uni.getStorageSync('token');
			if (token) {
				setTimeout(() => {
					getApp().globalData.token = token;
					getApp().globalData.userId = uni.getStorageSync('userId');
					/*在应用安装后第一次运行时应该调用5+ API的plus.push.getClientInfo方法获取客户端标识，
					并将此标识提交到开发者的业务服务器进行注册设备，以便在用户登录时可绑定设备，实现向登录用户推送专属消息。*/
					//#ifdef APP-PLUS
					let pinf = plus.push.getClientInfo();
					let cid = pinf.clientid; //客户端标识
					console.log('客户端标识', cid);
					getApp().globalData.cid = cid;
					//#endif

					this.chat_connectServer();
				}, 1000)
			}
			//#ifdef APP-PLUS  
			console.log('APP升级更新');
			console.log(plus.runtime);
			// "appid": plus.runtime.appid
			let type = uni.getSystemInfoSync().platform;
			let version = plus.runtime.version.split('.').join('');

			let req = { //升级检测数据  
				type: type
			};

			uni.request({
				url: this.$baseUrl + "/versionGet",
				data: req,
				success: (res) => {
					console.log('APP升级更新信息获取成功');
					console.log(res);
					if (res.data.version != version) {
						uni.showModal({ //提醒用户更新  
							title: "更新提示",
							content: "新版本已经准备好，是否立即更新？",
							cancelText: "稍后进行",
							confirmText: "立即更新",
							confirmColor: "#85dbd0",
							success: (ret) => {
								if (ret.confirm) {
									plus.runtime.openURL(res.data.url);
								}
							}
						})
					}
				}
			})

			// 监听点击通知栏消息事件
			plus.push.addEventListener("click", (message) => {
				console.log('点击通知栏消息进行对应跳转', message);

				// 清空系统通知栏中该应用的所有通知消息
				plus.push.clear();
			});
			// 透传消息： 即自定义消息，UniPush推送服务只负责消息传递，不做任何处理，客户端在接收到透传消息后需要自己去处理消息的展示方式或后续动作。
			// 监听接收透传消息事件，透传消息在系统通知栏中不显示，前端要进行显示处理
			plus.push.addEventListener("receive", (message) => {
				console.log('透传消息');
				console.log(message);

				// 判断不在app内，应用后台运行，创建本地消息并添加到系统通知栏
				if (plus.os.name != 'iOS') {
					if (getApp().globalData.isWithinProgram == false) {
						console.log('正式透传消息要不在应用内进行消息显示');
						// content: ( String ) 必选
						// 消息显示的内容，在系统通知中心中显示的文本内容。
						// payload: ( String ) 可选
						// 消息承载的数据，可根据业务逻辑自定义数据格式。
						// options: ( MessageOptions ) 可选
						// 创建消息的额外参数，参考MessageOptions。
						// (content, payload, option);

						let msg = JSON.parse(message.content).contentText;
						let options = {
							cover: false, // 不覆盖上一次提示的消息
							sound: 'system', // 使用系统提示音
							title: message.title
						};

						plus.push.createMessage(msg, message.payload, options);
					}
				}


				// if (message.aps) {
				//   // Apple APNS message
				//   // APNS下发的消息，应用在前台,要是要显示消息，要通过plus.push.createMessage创建本地消息，应用在后台未离线会自动创建
				// } else if ("LocalMSG" == message.payload) {
				//   // 特殊payload标识本地创建的消息
				//   // 本地创建的消息，通常不需要处理
				//   // 注意：不要在这种情况下在此调用plus.push.createMessage，从而引起循环创建本地消息
				// } else {
				//   // 接收到在线透传消息
				// }
			});
			//#endif  


			// #ifdef MP-WEIXIN 
			// 获取小程序更新机制兼容 
			if (uni.canIUse('getUpdateManager')) {
				console.log('可更新')
				const updateManager = uni.getUpdateManager()
				// 检查是否有新版本发布
				updateManager.onCheckForUpdate(function(res) {
					if (res.hasUpdate) {
						console.log('有新版本')
						//小程序有新版本，则静默下载新版本，做好更新准备
						updateManager.onUpdateReady(function() {
							uni.showModal({
								title: '更新提示',
								content: '新版本已经准备好，是否重启应用？',
								cancelText: "稍后进行",
								confirmText: "立即更新",
								confirmColor: "#85dbd0",
								success: (res) => {
									if (res.confirm) {
										//新的版本已经下载好，调用 applyUpdate 应用新版本并重启
										updateManager.applyUpdate()
									}
								}
							})
						})

						// 新的版本下载失败
						updateManager.onUpdateFailed(function() {
							uni.showModal({
								title: '温馨提示',
								content: '新版本已经上线，请您删除当前小程序，重新搜索打开',
							})
						})
					}
				})
			} else {
				console.log('不可更新')
				// 提示用户在最新版本的客户端上体验
				uni.showModal({
					title: '温馨提示',
					content: '当前微信版本过低，可能无法使用该功能，请升级到最新版本后重试~'
				})
			}
			//#endif 

			this.getUserMsg();
			uni.onKeyboardHeightChange(res => {
				this.$store.commit('changeKeyboardHeight', res.height)
				console.log('键盘高度变化', res)
			})
		},
		onShow: () => {
			// 当 uni-app 启动，或从后台进入前台显示
			console.log("App Show");
			//#ifdef APP-PLUS
			getApp().globalData.isWithinProgram = true;
			//#endif
		},
		onHide: () => {
			// 当 uni-app 从前台进入后台
			console.log("App Hide");
			//#ifdef APP-PLUS
			getApp().globalData.isWithinProgram = false;
			//#endif
		},
		methods: {
			// 获取用户信息
			getUserMsg() {
				let token = uni.getStorageSync('token');
				console.log('是否需要获取信息')
				// console.log(token);

				if (token.length !== 0) {
					uni.request({
						url: this.$baseFileUrl + '/userMsg',
						method: 'GET',
						header: {
							'content-type': 'application/json',
							'token': token
						},
						complete: (ret) => {
							console.log("tttt", ret, token)
							if (this.checkBack(ret, true) == true) {
								this.setUserInfo(ret);
								console.log('resolve');
								console.log(this.$isResolve())
								this.$isResolve();
							} else {
								this.$isResolve();
							}
						},
					})
				}
			}
		},
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/node_modules/uview-ui/index.scss";
	@import "./common/free.css";
	@import "./common/common.css";
	/* #infdef APP-PLUS-NVUE */
	@import "./common/free-icon.css";

	image {
		will-change: transform
	}

	.no-data {
		padding-top: 450rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		image {
			width: 222rpx;
			height: 152rpx;
		}

		text {
			margin-top: 40rpx;
			font-size: 26rpx;
			color: #c8c8c8;
		}
	}

	.uni-searchbar__box {
		border-radius: 30px !important;
		border: 0.5px solid #f8f8f8 !important;
	}

	/* #ifdef H5 */
	checkbox .uni-checkbox-input {
		border-radius: 50% !important;
	}

	uni-checkbox:not([disabled]) .uni-checkbox-input:hover {
		border-color: #85dbd0 !important;
	}

	checkbox .uni-checkbox-input.uni-checkbox-input-checked {
		border: 1px solid #85dbd0 !important;
	}

	/* #endif */

	/* #ifdef APP-PLUS || MP-WEIXIN */
	checkbox .wx-checkbox-input {
		border-radius: 50% !important;
	}

	uni-checkbox:not([disabled]) .wx-checkbox-input:hover {
		border-color: #85dbd0 !important;
	}

	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		border: 1px solid #85dbd0 !important;
	}

	/* #endif */
</style>
