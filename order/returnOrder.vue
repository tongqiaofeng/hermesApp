<template>
	<view class="return-order-container" v-if="isShow">
		<!-- 退换货 -->
		<view v-if="haveData == 0" class="no-data">
			<image src="../static/imgs/common/no.png" mode="aspectFill"></image>
			<text style="font-size: 30rpx">暂无退款记录~</text>
		</view>
		<view v-else class="return-main">
			<view class="prompt-msg">
				若收到货，请自行寄回商品，商家收到货后会给予您退款
			</view>
			<view class="main-every" v-for="(item, index) in refundList" :key="index">
				<view style="text-align: right; font-size: 30rpx; color: #FE7722">
					{{ editState(item.status) }}
				</view>
				<view class="every-top">
					<view class="top-img" v-if="item.productCategory == 1">
						<image v-if="item.pic" :src="item.pic.trim()" mode="aspectFill"></image>
						<image v-else src="../static/imgs/common/nopic.jpg" mode="aspectFill"></image>
					</view>
					<view class="top-img" v-if="item.productCategory == 2" >
						<image v-if="item.pic" :src="imgUrl + '/file/small/' + item.pic.trim()" mode="aspectFill">
						</image>
						<image v-else src="../static/imgs/common/nopic.jpg" mode="aspectFill"></image>
					</view>
					<view class="top-img" v-if="item.productCategory == 3" >
						<image v-if="item.pic" :src="watchUrl + item.pic.trim()" mode="aspectFill">
						</image>
						<image v-else src="../static/imgs/common/nopic.jpg" mode="aspectFill"></image>
					</view>
					
					<view class="top-right">
						<view class="right-name">
							{{ item.name }}
						</view>
						<view class="right-price">
							<text style="font-size: 30rpx;">退款：</text>
							<text style="font-size: 24rpx;">CNY</text>{{ " " + formatNumberRgx(item.refund) }}
						</view>
					</view>
				</view>
				<view class="every-bottom">
					<view class="button-del" v-if="item.status != 0" @click="delReturn(item)">删除记录</view>
					<view class="button-detail" @click="checkReturnMsg(item)">查看详情</view>
				</view>
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
				isShow: false,
				haveData: 1,
				refundList: [],
			};
		},
		onLoad() {
			this.getRefundsList();
		},
		methods: {
			// 删除退货/退款记录
			delReturn(item) {
				console.log(item);
			},
			// 查看退款详情
			checkReturnMsg(item) {
				console.log(item);
				// 查看退款详情时，同时发送请求获取退款结果
				uni.navigateTo({
					url: "./returnOrderDetail?id=" + item.id
				})
			},
			// 获取退换货列表
			getRefundsList() {
				uni.showLoading({
					title: "加载中..."
				})
				uni.request({
					url: this.$baseUrl + "/afterService/api/refundList",
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync("token"),
					},
					complete: (res) => {
						console.log("退换货列表");
						console.log(res);
						this.refundList = res.data;
						if (this.refundList.length == 0) {
							this.haveData = 0;
						} else {
							this.haveData = 1;
						}
						
						uni.hideLoading();
						this.isShow = true;
					},
				});
			},
			// 审核状态
			editState(status) {
				switch (status) {
					case -2:
						return "取消申请";
						break;
					case -1:
						return "拒绝申请";
						break;
					case 0:
						return "待审核";
						break;
					case 1:
						return "审核通过";
						break;
					case 2:
						return "已退款";
						break;
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.return-order-container {
		height: 100vh;
		background-color: #f9f9f9;

		.return-main {
			padding: 0 23rpx;

			.prompt-msg {
				font-size: 24rpx;
				padding: 20rpx 0;
			}

			.main-every {
				padding: 30rpx 20rpx;
				margin-bottom: 20rpx;
				background-color: #fff;
				border-radius: 10rpx;

				.every-top {
					margin-top: 42rpx;
					display: flex;
					justify-content: space-between;

					.top-img image {
						width: 180rpx;
						height: 180rpx;
						border-radius: 10rpx;
					}

					.top-right {
						margin-left: 20rpx;
						padding-bottom: 24rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						font-size: 26rpx;

						.right-price {
							margin-top: 20rpx;
							font-size: 36rpx;
						}
					}
				}

				.every-bottom {
					margin-top: 20rpx;
					display: flex;
					justify-content: flex-end;

					.button-del,
					.button-detail {
						padding: 10rpx 30rpx;
						font-size: 28rpx;
						border-radius: 60rpx;
					}

					.button-del {
						color: #c3c3c3;
						border: 1px solid #c3c3c3;
					}

					.button-detail {
						margin-left: 20rpx;
						background-color: #85dbd0;
						color: #fff;
					}
				}
			}
		}
	}
</style>
