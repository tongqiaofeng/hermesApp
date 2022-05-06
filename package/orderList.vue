<template>
	<view class="obligation-order">
		<!-- 待付款 -->
		<view class="order-top-nav">
			<view class="nav-every" :style="{borderBottom: current == 0 ? '4rpx solid #85dbd0' :none}"
				@click="onClickItem(0)">
				全部
			</view>
			<view class="nav-every" :style="{borderBottom: current == 1 ? '4rpx solid #85dbd0' :none}"
				@click="onClickItem(1)">
				待付款
			</view>
			<view class="nav-every" :style="{borderBottom: current == 2 ? '4rpx solid #85dbd0' :none}"
				@click="onClickItem(2)">
				已付款
			</view>
			<view class="nav-every" :style="{borderBottom: current == 3 ? '4rpx solid #85dbd0' :none}"
				@click="onClickItem(3)">
				已发货
			</view>
			<view class="nav-every" :style="{borderBottom: current == 4 ? '4rpx solid #85dbd0' :none}"
				@click="onClickItem(4)">
				已签收
			</view>
		</view>
		<view v-if="haveData == 0" class="no-data">
			<image src="../static/imgs/common/no.png" mode="aspectFill"></image>
			<text style="font-size: 30rpx">暂无商品，还有更多好货等着你噢~</text>
		</view>
		<view v-else class="order-list">
			<view class="list-every" v-for="(item,index) in orderList" :key="index">
				<view class="every-top">
					<text class="top-left">{{'订单编号：'+item.outTradeNo}}</text>
					<text class="top-right">{{statusDecide(item.orderStatus)}}</text>
				</view>
				<view class="every-main">
					<view class="main-msg" v-for="(items,index2) in item.detailList" :key="index2"
						@click="goOrderDetail(item.id)">
						<view class="msg-img">
							<image v-if="items.pic" :src="items.pic" mode="aspectFill"></image>
						</view>
						<view class="msg-data" style="flex: 1;">
							<view class="data-name">{{items.productName}}</view>
							<view class="data-num">数量：1</view>
							<view class="data-price">{{'CNY '+formatNumberRgx(items.productPrice)}}</view>
							<!-- 后端给个参数，表示该订单内是否所有商品都已申请退款 -->
							<view style="margin-top: 10rpx;" v-if="item.orderStatus == 1">
								<view style="color: #c3c3c3;font-size: 22rpx;text-align: right;" v-if="items.returnMsg">
									该商品已申请退款</view>
								<view style="color: #85dbd0;font-size: 22rpx;text-align: right;" v-else>等待商家发货...</view>
							</view>
						</view>
					</view>
					<view class="main-button" v-if="item.orderStatus == -2 || item.orderStatus == -1">
						<view class="button-pay" style="background-color: red;" @click="delOrder(item)">删除订单</view>
					</view>
					<view class="main-button" v-if="item.orderStatus === 0">
						<view class="button-cancel" @click="cancelOrder(item.outTradeNo)">取消订单</view>
						<view class="button-pay" @click="payOrder(item)">立即支付</view>
						<uni-popup ref="payPopup" type="center">
							<view class="popup-container">
								<view class="">
									支付金额 {{'CNY ' + formatNumberRgx(price)}}
								</view>
								<view class="button-sure" @click="pay">确认支付</view>
							</view>
						</uni-popup>
					</view>
					<view class="main-button" v-if="item.orderStatus == 2">
						<view class="button-pay" @click="logistics(item)">查看物流</view>
						<view class="button-pay" @click="deliverySure(item)">确认收货</view>
					</view>
					<view class="main-button" v-if="item.orderStatus == 3">
						<view class="button-pay" style="background-color: red;" @click="delOrder(item)">删除订单</view>
					</view>
				</view>
				<view class="every-bottom">
					<text class="bottom-title">实际付款：<text
							class="bottom-price">{{formatNumberRgx(item.orderAmountTotal)}}</text></text>
				</view>
			</view>
			<view class="is-haveMore">
				没有更多了~
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				haveMore: 0,
				haveData: 1,
				page: 1,
				orderList: [],
				price: 0,
				verification: {},

				current: 1,
			}
		},
		onReachBottom() {
			console.log('底部');
			console.log(this.haveMore)
			if (this.haveMore == 0) {
				this.page++;
				this.getOrderList();
			}
		},
		onShow() {
			this.page = 1;
			this.orderList = [];
			this.getOrderList()
		},
		methods: {
			onClickItem(val) {
				console.log(val);
				this.current = val;
				this.page = 1;
				this.orderList = [];
				this.getOrderList();
			},
			// 查看订单详情
			goOrderDetail(id) {
				uni.navigateTo({
					url: "orderDetail?id=" + id
				})
			},
			// 查看物流
			logistics(item) {
				console.log('查看物流');
				uni.navigateTo({
					url: "../soldPackage/logistics?id="+item.id
				})
			},
			// 确认收货
			deliverySure(item) {
				console.log("确认收货");
				console.log(item);
				uni.request({
					url: this.$baseUrl + '/checkReceive',
					method: "POST",
					data: {
						id: item.id,
					},
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync("token"),
					},
					complete: (res) => {
						console.log('确认收货')
						console.log(res);
						if (res.statusCode == 200) {
							this.getOrderList();
							uni.showToast({
								icon: "none",
								title: "确认收货成功"
							})
						} else {
							uni.showToast({
								icon: "none",
								title: res.data.message
							})
						}
					}
				})
			},
			// 删除订单
			delOrder(item) {
				console.log(item);
				uni.showModal({
					title: "删除订单",
					content: "确定要删除这个订单么 ？",
					confirmText: "删除",
					confirmColor: "#85dbd0",
					cancelColor: "#85dbd0",
					success: (val) => {
						console.log(val);
						if (val.confirm == true) {
							console.log('删除订单');
							uni.request({
								url: this.$baseUrl + "/orderDel",
								method: "POST",
								header: {
									"content-type": "application/json",
									token: uni.getStorageSync('token')
								},
								data: {
									id: item.id
								},
								complete: (res) => {
									console.log('res');
									if (res.statusCode == 200) {
										this.getOrderList();
										uni.showToast({
											icon: "none",
											title: "删除成功"
										})
									} else {
										uni.showToast({
											icon: "none",
											title: res.data.message
										})
									}
								}
							})
						}
					}
				})
			},
			// 取消订单
			cancelOrder(outTradeNo) {
				console.log('取消订单');
				uni.request({
					url: this.$baseUrl + "/wechatCloseOrder",
					method: "POST",
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync('token')
					},
					data: {
						outTradeNo: outTradeNo
					},
					complete: (res) => {
						console.log('取消订单');
						console.log(res);
						if (res.statusCode == 200) {
							this.getOrderList();
							uni.showToast({
								icon: "none",
								title: "取消成功"
							})
						} else {
							uni.showToast({
								icon: "none",
								title: res.data.message
							})
						}
					}
				})
			},
			// 支付
			payOrder(item) {
				this.price = item.price;
				uni.showLoading({
					title: "微信支付"
				});
				uni.request({
					url: this.$baseUrl + "/payMsgGet",
					data: {
						id: item.id
					},
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync('token')
					},
					complete: (res) => {
						uni.hideLoading();
						console.log('支付订单');
						console.log(res);

						if (res.statusCode == 200) {
							this.verification = res.data;
							this.$refs.payPopup[0].open();
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message,
								duration: 2000
							})
						}
					}
				})
			},
			// 确定支付
			pay() {
				uni.requestPayment({
					timeStamp: this.verification.payMsg.timeStamp.toString(),
					nonceStr: this.verification.payMsg.nonceStr,
					package: this.verification.payMsg.package,
					signType: 'RSA',
					paySign: this.verification.payMsg.paySign,
					success: (ret) => {
						console.log('success:');
						console.log(ret);
						this.getOrderList();
					},
					fail: (err) => {
						console.log('fail:');
						console.log(err);
					}
				});
			},
			// 获取订单列表
			getOrderList() {
				uni.request({
					url: this.$baseUrl + "/orderList",
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync('token')
					},
					data: {
						orderStatus: this.current == 0 ? '' : this.current - 1,
						page: this.page,
						pageNum: 10
					},
					complete: (res) => {
						console.log('订单列表');
						console.log(res);

						if (res.data.length == 0) {
							this.haveMore = 1;
						} else {
							let list = this.orderList.concat(res.data);
							this.orderList = list;
						}

						if (this.orderList.length == 0) {
							this.haveData = 0;
						} else {
							this.haveData = 1;
						}
					}
				})
			},
			// 状态判定
			statusDecide(status) {
				switch (status) {
					case -2:
						return '交易取消';
						break;
					case -1:
						return '超时交易关闭';
						break;
					case 0:
						return '未付款';
						break;
					case 1:
						return '已付款';
						break;
					case 2:
						return '已发货';
						break;
					case 3:
						return '已签收';
						break;
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.obligation-order {
		height: 100vh;
		background-color: #f9f9f9;

		.order-top-nav {
			width: 100vw;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			display: flex;
			justify-content: space-around;
			background-color: #fff;
			z-index: 999;

			.nav-every {
				padding: 16rpx 8rpx;
				font-size: 28rpx;
			}
		}

		.order-list {
			position: absolute;
			top: 74rpx;
			left: 0;
			right: 0;
			background-color: #f9f9f9;
			// padding-top: 20rpx;

			.list-every {
				margin-top: 20rpx;

				.every-top {
					padding: 20rpx 40rpx;
					display: flex;
					justify-content: space-between;
					background-color: #fff;

					.top-left {
						color: #c3c3c3;
						font-size: 28rpx;
					}

					.top-right {
						font-size: 28rpx;
					}
				}

				.every-main {
					background-color: #fff;

					.main-msg {
						margin-top: 4rpx;
						display: flex;
						padding: 20rpx 60rpx 0 0;

						.msg-img {
							margin: 0 20rpx;

							image {
								width: 200rpx;
								height: 200rpx;
							}
						}

						.msg-data {
							font-size: 24rpx;

							.data-name {
								text-align: left;
							}

							.data-num {
								font-size: 20rpx;
								margin: 20rpx 0;
								color: #c3c3c3;
							}

							.data-price {}
						}
					}

					.main-button {
						padding: 0 40rpx 20rpx 0;
						margin-top: 30rpx;
						display: flex;
						justify-content: flex-end;

						.button-cancel,
						.button-pay {
							padding: 10rpx 20rpx;
							border-radius: 30rpx;
							font-size: 22rpx;
						}

						.button-cancel {
							background-color: #f6f6f6;
						}

						.button-pay {
							margin-left: 20rpx;
							background-color: #85dbd0;
							color: #fff;
						}

						.popup-container {
							width: 500rpx;
							height: 407rpx;
							padding: 40rpx;
							margin: 0 auto;
							display: flex;
							flex-direction: column;
							justify-content: space-around;
							text-align: center;
							background-color: #fff;
							border-radius: 30rpx;

							.button-sure {
								padding: 20rpx 60rpx;
								background-color: #85dbd0;
								border-radius: 60rpx;
								color: #fff;
							}
						}
					}
				}

				.every-bottom {
					padding: 20rpx 40rpx;
					margin-top: 4rpx;
					text-align: right;
					font-size: 22rpx;
					background-color: #fff;

					.bottom-title {
						color: #c3c3c3;
					}

					.bottom-price {
						color: #000;
					}
				}
			}

			.is-haveMore {
				padding-top: 40rpx;
				padding-bottom: 140rpx;
				font-size: 24rpx;
				color: #e3e3e3;
				text-align: center;
				font-size: 30rpx
			}
		}
	}
</style>
