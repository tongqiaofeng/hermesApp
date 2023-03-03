<template>
	<view class="order-detail-container" v-if="isShow">
		<view class="detail-top">
			<view :style="{ height: height + 'px' }"></view>
			<view class="top-title">
				<image class="left-icon" src="../static/imgs/order/back.png" mode="aspectFill" @click="goBack"></image>
				<text class="title">订单详情</text>
			</view>
			<view class="detail-status" v-if="orderDetail.orderStatus == -2">
				<image class="status-img" src="../static/imgs/order/01.png" mode="aspectFill"></image>
				<view class="status-font">
					<view class="font-title">
						已取消订单
					</view>
				</view>
			</view>
			<view class="detail-status" v-if="orderDetail.orderStatus == -1">
				<image class="status-img" src="../static/imgs/order/01.png" mode="aspectFill"></image>
				<view class="status-font">
					<view class="font-title">
						超时交易关闭
					</view>
				</view>
			</view>
			<view class="detail-status" v-if="orderDetail.orderStatus == 0">
				<image class="status-img" src="../static/imgs/order/01.png" mode="aspectFill"></image>
				<view class="status-font">
					<view class="font-title">
						等待买家付款
					</view>
					<view class="font-time" id="fontTime">
						{{timeEnd}}
					</view>
				</view>
			</view>
			<view class="detail-status" v-if="orderDetail.orderStatus == 1">
				<image class="status-img" src="../static/imgs/order/02.png" mode="aspectFill"></image>
				<view class="status-font">
					<view class="font-title">
						买家已付款
					</view>
					<view class="font-time">
						等待商家发货
					</view>
				</view>
			</view>
			<view class="status-two" v-if="orderDetail.orderStatus == 2">
				<view class="font-title">
					卖家已发货
				</view>
				<view class="status-logistics">
					<view class="logistics-left">
						<image class="car-img" src="../static/imgs/order/car.png" mode="aspectFill"></image>
						<view class="logistics-msg">
							<view class="logistics-now">
								快递目前所在地
							</view>
							<view class="logistics-time">
								到达此处的时间
							</view>
						</view>
					</view>
					<image class="right-img" src="../static/imgs/order/right.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="status-two" v-if="orderDetail.orderStatus == 3">
				<view class="font-title">
					订单已完成
				</view>
				<view class="status-logistics">
					<view class="logistics-left">
						<image class="car-img" src="../static/imgs/order/car.png" mode="aspectFill"></image>
						<view class="logistics-msg">
							<view class="logistics-now">
								签收地
							</view>
							<view class="logistics-time">
								签收时间
							</view>
						</view>
					</view>
					<image class="right-img" src="../static/imgs/order/right.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view class="" v-if="orderDetail.orderStatus > 1"> 当前物流状态，点击可查看物流详情 </view>
		<view class="order-addr" v-if="orderDetail.addressMsg">
			<view class="addr-top">
				<view class="">
					<text class="top-left">{{ orderDetail.addressMsg.name }}</text>
					<text class="top-right">{{ orderDetail.addressMsg.phone }}</text>
				</view>
				<view class="addr-top-update" @click="shippingAddress" v-if="orderDetail.orderStatus < 2">
					修改
				</view>
			</view>
			<view class="addr-bottom">
				{{ orderDetail.addressMsg.area + orderDetail.addressMsg.street }}
			</view>
		</view>
		<view class="order-product">
			<view v-for="(item, index) in orderDetail.detailList" :key="index" class="product-every">
				<view class="main-msg">
					<view class="msg-img" v-if="item.productCategory == 1">
						<image v-if="item.pic" :src="item.pic" mode="aspectFill"></image>
						<image v-else src="../static/imgs/common/nopic.jpg" mode="aspectFill"></image>
					</view>
					<view class="msg-img" v-if="item.productCategory == 2">
						<image v-if="item.pic" :src="imgUrl + '/file/small/' + item.pic.trim()" mode="aspectFill">
						</image>
						<image v-else src="../static/imgs/common/nopic.jpg" mode="aspectFill"></image>
					</view>
					<view class="msg-img" v-if="item.productCategory == 3">
						<image v-if="item.pic" :src="watchUrl + item.pic.trim()" mode="aspectFill">
						</image>
						<image v-else src="../static/imgs/common/nopic.jpg" mode="aspectFill"></image>
					</view>

					<view class="msg-data">
						<view class="data-name">{{ item.productName }}</view>
						<view class="data-num">
							<view>
								<text class="currency">CNY</text>
								<text class="price">{{ " " + formatNumberRgx(item.productAmount) }}</text>
							</view>
							<text class="num">{{'x' + item.num}}</text>
						</view>
						<view class="data-price">
							<text v-if="item.returnMsg && item.returnMsg.status == 0"
								style="color: #85dbd0">退款售后中...</text>
							<text v-if="
                  item.returnMsg &&
                  (item.returnMsg.status == 1 || item.returnMsg.status == 2)
                " style="color: #85dbd0">退款成功</text>
						</view>
					</view>
				</view>
				<view class="main-button" v-if="orderDetail.orderStatus == 1 || orderDetail.orderStatus == 2">
					<view class="button-cancel" v-if="item.returnMsg"
						style="padding: 14rpx 20rpx;margin-left: 20rpx;font-size: 24rpx;" @click="returnDetail(item)">
						退款详情
					</view>
					<view class="button-pay" v-if="item.returnMsg && item.returnMsg.status == 0"
						style="margin-left: 20rpx;padding: 14rpx 20rpx;font-size: 24rpx;"
						@click="returnCancel(item.returnMsg.id)">取消退款
					</view>
					<view class="button-pay" style="padding: 14rpx 20rpx;font-size: 24rpx;" v-if="!item.returnMsg"
						@click="returnOrder(item)">申请退款
					</view>
				</view>
				<view class="main-button" v-if="orderDetail.orderStatus == 3">
					<view class="button-pay" style="padding: 14rpx 20rpx;font-size: 24rpx;" @click="returnOrder(item)">
						申请售后 </view>
				</view>
			</view>
		</view>
		<view class="order-msg">
			<view class="msg-main">
				<view style="display: flex; align-items: center;">
					<text class="title">商品总价</text>
					<view class="out">
						<text style="font-size: 20rpx;">CNY</text>
						{{' ' + formatNumberRgx(orderDetail.productAmountTotal) }}
					</view>
				</view>
			</view>
			<view class="msg-main">
				<view style="display: flex; align-items: center;">
					<text class="title">实付金额</text>
					<view class="out">
						<text style="font-size: 20rpx;">CNY</text>
						{{' ' + formatNumberRgx(orderDetail.orderAmountTotal) }}
					</view>
				</view>
			</view>
		</view>

		<view class="order-msg" style="margin-bottom: 40rpx;">
			<view class="msg-main">
				<view style="display: flex; align-items: center">
					<text class="title">订单编号</text>
					<view class="out">{{ orderDetail.outTradeNo }}</view>
				</view>
				<view class="copy" @click="copyOut">复制</view>
			</view>
			<view class="msg-main">
				<view style="display: flex; align-items: center">
					<text class="title">创建时间</text>
					<view class="out">{{ orderDetail.createTime }}</view>
				</view>
			</view>
			<view class="msg-main" v-if="orderDetail.orderStatus > 0">
				<view style="display: flex; align-items: center">
					<text class="title">付款时间</text>
					<view class="out">{{ orderDetail.payTime }}</view>
				</view>
			</view>
			<view class="msg-main" v-if="orderDetail.orderStatus > 1">
				<view style="display: flex; align-items: center">
					<text class="title">发货时间</text>
					<view class="out">{{ orderDetail.createTime }}</view>
				</view>
			</view>
			<view class="msg-main" v-if="orderDetail.orderStatus > 0">
				<view style="display: flex; align-items: center">
					<text class="title">支付方式</text>
					<view class="out">
						{{orderDetail.payChannel == 1 ? '微信支付' : (orderDetail.payChannel == 3 ? '支付宝支付' : '数字支付')}}
					</view>
				</view>
			</view>
		</view>

		<view class="bottom-all-button" v-if="orderDetail.orderStatus != 1">
			<view class="main-button" v-if="orderDetail.orderStatus == 0">
				<view class="button-cancel" @click="cancelOrder">取消订单</view>
				<view class="button-pay" @click="payOrder">立即支付</view>
				<uni-popup ref="payPopup" type="center">
					<view class="popup-container">
						<view class="">
							支付金额 {{ "CNY " + formatNumberRgx(payPrice) }}
						</view>
						<view class="uni-form-item uni-column">
							<radio-group class="uni-list" @change="radioChange" v-model="tradeType">
								<label style="
			              margin-top: 20rpx;
			              display: flex;
			              justify-content: space-between;
			            " class="uni-list-cell uni-list-cell-pd" v-for="(radio, index3) in radioItems" :key="index3"
									@click="clickTradeType(index)">
									<view>
										<label class="label-2-text" style="display: flex; align-items: center"
											:for="radio.name">
											<image :src="radio.img"
												style="width: 30rpx; height: 28rpx; margin-right: 10rpx"
												mode="aspectFill">
											</image>
											<text style="font-size: 28rpx">{{ radio.name }}</text>
										</label>
									</view>
									<view>
										<radio style="transform: scale(0.7)" :value="radio.value"
											:checked="radio.checked"></radio>
									</view>
								</label>
							</radio-group>
						</view>
						<view class="button-sure" @click="paySure">确认支付</view>
					</view>
				</uni-popup>
			</view>
			<view class="main-button" style="padding-top: 20rpx; border-top: 2rpx solid #f9f9f9"
				v-if="orderDetail.orderStatus == 2">
				<view class="button-pay" @click="checkLogistics">查看物流</view>
				<view class="button-pay" @click="deliverySure">确认收货</view>
			</view>
			<view class="main-button" v-if="
			    orderDetail.orderStatus == -1 ||
			    orderDetail.orderStatus == -2 ||
			    orderDetail.orderStatus == 3
			  ">
				<view class="button-pay" style="background-color: red" @click="delOrder">删除订单</view>
			</view>
		</view>
		<uni-popup ref="usdtPopup" type="bottom">
			<view class="usdt-popup-container">
				<view class="usdt-title">
					<view class="title">
						数字货币支付
					</view>
					<view class="push">发送</view>
					<view class="price">
						<text>{{formatNumberRgx(totalUsPrice)}}</text>
						<text class="currency">USDT</text>
					</view>
				</view>
				<view class="usdt-every" v-for="item in usdtList" :key="item.id">
					<view class="every-name">
						{{item.name}}
					</view>
					<view class="every-account">
						<view class="account">
							{{item.accountNumber}}
						</view>
						<view class="button-copy" @click="copyUSDT(item.accountNumber)">
							复制
						</view>
					</view>
				</view>
				<view class="usdt-font">
					支付之后，请联系客服
				</view>
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
				isShow: false,
				height: null,
				detailId: null,
				orderDetail: {},
				payPrice: 0,
				verification: {},

				// #ifdef MP-WEIXIN
				tradeType: 0,
				// #endif
				// #ifdef APP-PLUS
				tradeType: 1,
				// #endif
				radioItems: [
					// #ifdef MP-WEIXIN
					{
						name: "微信支付",
						value: "0",
						img: require("../static/imgs/pay/wx.png"),
						checked: true,
					},
					// #endif
					// #ifdef APP-PLUS
					{
						name: "支付宝支付",
						value: "1",
						img: require("../static/imgs/pay/zhifubao.png"),
						checked: true,
					},
					{
						name: "数字货币支付",
						value: "2",
						img: require("../static/imgs/pay/USDT.png"),
						checked: false,
					},
					// #endif
				],
				timeEnd: "",
				totalUsPrice: 0,
				usdtList: [{
						id: 1,
						name: "TRC20",
						accountNumber: "TL7BvRcmZKvzDnhuNRVRH1inqReAX5Jhr5"
					},
					{
						id: 2,
						name: "ERC20",
						accountNumber: "0x9b2117d4a942c110c63857dd44f77436766428fc"
					},
					{
						id: 3,
						name: "HECO",
						accountNumber: "0x30cf1dfac257269883933c73fa470573708ce94d"
					},
					{
						id: 4,
						name: "BSC",
						accountNumber: "0x723caf8974b62299a5ef62de4bffee07e2426527"
					}
				]
			};
		},
		onLoad(option) {
			uni.getSystemInfo({
				success: (data) => {
					// 将其赋值给this
					this.height = data.statusBarHeight;
					console.log('height');
					console.log(this.height);
				},
			});

			this.detailId = option.id;
			this.getOrderInfo(option.id);

			uni.$on('addrSelSure', (val) => {
				console.log(val);
				this.orderDetail.addressMsg = val;
				this.updateAddrSure();
			})
		},
		methods: {
			// 修改收货地址
			shippingAddress() {
				uni.navigateTo({
					url: "./addr/addressAdmin",
				});
			},
			// 确定修改
			updateAddrSure() {
				uni.request({
					url: this.$baseUrl + "/order/api/orderAddressSave?orderId=" + this.orderDetail.id +
						"&addressId=" + this.orderDetail.addressMsg.id,
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync("token"),
					},
					complete: (res) => {
						console.log("修改收货地址");
						console.log(res);
						if (res.statusCode == 200) {
							this.getOrderInfo(this.detailId);
						} else {
							uni.showToast({
								icon: "none",
								title: res.data.message,
							});
						}
					},
				});
			},
			// 复制数字货币支付账号
			copyUSDT(account) {
				console.log("复制");
				uni.setClipboardData({
					data: account, //要被复制的内容
					success: () => {
						//复制成功的回调函数
						uni.showToast({
							//提示
							title: "复制成功，请转账支付",
							icon: "none",
							complete: () => {
								this.$refs.usdtPopup.close();
							}
						});
					},
				});
			},
			// 支付方式
			radioChange(e) {
				console.log(e);
				this.tradeType = e.target.value;
				if (this.tradeType == 2) {
					this.$refs.usdtPopup.open()
				}
			},
			clickTradeType(index) {
				this.radioItems[index].checked = !this.radioItems[index].checked;
				if (this.radioItems[index].value == 2 && this.radioItems[index].checked) {
					this.$refs.usdtPopup.open()
				}
			},
			// 复制订单编号
			copyOut() {
				console.log("复制");
				uni.setClipboardData({
					data: this.orderDetail.outTradeNo, //要被复制的内容
					success: () => {
						//复制成功的回调函数
						uni.showToast({
							//提示
							title: "复制成功",
							icon: "none",
						});
					},
				});
			},
			// 查看物流
			checkLogistics() {
				console.log("查看物流");
				uni.navigateTo({
					url: "./logistics?id=" + this.detailId,
				});
			},
			// 确认收货
			deliverySure() {
				console.log("确认收货");
				uni.request({
					url: this.$baseUrl + "/order/api/checkReceive",
					method: "POST",
					data: {
						id: this.detailId,
					},
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync("token"),
					},
					complete: (res) => {
						console.log("确认收货");
						console.log(res);
						if (res.statusCode == 200) {
							this.getOrderInfo(this.detailId);
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
			// 退款详情
			returnDetail(item) {
				console.log("退款详情", item);
				uni.navigateTo({
					url: "./returnOrderDetail?id=" + item.id
				})
			},
			// 取消退款
			returnCancel(id) {
				uni.showModal({
					content: "确定取消该退款？",
					confirmColor: "#85dbd0",
					success: (ret) => {
						if (ret.confirm) {
							uni.request({
								url: this.$baseUrl + "/afterService/api/refundSave",
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
				console.log(item);
				let params = {
					productId: item.stockId,
					orderId: this.orderDetail.id,
					price: item.subTotal,
					phone: this.orderDetail.addressMsg.phone,
					productCategory: item.productCategory
				};
				let productParams = {
					pic: item.pic,
					name: item.productName,
					price: item.actualAmount,
					num: item.num,
					productCategory: item.productCategory,
					state: this.orderDetail.orderStatus,
				};
				uni.navigateTo({
					url: "./returnType?params=" +
						JSON.stringify(params) +
						"&productParams=" +
						JSON.stringify(productParams),
				});
			},
			// 取消订单
			cancelOrder() {
				console.log("取消订单");
				uni.request({
					url: this.$baseUrl + "/order/api/closeOrder",
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
				this.$refs.payPopup.open();
			},
			// 确定支付
			paySure() {
				uni.showLoading({
					title: "",
				});
				uni.request({
					url: this.$baseUrl + "/wechat/api/payMsgGet",
					data: {
						id: this.orderDetail.id,
						tradeType: this.tradeType == 0 ? 1 : (this.tradeType == 1 ? 3 : '')
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

							// #ifdef MP-WEIXIN
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
									this.getOrderList()
								},
								fail: (err) => {
									console.log("fail:");
									console.log(err);
								},
							});
							// #endif

							// #ifdef APP-PLUS
							console.log("APP支付宝支付");

							uni.requestPayment({
								provider: "alipay",
								orderInfo: this.verification,
								success: (ret) => {
									console.log('success:');
									console.log(ret);

									this.getOrderList()
								},
								fail: (err) => {
									console.log('fail:');
									console.log(err);
									uni.showToast({
										icon: "none",
										title: "支付失败",
										duration: 2000,
									});
								}
							})

							// #endif
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
								url: this.$baseUrl + "/order/api/orderDel",
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
					url: this.$baseUrl + "/order/api/orderInfo?id=" + id,
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync("token"),
					},
					complete: (res) => {
						uni.hideLoading();
						console.log("订单详情");
						console.log(res);
						this.orderDetail = res.data;

						this.payPrice = 0;
						this.totalUsPrice = 0;
						if (this.orderDetail.detailList.length > 0) {
							for (let item of this.orderDetail.detailList) {
								this.payPrice += Number(item.productAmount);
								this.totalUsPrice = +Number(item.productAmountUs);
							}
						}

						if (this.orderDetail.orderStatus == 0 && this.orderDetail.closeTime) {
							setInterval(() => {
								//订单过期时候的时间戳，或者是一个其它时间，这里灵活处理
								let expireTime = Number(Date.parse(this.orderDetail.closeTime) + (24 *
									3600 * 1000));
								let houtime = Number(expireTime - Date.parse(new Date())) / 1000; //秒

								this.timeEnd = this.timeStamp(houtime);
							}, 1000)
						}

						this.isShow = true;
					},
				});
			},
			timeStamp(second_time) {
				if (second_time <= 0) {
					return;
				}

				let time = '00时00分' + parseInt(second_time) + '秒';
				if (parseInt(second_time) > 60) {
					let second = parseInt(second_time) % 60;
					let min = parseInt(second_time / 60);
					time = '00时' + min + '分' + second + '秒';
					let hour = 0;

					if (min > 60) {
						min = parseInt(second_time / 60) % 60;
						hour = parseInt(parseInt(second_time / 60) / 60);
					}
					hour = hour > 9 ? hour : '0' + hour;
					min = min > 9 ? min : '0' + min;
					second = second > 9 ? second : '0' + second;

					time = hour + '时' + min + '分' + second + '秒';
				}
				return time;
			},
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
		},
	};
</script>

<style lang="scss" scoped>
	.usdt-popup-container {
		padding: 60rpx 0 0;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
		background-color: #fff;

		.usdt-title {
			text-align: center;

			.title {
				font-size: 32rpx;
				font-weight: bold;
				color: #000;
			}

			.push {
				margin-top: 40rpx;
				font-size: 24rpx;
				color: #999999;
			}

			.price {
				font-size: 40rpx;
				color: #FF7821;
				font-weight: bold;

				.currency {
					margin-left: 10rpx;
				}
			}
		}

		.usdt-every {
			margin: 0 30rpx;
			padding: 30rpx 20rpx;
			margin-top: 30rpx;
			background-color: #EAFAF8;
			border-radius: 20rpx;

			.every-name {
				font-size: 30rpx;
				font-weight: bold;
			}

			.every-account {
				margin-top: 20rpx;
				display: flex;
				justify-content: space-between;

				.account {
					flex: 1;
					word-wrap: break-word;
					word-break: break-all;
					text-align: left;
					font-size: 28rpx;
					color: #4B605D;
				}

				.button-copy {
					margin-left: 30rpx;
					font-size: 26rpx;
					color: #72D5C8;
				}
			}
		}

		.usdt-font {
			margin-top: 80rpx;
			padding: 37rpx 32rpx;
			background-color: #EAFAF8;
			font-size: 28rpx;
			color: #000;
		}
	}

	.order-detail-container {
		min-height: 100vh;
		// height: fit-content;
		// padding-bottom: 40rpx;
		padding-bottom: 150rpx;
		background-color: #f1f1f1;

		.detail-top {
			padding: 0 20rpx;
			background: linear-gradient(to right, #68decf, #6BCDA5);

			.top-title {
				display: flex;
				align-items: center;
				color: #fff;

				.left-icon {
					width: 18rpx;
					height: 30rpx;
				}

				.title {
					margin-left: 40rpx;
					font-size: 36rpx;
				}
			}

			.detail-status {
				// padding: 40rpx 22rpx 114rpx;
				padding: 40rpx 22rpx 150rpx;
				display: flex;
				align-items: center;

				.status-img {
					width: 49rpx;
					height: 47rpx;
				}

				.status-font {
					margin-left: 20rpx;

					.font-title {
						font-weight: bold;
						font-size: 34rpx;
						color: #fff;
					}

					.font-time {
						margin-top: 9rpx;
						font-size: 22rpx;
						color: #fff;
					}
				}
			}

			.status-two {
				padding: 40rpx 22rpx 114rpx;

				.font-title {
					font-weight: bold;
					font-size: 34rpx;
					color: #fff;
				}

				.status-logistics {
					margin-top: 46rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.logistics-left {
						flex: 1;
						display: flex;

						.car-img {
							width: 50rpx;
							height: 50rpx;
						}

						.logistics-msg {
							margin-left: 18rpx;
							color: #fff;

							.logistics-now {
								font-size: 26rpx;
							}

							.logistics-time {
								font-size: 22rpx;
							}
						}
					}

					.right-img {
						width: 15rpx;
						height: 22rpx;
					}
				}
			}
		}

		.order-addr {
			height: 168rpx;
			margin: 0 24rpx;
			margin-top: -84rpx;
			padding: 40rpx 50rpx 33rpx;
			background-color: #fff;
			border-radius: 20rpx;
			box-sizing: border-box;

			.addr-top {
				display: flex;
				justify-content: space-between;

				.top-left {
					font-size: 32rpx;
					color: #000;
					font-weight: bold;
				}

				.top-right {
					padding-left: 9rpx;
					color: #999999;
				}

				.addr-top-update {
					padding: 8rpx 20rpx;
					border: 2rpx solid #999;
					border-radius: 60rpx;
					font-size: 22rpx;
				}
			}

			.addr-bottom {
				margin-top: 10rpx;
				font-size: 26rpx;
			}
		}

		.order-product {
			padding: 0 24rpx;

			.product-every {
				margin-top: 20rpx;
				padding: 30rpx 47rpx 30rpx 20rpx;
				background-color: #fff;
				border-radius: 20rpx;

				.main-msg {
					margin-top: 4rpx;
					display: flex;

					.msg-img {
						image {
							width: 180rpx;
							height: 180rpx;
						}
					}

					.msg-data {
						margin-left: 20rpx;
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.data-name {
							text-align: left;
							font-size: 26rpx;
						}

						.data-num {
							margin: 20rpx 0;
							display: flex;
							justify-content: space-between;
							align-items: center;
							font-size: 24rpx;
							color: #FF7922;

							.currency {}

							.price {
								font-size: 36rpx;
							}

							.num {
								color: #999999;
								font-weight: bold;
							}
						}

						.data-price {
							padding-bottom: 20rpx;
							text-align: right;
							color: #FF7922;
							font-size: 26rpx;
						}
					}
				}
			}
		}

		.order-msg {
			padding: 40rpx 20rpx 0;
			margin: 20rpx 24rpx 0;
			background-color: #fff;
			border-radius: 20rpx;

			.msg-main {
				display: flex;
				justify-content: space-between;
				padding-bottom: 40rpx;
				font-size: 24rpx;

				.title {
					margin-right: 40rpx;
					color: #999999;
				}

				.out {
					flex: 1;
					text-align: center;
					font-size: #000;
				}

				.copy {
					margin-left: 40rpx;
					color: #85DBD0;
				}
			}
		}

		.bottom-all-button {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			padding: 27rpx 44rpx 33rpx;
			background-color: #fff;
		}

		.main-button {
			display: flex;
			justify-content: flex-end;

			.button-cancel,
			.button-pay {
				padding: 19rpx 40rpx;
				border-radius: 60rpx;
				font-size: 28rpx;
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
</style>
