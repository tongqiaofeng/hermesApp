<template>
	<view class="popup-container">
		<view class="pay-type-top">
			<view class="type-top-price">
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
							<label class="label-2-text" style="display: flex; align-items: center" :for="radio.name">
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
								:checked="radio.checked">
							</radio>
						</view>
					</label>
				</radio-group>
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
						<view class="button-copy" @click="copyOut(item.accountNumber)">
							复制
						</view>
					</view>
				</view>
				<view class="usdt-font">
					支付之后，请联系客服
				</view>
			</view>
		</uni-popup>

		<view class="button-sure" @click="paySure">确认支付</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				totalUsPrice: 0,
				payId: null,
				payPrice: 0,
				payType: null,
				
				tradeType: 1,
				radioItems: [{
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
				],
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
			}
		},
		onLoad(option) {
			console.log(option);
			this.payId = option.id;
			this.payPrice = option.price;
			this.totalUsPrice = option.priceUs;
		},
		methods: {
			// 复制数字货币支付账号
			copyOut(account) {
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
			// 确定支付
			paySure() {
				uni.showLoading({
					title: "",
				});
				uni.request({
					url: this.$baseUrl + "/wechat/api/payMsgGet",
					data: {
						id: this.payId,
						tradeType: 3
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

							console.log("APP支付宝支付");
							uni.requestPayment({
								provider: "alipay",
								orderInfo: this.verification,
								success: (ret) => {
									console.log('success:');
									console.log(ret);

									uni.navigateBack({
										delta: 1
									})
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
		}
	}
</script>

<style lang="scss" scoped>
	.popup-container {
		height: 80vh;
		padding: 40rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		text-align: center;
		background-color: #fff;
		border-radius: 30rpx;

		.type-top-price {
			margin-bottom: 60rpx;
			font-size: 28rpx;
		}

		.button-sure {
			padding: 20rpx 60rpx;
			background-color: #85dbd0;
			border-radius: 60rpx;
			color: #fff;
			font-size: 28rpx;
		}
	}

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
</style>
