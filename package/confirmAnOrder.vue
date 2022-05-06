<template>
	<view class="confirm-order-container">
		<!-- 确认订单 -->
		<view class="confirm-order-container-top" @click="shippingAddress">
			<view class="top-left" v-if="address == '' || address == null">
				请选择收货地址
			</view>
			<view class="top-left" v-else>
				<view class="left-top">
					<text>{{address.name}}</text>
					<text>{{address.phone}}</text>
					<text class="default-sign" v-show="address.isDefaultAddress == 1">默认</text>
				</view>
				<view class="left-bottom">
					{{address.area+address.street}}
				</view>
			</view>
			<image class="top-right" src="../static/imgs/mine/right.png" mode="aspectFill"></image>
		</view>
		<view class="confirm-order-container-product" v-for="(item,index) in selList" :key="index">
			<view class="">
				<image :src="item.imgSrc" mode="aspectFill" class="product-img"></image>
			</view>
			<view class="product-container">
				<view class="name">
					{{decodeURIComponent(item.name)}}
				</view>
				<view class="price">
					<text style="font-size: 22rpx;">{{'HKD'}}<text
							style="font-size: 30rpx;">{{' ' + formatNumberRgx(item.price)}}</text></text>
					<text style="color: #2C405A;">x {{item.num}}</text>
				</view>
			</view>
		</view>
		<view class="confirm-order-container-bottom">
			<view class="delivery-type">
				<text>配送方式</text>
				<view class="type-right">
					<text>物流快递</text>
					<image class="right-img" src="../static/imgs/classify/right.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="delivery-price">
				<text>商品金额</text>
				<text class="price-right" style="font-size: 22rpx;">{{'HKD'}}<text
						style="font-size: 30rpx;">{{' ' + formatNumberRgx(totalPrice)}}</text></text>
			</view>
		</view>
		<view class="confirm-order-container-total">
			<text class="total-num">共{{selList.length}}件</text>
			<view class="total-price">
				<text>合计：</text>
				<text style="font-size: 22rpx;color: #ff8b62;">{{'HKD'}}<text
						style="font-size: 30rpx;">{{' ' + formatNumberRgx(totalPrice)}}</text></text>
			</view>
			<view class="total-button" @click="createOrder">提交订单</view>
		</view>
		<uni-popup ref="payPopup" type="center">
			<view class="popup-container">
				<view class="">
					支付金额 {{'CNY ' + formatNumberRgx(cnyTotalPrice)}}
				</view>
				<view class="button-sure" @click="pay">立即支付</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				totalPrice: 0,
				cnyTotalPrice: 0,
				address: JSON.parse(uni.getStorageSync('userAddress')),
				selList: [],
				verification: {}
			}
		},
		onShow() {
			console.log('地址')
			console.log(JSON.parse(uni.getStorageSync('userAddress')))
			this.address = JSON.parse(uni.getStorageSync('userAddress'));
		},
		onLoad(option) {
			console.log('传参')
			console.log(option.productList);
			if (option.productList) {
				this.selList = JSON.parse(option.productList);
			}

			for (let item of this.selList) {
				this.totalPrice += Number(item.price);
			}
		},
		methods: {
			// 收货地址
			shippingAddress() {
				uni.navigateTo({
					url: "addressAdmin"
				})
			},
			// 生成支付订单
			createOrder() {
				// 传递参数
				// 商品id、数量、商品价格、交易金额

				// 调用后端生成订单接口
				// 调用成功，打开支付页面
				uni.showLoading({
					title: "微信支付"
				});
				uni.request({
					url: this.$baseUrl + "/weChatCreateOrder",
					method: "POST",
					data: {
						addressId: this.address.id,
						detailList: this.selList,
						total: this.totalPrice
					},
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync('token')
					},
					complete: (res) => {
						uni.hideLoading();
						console.log('生成订单');
						console.log(res);

						if (res.statusCode == 200) {
							this.verification = res.data;
							this.$refs.payPopup.open();
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
						this.$refs.payPopup.close();
						uni.reLaunch({
							url: "orderList"
						})
					},
					fail: (err) => {
						this.$refs.payPopup.close();
						console.log('fail:');
						console.log(err);
					}
				});
			},
		},
	}
</script>

<style scoped lang="scss">
	.confirm-order-container {
		min-height: 100vh;
		background-color: #f9f9f9;

		.confirm-order-container-top {
			height: 100rpx;
			padding: 20rpx 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;

			.top-left {
				color: #c3c3c3;
				font-size: 28rpx;

				.left-top {
					text {
						padding-right: 20rpx;
						font-size: 28rpx;
					}

					.default-sign {
						padding: 4rpx 10rpx;
						color: #fff;
						background-color: #85dbd0;
						border-radius: 10rpx;
						font-size: 22rpx;
					}
				}

				.left-bottom {
					margin-top: 10rpx;
					font-size: 24rpx;
					color: #c3c3c3;
				}
			}

			.top-right {
				width: 44rpx;
				height: 44rpx;
			}
		}

		.confirm-order-container-product {
			padding: 20rpx 40rpx;
			margin-top: 4rpx;
			display: flex;
			background-color: #fff;

			.product-img {
				width: 200rpx;
				height: 200rpx;
				margin-right: 20rpx;
				border-radius: 30rpx;
			}

			.product-container {

				.name {
					font-size: 28rpx;
				}

				.price {
					margin-top: 10rpx;
					color: #ff8b62;
					display: flex;
					justify-content: space-between;
				}
			}
		}

		.confirm-order-container-bottom {
			padding: 0 20rpx 150rpx 20rpx;

			.delivery-type {
				height: 80rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 28rpx;

				.type-right {
					display: flex;
					align-items: center;

					image {
						width: 32rpx;
						height: 32rpx;
					}
				}
			}

			.delivery-price {
				height: 80rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 28rpx;

				.price-right {
					color: #ff8b62;
				}
			}
		}

		.confirm-order-container-total {
			height: 120rpx;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #fff;

			.total-num {
				color: #c3c3c3;
				font-size: 24rpx;
			}

			.total-price {
				margin-left: 20rpx;
				font-size: 30rpx;
			}

			.total-button {
				margin: 0 20rpx 0 60rpx;
				padding: 20rpx 40rpx;
				background-color: #85dbd0;
				color: #fff;
				font-size: 26rpx;
				border-radius: 60rpx;
			}
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
</style>
