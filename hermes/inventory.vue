<template>
	<view class="content">
		<popwndSelect :visible.sync="bShowCompany" strTitle="请选择公司" :lst="companys" strName="companyName" :sel="companyIdx"
			@confirm="companyChange">
		</popwndSelect>
		<popwndSelect :visible.sync="bShowStock" strTitle="请选择仓库" :lst="stocks" strName="warehouseName" :sel="stockIdx"
			@confirm="stockChange">
		</popwndSelect>
		<popwndSelect :visible.sync="bShowState" strTitle="请选择状态" :lst="states" strName="name" :sel="stateIdx"
			@confirm="stateChange"></popwndSelect>
		<view class="inventory-top">
			<view :style="{ height: height + 'px' }"></view>
			<!--  #ifdef  MP-WEIXIN -->
			<view class="mine-title">
				<image @click="goBack" style="width: 17rpx; height: 30rpx" src="../static/imgs/common/back.png" mode="aspectFill">
				</image>
				<input class="search-input" type="text" v-model="keyWord" placeholder="搜索"
					placeholder-style="color: #7b7b7b;font-size: 24rpx;" @input="inputChange" />
			</view>
			<!--  #endif -->
			<!--  #ifndef  MP-WEIXIN -->
			<uni-search-bar v-model="keyWord" placeholder="搜索" @input="inputChange" cancelButton="none" />
			<!--  #endif -->
			<view class="inputs">
				<view class="item">
					<view class="clrGray" style="flex: 1" @click="bShowCompany = true">
						<text>{{ companys[companyIdx].companyName }}</text>
						<image src="../static/imgs/mine/down.png" mode="aspectFill"></image>
					</view>
					<view class="clrGray" style="flex: 1" @click="bShowStock = true">
						<text>{{ stocks[stockIdx].warehouseName }}</text>
						<image src="../static/imgs/mine/down.png" mode="aspectFill"></image>
					</view>
					<view class="clrGray" style="flex: 1" @click="bShowState = true">
						<text>{{ states[stateIdx].name }}</text>
						<image src="../static/imgs/mine/down.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</view>
		<view v-if="haveData == 0" class="no-data">
			<image src="../static/imgs/common/no.png" mode="aspectFill"></image>
			<text style="font-size: 30rpx">暂无数据~</text>
		</view>
		<view v-else class="inventory-main">
			<view class="inventory-num">
				<view>共查询到{{ total }}件商品<text v-if="stateIdx == 0">：其中可售{{ sold1Total }}件，预留{{ reserveNum }}件，已售{{
					soldNum
				}}件</text>
				</view>
			</view>
			<view class="list">
				<view v-for="(item, index) in list" :key="index" class="item" @click="checkDetails(item)">

					<view>
						<!-- <view style="font-size: 25rpx; font-weight: bold; margin: 40rpx 0;">{{item.name}}</view>
						 -->
						<view style="display: flex; align-items: center;">
							<image class="img" :src="item.pic.trim()" mode="aspectFill"></image>
							<view
								style="min-height: 360rpx; margin-left: 30rpx; display: flex; flex-direction: column; justify-content: space-between;">

								<view class="">
									<view class="attri">货号: {{ item.productCode }}</view>
									<view class="attri">款式: {{ item.model }}</view>
									<view class="attri" v-if="item.size">大小: {{ item.size }}</view>
									<view class="attri" v-if="item.metal">金属: {{ item.metal }}</view>
									<view class="attri" v-if="item.leather">皮质: {{ item.leather }}</view>
									<view class="attri" v-if="item.color">颜色: {{ item.color }}</view>
									<view class="attri" v-if="item.colorId">色号: {{ item.colorId }}</view>
									<view class="attri" v-if="item.letter">刻印: {{ item.letter.slice(0, 1) }}</view>
								</view>

								<view style="margin-top: 40rpx;">
									<view class="attri" style="display: flex; align-items: flex-start;">
										<view>成本价：</view>
										<view class="">
											<view v-if="item.buyAllPrice">{{ getPrice(item.buyAllPrice, item.foreignCurrency, '-', 0) }}</view>
											<view v-if="item.totalHkPrice" class="">{{ getPrice(item.totalHkPrice, currency, '-', 0) }}</view>
										</view>
									</view>
									<view v-if="item.pricePeer" class="attri">同行价：{{ getPrice(item.pricePeer, item.peerCurrency, '-', 0) }}
									</view>
									<view v-if="item.priceIndi" class="attri">散客价：{{ getPrice(item.priceIndi, item.indiCurrency, '-', 0) }}
									</view>
									<view class="attri" style="color: #79c7bd;">存貨地: {{ item.stockLoc }}</view>
								</view>

							</view>
						</view>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
import popwndSelect from "@/components/popwnd/popwnd_select_blue.vue";
export default {
	components: {
		popwndSelect,
	},
	data() {
		return {
			currency: '',

			haveData: 1,
			height: null,
			keyWord: "",
			page: 1,

			bShowCompany: false,
			companyIdx: 0,
			companys: [{ companyId: -1, companyName: "全部公司" }],

			allStocks: [],
			bShowStock: false,
			stockIdx: 0,
			stocks: [{ warehouseId: -1, warehouseName: "全部仓库" }],

			bShowState: false,
			stateIdx: 2,
			states: [{
				id: -1,
				name: "全部",
			},
			{
				id: 0,
				name: "采购中",
			},
			{
				id: 1,
				name: "存货",
			},
			{
				id: 3,
				name: "已出售",
			},
			{
				id: 8,
				name: "已寄卖",
			},
			{
				id: 2,
				name: "客人预留",
			},
			{
				id: 6,
				name: "购入退货",
			},
			{
				id: 9,
				name: "客人寄卖",
			},
			{
				id: 5,
				name: "客人取回",
			},
			{
				id: 7,
				name: "遗失",
			}
			],

			list: [],
			total: 0,
			sold1Total: 0,
			reserveNum: 0,
			soldNum: 0,

			haveMore: 0,
		};
	},
	async onLoad() {
		await this.$onLaunched;
		this.currency = getApp().globalData.userInfo.currency;

		// 获取手机状态栏高度
		uni.getSystemInfo({
			success: (data) => {
				// 将其赋值给this
				this.height = data.statusBarHeight;
			},
		});

		this.stateIdx = 2;

		if (this.list.length == 0 && uni.getStorageSync("token").length > 0) {
			console.log("重新获取数据");
			this.getStockList();
		}
	},
	onPullDownRefresh() {
		uni.showLoading({
			title: "正在刷新",
		});
		console.log("获取数据");
		this.page = 1;
		this.list = [];
		this.haveMore = 0;
		this.getStockList();
		uni.stopPullDownRefresh();
	},
	onReachBottom() {
		if (this.haveMore == 0) {
			this.page++;
			this.search();
		}
	},
	methods: {
		// 查询商品
		search() {
			uni.showLoading({
				title: "加载中...",
			});
			this.soldNum = 0;
			this.reserveNum = 0;
			let data = {};
			data = {
				keyword: this.keyWord.trim(),
				userId: 0,
				page: this.page,
				pageNum: 10,
			};

			if (this.stateIdx > 0) data.sold = this.states[this.stateIdx].id;
			if (this.companyIdx > 0) data.companyId = this.companys[this.companyIdx].companyId;
			if (this.stockIdx > 0) data.stockLocId = this.stocks[this.stockIdx].warehouseId;

			uni.request({
				url: this.$baseFileUrl + "/stockSearch",
				method: "POST",
				header: {
					"content-type": "application/json",
					token: uni.getStorageSync("token"),
				},
				data: data,
				complete: (ret) => {
					uni.hideLoading();
					if (this.checkBack(ret) == false) return;

					this.total = ret.data.total;
					this.sold1Total = ret.data.sold1Total;
					this.reserveNum = ret.data.sold2Total;
					this.soldNum = ret.data.soldTotal;
					if (ret.data.list.length == 0) {
						this.haveMore = 1;
					} else {
						let data = this.list.concat(ret.data.list);
						this.list = data;
					}

					if (this.list.length == 0) {
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
		},
		// 获取库存地列表
		getStockList() {
			uni.request({
				url: this.$baseFileUrl + "/stockLocList",
				header: {
					"content-type": "application/json",
					token: uni.getStorageSync("token"),
				},
				data: {},
				complete: (ret) => {
					uni.hideLoading();
					if (this.checkBack(ret, true) == false) return;

					let data = ret.data;
					this.allStocks = [];
					this.companys = [{ companyId: -1, companyName: "全部公司" }];
					this.stocks = [{ warehouseId: -1, warehouseName: "全部仓库" }];
					if (data.length > 0) {
						for (let i = 0; i < data.length; ++i) {
							if (data[i].companyId > 0) {
								let find = false;
								for (let k = 0; k < this.companys.length; ++k) {
									if (this.companys[k].companyId == data[i].companyId) {
										find = true;
										break;
									}
								}
								if (find == false)
									this.companys.push(data[i]);
							}
							if (data[i].warehouseId > 0) {
								this.allStocks.push(data[i]);
							}
						}
					}
					this.companyChange({ sel: 0 })
				},
			});
		},
		// 模糊搜索
		inputChange() {
			this.page = 1;
			this.list = [];
			this.haveMore = 0;
			this.search();
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 300,
			});
		},
		// 用户变化
		userChange(e) {
			this.userIdx = e.sel;
			this.page = 1;
			this.list = [];
			this.haveMore = 0;
			this.search();
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 300,
			});
		},
		// 公司变化
		companyChange(e) {
			this.companyIdx = e.sel;

			this.stockIdx = 0;
			this.stocks = [{ warehouseId: -1, warehouseName: "全部仓库" }];
			for (let i = 0; i < this.allStocks.length; ++i) {
				if (this.companys[this.companyIdx].companyId == this.allStocks[i].companyId) {
					this.stocks.push(this.allStocks[i]);
				}
			}

			this.page = 1;
			this.list = [];
			this.haveMore = 0;
			this.search();
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 300,
			});
		},
		// 库存地变化
		stockChange(e) {
			this.stockIdx = e.sel;
			this.page = 1;
			this.list = [];
			this.haveMore = 0;
			this.search();
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 300,
			});
		},
		// 库存状态变化
		stateChange(e) {
			this.stateIdx = e.sel;
			this.page = 1;
			this.list = [];
			this.haveMore = 0;
			this.search();
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 300,
			});
		},
		// 不同状态颜色
		getSaleStateClr(item) {
			if (item.sold == 0) return "#54b7eb";
			else if (item.sold == 1) return "#6bcda5";
			else if (item.sold == 2) return "#ff8b62";
			else if (item.sold == 3) return "#ef5b5b";
			else return "#ef5b5b";
		},
		// 商品状态
		getSaleState(item) {
			for (let i = 0; i < this.states.length; ++i) {
				if (item.sold == this.states[i].id) return this.states[i].name;
				else if (item.sold == 4) return "已售";
			}
			return "";
		},
		// 查看包包详情
		checkDetails(item) {
			uni.navigateTo({
				url: "details?id=" + item.id,
			});
		},
		// 返回上一层
		goBack() {
			uni.navigateBack({
				delta: 1,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	min-height: 100vh;
	background-color: #f9f9f9;

	.inventory-top {
		padding-bottom: 26rpx;
		position: sticky;
		top: var(--window-top);
		z-index: 99;
		background-color: #fff;


		.top-input,
		.item {
			padding: 0 30rpx;
		}

		.mine-title {
			height: 44px;
			padding: 0 40rpx;
			display: flex;
			align-items: center;

			.search-input {
				width: 400rpx;
				padding: 10rpx 20rpx;
				margin-left: 20rpx;
				background-color: #f6f6f6;
				border-radius: 30px;
				text-align: center;
				font-size: 24rpx;
			}
		}

		.inputs {
			margin-top: 20rpx;

			.item {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.item-title {
					font-size: 28rpx;
					color: #565656;
					font-weight: bold;
				}

				.clrGray {
					display: flex;
					justify-content: center;
					align-items: center;

					text {
						font-size: 28rpx;
						color: #c8c8c8;
					}

					image {
						width: 44rpx;
						height: 44rpx;
						margin-left: 30rpx;
					}
				}
			}

			.line {
				width: 100%;
				height: 2rpx;
				margin-top: 26rpx;
				margin-bottom: 26rpx;
				background-color: #f9f9f9;
			}
		}
	}

	.inventory-main {
		padding: 20rpx;

		.inventory-num {
			margin-bottom: 20rpx;
			font-size: 22rpx;
			color: #aaa;
		}

		.list {
			font-size: 20rpx;
			color: #565656;

			.item {
				//display: flex; 
				//align-items: center;
				background-color: white;
				padding: 20rpx;
				margin-bottom: 20rpx;

				.img {
					width: 260rpx;
					height: 360rpx;
					flex-shrink: 0;
				}

				.attri {
					margin: 5rpx 0;
				}
			}
		}


	}
}
</style>
