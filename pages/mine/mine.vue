<template>
	<view class="mine-container">
		<view class="mine-top">
			<view :style="{ height: height + 'px' }"></view>
			<view style="display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
				<view class="mine-title">
					<text>我的</text>
				</view>
				<view class="mine-headPic" v-if="token == '' || token == null" @click="goLogin">
					<view class="mine-img-div">
						<image src="../../static/imgs/mine/avatar.png" class="mine-img"></image>
					</view>
					<view class="mine-nick">
						<text>请登录~</text>
					</view>
				</view>
				<view class="mine-headPic" @click="updateMyMsg" v-else>
					<view class="mine-img-div">
						<image v-if="headPic" :src="baseFileUrl + '/file/' + headPic" mode="aspectFill"
							class="mine-img"></image>
						<image v-else src="../../static/imgs/mine/avatar.png" mode="aspectFill" class="mine-img">
						</image>
					</view>
					<view class="mine-nick">
						<text style="font-size: 30rpx">{{ nick }}</text>
						<view style="margin-top: 16rpx; font-size: 24rpx">
							美好总会如期而至
						</view>
					</view>
				</view>
				<view class="mine-integral">
					<view class="integral-left">
						<image v-if="integralNum < 10000" style="width: 30rpx;height: 26rpx;"
							src="../../static/imgs/mine/normal.png" mode="aspectFill"></image>
						<image v-else style="width: 33rpx;height: 29rpx;" src="../../static/imgs/mine/impotent.png"
							mode="aspectFill"></image>
						<text>{{gradeMembership(integralNum)}}</text>
					</view>
					<view class="integral-right">
						<navigator url="../../minePackage/integral" hover-class="none">
							<text style="font-size: 20rpx;">积分</text>
							<text style="font-size: 50rpx;margin-left: 10rpx;">{{integralNum}}</text>
						</navigator>
					</view>
				</view>

			</view>
		</view>
		<view class="mine-main">
			<view class="main-top">
				<view @click="goInventory" v-if="role == 'peer' || role == 'admin'">
					<view class="top-one">
						<view class="one-font">
							<text>爱马仕库存</text>
						</view>
						<view class="one-img">
							<image src="../../static/imgs/mine/right.png" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<view @click="goFinishedProduct" v-if="role == 'admin'">
					<view class="top-one">
						<view class="one-font">
							<text>珠宝成品库存</text>
						</view>
						<view class="one-img">
							<image src="../../static/imgs/mine/right.png" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<view @click="goRawMaterial" v-if="role == 'admin'">
					<view class="top-one">
						<view class="one-font">
							<text>珠宝原材料库存</text>
						</view>
						<view class="one-img">
							<image src="../../static/imgs/mine/right.png" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<view @click="goSaleReport" v-if="role == 'admin'">
					<view class="top-one">
						<view class="one-font">
							<text>珠宝销售报表</text>
						</view>
						<view class="one-img">
							<image src="../../static/imgs/mine/right.png" mode="aspectFill"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="main-top main-center">
				<view @click="goCollect">
					<view class="top-one">
						<view class="one-font">
							<text>商品收藏</text>
						</view>
						<view class="one-img">
							<image src="../../static/imgs/mine/right.png" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<view @click="goFoot">
					<view class="top-one">
						<view class="one-font">
							<text>浏览记录</text>
						</view>
						<view class="one-img">
							<image src="../../static/imgs/mine/right.png" mode="aspectFill"></image>
						</view>
					</view>
				</view>
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<!-- <view class="main-top main-center">
				<view @click="obligationOrder">
					<view class="top-one">
						<view class="one-font">
							<text>我的订单</text>
						</view>
						<view class="one-img">
							<image src="../../static/imgs/mine/right.png" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<view @click="returnOrder">
					<view class="top-one">
						<view class="one-font">
							<text>退换货</text>
						</view>
						<view class="one-img">
							<image src="../../static/imgs/mine/right.png" mode="aspectFill"></image>
						</view>
					</view>
				</view>
			</view> -->
			<!-- #endif -->
			<view class="main-top main-center">
				<!-- #ifdef MP-WEIXIN -->
				<!-- <view @click="goAddr">
					<view class="top-one">
						<view class="one-font">
							<text>地址管理</text>
						</view>
						<view class="one-img">
							<image src="../../static/imgs/mine/right.png" mode="aspectFill"></image>
						</view>
					</view>
				</view> -->
				<!-- #endif -->
				<view @click="goService" v-if="role != 'admin'">
					<view class="top-one">
						<view class="one-font">
							<text>人工客服</text>
						</view>
						<view class="one-img">
							<image src="../../static/imgs/mine/right.png" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<view class="top-one" @click="logout">
					<view class="one-font">
						<text>{{ token.length == 0 ? "注册/登录" : "退出登录" }}</text>
					</view>
					<view class="one-img">
						<image src="../../static/imgs/mine/right.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view class="login-page">
				<uni-popup ref="popup" type="center">
					<view class="popup-container">
						<view class="popup-one">您还没有登录</view>
						<view class="popup-two">登录即刻开启品质生活</view>
						<view class="popup-login" @click="goToLogin">
							<image src="../../static/imgs/mine/login.png" mode="aspectFill"></image>
						</view>
						<view class="popup-cancel" @click="closePopup">取消</view>
					</view>
				</uni-popup>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseFileUrl: this.$baseFileUrl,
				title: "我的页面",
				role: uni.getStorageSync("role"),
				headPic: uni.getStorageSync("headPic"),
				nick: uni.getStorageSync("nick"),
				token: uni.getStorageSync("token"),
				height: null,

				integralNum: 0,
			};
		},
		onLoad() {
			// await this.$onLaunched;
			// 获取手机状态栏高度
			uni.getSystemInfo({
				success: (data) => {
					// 将其赋值给this
					this.height = data.statusBarHeight;
					console.log('height');
					console.log(this.height);
				},
			});
		},
		onShow() {
			this.token = uni.getStorageSync("token");

			// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
			if (this.token == "" || this.token == null) {
				this.$nextTick(() => {
					this.$refs.popup.open();
				});
			} else {
				uni.request({
					url: this.$baseFileUrl + '/userMsg',
					method: 'GET',
					header: {
						'content-type': 'application/json',
						'token': this.token
					},
					complete: (ret) => {
						if (this.checkBack(ret, true) == true) {
							this.setUserInfo(ret);
							this.role = uni.getStorageSync("role");
							this.nick = uni.getStorageSync("nick");
							this.integralNum = uni.getStorageSync("totalIntegral");
							this.headPic = uni.getStorageSync("headPic");

							this.token = uni.getStorageSync("token");

							this.$isResolve();
						} else {
							this.$isResolve();
						}
					},
				})
			}
		},
		onReady() {
			this.hidePageNavInWechatBrowser();
		},
		methods: {
			// 会员等级
			gradeMembership(grade) {
				if (grade == 0) {
					return '新晋会员'
				} else if (grade > 0 && grade < 10000) {
					return '普通会员'
				} else if (grade > 9999 && grade < 50000) {
					return '白银会员'
				} else if (grade > 49999 && grade < 300000) {
					return '黄金会员'
				} else if (grade > 299999 && grade <= 1000000) {
					return '铂金会员'
				} else if (grade > 1000000) {
					return '钻石会员'
				}
			},
			// 修改信息
			updateMyMsg() {
				if (this.token == "" || this.token == null) {
					this.$refs.popup.open();
				} else {
					uni.navigateTo({
						url: "../../minePackage/updateMyMsg",
					});
				}
			},
			// 我的订单
			obligationOrder() {
				if (this.token == "" || this.token == null) {
					this.$refs.popup.open();
				} else {
					uni.navigateTo({
						url: "../../package/orderList",
					});
				}
			},
			// 退换货
			returnOrder() {
				if (this.token == "" || this.token == null) {
					this.$refs.popup.open();
				} else {
					uni.navigateTo({
						url: "../../package/returnOrder",
					});
				}
			},
			// 地址管理
			goAddr() {
				uni.navigateTo({
					url: "../../package/addressAdmin"
				})
			},
			// 人工客服
			goService() {
				uni.navigateTo({
					url: "../../commonPackage/service/service",
				});
			},
			// 去登录
			goLogin() {
				this.$refs.popup.open();
			},
			// 退出登录
			logout() {
				if (this.token !== "" && this.token !== null) {
					uni.setStorageSync("userId", '');
					uni.setStorageSync("token", '');
					uni.setStorageSync("role", '');
					uni.setStorageSync("nick", '');
					uni.setStorageSync("headPic", '');
					uni.setStorageSync("phoneNumber", '');
					uni.setStorageSync("totalIntegral", '')
					uni.setStorageSync("address", '');
					this.token = "";
					this.role = "";
					uni.closeSocket();
					uni.navigateTo({
						url: "./login",
					});
				} else {
					uni.navigateTo({
						url: "./login",
					});
				}
			},
			// 去登录页
			goToLogin() {
				this.$refs.popup.close();
				uni.navigateTo({
					url: "./login",
				});
			},
			// 关闭去登录
			closePopup() {
				this.$refs.popup.close();
			},
			// 包包库存查询页
			goInventory() {
				if (this.token == "" || this.token == null) {
					this.$refs.popup.open();
				} else {
					uni.navigateTo({
						url: "../../minePackage/inventory",
					});
				}
			},
			// 珠宝成品
			goFinishedProduct() {
				if (this.token == "" || this.token == null) {
					this.$refs.popup.open();
				} else {
					uni.navigateTo({
						url: "../../jewelryPackage/jewelryFinished",
					});
				}
			},
			// 珠宝原材料
			goRawMaterial() {
				if (this.token == "" || this.token == null) {
					this.$refs.popup.open();
				} else {
					uni.navigateTo({
						url: "../../jewelryPackage/jewelryMaterial",
					});
				}
			},
			// 销售报表
			goSaleReport() {
				if (this.token == "" || this.token == null) {
					this.$refs.popup.open();
				} else {
					uni.navigateTo({
						url: "../../jewelryPackage/saleReport",
					});
				}
			},
			// 商品收藏
			goCollect() {
				if (this.token == "" || this.token == null) {
					this.$refs.popup.open();
				} else {
					uni.navigateTo({
						url: "../../minePackage/collectGoods",
					});
				}
			},
			// 浏览记录
			goFoot() {
				if (this.token == "" || this.token == null) {
					this.$refs.popup.open();
				} else {
					uni.navigateTo({
						url: "../../minePackage/footprint",
					});
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.mine-container {
		height: 100vh;
		background-color: #f9f9f9;

		.mine-top {
			height: 442rpx;
			display: flex;
			flex-direction: column;
			background: url(../../static/imgs/mine/background.png) no-repeat;
			background-size: 100%;

			.mine-title {
				height: 44px;
				padding: 0 40rpx;
				display: flex;
				align-items: center;
				color: #fff;
			}

			.mine-headPic {
				padding: 10rpx 40rpx 0rpx 40rpx;
				display: flex;
				align-items: center;

				.mine-img-div {
					width: 110rpx;
					height: 110rpx;
					margin-right: 30rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					border: 1px solid #f9f9f9;
					border-radius: 50%;

					.mine-img {
						width: 90rpx;
						height: 90rpx;
						border-radius: 50%;
					}
				}

				.mine-nick {
					color: #ffffff;
				}
			}

			.mine-integral {
				padding: 0 40rpx 20rpx;
				display: flex;
				justify-content: space-between;
				color: #1e8d7f;

				.integral-left {
					display: flex;
					align-items: center;

					text {
						margin-left: 10rpx;
						font-size: 32rpx;
					}
				}
			}
		}

		.mine-main {
			padding: 30rpx 40rpx;
			/*#ifdef MP-WEIXIN*/
			padding-bottom: 30rpx;
			/*#endif*/
			/*#ifndef MP-WEIXIN*/
			padding-bottom: 160rpx;
			/*#endif*/

			background-color: #f9f9f9;

			.main-top {
				padding: 0 30rpx;
				background-color: #fff;
				border-radius: 10px;

				.top-one {
					height: 129rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.one-font {
						font-size: 28rpx;
						color: #565656;
						font-weight: bold;
					}

					.one-img {
						width: 44rpx;
						height: 44rpx;
						display: flex;
						justify-content: center;
						align-items: center;

						image {
							width: 44rpx;
							height: 44rpx;
						}
					}
				}
			}

			.main-center {
				margin-top: 15px;
			}
		}

		.login-page {
			width: 100%;

			.popup-container {
				width: 660rpx;
				height: 507rpx;
				padding-bottom: 20rpx;
				margin: 0 auto;
				text-align: center;
				background: url(../../static/imgs/mine/mineBack.png) no-repeat;
				background-size: 100% 100%;

				.popup-one {
					padding-top: 168rpx;
					font-size: 30rpx;
					color: #000;
					font-weight: bold;
				}

				.popup-two {
					margin-top: 30rpx;
					font-size: 26rpx;
					color: #c3c3c3;
				}

				.popup-login {
					margin-top: 73rpx;

					image {
						width: 358rpx;
						height: 58rpx;
					}
				}

				.popup-cancel {
					margin-top: 30rpx;
					font-size: 24rpx;
				}
			}
		}
	}
</style>
