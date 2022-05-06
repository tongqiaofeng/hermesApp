<template>
	<view class="commodity">
		<view v-if="haveData == 0" class="no-data">
			<image src="../../static/imgs/common/no.png" mode="aspectFill"></image>
			<text style="font-size: 30rpx">购物车空空如也，快去逛逛吧~</text>
		</view>
		<view v-else>
			<view class="title">
				<text>{{ "共" + goodsnum + "件商品" }}</text>
				<text style="font-size: 26rpx;" @click="isCheckBox">编辑</text>
			</view>
			<checkbox-group @change="checkChange" style="padding-top: 100rpx;">
				<view class="commoditybox" v-for="(item, index) in favoriteslist" :key="index">
					<label class="box-check">
						<checkbox :value="item.id" :checked="item.checked" color="#85dbd0"
							style="transform: scale(0.7)" />
					</label>
					<view class="box-left" @click="navto(item.stockId)">
						<image v-if="item.pic" :src="item.pic" mode="aspectFill"></image>
					</view>
					<view class="box-right" @click="navto(item.stockId)">
						<view class="name">{{ item.productName }}</view>
						<view class="price">{{ "HKD " + formatNumberRgx(item.productPrice) }}
						</view>
					</view>
				</view>
			</checkbox-group>
			<view class="bottom">没有更多了~</view>
			<!-- 全选按钮 -->
			<view class="allCheck">
				<checkbox-group @change="changeBook">
					<label>
						<view>
							<checkbox color="#85dbd0" style="transform: scale(0.7)" :checked="allFlag.checked"
								:value="allFlag.value" />
							全选
						</view>
					</label>
				</checkbox-group>
				<view class="cart-button-pay" v-if="isSelect == 0" @click="closeAccount">结算</view>
				<view class="cart-button-del" v-else @click="clickclose">删除</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				haveData: 1,
				goodsnum: 0,
				page: 1,
				favoriteslist: [],

				isSelect: 0,
				allFlag: {
					value: "cb",
					checked: true,
				},
				selList: [],
				checkedList: [],
				delList: [],
			};
		},
		onShow() {
			// uni.removeTabBarBadge({
			// 	index: 2
			// })
			if (uni.getStorageSync('token').length == 0) {
				uni.showToast({
					title: "请登录",
					icon: "none",
					success: () => {
						uni.switchTab({
							url: "../mine/mine"
						})
					}
				});
			} else {
				this.favorites();
			}
		},
		filters: {
			picsfilter(str) {
				if (str.indexOf("|") !== -1) {
					return str.substring(0, str.indexOf("|"));
				} else {
					return str;
				}
			},
		},
		onPullDownRefresh() {
			this.favoriteslist = [];
			this.favorites();
			uni.stopPullDownRefresh();
		},
		methods: {
			// 结算
			closeAccount() {
				console.log(this.selList)
				uni.navigateTo({
					url: "../../package/confirmAnOrder?productList=" + JSON.stringify(this.selList)
				})
			},
			// 是否选中
			checkChange(e) {
				console.log("是否选中");
				console.log(e);

				let values = e.detail.value;
				this.delList = values;
				this.selList = [];
				for (let i = 0; i < this.favoriteslist.length; ++i) {
					const item = this.favoriteslist[i];
					let value = {
						id: item.stockId,
						imgSrc: item.pic,
						name: encodeURIComponent(item.productName),
						price: item.productPrice,
						num: 1,
						currency: 'HKD'
					}
					if (values.includes(item.id)) {
						this.selList.push(value)
						this.$set(item, "checked", true);
					} else {
						this.$set(item, "checked", false);
					}
				}
				//  商品是否全部勾选，判断全选与否状态
				let allChecks = values.length == this.favoriteslist.length;
				allChecks
					?
					this.$set(this.allFlag, "checked", true) :
					this.$set(this.allFlag, "checked", false);
			},
			// 全选或者反选 checkbox
			changeBook(e) {
				console.log("全选否");
				console.log(e);
				this.selList = [];
				this.delList = [];
				if (e.detail.value.length == 0) {
					this.favoriteslist.map((item) => this.$set(item, "checked", false));
					this.$set(this.allFlag, "checked", false);
				} else {
					this.favoriteslist.map((item) => {
						this.$set(item, "checked", true);
						this.delList.push(item.id);
						this.selList.push({
							id: item.stockId,
							imgSrc: item.pic,
							name: encodeURIComponent(item.productName),
							price: item.productPrice,
							num: 1,
							currency: 'HKD'
						});
					});
					this.$set(this.allFlag, "checked", true);
				}
				console.log(this.selList);
			},
			// 删除/结算
			isCheckBox() {
				if (this.isSelect == 0) {
					this.isSelect = 1;
				} else if (this.isSelect == 1) {
					this.isSelect = 0;
				}
			},
			// 删除
			clickclose() {
				uni.request({
					url: this.$baseUrl + "/shoppingCartDelete",
					method: "POST",
					data: {
						idList: this.delList,
					},
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync("token"),
					},
					success: (res) => {
						console.log(res.data);
						uni.showToast({
							title: "删除成功",
							icon: "none",
						});
						this.favorites();
					},
					fail: (err) => {
						uni.showToast({
							title: err.data.message,
							icon: "none",
						});
					},
				});
			},
			navto(id) {
				if (this.isSelect == 0) {
					uni.navigateTo({
						url: "../index/details?id=" + id,
					});
				}
			},
			// 获取购物车列表
			favorites() {
				this.favoriteslist = [];
				this.selList = [];
				this.delList = [];
				uni.showLoading({
					title: "加载中..."
				})
				uni.request({
					url: this.$baseUrl + "/shoppingCartList",
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync("token"),
					},
					complete: (res) => {
						uni.hideLoading();

						console.log("购物车列表");
						console.log(res);

						this.favoriteslist = res.data;
						this.goodsnum = this.favoriteslist.length;

						for (let item of this.favoriteslist) {
							item.checked = true;
							this.selList.push({
								id: item.stockId,
								imgSrc: item.pic,
								name: encodeURIComponent(item.productName),
								price: item.productPrice,
								num: 1,
								currency: 'HKD'
							});
							this.delList.push(item.id);
						}
						this.allFlag.checked = true;

						if (this.favoriteslist.length == 0) {
							this.haveData = 0;
						} else {
							this.haveData = 1;
						}
					},
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.commodity {
		height: 100vh;
		background-color: #f6f6f6;

		.title {
			height: 100rpx;
			padding: 0 40rpx;
			position: fixed;
			left: 0;
			right: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 22rpx;
			z-index: 999;
			background-color: #f6f6f6;
		}

		.commoditybox {
			margin-bottom: 20rpx;
			display: flex;
			align-items: center;
			position: relative;
			background-color: #fff;

			.box-check {
				margin-left: 10rpx;
			}

			.box-left {
				padding: 20rpx 0 20rpx 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 180rpx;
					height: 174rpx;
					border-radius: 30rpx;
				}
			}

			.box-right {
				padding: 25rpx 20rpx 30rpx 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.name {
					margin-bottom: 20rpx;
					font-size: 24rpx;
				}

				.price {
					font-size: 26rpx;
					color: #ff8b62;
				}
			}
		}

		.bottom {
			padding-bottom: 140rpx;
			font-size: 24rpx;
			color: #e3e3e3;
			text-align: center;
			font-size: 30rpx
		}

		.allCheck {
			height: 100rpx;
			padding: 0 40rpx;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #f9f9f9;
			font-size: 28rpx;

			.cart-button-pay,
			.cart-button-del {
				padding: 10rpx 50rpx;
				border-radius: 60rpx;
				color: #fff;
			}

			.cart-button-pay {
				background-color: #85dbd0;
			}

			.cart-button-del {
				background-color: red;
			}
		}
	}
</style>
