<template>
	<view class="content">

		<view class="select">
			<view :class="['item', {'noneSel':index != curSel}]" v-for="(item, index) in selValue" :key="index"
				@click="selChange(index)">
				{{item}}
			</view>
		</view>

		<view class="title">
			<view class="selName">{{selName}}</view>

			<view class="showValue">
				<view class="item">
					<view class="price">{{sellMoney}}</view>
					<view class="name">营业额</view>
				</view>

				<view class="item">
					<view class="price">{{sellVolume}}</view>
					<view class="name">销量</view>
				</view>


			</view>

			<view class="showValue">

				<view class="item">
					<view class="price">{{profit}}</view>
					<view class="name">利润</view>
				</view>

				<view class="item">
					<view class="price">{{profitPer}}</view>
					<view class="name">利润率</view>
				</view>


			</view>

		</view>

		<view class="chart">
			<view class="title2">营业额/利润</view>
			<qiun-data-charts class="main2" type="column" :chartData="chartData1" :opts="barStyle" :ontouch="true"
				@getIndex="indexChange" />
		</view>

		<!-- 	<view class="chart">
			<view class="title2">利润</view>
			<qiun-data-charts class="main2"  type="column" :chartData="chartData2" :opts="barStyle" :ontouch="true" @getIndex ="indexChange" />
		</view> -->

		<view class="chart">
			<view class="title2">销量</view>
			<qiun-data-charts class="main2" type="mix" :chartData="chartData3" :opts="barStyle" :ontouch="true"
				@getIndex="indexChange" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				barStyle: {
					dataLabel: false,
					enableScroll: true,

					xAxis: {
						itemCount: 5,
						scrollShow: true,
						fontSize: 10,
						axisLineColor: '#FFFFFF',
					},
					yAxis: {
						disableGrid: true,
						data: [{
							fontSize: 10,
							axisLineColor: '#FFFFFF',
							title: ""
						}],
					},
					legend: {
						show: false,
					},
					extra: {
						column: {
							meterBorder: 1,
							width: 20,
							linearType: "opacity",
							linearOpacity: 0.5
						},
						tooltip: {
							showBox: false,
						},
						mix: {
							column: {
								width: 20
							}
						}
					}
				},
				chartData1: {
					categories: [],
					series: [{
							name: "",
							type: "column",
							color: '#7bdcca',
							data: [],

						}, {
							name: "",
							type: "column",
							color: '#f9b004',
							data: [],

						}
						// ,
						// {
						// 	name: "",
						// 	type: "area",
						// 	style: "curve",
						// 	data: []
						// },
						// {
						// 	name: "",
						// 	type: "area",
						// 	style: "curve",
						// 	data: []
						// }
					]
				},
				chartData2: {
					categories: [],
					series: [{
						name: "",
						color: '#e24877',
						data: [],

					}]
				},
				chartData3: {
					categories: [],
					series: [{
							name: "",
							type: "column",
							color: '#5A82F5',
							data: [],

						},
						{
							name: "",
							type: "area",
							style: "curve",
							data: []
						},
					]
				},

				selName: '总体数据',
				sellMoney: '-',
				profit: '-',
				profitPer: '-',
				sellVolume: '-',
				selValue: ['按年统计', '按季度统计', '按月统计'],
				curSel: 0,
				currency: '', //getApp().globalData.userInfo.currency,
			}
		},
		async onLoad() {
			await this.$onLaunched;
			this.getInfo();
		},
		onReady() {
			this.hidePageNavInWechatBrowser();
		},
		onPullDownRefresh() {
			this.getInfo();
			uni.stopPullDownRefresh();
		},
		methods: {
			getInfo() {
				uni.showLoading({
					title: "加载中...",
				});
				let flag = this.curSel;
				uni.request({
					url: this.$baseFileUrl + "/salesComparison?flag=" + (++flag),
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync("token"),
					},
					success: (res) => {
						uni.hideLoading();

						let x = [];
						let y = [];
						for (let i = 0; i < res.data.annualTurnoverList.length; ++i) {
							x.push(res.data.annualTurnoverList[i].time);
							y.push(res.data.annualTurnoverList[i].saleMoney);
						}
						this.chartData1.categories = x;
						this.chartData1.series[0].data = y;
						//this.chartData1.series[2].data = y;
						this.chartData1.total = this.getSum(y);

						x = [];
						y = [];
						for (let i = 0; i < res.data.annualProfitList.length; ++i) {
							x.push(res.data.annualProfitList[i].time);
							y.push(res.data.annualProfitList[i].profit);
						}
						this.chartData2.categories = x;
						this.chartData2.series[0].data = y;
						this.chartData1.series[1].data = y;
						//this.chartData1.series[3].data = y;
						this.chartData2.total = this.getSum(y);

						x = [];
						y = [];
						for (let i = 0; i < res.data.annualSalesVolumeList.length; ++i) {
							x.push(res.data.annualSalesVolumeList[i].time);
							y.push(res.data.annualSalesVolumeList[i].salesVolume);
						}
						this.chartData3.categories = x;
						this.chartData3.series[0].data = y;
						this.chartData3.series[1].data = y;
						this.chartData3.total = this.getSum(y);

						let e = {
							currentIndex: {
								index: -1
							}
						};
						this.indexChange(e);

					},
					fail: (err) => {
						uni.hideLoading();
					},
				});
			},
			selChange(idx) {
				this.curSel = idx;
				this.getInfo();
			},
			indexChange(e) {
				if (e.currentIndex.index == -1) {
					this.selName = '总体数据';
					this.sellMoney = this.getPrice(this.chartData1.total, this.currency, '-', 0);
					this.profit = this.getPrice(this.chartData2.total, this.currency, '-', 0);
					this.profitPer = this.getPrice(this.chartData2.total / this.chartData1.total * 100, '', '-', 2) + '%';
					this.sellVolume = this.getPrice(this.chartData3.total, '', '-', 0);
				} else {
					this.selName = this.chartData1.categories[e.currentIndex.index] + '数据';
					this.sellMoney = this.getPrice(this.chartData1.series[0].data[e.currentIndex.index], this.currency,
						'-', 0);
					this.profit = this.getPrice(this.chartData2.series[0].data[e.currentIndex.index], this.currency, '-',
						0);
					this.profitPer = this.getPrice(this.chartData2.series[0].data[e.currentIndex.index] / this.chartData1
						.series[0].data[e.currentIndex.index] * 100, '', '-', 2) + '%';
					this.sellVolume = this.getPrice(this.chartData3.series[0].data[e.currentIndex.index], '', '-', 0);
				}
			},
			getSum(arr) {
				let ret = 0;
				for (let i = 0; i < arr.length; ++i) {
					ret += arr[i];
				}
				return ret;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #f9f9f9;
		padding: 20rpx 24rpx;

		.select {
			display: flex;
			justify-content: space-around;
			margin-bottom: 30rpx;

			.item {
				background-color: #85dbd0;
				border-radius: 20rpx;
				font-size: 24rpx;
				color: #FFFFFF;
				padding: 20rpx 25rpx;


			}

			.noneSel {
				background-color: #efefef;
				color: #999999;
			}
		}

		.title {
			background-color: #FFFFFF;
			border-radius: 30rpx;
			padding: 30rpx 0rpx;

			.selName {
				font-size: 22rpx;
				color: #bdbdbd;
				margin-left: 20rpx;
			}

			.showValue {
				margin-top: 25rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.item {
					flex: 1;

					display: flex;
					flex-direction: column;
					align-items: center;

					.price {
						font-size: 32rpx;
						font-weight: bold;
						margin-bottom: 20rpx;
					}

					.name {
						color: #666666;
						font-size: 24rpx;
					}
				}
			}


		}

		.chart {
			background-color: #FFFFFF;
			border-radius: 30rpx;
			padding: 20rpx 0rpx 40rpx;
			margin-top: 30rpx;

			.title2 {
				font-size: 28rpx;
				color: #666666;
				margin: 0rpx 20rpx;
				text-align: center;
			}

			.main2 {}
		}
	}
</style>
