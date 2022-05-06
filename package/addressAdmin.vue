<template>
	<view class="addr-admin">
		<view class="addr-every" v-for="(item,index) in addrList" :key="index" @click="addrSel(item)">
			<view class="every-left">
				<view class="left-top">
					<text>{{item.name}}</text>
					<text>{{item.phone}}</text>
					<text v-if="item.isDefaultAddress == 1" class="default-sign">默认</text>
				</view>
				<view class="left-bottom">
					{{item.area+item.street}}
				</view>
			</view>
			<view class="every-right">
				<text @click="addrUpdate(item)">编辑</text>
			</view>
		</view>

		<view class="addr-button" @click="addAddr">添加新的收货地址</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addrList: [],
			}
		},
		onLoad() {
			this.getAddrList();
		},
		methods: {
			// 选择收货地址
			addrSel(item) {
				console.log(getCurrentPages());
				if (getCurrentPages()[0].route != "pages/mine/mine") {
					uni.setStorageSync('userAddress', JSON.stringify(item));
					uni.navigateBack({
						delta: 1
					})
				}
			},
			// 修改地址
			addrUpdate(val) {
				console.log(val);
				uni.navigateTo({
					url: "addressUpdate?id=" + val.id + "&name=" + val.name + "&phone=" + val.phone + "&area=" +
						val
						.area + "&street=" + val.street + "&isDefaultAddress=" + val.isDefaultAddress +
						"&isChina=" + val.isChina
				})
			},
			// 获取地址列表
			getAddrList() {
				uni.request({
					url: this.$baseUrl + "/deliveryAddressList",
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync('token')
					},
					complete: (res) => {
						console.log('地址列表');
						console.log(res);
						this.addrList = res.data;
					}
				})
			},
			// 添加
			addAddr() {
				uni.navigateTo({
					url: "addressAdd"
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.addr-admin {
		height: 100vh;
		background-color: #f9f9f9;

		.addr-every {
			padding: 40rpx;
			margin-bottom: 20rpx;
			display: flex;
			justify-content: space-between;
			background-color: #fff;

			.every-left {
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
					margin-top: 30rpx;
					font-size: 24rpx;
					color: #c3c3c3;
				}
			}

			.every-right {
				font-size: 28rpx;
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
			border-radius: 60rpx;
			text-align: center;
		}
	}
</style>
