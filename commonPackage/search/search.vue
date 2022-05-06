<template>
	<view class="search-container">
		<view class="search-top">
			<view class="upAndDown">
				<view class="mine-top">
					<view :style="{ height: height + 'px' }"></view>
					<view class="mine-title">
						<image @click="goBack" style="width: 17rpx; height: 30rpx"
							src="../../static/imgs/common/back.png" mode="aspectFill"></image>
						<view class="search-input">
							<picker mode="selector" :range="selList" @change="selTypeChange">
								<view style="display: flex;align-items: center;">
									<view style="width: 60rpx;">{{type}}</view>
									<image style="width: 32rpx;height: 32rpx;margin-left: 10rpx;"
										src="../../static/imgs/search/yes.png" mode="aspectFill"></image>
									<view class="line"></view>
								</view>
							</picker>
							<input type="text" v-model="keyword" placeholder="搜索"
								placeholder-style="color: #7b7b7b;font-size: 24rpx;" @input="searchInput" />
						</view>
					</view>
				</view>
				<view class="search-filter">
					<view class="filter-every" @click="filterSel03">
						<view class="every-main">
							<text class="every-font" :style="{
                  color: select == 2 || select == 3 ? '#000' : '#c3c3c3',
                }">筛选</text>
							<view class="every-img">
								<image :src="select == 2 || select == 3 ? imgFilter1 : imgFilter2" mode="aspectFit">
								</image>
							</view>
						</view>
						<view class="filter-line" v-if="select == 2"></view>
					</view>
					<view class="filter-every" @click="filterSel01">
						<text class="every-font" :style="{ color: select == 0 ? '#000' : '#c3c3c3' }">综合</text>
						<view class="filter-line" v-if="select == 0"></view>
					</view>
					<view class="filter-every" @click="filterSel02">
						<view class="every-main">
							<text class="every-font" :style="{ color: select == 1 ? '#000' : '#c3c3c3' }">价格</text>
							<view class="every-img">
								<image :src="
                    select == 1 && isUp == 1
                      ? img1
                      : select == 1 && isUp == 2
                      ? img2
                      : img3
                  " mode="aspectFit"></image>
							</view>
						</view>
						<view class="filter-line" v-if="select == 1"></view>
					</view>
				</view>
			</view>
			<view v-if="select == 2" class="filter-container" :style="{ top: topHeight + 'px' }">
				<view class="goClassify" @click="goToClassify">返回分类列表</view>
				<view class="size-main" v-if="sizeList.length > 0 && type == '包包'">
					<view class="size-every" type="default" v-for="(item, index) in sizeList" :key="index"
						@click="sizeSelect(item.size)" :style="{
              'background-color': size == item.size ? '#85dbd0' : '#fff',
              color: size == item.size ? '#fff' : '#000',
            }">{{ item.size }}
					</view>
				</view>
				<view class="size-main" v-if="jewelleryModelList.length > 0 && type == '珠宝'">
					<view class="size-every" type="default" v-for="(item, index) in jewelleryModelList" :key="index"
						@click="tagSelect(item.name)" :style="{
				      'background-color': tag == item.name ? '#85dbd0' : '#fff',
				      color: tag == item.name ? '#fff' : '#000',
				    }">{{ item.name }}
					</view>
				</view>
				<view class="shade" style="min-height: 56vh" @click="filterSel03"></view>
			</view>
		</view>
		<view class="search-main">
			<view v-if="haveData == 0" class="no-data" style="padding-top: 300rpx">
				<image src="../../static/imgs/common/no.png" mode="aspectFill"></image>
				<text style="font-size: 30rpx">暂无商品哦~</text>
			</view>
			<view v-else>
				<view class="main-container" v-if="type == '包包'">
					<view class="main-every" v-for="(item, index) in bagSearchList" :key="index">
						<view class="every-image">
							<image v-if="item.pic" :src="item.pic" mode="aspectFill" @click="checkDetails(item)">
							</image>
						</view>
						<view class="every-main">
							<view class="main-model">{{ item.name }}</view>
							<view class="main-price">
								<text class="price-money">{{ item.currency }}
									<text style="font-size: 30rpx">{{
					          " " + formatNumberRgx(item.hkdPriceIndi)
					        }}</text>
								</text>
							</view>
						</view>
					</view>
				</view>
				<view class="main-container" v-if="type == '珠宝'">
					<view class="main-every" v-for="(item, index) in bagSearchList" :key="index">
						<view class="every-image">
							<image v-if="item.img" :src="imgUrl + item.img" mode="aspectFill"
								@click="checkDetails(item)">
							</image>
						</view>
						<view class="every-main">
							<view class="main-model">{{ item.productName }}</view>
							<view class="main-price">
								<text class="price-money">{{ item.currency }}
									<text style="font-size: 30rpx">{{
					          " " + formatNumberRgx(item.adviseSellPrice)
					        }}</text>
								</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: this.$baseJewelleryUrl,
				haveData: 1,
				height: null,
				topHeight: null,
				select: 3,
				isUp: 0,
				img1: require("../../static/imgs/search/up.png"),
				img2: require("../../static/imgs/search/down.png"),
				img3: require("../../static/imgs/search/normal.png"),
				imgFilter1: require("../../static/imgs/search/yes.png"),
				imgFilter2: require("../../static/imgs/search/no.png"),
				bagSearchList: [],
				haveMore: 0,
				page: 1,
				keyword: "",
				model: "",
				size: "",
				sort: "",

				sizeList: [],
				jewelleryModelList: [],
				type: '包包',
				selList: ['包包', '珠宝'],
				tag: ""
			};
		},
		onShow() {},
		onLoad(option) {
			// 获取手机状态栏高度
			uni.getSystemInfo({
				success: (data) => {
					// 将其赋值给this
					this.height = data.statusBarHeight;
				},
			});

			console.log("详情");
			console.log(option);
			if (option.type) {
				this.type = option.type == 0 ? '包包' : '珠宝';
				this.model =
					option.model === undefined ?
					"" :
					JSON.parse(decodeURIComponent(option.model));
				this.size =
					option.size === undefined ?
					"" :
					JSON.parse(decodeURIComponent(option.size));
				this.tag = option.tag;
			}

			this.getBagList();
			this.getModelSizeList();
			this.getJewelryClassify();
		},
		onPullDownRefresh() {
			this.page = 1;
			this.bagSearchList = [];
			this.haveMore = 0;

			this.getBagList();
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			if (this.haveMore == 0) {
				this.page++;
				this.getBagList();
			}
		},
		methods: {
			selTypeChange(e) {
				this.type = this.selList[Number(e.detail.value)];
				this.page = 1;
				this.size = "";
				this.keyword = "";
				this.sort = "";
				this.bagSearchList = [];
				this.haveMore = 0;
				this.getBagList();
			},
			// 获取该样式包包列表
			getBagList() {
				console.log("要传参啦");
				console.log(this.model);
				uni.showLoading({
					title: "加载中......",
				});
				if (this.type == '包包') {
					uni.request({
						method: "POST",
						url: this.$baseUrl + "/modelSearch",
						data: {
							keyword: this.keyword,
							model: this.model,
							size: this.size,
							page: this.page,
							pageNum: 10,
							sort: this.sort,
						},
						header: {
							"content-type": "application/json",
						},
						complete: (res) => {
							uni.hideLoading();
							console.log("搜索包包列表");
							console.log(res);

							if (res.data.length == 0) {
								this.haveMore = 1;
							} else {
								let list = this.bagSearchList.concat(res.data);
								this.bagSearchList = list;
							}

							if (this.bagSearchList.length == 0) {
								this.haveData = 0;
								uni.showToast({
									icon: "none",
									title: "暂无数据",
								});
							} else {
								this.haveData = 1;
							}
						},
					});
				} else if (this.type == '珠宝') {
					uni.request({
						method: "POST",
						url: this.$baseJewelleryUrl + "/jewellerySearch?page=" + this.page + "&pageNum=10",
						data: {
							keyword: this.keyword,
							tag: this.tag,
							sort: this.sort,
						},
						header: {
							"content-type": "application/json",
						},
						complete: (res) => {
							uni.hideLoading();
							console.log("搜索包包列表");
							console.log(res);

							if (res.data.length == 0) {
								this.haveMore = 1;
							} else {
								let list = this.bagSearchList.concat(res.data.list);
								this.bagSearchList = list;
							}

							if (this.bagSearchList.length == 0) {
								this.haveData = 0;
								uni.showToast({
									icon: "none",
									title: "暂无数据",
								});
							} else {
								this.haveData = 1;
							}
						},
					});
				}
			},
			// 搜索框输入
			searchInput() {
				this.page = 1;
				this.bagSearchList = [];
				this.select = 0;
				this.isUp = 0;
				this.haveMore = 0;
				this.model = "";
				this.size = "";
				this.tag = "";
				this.sort = "";

				this.getBagList();

				for (let item of this.modelSizeList) {
					console.log(item.name);
					for (let every of item.list) {
						console.log(every.model.indexOf(this.keyword));
						if (every.model.indexOf(this.keyword) !== -1) {
							this.sizeList = every.sizeList;
							return;
						}
					}
				}
			},
			// 综合
			filterSel01() {
				this.page = 1;
				this.bagSearchList = [];
				this.select = 0;
				this.isUp = 0;
				this.haveMore = 0;
				this.sort = "";
				this.getBagList();
			},
			// 价格
			filterSel02() {
				this.page = 1;
				this.bagSearchList = [];
				this.select = 1;
				if (this.isUp == 1) {
					this.isUp = 2;
					this.sort = -2;
				} else if (this.isUp == 2) {
					this.isUp = 1;
					this.sort = 2;
				} else {
					this.isUp = 1;
					this.sort = 2;
				}
				this.haveMore = 0;
				this.getBagList();
			},
			// 筛选
			filterSel03() {
				if (this.type == '包包' && this.sizeList.length == 0) {
					this.goToClassify();
				} else {
					if (this.select == 2) {
						this.select = 3;
					} else {
						this.select = 2;

						this.$nextTick(() => {
							console.log("顶部高度");
							let view = uni.createSelectorQuery().select(".upAndDown");
							view
								.boundingClientRect((data) => {
									//获取固定尾部的高度=data.height
									console.log(data);
									this.topHeight = data.height;
								})
								.exec();
						});
					}
				}
			},
			// 尺寸选择
			sizeSelect(size) {
				this.select = 3;
				this.page = 1;
				this.bagSearchList = [];
				this.isUp = 0;
				this.sort = "";
				this.haveMore = 0;
				this.size = size;

				this.getBagList();
			},
			// 标签
			tagSelect(size) {
				this.select = 3;
				this.page = 1;
				this.bagSearchList = [];
				this.isUp = 0;
				this.sort = "";
				this.haveMore = 0;
				this.tag = size;

				this.getBagList();
			},
			// 查看包包详情
			checkDetails(item) {
				console.log(item);
				if (this.type == '包包') {
					uni.navigateTo({
						url: "../details?id=" + item.id,
					});
				} else if (this.type == '珠宝') {
					uni.navigateTo({
						url: "../../jewelryPackage/jewelryDetails?id=" + item.id,
					})
				}
			},
			// 获取包款尺寸列表
			getModelSizeList() {
				uni.request({
					url: this.$baseUrl + "/modelSort",
					header: {
						"content-type": "application/json",
					},
					complete: (res) => {
						console.log("尺寸列表");
						console.log(res);
						this.modelSizeList = res.data;
						this.getSizeList();
					},
				});
			},
			// 获取尺寸列表
			getSizeList() {
				for (let item of this.modelSizeList) {
					// console.log(item.name);
					for (let every of item.list) {
						if (every.model == this.model) {
							this.sizeList = every.sizeList;
						}
					}
				}
			},
			// 获取珠宝成品分类列表
			getJewelryClassify() {
				uni.request({
					url: this.$baseJewelleryUrl + '/jewelleryModelSort',
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync("token"),
					},
					complete: (res) => {
						console.log('珠宝分类');
						console.log(res);
						this.jewelleryModelList = res.data;
					}
				})
			},
			// 返回上一层
			goBack() {
				uni.navigateBack({
					delta: 1,
				});
			},
			// 返回分类列表
			goToClassify() {
				if (this.type == '包包') {
					uni.switchTab({
						url: "../classify/classify",
					});
				} else if (this.type == '珠宝') {
					uni.switchTab({
						url: "../classify/classifyJewelry"
					})
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.search-container {
		// height: 100vh;
		background-color: #fff;
		position: relative;

		.search-top {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			background-color: #fff;
			z-index: 9999;

			.mine-top {
				.mine-title {
					height: 44px;
					padding: 0 40rpx;
					display: flex;
					align-items: center;

					.line {
						width: 4rpx;
						height: 26rpx;
						margin: 0 10rpx;
						background-color: #c3c3c3;
					}

					.search-input {
						/*#ifdef MP-WEIXIN*/
						width: 400rpx;
						/*#endif*/
						/*#ifndef MP-WEIXIN*/
						width: 600rpx;
						/*#endif*/
						padding: 10rpx 20rpx;
						margin-left: 20rpx;
						display: flex;
						align-items: center;
						background-color: #f6f6f6;
						border-radius: 30px;
						text-align: center;
						font-size: 24rpx;
					}
				}
			}

			.search-filter {
				padding: 20rpx 80rpx 20rpx;
				display: flex;
				justify-content: space-between;

				.filter-every {
					.every-main {
						display: flex;
						align-items: center;
					}

					.every-font {
						font-size: 30rpx;
					}

					.every-img {
						image {
							width: 28rpx;
							height: 28rpx;
						}
					}

					.filter-line {
						width: 26rpx;
						height: 6rpx;
						margin: 0 auto;
						margin-top: 20rpx;
						background-color: #85dbd0;
						border-radius: 60px;
						text-align: center;
					}
				}
			}

			.filter-container {
				height: 100vh;
				position: fixed;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 100;
				background: rgba(0, 0, 0, 0.5);

				.goClassify {
					height: 90rpx;
					padding: 0 20rpx;
					line-height: 90rpx;
					font-size: 32rpx;
					text-align: center;
					background-color: #f9f9f9;
				}

				.size-main {
					padding: 0 20rpx;
					padding-bottom: 20rpx;
					display: flex;
					justify-content: flex-start;
					flex-wrap: wrap;
					background-color: #f9f9f9;
					border-bottom-left-radius: 10px;
					border-bottom-right-radius: 10px;

					.size-every {
						width: 33.33333%;
						height: 60rpx;
						padding: 0 10rpx;
						margin-bottom: 10rpx;
						line-height: 60rpx;
						background-color: #fff;
						color: #000;
						text-align: center;
						font-size: 26rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						border: 1px solid #f9f9f9;
						border-top: 0;
						border-bottom: 0;
						box-sizing: border-box;
					}
				}
			}
		}

		.search-main {
			margin-top: 200rpx;
			padding: 0 20rpx;
			// padding-top: 60rpx;

			.main-container {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				background-color: #fff;
				border-top-left-radius: 30px;
				border-top-right-radius: 30px;
			}

			.main-every {
				width: 344rpx;
				text-align: center;

				.every-image {
					height: 344rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: #fffcf7;
					border-top-left-radius: 10px;
					border-top-right-radius: 10px;

					image {
						// width: 230rpx;
						// height: 230rpx;
						// border-radius: 5px;
						width: 100%;
						height: 100%;
						border-top-left-radius: 10px;
						border-top-right-radius: 10px;
					}
				}

				.every-main {
					min-height: 100rpx;
					padding: 22rpx 20rpx 17rpx;
					margin-bottom: 30rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					text-align: left;
					border-bottom-left-radius: 10px;
					border-bottom-right-radius: 10px;
					border-top: 0;
					box-shadow: 0px -5px 0 0 #fffcf7, -10rpx 0px 20rpx 0 #f9f9f9,
						10rpx 0px 20rpx 0 #f9f9f9, 0px 20rpx 30rpx 0 #f9f9f9;

					.main-model {
						color: #000;
						font-size: 24rpx;
						font-weight: bold;
					}

					.main-price {
						display: flex;
						justify-content: space-between;

						.price-money {
							margin-top: 10rpx;
							font-size: 26rpx;
							color: #ff8b62;
							font-weight: bold;
						}

						.price-qi {
							image {
								width: 42rpx;
								height: 27rpx;
							}

							.currency {
								margin-top: 5rpx;
								text-align: center;
								font-size: 24rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
