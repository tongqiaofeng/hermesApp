<template>
	<view class="commodity" v-if="isShow">
		<view v-if="haveData == 0" class="no-data">
			<image src="../static/imgs/common/no.png" mode="aspectFill"></image>
			<text style="font-size: 30rpx">购物车空空如也，快去逛逛吧~</text>
		</view>
		<view v-else>
			<view class="title">
				<text>{{ "共" + goodsnum + "件商品" }}</text>
				<text style="font-size: 26rpx" @click="isCheckBox">编辑</text>
			</view>
			<checkbox-group @change="checkChange" style="padding-top: 100rpx">
				<view class="commoditybox" v-for="(item, index) in favoriteslist" :key="index">
					<label class="box-check">
						<checkbox :value="item.stockId" :checked="item.checked" color="#85dbd0"
							style="transform: scale(0.7)" />
					</label>
					<view class="box-left" v-if="item.productCategory == 1" @click="navto(item)">
						<image v-if="item.pic" :src="item.pic.trim()" mode="aspectFill"></image>
						<image v-else src="../static/imgs/common/nopic.jpg" mode="aspectFill"></image>
					</view>
					<view class="box-left" v-if="item.productCategory == 2" @click="navto(item)">
						<image v-if="item.pic" :src="imgUrl + '/file/small/' + item.pic.trim()" mode="aspectFill">
						</image>
						<image v-else src="../static/imgs/common/nopic.jpg" mode="aspectFill"></image>
					</view>
					<view class="box-left" v-if="item.productCategory == 3" @click="navto(item)">
						<image v-if="item.pic" :src="watchUrl + '/file/small/' + item.pic.trim()" mode="aspectFill">
						</image>
						<image v-else src="../static/imgs/common/nopic.jpg" mode="aspectFill"></image>
					</view>

					<view class="box-right">
						<view class="name" @click="navto(item)">{{ item.productName }}</view>
						<view class="price">
							<view class="price-left" @click="navto(item)">
								<text style="font-size: 24rpx;">CNY</text>
								{{ " " + formatNumberRgx(item.productPrice) }}
							</view>
							<view class="price-num">
								<view class="num-button" @click="numChangeValue(0,index,item)">-</view>
								<text class="num-input">{{item.num}}</text>
								<view class="num-button" @click="numChangeValue(1,index,item)">+</view>
							</view>
						</view>
					</view>
				</view>
			</checkbox-group>
			<view class="bottom">没有更多了~</view>
			<!-- 全选按钮 -->
			<view class="allCheck">
				<view class="all-check-left">
					<checkbox-group @change="changeBook">
						<label>
							<view>
								<checkbox color="#85dbd0" style="transform: scale(0.7)" :checked="allFlag.checked"
									:value="allFlag.value" />
								<text style="color: #999999;">全选</text>
							</view>
						</label>
					</checkbox-group>
					<view class="left-price">
						<text>总计</text>
						<text style="color: #FF7822;font-size: 22rpx;">CNY</text>
						<text style="color: #FF7822;">{{formatNumberRgx(totalPrice)}}</text>
					</view>
				</view>
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
				imgUrl: this.$baseUrl + "/jewellery/api",
				watchUrl: this.$baseUrl + "/watch/api",
				isShow: false,
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

				totalPrice: 0,
			};
		},
		onShow() {
			// uni.removeTabBarBadge({
			// 	index: 2
			// })
			if (uni.getStorageSync("token").length == 0) {
				uni.showToast({
					title: "登录后即可查看该功能",
					icon: "none",
					success: () => {
						uni.switchTab({
							url: "../mine/mine",
						});
					},
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
			// 计算总金额
			getTotal() {
				this.totalPrice = 0;
				for (let item of this.selList) {
					this.totalPrice += Number(item.productAmount * item.num)
				}
			},
			// 购买数量变化
			numChangeValue(sel, index, item) {
				console.log(sel, index, item);
				if (item.productCategory == 2) {
					if (sel == 0 && this.selList[index].num > 1) {
						console.log('减减减');
						this.favoriteslist[index].num -= 1;
					} else if (sel == 1) {
						console.log('加加加');
						this.favoriteslist[index].num += 1;
					}


					for (let sel of this.selList) {
						if (sel.id == item.stockId) {
							sel.num = this.favoriteslist[index].num;
						}
					}
					console.log(this.selList);

					this.getTotal();

					this.updateNum(this.favoriteslist[index]);
				}
			},
			// 提交购买数量
			updateNum(item) {
				console.log(item);

				uni.request({
					url: this.$baseUrl + "/cart/api/shoppingCartAdd",
					method: "POST",
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync("token"),
					},
					data: {
						id: item.stockId,
						num: item.num,
						productType: 2,
					},
					complete: (res) => {
						console.log("添加购物车");
						console.log(res);

						if (res.statusCode == 200) {
							this.favorites();
						} else {
							uni.showToast({
								icon: "none",
								title: res.data.status,
							});
						}
					},
				});
			},
			// 结算
			closeAccount() {
				console.log(this.selList);

				uni.navigateTo({
					url: "../order/confirmAnOrder?productList=" +
						JSON.stringify(this.selList),
				});
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
					console.log(item);
					let value = {
						id: item.stockId,
						imgSrc: item.pic,
						name: encodeURIComponent(item.productName),
						productAmount: item.productPrice,
						productAmountUs: item.productPriceUs,
						num: item.num,
						currency: "CNY",
						productCategory: item.productCategory,
						actualAmount: item.productPrice,
						actualAmountUs: item.productPriceUs,
					};
					if (values.includes(item.stockId)) {
						this.selList.push(value);
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

				console.log(this.selList);

				this.getTotal();
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
							productAmount: item.productPrice,
							productAmountUs: item.productPriceUs,
							num: item.num,
							currency: "CNY",
							productCategory: item.productCategory,
							actualAmount: item.productPrice,
							actualAmountUs: item.productPriceUs,
						});
					});
					this.$set(this.allFlag, "checked", true);
				}
				console.log(this.selList);

				this.getTotal();
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
					url: this.$baseUrl + "/cart/api/shoppingCartDelete",
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
			navto(item) {
				console.log(item);

				if (this.isSelect == 0) {
					if (item.productCategory == 1) {
						uni.navigateTo({
							url: "../hermes/details?id=" + item.stockId,
						});
					} else if (item.productCategory == 2) {
						uni.navigateTo({
							url: "../jewelry/jewelryDetails?id=" + item.stockId,
						});
					} else if (item.productCategory == 3) {
						uni.navigateTo({
							url: "../watch/detail?id=" + item.stockId,
						});
					}
				}
			},
			// 获取购物车列表
			favorites() {
				// this.favoriteslist = [];
				this.selList = [];
				this.delList = [];
				uni.showLoading({
					title: "加载中...",
				});
				uni.request({
					url: this.$baseUrl + "/cart/api/shoppingCartList",
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
								productAmount: item.productPrice,
								productAmountUs: item.productPriceUs,
								num: item.num,
								currency: "CNY",
								productCategory: item.productCategory,
								actualAmount: item.productPrice,
								actualAmountUs: item.productPriceUs,
							});
							this.delList.push(item.id);
						}
						this.allFlag.checked = true;

						if (this.favoriteslist.length == 0) {
							this.haveData = 0;
						} else {
							this.haveData = 1;
						}

						this.getTotal();

						this.isShow = true;
					},
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.commodity {
		height: 100vh;
		padding: 0 24rpx;
		background-color: #f9f9f9;

		.title {
			height: 100rpx;
			padding: 0 24rpx;
			position: fixed;
			left: 0;
			right: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 26rpx;
			z-index: 999;
			background-color: #f6f6f6;
			color: #666666;
		}

		.commoditybox {
			padding: 30rpx 20rpx;
			margin-bottom: 20rpx;
			display: flex;
			align-items: center;
			position: relative;
			background-color: #fff;
			border-radius: 20rpx;

			.box-left {
				margin-left: 26rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 180rpx;
					height: 180rpx;
					border-radius: 20rpx;
				}
			}

			.box-right {
				padding: 0 0 17rpx 18rpx;
				flex: 1;

				.name {
					margin-bottom: 20rpx;
					font-size: 26rpx;
				}

				.price {
					display: flex;
					justify-content: space-between;
					font-size: 26rpx;
					color: #ff8b62;

					.price-left {
						font-size: 36rpx;
						color: #FF7822;
					}

					.price-num {
						display: flex;
						align-items: center;

						.num-button {
							font-size: 40rpx;
							cursor: pointer;
							color: #000;
						}

						.num-input {
							padding: 6rpx 26rpx;
							margin: 0 10rpx;
							border-radius: 6rpx;
							font-weight: bold;
							font-size: 24rpx;
							color: #000;
							background-color: #F4F7FB;
						}
					}
				}
			}
		}

		.bottom {
			padding-bottom: 140rpx;
			font-size: 24rpx;
			color: #e3e3e3;
			text-align: center;
			font-size: 30rpx;
		}

		.allCheck {
			height: 126rpx;
			padding: 0 24rpx;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #fff;
			font-size: 28rpx;

			.all-check-left {
				display: flex;

				.left-price {
					margin-left: 24rpx;
				}
			}

			.cart-button-pay,
			.cart-button-del {
				padding: 20rpx 55rpx;
				border-radius: 60rpx;
				color: #fff;
				font-size: 30rpx;
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
