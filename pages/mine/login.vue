<template>
	<view class="login-main-container">
		<view class="login-container">
			<view class="login-tabs">
				<view class="phone-login" @click="selectLoginPhone">
					<view class="font"> 手机登录 </view>
					<view class="line" v-if="selectLogin == 0"></view>
				</view>
				<view class="psw-login" @click="selectLoginPsw">
					<view class="font"> 密码登录 </view>
					<view class="line" v-if="selectLogin == 1"></view>
				</view>
			</view>
			<view class="login-main" v-if="selectLogin == 0">
				<uni-forms ref="loginFormPhone" :modelValue="userData" :rules="loginPhoneRules">
					<uni-forms-item name="phoneNumber">
						<view>
							<text class="phone-num"> 手机号 </text>
							<view class="phone-main">
								<image class="phone-img" src="../../static/imgs/mine/login/phone.png" mode="aspectFill">
								</image>
								<view class="login-line"></view>
								<input type="text" class="phone-input" v-model="userData.phoneNumber"
									placeholder="请输入手机号" />
							</view>
						</view>
					</uni-forms-item>
					<uni-forms-item name="code">
						<view>
							<text class="phone-num code-code"> 验证码 </text>
							<view class="phone-main code-main">
								<view class="phone-main-left">
									<image style="width: 27rpx; margin-right: 3rpx" class="phone-img"
										src="../../static/imgs/mine/login/code.png" mode="aspectFill">
									</image>
									<view class="login-line"></view>
									<input type="text" class="phone-input" v-model="userData.code"
										placeholder="请输入验证码" />
								</view>
								<view class="phone-main-left">
									<view class="login-line"></view>
									<button type="text" size="mini" :plain="true" style="border: none;padding: 0;height: 17px;line-height: 17px;" @click="getCode"
										class="phone-num" :disabled="disable"
										:class="{ codeGeting: isGeting }">{{time}}</button>
								</view>
							</view>
						</view>
					</uni-forms-item>
				</uni-forms>
				<view class="login-button">
					<image src="../../static/imgs/mine/login/login.png" mode="aspectFill" @click="userLoginPhone">
					</image>
				</view>
				<navigator url="../../minePackage/register" hover-class="none" class="login-bottom">
					<text type="default">立即注册</text>
				</navigator>
			</view>
			<view class="login-main" v-else>
				<uni-forms ref="loginFormPsw" :modelValue="userData" :rules="loginPswRules">
					<uni-forms-item name="phoneNumber">
						<view>
							<text class="phone-num"> 账号 </text>
							<view class="phone-main">
								<image style="width: 28rpx; margin-right: 2rpx" class="phone-img"
									src="../../static/imgs/mine/login/user.png" mode="aspectFill">
								</image>
								<view class="login-line"></view>
								<input type="text" class="phone-input" v-model="userData.phoneNumber"
									placeholder="请输入账号" />
							</view>
						</view>
					</uni-forms-item>
					<uni-forms-item name="psw">
						<view>
							<text class="phone-num"> 密码 </text>
							<view class="phone-main">
								<image style="width: 22rpx; margin-right: 8rpx" class="phone-img"
									src="../../static/imgs/mine/login/psw.png" mode="aspectFill">
								</image>
								<view class="login-line"></view>
								<input type="password" class="phone-input" v-model="userData.psw" placeholder="请输入密码" />
							</view>
						</view>
					</uni-forms-item>
				</uni-forms>
				<view class="login-button">
					<image src="../../static/imgs/mine/login/login.png" mode="aspectFill" @click="userLoginPsw"></image>
				</view>
				<view class="register-psw">
					<navigator url="../../minePackage/register" hover-class="none" class="login-bottom">
						<text type="default">立即注册</text>
					</navigator>
					<navigator url="../../minePackage/password" hover-class="none" class="login-bottom">
						<text type="default" style="color: #000">忘记密码</text>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectLogin: 0,
				userData: {
					phoneNumber: "admin_hk",
					code: "",
					psw: "toptime22",
				},
				loginPhoneRules: {
					phoneNumber: {
						rules: [{
							required: true,
							errorMessage: "请输入手机号",
							trigger: "blur",
						}, ],
					},
					code: {
						rules: [{
							required: true,
							errorMessage: "请输入验证码",
							trigger: "blur",
						}, ],
					},
				},
				loginPswRules: {
					phoneNumber: {
						rules: [{
							required: true,
							errorMessage: "请输入账号",
							trigger: "blur",
						}, ],
					},
					psw: {
						rules: [{
							required: true,
							errorMessage: "请输入密码",
						}, ],
					},
				},
				time: '获取验证码',
				count: 59,
				isGeting: false,
				disable: false,
				countDown: null
			};
		},
		methods: {
			// 获取验证码
			getCode() {
				if (this.userData.phoneNumber == '') {
					uni.showToast({
						title: '请输入手机号/邮箱',
						icon: 'none'
					})
				} else {
					uni.showLoading({
						title: "验证码获取中..."
					})
					uni.request({
						method: 'GET',
						url: this.$baseUrl + '/smsCodeGet',
						header: {
							"content-type": "application/json"
						},
						data: {
							phoneNumber: this.userData.phoneNumber
						},
						complete: (res) => {
							uni.hideLoading();
							if (res.statusCode == 200) {
								this.countDown = setInterval(() => {
									if (this.count < 1) {
										this.isGeting = false;
										this.disable = false;
										this.time = "获取验证码";
										this.count = 59;
										console.log(this.time);
										clearInterval(this.countDown);
										this.countDown = null;
									} else {
										this.isGeting = true;
										this.disable = true;
										this.time = this.count-- + "s后可重发";
									}
								}, 1000);
							}
							if (this.checkBack(res, true) == false) return;

							this.$isResolve();
						}
					})
				}
			},
			// 手机登录
			userLoginPhone() {
				this.$refs.loginFormPhone
					.validate()
					.then((res) => {
						console.log("表单数据", res);
						uni.showLoading({
							title: "登录中......",
						});
						uni.request({
							method: "POST",
							url: this.$baseUrl + "/wechatLogin",
							header: {
								"content-type": "application/json",
							},
							data: {
								username: this.userData.phoneNumber,
								code: this.userData.code,
							},
							complete: (res) => {
								console.log("登录啦");
								console.log(res);
								uni.hideLoading();

								if (this.checkBack(res, true) == false) return;
								
								uni.setStorageSync("userAddress", JSON.stringify(res.data.address));

								this.setUserInfo(res);
								this.$isResolve();

								uni.switchTab({
									url: "./mine",
								});
								
								// #ifdef MP-WEIXIN
								uni.login({
									complete: (ret) => {
										console.log('code值');
										console.log(ret);
										uni.request({
											url: this.$baseUrl + "/getOpenId?jsCode=" + ret.code,
											header: {
												"content-type": "application/json",
												token: uni.getStorageSync('token')
											},
											complete: (rel) => {
												console.log('获取openID');
												console.log(rel);
											}
										})
									}
								})
								// #endif
							},
						});
					})
					.catch((err) => {
						console.log("表单错误", err);
					});
			},
			// 密码登录
			userLoginPsw() {
				this.$refs.loginFormPsw
					.validate()
					.then((res) => {
						console.log("表单数据", res);
						uni.showLoading({
							title: "登录中......",
						});
						uni.request({
							method: "POST",
							url: this.$baseUrl + "/wechatLogin",
							header: {
								"content-type": "application/json",
							},
							data: {
								username: this.userData.phoneNumber,
								psw: this.userData.psw,
							},
							complete: (res) => {
								console.log("登录啦");
								console.log(res);
								uni.hideLoading();

								if (this.checkBack(res, true) == false) return;
								
								uni.setStorageSync("userAddress", JSON.stringify(res.data.address));

								this.setUserInfo(res);
								this.$isResolve();

								uni.switchTab({
									url: "./mine",
								});
								
								// #ifdef MP-WEIXIN
								uni.login({
									complete: (ret) => {
										console.log('code值');
										console.log(ret);
										uni.request({
											url: this.$baseUrl + "/getOpenId?jsCode=" + ret.code,
											header: {
												"content-type": "application/json",
												token: uni.getStorageSync('token')
											},
											complete: (rel) => {
												console.log('获取openID');
												console.log(rel);
											}
										})
									}
								})
								// #endif
							},
						});
					})
					.catch((err) => {
						console.log("表单错误", err);
					});
			},
			// 手机登录
			selectLoginPhone(e) {
				console.log(e);
				this.selectLogin = 0;
			},
			// 密码登录
			selectLoginPsw() {
				this.selectLogin = 1;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.login-main-container {
		height: 100vh;
		background-color: #fbfbfb;

		.login-container {
			padding: 0 60rpx;
			padding-top: 150rpx;

			.login-tabs {
				display: flex;
				justify-content: space-between;

				.phone-login,
				.psw-login {
					width: 50%;
				}

				.font {
					text-align: center;
					color: #000;
					font-size: 28rpx;
					font-weight: bold;
				}
			}

			.line {
				width: 65rpx;
				height: 5rpx;
				margin: 0 auto;
				margin-top: 17rpx;
				background-color: #85dbd0;
				border-radius: 30rpx;
			}

			.login-main {
				margin-top: 70rpx;

				.phone-num {
					color: #000;
					font-size: 26rpx;
				}

				.codeGeting {
					color: #c3c3c3;
				}

				.code-code {
					margin-top: 40rpx;
				}

				.phone-main {
					// height: 40rpx;
					padding: 20rpx;
					margin-top: 26rpx;
					display: flex;
					align-items: center;
					background-color: #fff;
					border-radius: 20rpx;

					.phone-img {
						width: 30rpx;
						height: 30rpx;
					}

					.login-line {
						width: 2rpx;
						height: 40rpx;
						margin: 0 20rpx;
						background-color: #c3c3c3;
					}

					.phone-input {
						flex: 1;
						font-size: 26rpx;
						color: #c3c3c3;
					}
				}

				.code-main {
					justify-content: space-between;

					.phone-main-left {
						display: flex;
						align-items: center;
					}
				}

				.login-bottom {
					width: fit-content;

					text {
						font-size: 24rpx;
						color: #85dbd0;
					}
				}

				.register-psw {
					display: flex;
					justify-content: space-between;
				}
			}

			.login-button {
				width: 630rpx;
				margin: 0 auto;
				margin-top: 70rpx;

				image {
					width: 630rpx;
					height: 125rpx;
				}
			}
		}
	}
</style>
