<template>
	<view class="content" v-if="isShow">
		<view class="nav">
			<!-- 选项卡水平方向滑动，scroll-with-animation是滑动到下一个选项时，有一个延时效果 -->
			<scroll-view class="tab-scroll" scroll-x="true" scroll-with-animation :scroll-left="scrollLeft">
				<view class="tab-scroll_box">
					<!-- 选项卡类别列表 -->
					<view class="tab-scroll_item" v-for=" (item,index) in category" :key="index"
						:class="{'active':isActive==index}" @click="chenked(index)">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 选项卡内容轮播滑动显示，current为当前第几个swiper子项 -->
		<swiper @change="swiperChange" :current="isActive" class="swiper-content" :style="fullHeight">
			<swiper-item class="swiperitem-content" v-for="(item2, index2) in orderAllList" :key="index2">
				<scroll-view scroll-y style="height: 100%;">
					<view class="nav_item">
						<view v-if="item2.orderList.length == 0" class="no-data">
							<image src="../static/imgs/common/no.png" mode="aspectFill"></image>
							<text style="font-size: 30rpx">暂无商品，还有更多好货等着你噢~</text>
						</view>
						<view v-else class="order-list">
							<view class="list-every" v-for="(item, index) in item2.orderList" :key="index">
								<view class="every-top">
									<text class="top-left">{{ item.outTradeNo }}</text>
									<text class="top-right">{{ statusDecide(item.orderStatus) }}</text>
								</view>
								<view class="every-main">
									<view class="main-msg" v-for="(items, index3) in item.detailList" :key="index3"
										@click="goOrderDetail(item.id)">
										<view class="msg-container">
											<view class="msg-img" v-if="items.productCategory == 1">
												<image v-if="items.pic" :src="items.pic" mode="aspectFill"></image>
												<image v-else src="../static/imgs/common/nopic.jpg" mode="aspectFill">
												</image>
											</view>
											<view class="msg-img" v-if="items.productCategory == 2">
												<image v-if="items.pic"
													:src="imgUrl + '/file/small/' + items.pic.trim()" mode="aspectFill">
												</image>
												<image v-else src="../static/imgs/common/nopic.jpg" mode="aspectFill">
												</image>
											</view>
											<view class="msg-img" v-if="items.productCategory == 3">
												<image v-if="items.pic" :src="watchUrl + items.pic.trim()"
													mode="aspectFill">
												</image>
												<image v-else src="../static/imgs/common/nopic.jpg" mode="aspectFill">
												</image>
											</view>

											<view class="msg-data">
												<view class="data-name">{{ items.productName }}</view>
												<view class="data-price">
													<text>
														<text style="font-size: 24rpx;">CNY </text>
														{{
													  " "+formatNumberRgx(items.productAmount)
													}}
													</text>
													<text style="color: #999999;font-size: 26rpx;font-weight: normal;">
														{{'x' + items.num}}</text>
												</view>
												<!-- 后端给个参数，表示该订单内是否所有商品都已申请退款 -->
												<view style="margin-top: 20rpx" v-if="item.orderStatus == 1">
													<view style="color: #c3c3c3; font-size: 22rpx; text-align: right"
														v-if="items.returnMsg">
														该商品已申请退款</view>
													<view style="color: #85dbd0; font-size: 22rpx; text-align: right"
														v-else>等待商家发货...
													</view>
												</view>
											</view>
										</view>
										<view class="main-money">
											<text class="money-title">实付款：</text>
											<text class="money">
												<text style="font-weight: normal;font-size: 22rpx;">CNY</text>
												{{' '+formatNumberRgx(items.actualAmount)}}</text>
										</view>
									</view>
									<view class="main-button" v-if="item.orderStatus == -2 || item.orderStatus == -1">
										<view class="button-pay" style="background-color: red" @click="delOrder(item)">
											删除订单</view>
									</view>
									<view class="main-button" v-if="item.orderStatus === 0">
										<view class="button-cancel" @click="cancelOrder(item.outTradeNo)">取消订单</view>
										<view class="button-pay" @click="payOrder(item)">立即支付</view>
									</view>
									<view class="main-button" v-if="item.orderStatus == 2">
										<view class="button-pay" @click="logistics(item)">查看物流</view>
										<view class="button-pay" @click="deliverySure(item)">确认收货</view>
									</view>
									<view class="main-button" v-if="item.orderStatus == 3">
										<view class="button-pay" style="background-color: red" @click="delOrder(item)">
											删除订单</view>
									</view>
								</view>
								<!-- 								<view class="every-bottom">
									<text class="bottom-title">实际付款：<text class="bottom-price">{{
						          formatNumberRgx(item.orderAmountTotal)
						        }}</text></text>
								</view> -->
							</view>
							<view class="is-haveMore" v-if="orderAllList.length > 0"> 没有更多了~ </view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<uni-popup ref="payPopup" type="bottom">
			<view class="popup-container">
				<view class="">
					<view class="popup-title">
						<text class="currency">CNY</text>
						<text class="price">{{ " " + formatNumberRgx(payPrice) }}</text>
					</view>
					<view class="uni-form-item uni-column">
						<radio-group class="uni-list">
							<label style="
		            margin-top: 20rpx;
		            display: flex;
		            justify-content: space-between;
		          " class="uni-list-cell uni-list-cell-pd" v-for="(radio, index3) in radioItems" :key="index3">
								<view>
									<label class="label-2-text" style="display: flex; align-items: center"
										:for="radio.name">
										<image :src="radio.img" style="
		                  width: 30rpx;
		                  height: 28rpx;
		                  margin-right: 10rpx;
		                " mode="aspectFill">
										</image>
										<text style="font-size: 28rpx">{{ radio.name }}</text>
									</label>
								</view>
								<view>
									<radio style="transform: scale(0.7)" :id="radio.name" :value="radio.value"
										:checked="radio.checked"></radio>
								</view>
							</label>
						</radio-group>
					</view>
				</view>
				<view class="button-sure" @click="paySure">确认支付</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				imgUrl: this.$baseUrl + "/jewellery/api",
				watchUrl: this.$baseUrl + "/watch/api",
				isActive: 0,
				index: 0,

				category: [{
						id: 1,
						name: '全部',
					},
					{
						id: 2,
						name: '待付款',
					},
					{
						id: 3,
						name: '已付款',
					},
					{
						id: 4,
						name: '已发货',
					},
					{
						id: 5,
						name: '已签收',
					},
				],

				scrollLeft: 0, // 横向滚动条位置
				fullHeight: "",

				isShow: false,
				haveData: 1,

				orderAllList: [],
				payPrice: 0,
				verification: {},
				radioItems: [{
					name: "微信支付",
					value: "0",
					img: require("../static/imgs/pay/wx.png"),
					checked: true,
				}],

				current: 0,
				payId: null,
			}
		},
		mounted() {
			this.$nextTick(() => {
				//获取手机屏幕的高度，让其等于swiper的高度，从而使屏幕充满
				uni.getSystemInfo({
					success: (res) => {
						this.fullHeight = "height:" + res.windowHeight + "px";
					}
				});
			})
		},
		onLoad() {
			this.orderAllList = [];
			this.getorderAllList();
		},
		methods: {
			// 当前点击子元素靠左留一个选项展示，子元素宽度不相同也可实现
			chenked(index) {
				this.isActive = index;
			},
			// swiper滑动时，获取其索引，也就是第几个
			swiperChange(e) {
				// console.log(e);
				this.isActive = e.detail.current;
			},
			// 查看订单详情
			goOrderDetail(id) {
				console.log(id);
				uni.navigateTo({
					url: "orderDetail?id=" + id,
				});
			},
			// 查看物流
			logistics(item) {
				console.log("查看物流");
				uni.navigateTo({
					url: "../soldPackage/logistics?id=" + item.id,
				});
			},
			// 确认收货
			deliverySure(item) {
				console.log("确认收货");
				console.log(item);
				uni.request({
					url: this.$baseUrl + "/order/api/checkReceive",
					method: "POST",
					data: {
						id: item.id,
					},
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync("token"),
					},
					complete: (res) => {
						console.log("确认收货");
						console.log(res);
						if (res.statusCode == 200) {
							this.getorderAllList();
							uni.showToast({
								icon: "none",
								title: "确认收货成功",
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
							console.log("删除订单");
							uni.request({
								url: this.$baseUrl + "/order/api/orderDel",
								method: "POST",
								header: {
									"content-type": "application/json",
									token: uni.getStorageSync("token"),
								},
								data: {
									id: item.id,
								},
								complete: (res) => {
									console.log("res");
									if (res.statusCode == 200) {
										this.getorderAllList();
										uni.showToast({
											icon: "none",
											title: "删除成功",
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
			// 取消订单
			cancelOrder(outTradeNo) {
				console.log("取消订单");
				uni.request({
					url: this.$baseUrl + "/order/api/closeOrder",
					method: "POST",
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync("token"),
					},
					data: {
						outTradeNo: outTradeNo,
					},
					complete: (res) => {
						console.log("取消订单");
						console.log(res);
						if (res.statusCode == 200) {
							this.getorderAllList();
							uni.showToast({
								icon: "none",
								title: "取消成功",
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
			payOrder(item) {
				console.log(item);
				this.payPrice = item.productAmountTotal;
				this.payId = item.id;

				// #ifdef MP-WEIXIN
				this.$refs.payPopup.open();
				// #endif
				// #ifdef APP-PLUS
				uni.navigateTo({
					url: "./orderPayType?id=" + this.payId + "&price=" + this.payPrice + "&priceUs=" + item
						.productAmountTotalUs
				})
				// #endif
			},
			// 确定支付
			paySure() {
				uni.showLoading({
					title: "",
				});
				uni.request({
					url: this.$baseUrl + "/wechat/api/payMsgGet",
					data: {
						id: this.payId,
						tradeType: 1
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

							console.log("微信小程序支付");
							uni.requestPayment({
								provider: "wxpay",
								timeStamp: this.verification.payMsg.timeStamp.toString(),
								nonceStr: this.verification.payMsg.nonceStr,
								package: this.verification.payMsg.package,
								signType: "RSA",
								paySign: this.verification.payMsg.paySign,
								success: (ret) => {
									console.log("success:");
									console.log(ret);
									this.$refs.payPopup.close();
									this.getorderAllList()
								},
								fail: (err) => {
									console.log("fail:");
									console.log(err);
									this.$refs.payPopup.close();
								},
							});
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

			// 获取订单列表
			getorderAllList() {
				uni.showLoading({
					title: '加载中...'
				})
				uni.request({
					url: this.$baseUrl + "/order/api/orderList",
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync("token"),
					},
					data: {
						orderStatus: this.current == 0 ? "" : this.current - 1,
						page: this.page,
						pageNum: 10,
					},
					complete: (res) => {
						console.log("订单列表");
						console.log(res);

						this.orderAllList = res.data

						if (this.orderAllList.length == 0) {
							this.haveData = 0;
						} else {
							this.haveData = 1;
						}
						uni.hideLoading()
						this.isShow = true;
					},
				});
			},
			// 状态判定
			statusDecide(status) {
				switch (status) {
					case -2:
						return "交易取消";
						break;
					case -1:
						return "交易关闭"; // 超时
						break;
					case 0:
						return "未付款";
						break;
					case 1:
						return "已付款";
						break;
					case 2:
						return "已发货";
						break;
					case 3:
						return "已签收";
						break;
				}
			},
		}
	}
</script>
<style lang="scss">
	page {
		height: 100%;
		display: flex;
		background-color: #f9f9f9;
	}

	.content {
		display: flex;
		flex-direction: column;
		width: 100%;
		flex: 1;

		.nav {
			background-color: #f9f9f9;
			position: fixed;
			z-index: 99;
			width: 100%;
			align-items: center;
			height: 100rpx;

			.tab-scroll {
				flex: 1;
				overflow: hidden;
				box-sizing: border-box;

				.tab-scroll_box {
					display: flex;
					justify-content: space-around;
					align-items: center;
					flex-wrap: nowrap;
					box-sizing: border-box;

					.tab-scroll_item {
						flex-shrink: 0;
						padding-bottom: 10px;
						display: flex;
						justify-content: center;
						font-size: 28rpx;
						padding-top: 10px;
					}
				}
			}
		}

		.swiper-content {
			flex: 1;

			.swiperitem-content {
				.nav_item {}
			}
		}
	}

	.active {
		position: relative;
		color: #85dbd0;
		font-weight: 600;
		border-bottom: 4rpx solid #85dbd0;
	}

	/* 隐藏滚动条，但依旧具备可以滚动的功能 */
	/deep/.uni-scroll-view::-webkit-scrollbar {
		display: none
	}

	.order-list {
		position: absolute;
		top: 74rpx;
		left: 20rpx;
		right: 20rpx;
		background-color: #f9f9f9;
		// padding-top: 20rpx;
		z-index: 0;

		.list-every {
			margin-top: 20rpx;
			padding-bottom: 31rpx;
			border-radius: 20rpx;
			background-color: #fff;

			.every-top {
				padding: 30rpx 20rpx 20rpx;
				display: flex;
				justify-content: space-between;

				.top-left {
					color: #000;
					font-size: 30rpx;
				}

				.top-right {
					color: #FE7722;
					font-size: 30rpx;
				}
			}

			.every-main {
				background-color: #fff;

				.main-msg {
					margin-top: 4rpx;
					padding: 20rpx 20rpx 0 0;

					.msg-container {
						display: flex;

						.msg-img {
							margin: 0 20rpx;

							image {
								width: 136rpx;
								height: 136rpx;
								border-radius: 20rpx;
							}
						}

						.msg-data {
							flex: 1;
							font-size: 24rpx;

							.data-name {
								width: 65vw;
								padding-top: 5rpx;
								font-size: 28rpx;
								font-weight: bold;
								text-align: left;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}

							.data-num {
								font-size: 20rpx;
								margin: 20rpx 0;
								color: #c3c3c3;
							}

							.data-price {
								margin-top: 20rpx;
								display: flex;
								justify-content: space-between;
								align-items: center;
								font-size: 26rpx;
								font-weight: bold;
							}
						}
					}

					.main-money {
						margin-top: 30rpx;
						text-align: right;

						.money-title {
							font-size: 24rpx;
							font-weight: bold;
							color: #000;
						}

						.money {
							color: #FF7824;
							font-size: 30rpx;
							font-weight: bold;
						}
					}
				}

				.main-button {
					padding-bottom: 20rpx;
					margin-top: 40rpx;
					display: flex;
					justify-content: flex-end;

					.button-cancel,
					.button-pay {
						padding: 15rpx 30rpx;
						border-radius: 60rpx;
						font-size: 24rpx;
					}

					.button-cancel {
						background-color: #f6f6f6;
					}

					.button-pay {
						margin-left: 20rpx;
						background-color: #85dbd0;
						color: #fff;
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
			font-size: 30rpx;
		}
	}

	.popup-container {
		height: 664rpx;
		margin: 0 auto;
		padding: 0 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		text-align: center;
		background-color: #fff;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;

		.popup-title {
			margin-bottom: 90rpx;
			display: flex;
			justify-content: center;
			align-items: baseline;

			.currency {
				margin-right: 10rpx;
				font-size: 24rpx;
			}

			.price {
				font-size: 32rpx;
				font-weight: bold;
			}
		}

		.button-sure {
			padding: 28rpx 0;
			background-color: #85dbd0;
			border-radius: 60rpx;
			color: #fff;
			font-size: 30rpx;
		}
	}
</style>
