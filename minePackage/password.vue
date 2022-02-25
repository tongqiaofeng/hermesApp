<template>
	<view class="password-container-main">
		<view class="password-container">
			<view class="psw-font">
				<text>忘记密码</text>
				<view class="psw-line"></view>
			</view>
			<view class="login-main">
				<uni-forms ref="pswForm" :modelValue="pswData" :rules="pswRules">
					<uni-forms-item name="phoneNumber">
						<view>
							<text class="phone-num"> 手机号/邮箱 </text>
							<view class="phone-main">
								<image class="phone-img" src="../static/imgs/mine/login/phone.png" mode="aspectFill">
								</image>
								<view class="login-line"></view>
								<input type="text" class="phone-input" v-model="pswData.phoneNumber"
									placeholder="请输入手机号/邮箱" />
							</view>
						</view>
					</uni-forms-item>
					<uni-forms-item name="code">
						<view>
							<text class="phone-num code-code"> 验证码 </text>
							<view class="phone-main code-main">
								<view class="phone-main-left">
									<image style="width: 27rpx; margin-right: 3rpx" class="phone-img"
										src="../static/imgs/mine/login/code.png" mode="aspectFill">
									</image>
									<view class="login-line"></view>
									<input type="text" class="phone-input" v-model="pswData.code"
										placeholder="请输入验证码" />
								</view>
								<view class="phone-main-left">
									<view class="login-line"></view>
									<button type="text" :plain="true" size="mini" style="border: none;padding: 0;height: 17px;line-height: 17px;" @click="getCode"
										class="phone-num" :disabled="disable"
										:class="{ codeGeting: isGeting }">{{time}}</button>
								</view>
							</view>
						</view>
					</uni-forms-item>
					<uni-forms-item name="newPsw">
						<view>
							<text class="phone-num"> 新密码 </text>
							<view class="phone-main">
								<image style="width: 22rpx; margin-right: 8rpx" class="phone-img"
									src="../static/imgs/mine/login/psw.png" mode="aspectFill">
								</image>
								<view class="login-line"></view>
								<input type="password" class="phone-input" v-model="pswData.newPsw"
									placeholder="请设置新密码" />
							</view>
						</view>
					</uni-forms-item>
				</uni-forms>
			</view>
			<view class="login-button">
				<image src="../static/imgs/common/update.png" mode="aspectFit" @click="updatePsw">
				</image>
			</view>
			<navigator url="../pages/mine/login" hover-class="none" class="login-bottom">
				<text type="default">返回登录</text>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pswData: {
					phoneNumber: "",
					code: "",
					newPsw: "",
				},
				pswRules: {
					phoneNumber: {
						rules: [{
							required: true,
							errorMessage: "请输入手机号/邮箱",
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
					newPsw: {
						rules: [{
							required: true,
							errorMessage: "请设置新密码",
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
				if (this.pswData.phoneNumber == '') {
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
							phoneNumber: this.pswData.phoneNumber
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
			// 重新设置密码
			updatePsw() {
				this.$refs.pswForm
					.validate()
					.then((res) => {
						console.log("表单数据", res);
						uni.showLoading({
							title: "密码重新设置中..."
						})
						uni.request({
							method: "POST",
							url: this.$baseUrl + "/findPsw",
							header: {
								"content-type": "application/json",
							},
							data: {
								phoneNumber: this.pswData.phoneNumber,
								code: this.pswData.code,
								newPsw: this.pswData.newPsw,
							},
							complete: (res) => {
								uni.hideLoading();
								console.log("忘记密码");
								console.log(res);

								if (this.checkBack(res, true) == false) return;

								uni.navigateTo({
									url: "../pages/mine/login",
								});
							},
						});
					})
					.catch((err) => {
						console.log("表单错误", err);
					});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.password-container-main {
		height: 100vh;
		background-color: #fbfbfb;

		.password-container {
			padding: 0 60rpx;
			padding-top: 150rpx;

			.psw-font {
				text-align: center;
				color: #000;
				font-size: 28rpx;
				font-weight: bold;

				.psw-line {
					width: 65rpx;
					height: 5rpx;
					margin: 0 auto;
					margin-top: 17rpx;
					background-color: #85dbd0;
					border-radius: 30rpx;
				}
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
				margin-top: 70rpx;

				image {
					width: 100%;
					height: 125rpx;
				}
			}

			.login-bottom {
				width: fit-content;

				text {
					font-size: 24rpx;
					color: #85dbd0;
				}
			}
		}
	}
</style>
