<template>
	<view class="addr-admin" v-if="isShow">
		<view v-if="haveData == 0" class="no-data" style="padding-top: 350rpx;" @click="addAddr">
			<image src="../../static/imgs/common/no.png" mode="aspectFill"></image>
			<text style="font-size: 30rpx">暂无收货地址，去添加~</text>
		</view>
		<view v-else>
			<view class="addr-container">
				<view class="addr-every" v-for="(item, index) in addrList" :key="index">
					<view class="every-left" @click="addrSel(item)">
						<view class="left-top">
							<text v-if="item.isDefaultAddress == 1" class="default-sign">默认</text>
							<text class="addr-name">{{ item.name }}</text>
							<text class="addr-phone">{{ item.phone }}</text>
						</view>
						<view class="left-bottom">
							{{ item.area + item.street }}
						</view>
					</view>
					<view class="every-right">
						<image src="../../static/imgs/order/edit.png" mode="aspectFill" @click="addrUpdate(item)">
						</image>
					</view>
				</view>
			</view>
			<view class="addr-button" @click="addAddr">+ 添加新的收货地址</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addrList: [],
				isShow: false,
				haveData: 1
			};
		},
		onLoad() {
			this.getAddrList();
		},
		methods: {
			// 选择收货地址
			addrSel(item) {
				console.log("-----------", getCurrentPages());
				// getCurrentPages()[0].route != "pages/mine" 
				
				if (getCurrentPages().length > 2 && getCurrentPages()[2].route == "order/confirmAnOrder") {
					uni.setStorageSync(
						"userAddress",
						encodeURIComponent(JSON.stringify(item))
					);
					
					uni.navigateBack({
						delta: 1,
					});
				}
				
				if (getCurrentPages().length > 2 && getCurrentPages()[2].route == "order/orderDetail") {
					uni.$emit('addrSelSure',item)
					
					uni.navigateBack({
						delta: 1,
					});
				}
			},
			// 修改地址
			addrUpdate(val) {
				console.log(val);
				uni.navigateTo({
					url: "addressUpdate?id=" +
						val.id +
						"&name=" +
						val.name +
						"&phone=" +
						val.phone +
						"&area=" +
						val.area +
						"&street=" +
						val.street +
						"&isDefaultAddress=" +
						val.isDefaultAddress +
						"&isChina=" +
						val.isChina,
				});
			},
			// 获取地址列表
			getAddrList() {
				uni.showLoading({
					title: "加载中",
				});
				uni.request({
					url: this.$baseUrl + "/cart/api/deliveryAddressList",
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync("token"),
					},
					complete: (res) => {
						console.log("地址列表");
						console.log(res);
						this.addrList = res.data;
						if (this.addrList.length == 0) {
							this.haveData = 0;
							uni.setStorageSync("userAddress", "");
						} else {
							this.haveData = 1;
							for (let item of this.addrList) {
								if (item.isDefaultAddress == 1) {
									uni.setStorageSync(
										"userAddress",
										encodeURIComponent(JSON.stringify(item))
									);
								}
							}
						}
						uni.hideLoading();

						this.isShow = true;
					},
				});
			},
			// 添加
			addAddr() {
				uni.navigateTo({
					url: "addressAdd",
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.addr-admin {
		height: 100vh;
		padding: 0 24rpx;
		background-color: #f9f9f9;

		.addr-container {
			padding: 0 26rpx 50rpx;
			background-color: #fff;
			border-radius: 20rpx;

			.addr-every {
				padding-top: 32rpx;
				display: flex;
				justify-content: space-between;

				.every-left {
					.left-top {
						.default-sign {
							margin-right: 10rpx;
							padding: 2rpx 4rpx;
							color: #fff;
							background-color: #85dbd0;
							border-radius: 10rpx;
							font-size: 20rpx;
						}

						.addr-name {
							color: #000;
							font-size: 28rpx;
							font-weight: bold;
						}

						.addr-phone {
							margin-left: 10rpx;
							font-size: 24rpx;
							color: #999999;
						}
					}

					.left-bottom {
						margin-top: 22rpx;
						font-size: 26rpx;
						color: #000;
					}
				}

				.every-right {
					display: flex;
					flex-direction: column;
					justify-content: flex-end;

					image {
						width: 23rpx;
						height: 24rpx;
					}
				}
			}
		}

		.addr-button {
			height: 80rpx;
			position: absolute;
			bottom: 20rpx;
			left: 20rpx;
			right: 20rpx;
			line-height: 80rpx;
			font-size: 28rpx;
			background-color: #85dbd0;
			color: #fff;
			border-radius: 20rpx;
			text-align: center;
		}
	}
</style>
