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
		},
		onLaunch() {
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
		},
		onShow() {
			// uni.setTabBarBadge({
			// 	index: 2,
			// 	text: '5'
			// })
			console.log('App Show')
		},
		onHide() {
			console.log('App Hide')
		},
		methods: {
			// 获取用户信息
			getUserMsg() {
				let token = uni.getStorageSync('token');
				console.log('是否需要获取信息')
				console.log(token);

				if (token.length !== 0) {
					uni.request({
						url: this.$baseFileUrl + '/userMsg',
						method: 'GET',
						header: {
							'content-type': 'application/json',
							'token': token
						},
						complete: (ret) => {
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
