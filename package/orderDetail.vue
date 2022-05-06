<template>
	<view class="order-detail-container">
		<view class=""> 当前物流状态，点击可查看物流详情 </view>
		<view class="order-addr">
			<view class="addr-top">
				<text class="top-left">{{ orderDetail.addressMsg.name }}</text>
				<text class="top-right">{{ orderDetail.addressMsg.phone }}</text>
			</view>
			<view class="addr-bottom">
				{{orderDetail.addressMsg.area + orderDetail.addressMsg.street}}
			</view>
		</view>
		<view class="order-product">
			<view v-for="(item, index) in orderDetail.detailList" :key="index">
				<view class="main-msg">
					<view class="msg-img">
						<image v-if="item.pic" :src="item.pic" mode="aspectFill"></image>
					</view>
					<view class="msg-data">
						<view class="data-name">{{ item.productName }}</view>
						<view class="data-num">数量：1</view>
						<view class="data-price">
							<text>{{ "CNY " + formatNumberRgx(item.productPrice) }}</text>
							<text v-if="item.returnMsg.status == 0" style="color: #85dbd0">退款售后中...</text>
							<text v-if="item.returnMsg.status == 1 || item.returnMsg.status == 2"
								style="color: #85dbd0">退款成功</text>
						</view>
					</view>
				</view>
				<view class="main-button" v-if="orderDetail.orderStatus == 1 || orderDetail.orderStatus == 2">
					<view class="button-cancel" v-if="item.returnMsg" style="
              padding-left: 20rpx;
              padding-right: 20rpx;
              margin-left: 20rpx;
            " @click="returnDetail(item)">退款详情
					</view>
					<view class="button-pay" v-if="item.returnMsg.status == 0" style="
              margin-left: 20rpx;
            " @click="returnCancel(item.returnMsg.id)">取消退款
					</view>
					<view class="button-pay" v-if="!item.returnMsg" @click="returnOrder(item)">申请退款
					</view>
				</view>
				<view class="main-button" v-if="orderDetail.orderStatus == 3">
					<view class="button-pay" @click="returnOrder(item)">申请售后
					</view>
				</view>
			</view>
			<view class="main-button" v-if="orderDetail.orderStatus == 0">
				<view class="button-cancel" @click="cancelOrder">取消订单</view>
				<view class="button-pay" @click="payOrder">立即支付</view>
				<uni-popup ref="payPopup" type="center">
					<view class="popup-container">
						<view class="">
							支付金额 {{ "CNY " + formatNumberRgx(payPrice) }}
						</view>
						<view class="button-sure" @click="pay">确认支付</view>
					</view>
				</uni-popup>
			</view>
			<view class="main-button" style="padding-top: 20rpx; border-top: 2rpx solid #f9f9f9"
				v-if="orderDetail.orderStatus == 2">
				<view class="button-pay" @click="logistics">查看物流</view>
				<view class="button-pay" @click="deliverySure">确认收货</view>
			</view>
			<view class="main-button" v-if="
          orderDetail.orderStatus == -1 ||
          orderDetail.orderStatus == -2 ||
          orderDetail.orderStatus == 3
        ">
				<view class="button-pay" style="
            background-color: red;
          " @click="delOrder">删除订单</view>
			</view>
		</view>
		<view class="order-msg">
			<view class="msg-title">订单信息</view>
			<view class="msg-main">
				<view style="display: flex;align-items: center;">
					<text>订单编号：</text>
					<view class="out">{{ orderDetail.outTradeNo }}</view>
				</view>
				<view class="copy" @click="copyOut">复制</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailId: null,
				orderDetail: {},
				payPrice: 0,
				verification: {},
			};
		},
		onLoad(option) {
			this.detailId = option.id;
			this.getOrderInfo(option.id);
		},
		methods: {
			// 复制订单编号
			copyOut() {
				console.log('复制')
				uni.setClipboardData({
					data: this.orderDetail.outTradeNo, //要被复制的内容
					success: () => { //复制成功的回调函数
						uni.showToast({ //提示
							title: "复制成功",
							icon: "none"
						})
					}
				});
			},
			// 查看物流
			logistics() {
				console.log("查看物流");
				uni.navigateTo({
					url: "../soldPackage/logistics?id=" + this.detailId
				})
			},
			// 确认收货
			deliverySure() {
				console.log("确认收货");
				uni.request({
					url: this.$baseUrl + '/checkReceive',
					method: "POST",
					data: {
						id: this.detailId,
					},
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync("token"),
					},
					complete: (res) => {
						console.log('确认收货');
						console.log(res);
						if (res.statusCode == 200) {
							this.getOrderInfo(this.detailId);
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
			// 退款详情
			returnDetail(item) {
				console.log("退款详情");
			},
			// 取消退款
			returnCancel(id) {
				uni.showModal({
					content: "确定取消该退款？",
					confirmColor: "#85dbd0",
					success: (ret) => {
						if (ret.confirm) {
							uni.request({
								url: this.$baseUrl + "/wechatRefundSave",
								method: "POST",
								data: {
									id: id,
								},
								header: {
									"content-type": "application/json",
									token: uni.getStorageSync("token"),
								},
								complete: (res) => {
									uni.showToast({
										icon: "none",
										title: "取消成功",
									});
									this.getOrderInfo(this.detailId);
								},
							});
						}
					},
				});
			},
			// 退换货
			returnOrder(item) {
				let params = {
					productId: item.stockId,
					orderId: this.orderDetail.id,
					price: item.subTotal,
					phone: this.orderDetail.addressMsg.phone,
				};
				let productParams = {
					pic: item.pic,
					state: this.orderDetail.orderStatus
				};
				uni.navigateTo({
					url: "../soldPackage/returnType?params=" +
						JSON.stringify(params) +
						"&productParams=" +
						JSON.stringify(productParams),
				});
			},
			// 取消订单
			cancelOrder() {
				console.log("取消订单");
				uni.request({
					url: this.$baseUrl + "/wechatCloseOrder",
					method: "POST",
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync("token"),
					},
					data: {
						outTradeNo: this.orderDetail.outTradeNo,
					},
					complete: (res) => {
						console.log("取消订单");
						console.log(res);
						if (res.statusCode == 200) {
							uni.showToast({
								icon: "none",
								title: "取消成功",
							});
							uni.navigateTo({
								url: "orderList",
							});
						} else {
							uni.showToast({
								icon: "none",
								title: res.data.message,
							});
						}
					},
				});
			},
			// 支付
			payOrder() {
				uni.showLoading({
					title: "微信支付",
				});
				uni.request({
					url: this.$baseUrl + "/payMsgGet",
					data: {
						id: this.orderDetail.id,
					},
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync("token"),
					},
					complete: (res) => {
						uni.hideLoading();
						console.log("支付订单");
						console.log(res);

						if (res.statusCode == 200) {
							this.verification = res.data;
							this.$refs.payPopup[0].open();
						} else {
							uni.showToast({
								icon: "none",
								title: res.data.message,
								duration: 2000,
							});
						}
					},
				});
			},
			// 确定支付
			pay() {
				uni.requestPayment({
					timeStamp: this.verification.payMsg.timeStamp.toString(),
					nonceStr: this.verification.payMsg.nonceStr,
					package: this.verification.payMsg.package,
					signType: "RSA",
					paySign: this.verification.payMsg.paySign,
					success: (ret) => {
						console.log("success:");
						console.log(ret);
						this.getOrderInfo()();
					},
					fail: (err) => {
						console.log("fail:");
						console.log(err);
					},
				});
			},
			// 删除订单
			delOrder() {
				uni.showModal({
					title: "删除订单",
					content: "确定要删除这个订单么 ？",
					confirmText: "删除",
					confirmColor: "#85dbd0",
					cancelColor: "#85dbd0",
					success: (val) => {
						console.log(val);
						if (val.confirm == true) {
							console.log("删除订单");
							uni.request({
								url: this.$baseUrl + "/orderDel",
								method: "POST",
								header: {
									"content-type": "application/json",
									token: uni.getStorageSync("token"),
								},
								data: {
									id: this.orderDetail.id,
								},
								complete: (res) => {
									console.log("res");
									if (res.statusCode == 200) {
										uni.showToast({
											icon: "none",
											title: "删除成功",
										});
										uni.navigateTo({
											url: "orderList",
										});
									} else {
										uni.showToast({
											icon: "none",
											title: res.data.message,
										});
									}
								},
							});
						}
					},
				});
			},
			// 获取订单信息
			getOrderInfo(id) {
				uni.showLoading({
					title: "加载中...",
				});
				uni.request({
					url: this.$baseUrl + "/orderInfo?id=" + id,
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync("token"),
					},
					complete: (res) => {
						uni.hideLoading();
						console.log("订单详情");
						console.log(res);
						this.orderDetail = res.data;
					},
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.order-detail-container {
		height: 100vh;
		background-color: #f9f9f9;

		.order-addr {
			padding: 20rpx 40rpx;
			background-color: #ffffff;

			.addr-top {
				display: flex;
				font-size: 26rpx;

				.top-right {
					padding-left: 20rpx;
					color: #c3c3c3;
				}
			}

			.addr-bottom {
				margin-top: 10rpx;
				font-size: 26rpx;
			}
		}

		.order-product {
			background-color: #fff;

			.main-msg {
				margin-top: 4rpx;
				display: flex;
				padding: 20rpx 60rpx 30rpx 0;

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

					.data-price {
						display: flex;
						justify-content: space-between;
					}
				}
			}

			.main-button {
				padding: 0 40rpx 20rpx 0;
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

		.order-msg {
			padding: 20rpx;
			margin-top: 20rpx;
			background-color: #fff;

			.msg-title {
				font-size: 30rpx;
				text-align: left;
			}

			.msg-main {
				display: flex;
				justify-content: space-between;
				margin-top: 20rpx;
				font-size: 24rpx;

				.out {
					flex: 1;
					text-align: center;
				}

				.copy {
					margin-left: 40rpx;
					padding: 10rpx 20rpx;
					border: 1px solid #c3c3c3;
					border-radius: 10rpx;
				}
			}
		}
	}
</style>
