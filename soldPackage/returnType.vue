<template>
	<view class="return-type-container">
		<!-- 选择售后类型 -->
		<view class="return-type-product" @click="checkLogic">
			<view class="product-font">
				<view>
					<image :src="productParams.pic" mode="aspectFill"
						style="width: 100rpx;height: 100rpx;border-radius: 10rpx;"></image>
				</view>
				<text class="font">
					{{statusDecide(productParams.state)+ ' | 物流'}}
				</text>
			</view>
			<view class="product-right">
				<image src="../static/imgs/classify/right.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="return-type-every" @click="returnProductAndPrice">
			<view class="every-left">
				<image class="left-img" src="../static/imgs/mine/right.png" mode="aspectFill"></image>
				<view class="left-main">
					<view class="main-top">
						<text>我要退货退款</text>
					</view>
					<view class="main-bottom">
						<text>已收到货，需要退还已收到的货物</text>
					</view>
				</view>
			</view>
			<view class="every-right">
				<image src="../static/imgs/classify/right.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="return-type-every" @click="returnPrice">
			<view class="every-left">
				<image class="left-img" src="../static/imgs/mine/right.png" mode="aspectFill"></image>
				<view class="left-main">
					<view class="main-top">
						<text>我要退款(无需退货)</text>
					</view>
					<view class="main-bottom">
						<text>未收到货，或与商家协商之后申请</text>
					</view>
				</view>
			</view>
			<view class="every-right">
				<image src="../static/imgs/classify/right.png" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				returnParams: {},
				productParams: {}
			}
		},
		onLoad(option) {
			console.log(JSON.parse(option.productParams))
			this.returnParams = JSON.parse(option.params);
			this.productParams = JSON.parse(option.productParams);
		},
		methods: {
			// 查看物流详情
			checkLogic(){
				console.log('查看物流')
			},
			// 退货退款
			returnProductAndPrice() {
				uni.navigateTo({
					url: "priceAndProduct?retParams=" + JSON.stringify(this.returnParams) + "&type=1"
				})
			},
			// 退款
			returnPrice() {
				uni.navigateTo({
					// url: "returnPrice"
					url: "priceAndProduct?retParams=" + JSON.stringify(this.returnParams) + "&type=0"
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
						return '商品已付款';
						break;
					case 2:
						return '商品已发货';
						break;
					case 3:
						return '商品已签收';
						break;
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.return-type-container {
		height: 100vh;
		background-color: #f9f9f9;

		.return-type-product {
			margin-top: 2rpx;
			padding: 20rpx 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;

			.product-font {
				display: flex;
				align-items: center;

				.font {
					max-width: 490rpx;
					margin-left: 20rpx;
					font-size: 24rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					color: #c3c3c3;
				}
			}

			.product-right {
				margin-left: 20rpx;

				image {
					width: 32rpx;
					height: 32rpx;
				}
			}
		}

		.return-type-every {
			margin: 40rpx;
			padding: 50rpx 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;
			border-radius: 10rpx;

			.every-left {
				display: flex;

				.left-img {
					width: 44rpx;
					height: 44rpx;
				}

				.left-main {
					margin-left: 40rpx;

					.main-top {
						font-size: 32rpx;
					}

					.main-bottom {
						margin-top: 20rpx;
						font-size: 24rpx;
						color: #c3c3c3;
					}
				}
			}

			.every-right {
				image {
					width: 32rpx;
					height: 32rpx;
				}
			}
		}
	}
</style>
