<template>
	<view class="addr-add">
		<!-- <text>新增地址</text> -->
		<view class="addr-every">
			<text class="every-title">收货人：</text>
			<input class="city-sel" style="flex: 1;" type="text" placeholder="请填写收货人姓名"
				placeholder-style="color: #c3c3c3" v-model="consignee" />
		</view>
		<view class="addr-every">
			<text class="every-title">手机号：</text>
			<input class="city-sel" style="flex: 1;" type="text" placeholder="请输入收货人手机号"
				placeholder-style="color: #c3c3c3" v-model="phoneNumber" />
		</view>
		<view class="addr-every">
			<text class="every-title">所在国家：</text>
			<uni-data-picker style="flex: 1;" class="city-sel" ref="countryPicker" placeholder="点击选择所在国家" popup-title="选择所在国家"
				@change="countryChange" :localdata="countryList" v-model="regionCountry">
			</uni-data-picker>
		</view>
		<view class="addr-every" v-if="regionCountry == '中国'">
			<text class="every-title">所在地区：</text>
			<!-- <region-picker style="flex: 1;" @change="regionChange">
				<text class="city-sel" style="flex: 1;color: #c3c3c3;">{{region}}</text>
			</region-picker> -->
			<picker mode="region" style="flex: 1;" @change="regionChange">
				<text class="city-sel" style="flex: 1;color: #c3c3c3;">{{region}}</text>
			</picker>
		</view>
		<view class="addr-details">
			<text class="every-title">详细地址：</text>
			<input class="city-sel" style="flex: 1;" type="text" placeholder="如道路、门牌号、小区、楼栋号、单元室等"
				placeholder-style="color: #c3c3c3" v-model="detailAddr" />
		</view>
		<view class="addr-every" style="margin-top: 20rpx;justify-content: space-between;">
			<text class="every-title">设为默认地址</text>
			<switch style="transform: scale(0.7,0.7)" color="#85dbd0" :checked="defaultAddr" @change="defaultChange" />
		</view>
		<view class="addr-button" @click="saveAddr">保存收货地址</view>
	</view>
</template>

<script>
	import externalData from "../utils/data.js";

	export default {
		data() {
			return {
				updateId: null,
				consignee: "", // 收货人
				phoneNumber: "",
				regionCountry: "中国",
				region: "点击选择所在地区",
				detailAddr: "",
				defaultAddr: false,
				countryList: externalData.countryList
			}
		},
		methods: {
			// 选择国家
			countryChange(val) {
				console.log('选择国家数据');
				console.log(val);
				console.log(this.regionCountry);
				if (this.regionCountry == '中国')
					this.region = "点击选择所在地区"
			},
			// 选择地区
			regionChange(val) {
				console.log('选择城市数据');
				console.log(val);
				this.region = val.detail.value.join('');
			},
			// 是否为默认地址
			defaultChange(val) {
				console.log(val);
				this.defaultAddr = val.detail.value;
				console.log(this.defaultAddr);
			},
			// 保存收货地址
			saveAddr() {
				uni.request({
					url: this.$baseUrl + "/deliveryAddressSave",
					method: "POST",
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync('token')
					},
					data: {
						name: this.consignee,
						phone: this.phoneNumber,
						area: this.regionCountry == '中国' ? this.region : this.regionCountry,
						street: this.detailAddr,
						isDefaultAddress: this.defaultAddr == false ? 0 : 1,
						isChina: this.regionCountry == '中国' ? 1 : 0
					},
					complete: (res) => {
						console.log('添加地址');
						console.log(res);
						uni.navigateTo({
							url: "addressAdmin"
						})
					}
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.addr-add {
		height: 100vh;
		background-color: #f9f9f9;

		.every-title {
			font-size: 30rpx;
		}

		.addr-every {
			height: 80rpx;
			margin-bottom: 2rpx;
			padding: 0 20rpx;
			display: flex;
			align-items: center;
			background-color: #fff;

			.city-sel {
				font-size: 28rpx;
				color: #c3c3c3;
			}
		}

		.addr-details {
			height: 120rpx;
			margin-bottom: 2rpx;
			padding: 0 20rpx;
			display: flex;
			align-items: center;
			background-color: #fff;

			.city-sel {
				font-size: 28rpx;
				color: #c3c3c3;
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
<style lang="scss">
	.addr-every {

		.input-value-border {
			border: none !important;
		}

		.input-arrow {
			width: 0 !important;
			height: 0 !important;
			border-left: none !important;
			border-bottom: none !important;
		}

		.placeholder {
			color: #c3c3c3 !important;
		}
	}
</style>
