<template>
	<view class="search-container">
		<view class="search-top" id="search-top">
			<view class="upAndDown">
				<view class="mine-top">
					<view :style="{ height: height + 'px' }"></view>
					<view class="mine-title">
						<image @click="goBack" style="width: 17rpx; height: 30rpx" src="../static/imgs/common/back.png"
							mode="aspectFill"></image>
						<view class="search-input">
							<picker mode="selector" :range="selList" :value="getPickerSelValue()" @change="selTypeChange">
								<view style="display: flex; align-items: center">
									<view style="width: 80rpx">{{ type }}</view>
									<image style="width: 32rpx; height: 32rpx; margin-left: 10rpx" src="../static/imgs/search/yes.png"
										mode="aspectFill"></image>
									<view class="line"></view>
								</view>
							</picker>
							<input type="text" v-model="keyword" placeholder="搜索" placeholder-style="color: #7b7b7b;font-size: 24rpx;"
								@input="searchInput" />
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
				<view class="size-main" v-if="sizeList.length > 0 && type == '爱马仕'">
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
		<view :style="{ 'margin-top': topConHeight + 'px' }">
			<view v-if="haveData == 0" class="no-data" style="padding-top: 300rpx">
				<image src="../static/imgs/common/no.png" mode="aspectFill"></image>
				<text style="font-size: 30rpx">暂无商品哦~</text>
			</view>
			<view v-else>
				<view class="list" v-if="type == '腕表'">
					<view class="item" v-for="(item, index) in bagSearchList" :key="index">
						<view v-if="item.pics" class="img" @click="checkDetails(item)">
							<easy-loadimage class="img" :image-src="item.pics" :scroll-top="scrollTop" border-radius="30rpx"
								mode="aspectFill"></easy-loadimage>
						</view>
						<view class="title">{{ getShowTitle(item) }}</view>
						<view class="title" style="margin-top: 10rpx;">{{ item.model }}</view>
						<view v-if="item.price != 0" class="price">
							<text> HKD <text style="font-size: 30rpx">{{ " " + formatNumberRgx(item.price) }}</text> </text>
						</view>
						<view v-else class="price" style="font-size: 24rpx">价格请咨询客服</view>
					</view>
				</view>
				<view class="list" v-if="type == '爱马仕'">
					<view class="item" v-for="(item, index) in bagSearchList" :key="index">
						<view v-if="item.pic" class="img" @click="checkDetails(item)">
							<easy-loadimage class="img" :image-src="item.pic" :scroll-top="scrollTop" border-radius="30rpx"
								mode="aspectFill"></easy-loadimage>
						</view>
						<view class="title">{{ item.name }}</view>
						<view class="price" v-if="item.sellPrice != 0">
							<text> {{ item.indiCurrency }} <text style="font-size: 30rpx">{{ " " + formatNumberRgx(item.priceIndi)
							}}</text> </text>
						</view>
						<view class="price" style="font-size: 24rpx" v-else>价格请咨询客服</view>
					</view>
				</view>
				<view class="list" v-if="type == '珠宝'">
					<view class="item" style="position: relative" v-for="(item, index) in bagSearchList" :key="index">
						<view v-if="item.img" class="img" @click="checkDetails(item)">
							<easy-loadimage :image-src="jewelryImgUrl + item.img" :scroll-top="scrollTop" border-radius="30rpx"
								mode="aspectFill"></easy-loadimage>
						</view>
						<image v-if="item.activityInfo" src="../static/imgs/details/discount.png" mode="aspectFill"
							style=" position: absolute; top: 20rpx; right: 20rpx; width: 80rpx; height: 80rpx; "></image>
						<view class="title">{{ item.productName }}</view>
						<view class="price" v-if="item.sellPrice != 0">
							<text> {{ item.currency }} <text style="font-size: 30rpx">{{ " " + formatNumberRgx(item.sellPrice) }}</text>
							</text>
						</view>
						<view class="price" style="font-size: 24rpx" v-else>价格请咨询客服</view>
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
			scrollTop: 0,
			jewelryImgUrl: this.$baseUrl + "/jewellery/api",
			haveData: 1,
			height: null,
			topHeight: null,
			select: 0,
			isUp: 0,
			img1: require("../static/imgs/search/up.png"),
			img2: require("../static/imgs/search/down.png"),
			img3: require("../static/imgs/search/normal.png"),
			imgFilter1: require("../static/imgs/search/yes.png"),
			imgFilter2: require("../static/imgs/search/no.png"),
			bagSearchList: [],
			haveMore: 0,
			page: 1,
			keyword: "",
			model: "",
			size: "",
			sort: "",

			sizeList: [],
			jewelleryModelList: [],
			type: "腕表",
			selList: ["腕表", "爱马仕", "珠宝"],
			tag: "",

			brand: '',
			series: '',

			topConHeight: 0,
			initType: "",
		};
	},
	mounted() {
		const query = uni.createSelectorQuery().in(this);
		query
			.select("#search-top")
			.boundingClientRect((data) => {
				this.topConHeight = data.height;
			})
			.exec();
	},
	onLoad(option) {
		// 获取手机状态栏高度
		uni.getSystemInfo({
			success: (data) => {
				// 将其赋值给this
				this.height = data.statusBarHeight;
			},
		});

		let initType = uni.getStorageSync("initType");
		if (initType) {
			this.initType = initType;
			if (this.initType == "J") {
				this.selList = ["珠宝"];
				this.type = "珠宝";
			} else if (this.initType == "H") {
				this.selList = ["爱马仕"];
				this.type = "爱马仕";
			} else if (this.initType == "W") {
				this.selList = ["腕表"];
				this.type = "腕表";
			}
		}

		if (this.selList.indexOf(option.type) > -1) {
			this.type = option.type;
			this.model = option.model === undefined ? "" : JSON.parse(decodeURIComponent(option.model));
			this.size = option.size === undefined ? "" : JSON.parse(decodeURIComponent(option.size));
			this.tag = option.tag;
			this.brand = option.brand === undefined ? "" : JSON.parse(decodeURIComponent(option.brand));
			this.series = option.series === undefined ? "" : JSON.parse(decodeURIComponent(option.series));
		}

		this.getList();
		this.getModelSizeList();
		this.getJewelryClassify();
	},
	onPullDownRefresh() {
		this.page = 1;
		this.bagSearchList = [];
		this.haveMore = 0;

		this.getList();
		uni.stopPullDownRefresh();
	},
	onReachBottom() {
		if (this.haveMore == 0) {
			this.page++;
			this.getList();
		}
	},
	onReady() {
		this.hidePageNavInWechatBrowser();
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	methods: {
		getPickerSelValue() {
			let idx = this.selList.indexOf(this.type);
			if (idx < 0) idx = 0;
			return idx;
		},
		selTypeChange(e) {
			this.type = this.selList[Number(e.detail.value)];
			this.page = 1;
			this.size = "";
			this.keyword = "";
			this.sort = "";
			this.bagSearchList = [];
			this.haveMore = 0;
			this.getList();
		},
		// 获取该样式爱马仕列表
		getList() {
			uni.showLoading({
				title: "加载中......",
			});
			if (this.type == "爱马仕") {
				uni.request({
					method: "POST",
					url: this.$baseUrl + "/wechat/api/modelSearch",
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

						setTimeout(() => {
							this.scrollTop++;
						}, 500);
					},
				});
			} else if (this.type == "珠宝") {
				uni.request({
					method: "POST",
					url: this.$baseUrl +
						"/jewellery/api/jewellerySearch?page=" +
						this.page +
						"&pageNum=10",
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

						setTimeout(() => {
							this.scrollTop++;
						}, 500);
					},
				});
			} else if (this.type == "腕表") {
				uni.request({
					method: "POST",
					url: this.$baseUrl + "/watch/api/watchSearch",
					data: {
						keyword: this.keyword,
						brand: this.brand,
						series: this.series,
						page: this.page,
						pageNum: 10,
						sort: this.sort,
					},
					header: {
						"content-type": "application/json",
					},
					complete: (res) => {
						uni.hideLoading();

						if (res.data.length == 0) {
							this.haveMore = 1;
						} else {

							let list = res.data.data;
							for (let i = 0; i < list.length; ++i) {
								if (list[i].pics.length == 0) {
									list[i].pics = '~@/static/imgs/common/nopic.jpg';
								} else {
									list[i].pics = this.$baseUrl + "/watch/api" + list[i].pics.replace('\\', '/');
								}
							}

							this.bagSearchList = this.bagSearchList.concat(list);
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

						setTimeout(() => {
							this.scrollTop++;
						}, 500);
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

			this.getList();

			if (this.type == "爱马仕") {
				for (let item of this.modelSizeList) {
					for (let every of item.list) {
						if (every.model.indexOf(this.keyword) !== -1) {
							this.model = every.model;
							this.sizeList = every.sizeList;
							return;
						}
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
			this.getList();
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
			this.getList();
		},
		// 筛选
		filterSel03() {
			if (this.type == "爱马仕" && this.sizeList.length == 0) {
				this.goToClassify();
			}
			else if (this.type == "腕表") {
				this.goToClassify();
			}
			else {
				if (this.select == 2) {
					this.select = 3;
				} else {
					this.select = 2;

					this.$nextTick(() => {
						let view = uni.createSelectorQuery().select(".upAndDown");
						view
							.boundingClientRect((data) => {
								//获取固定尾部的高度=data.height
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

			this.getList();
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

			this.getList();
		},
		// 查看爱马仕详情
		checkDetails(item) {
			if (this.type == "爱马仕") {
				uni.navigateTo({
					url: "../hermes/details?id=" + item.id,
				});
			} else if (this.type == "珠宝") {
				uni.navigateTo({
					url: "../jewelry/jewelryDetails?id=" + item.id,
				});
			}
			else if (this.type == "腕表") {
				uni.navigateTo({
					url: "../watch/detail?id=" + item.id,
				});
			}
		},
		// 获取包款尺寸列表
		getModelSizeList() {
			uni.request({
				url: this.$baseUrl + "/wechat/api/modelSort",
				header: {
					"content-type": "application/json",
				},
				complete: (res) => {
					this.modelSizeList = res.data;
					this.getSizeList();
				},
			});
		},
		// 获取尺寸列表
		getSizeList() {
			for (let item of this.modelSizeList) {
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
				url: this.$baseUrl + "/jewellery/api/jewelleryModelSort",
				header: {
					"content-type": "application/json",
					token: uni.getStorageSync("token"),
				},
				complete: (res) => {
					this.jewelleryModelList = res.data;
				},
			});
		},
		// 返回上一层
		goBack() {
			uni.navigateBack({
				delta: 1,
			});
		},
		// 返回分类列表
		goToClassify() {
			getApp().globalData.pageInItem = this.type;
			uni.switchTab({
				url: "/pages/classify",
			});
		},
		getShowTitle(item) {
			if (item.series && item.series != '其他') {
				return item.brand + ' - ' + item.series;
			}
			else {
				return item.brand;
			}
		}
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
					margin-top: 10rpx;
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


	.list {
		padding: 20rpx;
		display: grid;
		justify-content: space-between;
		grid-template-columns: repeat(auto-fill, 344rpx);
		grid-gap: 20rpx;
		//background-color: #FDFDFD;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;

		.item {
			padding: 20rpx;
			border-radius: 40rpx;
			//background-color: #0055ff;
			margin-bottom: 20rpx;
			box-shadow: 0px -5px 0 0 #ffffff, -10rpx 0px 20rpx 0 #f9f9f9,
				10rpx 0px 20rpx 0 #f9f9f9, 0px 20rpx 30rpx 0 #f9f9f9;

			.img {
				width: 304rpx;
				height: 304rpx;
				border-radius: 30rpx;
			}

			.title {
				margin-top: 28rpx;
				font-size: 28rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.note {
				margin-top: 18rpx;
				font-size: 20rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.price {
				margin-top: 22rpx;
				font-size: 22rpx;
				color: #ff8b62;
				//font-weight: bold;
			}
		}
	}

	.search-main {
		margin-top: 230rpx;
		//padding: 0 20rpx;

		.main-container {
			display: grid;
			justify-content: space-between;
			grid-template-columns: repeat(auto-fill, 344rpx);
			grid-gap: 20rpx;
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
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
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
