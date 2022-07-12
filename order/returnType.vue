<template>
	<view class="return-type-container">
		<!-- 选择售后类型 -->
		<view class="return-type-product" @click="checkLogic">
			<view class="title">
				退款商品
			</view>
			<view class="product-msg">
				<view class="msg-img" v-if="productParams.productCategory == 1">
					<image v-if="productParams.pic" :src="productParams.pic" mode="aspectFill"></image>
					<image v-else src="../static/imgs/common/nopic.jpg" mode="aspectFill"></image>
				</view>
				<view class="msg-img" v-if="productParams.productCategory == 2">
					<image v-if="productParams.pic" :src="imgUrl + '/file/small/' + productParams.pic.trim()" mode="aspectFill">
					</image>
					<image v-else src="../static/imgs/common/nopic.jpg" mode="aspectFill"></image>
				</view>
				<view class="msg-img" v-if="productParams.productCategory == 3">
					<image v-if="productParams.pic" :src="watchUrl + productParams.pic.trim()" mode="aspectFill">
					</image>
					<image v-else src="../static/imgs/common/nopic.jpg" mode="aspectFill"></image>
				</view>
				
				<view class="product-right">
					<view class="name">
						{{productParams.name}}
					</view>
					<view class="price-num">
						<view class="price">
							<text style="font-size: 24rpx;">CNY</text>
							<text>{{formatNumberRgx(productParams.price)}}</text>
						</view>
						<view class="num">
							{{'x'+productParams.num}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="return-type-every" @click="returnProductAndPrice">
			<view class="every-left">
				<image class="left-img" src="../static/imgs/order/return02.png" mode="aspectFill"></image>
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
				<image class="left-img" src="../static/imgs/order/return01.png" mode="aspectFill"></image>
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
				imgUrl: this.$baseUrl + "/jewellery/api",
				watchUrl: this.$baseUrl + "/watch/api",
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
		padding: 0 24rpx;
		background-color: #f9f9f9;

		.return-type-product {
			padding: 29rpx 20rpx 30rpx;
			background-color: #fff;
			border-radius: 20rpx;
			
			.title{
				font-size: 30rpx;
				color: #000;
				font-weight: bold;
			}
			
			.product-msg{
				margin-top: 39rpx;
				display: flex;
				justify-content: space-between;
				
				.msg-img{
					margin-right: 19rpx;
					
					image{
						width: 180rpx;
						height: 180rpx;
						border-radius: 20rpx;
					}
				}
				
				.product-right{
					padding-bottom: 17rpx;
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					
					.name{
						font-size: 26rpx;
						text-align: left;
					}
					
					.price-num{
						display: flex;
						justify-content: space-between;
						align-items: center;
						
						.price{
							font-size: 36rpx;
						}
						
						.num{
							color: #999999;
							font-size: 24rpx;
						}
					}
				}
			}
		}

		.return-type-every {
			margin-top: 20rpx;
			padding: 40rpx 22rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;
			border-radius: 20rpx;

			.every-left {
				display: flex;
				align-items: center;

				.left-img {
					width: 34rpx;
					height: 34rpx;
				}

				.left-main {
					margin-left: 20rpx;

					.main-top {
						font-size: 30rpx;
						font-weight: bold;
					}

					.main-bottom {
						margin-top: 11rpx;
						font-size: 24rpx;
						color: #999999;
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
