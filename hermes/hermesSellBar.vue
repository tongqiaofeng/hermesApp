<template>
	<view class="content">

		<view class="mainTitle">
			<view class="img"></view>
			<view class="name">销售概况（同比）</view>
		</view>

		
			
		<view class="chart">
			<view class="select" id="select2">
				<view :class="['item', {'noneSel':index != curSel2}]" v-for="(item, index) in selValue2" :key="index" @click="selChange2(index)">
					{{item}}
				</view>
			</view>
			
			<view style="display: flex; justify-content: space-around;">
				<view>
					<canvas canvas-id="arcbar1" id="arcbar1" style="width: 250rpx; height: 250rpx;" />
					<view style="font-size: 30rpx; font-weight: bold; margin-top: 20rpx; text-align: center; ">{{arcBarData1}}</view>
				</view>
				
				<view>
					<canvas canvas-id="arcbar2" id="arcbar2" style="width: 250rpx; height: 250rpx;" />
					<view style="font-size: 30rpx; font-weight: bold; margin-top: 20rpx; text-align: center; ">{{arcBarData2}}</view>
				</view>
				
			</view>
			
		</view>

		<view class="mainTitle" style="margin: 20rpx 0;">
			<view class="img"></view>
			<view class="name">客户分布</view>
		</view>

		<view class="chart">
			<view class="select" id="select3">
				<view :class="['item', {'noneSel':index != curSel3}]" v-for="(item, index) in selValue3" :key="index" @click="selChange3(index)">
					{{item}}
				</view>
			</view>
			
			<canvas canvas-id="pie1" id="pie1" style="width: 700rpx; height: 500rpx;" />
			<canvas canvas-id="pie2" id="pie1" style="width: 700rpx; height: 500rpx;" />
		</view>

		


		<view class="mainTitle" style="margin: 20rpx 0;">
			<view class="img"></view>
			<view class="name">营业额、利润、销量图表</view>
		</view>
		
		


		<view class="title">
			<view class="select" id="select1">
				<view :class="['item', {'noneSel':index != curSel1}]" v-for="(item, index) in selValue1" :key="index" @click="selChange1(index)">
					{{item}}
				</view>
			</view>
			
			<uni-segmented-control style="background-color: #ffffff; margin-bottom: 40rpx;" :current="tabCurrent" :values="tabItems" styleType="text" activeColor="#85dbd0" @clickItem="onClickTabItem"></uni-segmented-control>
			
			<view v-if="tabCurrent == 0">
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
			<view v-if="tabCurrent == 1">
				<uni-table stripe emptyText="暂无更多数据">
					<uni-tr style="">
						<uni-th style="font-size: 28rpx;" align="center" width="20">时间</uni-th>
						<uni-th style="font-size: 28rpx;" align="center" width="20">营业额</uni-th>
						<uni-th style="font-size: 28rpx;" align="center" width="20">利润</uni-th>
						<uni-th style="font-size: 28rpx;" align="center" width="20">利润率</uni-th>
						<uni-th style="font-size: 28rpx;" align="center" width="20">销量</uni-th>
					</uni-tr>
					<uni-tr v-for="(time, index) in chartData1.categories" :key="index">
						<uni-td style="font-size: 18rpx;" align="center">{{getShowTime(chartData1.categories[chartData1.categories.length - 1 - index])}}</uni-td>
						<uni-td style="font-size: 18rpx;" align="right">{{getPrice(chartData1.series[0].data[chartData1.categories.length - 1 - index], '', '-', 0)}}</uni-td>
						<uni-td style="font-size: 18rpx;" align="right">{{getPrice(chartData1.series[1].data[chartData1.categories.length - 1 - index], '', '-', 0)}}</uni-td>
						<uni-td v-if="chartData1.series[1].data[chartData1.categories.length - 1 - index] == 0" style="font-size: 18rpx;" align="center">-</uni-td>
						<uni-td v-else style="font-size: 18rpx;" align="center">{{(chartData1.series[1].data[chartData1.categories.length - 1 - index]/chartData1.series[0].data[chartData1.categories.length - 1 - index]*100).toFixed(2)}}%</uni-td>
						<uni-td style="font-size: 18rpx;" align="right">{{chartData3.series[0].data[chartData1.categories.length - 1 - index]}}</uni-td>
					</uni-tr>
				</uni-table>
			</view>

			

		</view>

		<view v-if="tabCurrent == 0">
			<view class="chart">
				<view class="title2">营业额/利润</view>
				<canvas canvas-id="chart1" id="chart1" class="main2" @touchstart="touchColumn($event, 'chart1')"
					@touchmove="moveColumn($event, 'chart1')" @touchend="touchEndColumn($event, 'chart1')"
					@tap="tapColumn($event, 'chart1')" />
			</view>
			
			<view class="chart">
				<view class="title2">销量</view>
				<canvas canvas-id="chart3" id="chart3" class="main2" @touchstart="touchColumn($event, 'chart3')"
					@touchmove="moveColumn($event, 'chart3')" @touchend="touchEndColumn($event, 'chart3')"
					@tap="tapColumn($event, 'chart1')" />
			</view>
		</view>
		
	</view>
</template>

<script>
	import uCharts from '@/uni_modules/qiun-data-charts/js_sdk/u-charts/u-charts.js';
	var uChartsInstance = {};
	export default {
		data() {
			return {
				tabItems: ['曲线', '表格'],
				tabCurrent: 0,
				
				chartData1: {
					categories: [],
					series: [{
							name: "",
							color: '#7bdcca',
							data: [],

						}, {
							name: "",
							color: '#f9b004',
							data: [],

						}
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
				
				salesOverview:{},
				arcBarData1:'',
				arcBarData2:'',

				selName: '总体数据',
				sellMoney: '-',
				profit: '-',
				profitPer: '-',
				sellVolume: '-',
				selValue1: ['按年统计', '按季度统计', '按月统计'],
				curSel1: 0,
				
				selValue2: ['营业额', '利润', '销量'],
				curSel2: 0,
				
				selValue3: ['营业额', '利润', '销量'],
				curSel3: 0,
				currency: '', //getApp().globalData.userInfo.currency,
			}
		},
		async onLoad() {
			await this.$onLaunched;
			this.currency = getApp().globalData.userInfo.currency;
			this.getInfo();
			this.getInfo2();
		},
		onReady() {
			this.hidePageNavInWechatBrowser();
		},
		onPullDownRefresh() {
			this.getInfo();
			this.getInfo2();
			uni.stopPullDownRefresh();
		},
		methods: {
			getInfo() {
				uni.showLoading({
					title: "加载中...",
				});
				let flag = this.curSel1;
				uni.request({
					url: this.$baseFileUrl + "/salesComparison?flag=" + (++flag),
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync("token"),
					},
					success: (res) => {
						uni.hideLoading();

						let chartData1 = this.deepClone(this.chartData1);
						let chartData2 = this.deepClone(this.chartData3);
						let chartData3 = this.deepClone(this.chartData3);

						let x = [];
						let y = [];
						for (let i = 0; i < res.data.annualTurnoverList.length; ++i) {
							x.push(res.data.annualTurnoverList[i].time);
							y.push(res.data.annualTurnoverList[i].saleMoney);
						}
						this.chartData1.categories = x;
						this.chartData1.series[0].data = y;
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
						this.chartData2.total = this.getSum(y);

						console.log(chartData2.total);

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

						this.drawChart1("chart1", this.chartData1);
						this.drawChart3("chart3", this.chartData3);

						this.indexChangeEx(-1);

					},
					fail: (err) => {
						uni.hideLoading();
					},
				});
			},
			getInfo2() {
				uni.showLoading({
					title: "加载中...",
				});
				let flag = this.curSel1;
				uni.request({
					url: this.$baseFileUrl + "/salesOverview",
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync("token"),
					},
					success: (res) => {
						uni.hideLoading();
			
						this.salesOverview = res.data;
						
						this.selChange2(this.curSel2);
						this.selChange3(this.curSel3);
			
					},
					fail: (err) => {
						uni.hideLoading();
					},
				});
			},
			selChange1(idx) {
				this.curSel1 = idx;
				this.getInfo();
			},
			selChange2(idx) {
				this.curSel2 = idx;
				
				let arcBarData = null;
				if(idx == 0){
					arcBarData = this.salesOverview.saleMsgRes.turnoverDetail;
					this.arcBarData1 = this.getPrice(arcBarData.currentYear, this.currency, '-', 2);
					this.arcBarData2 = this.getPrice(arcBarData.currentQuarter, this.currency, '-', 2);
				}
				else if(idx == 1){
					arcBarData = this.salesOverview.saleMsgRes.profitDetail;
					this.arcBarData1 = this.getPrice(arcBarData.currentYear, this.currency, '-', 2);
					this.arcBarData2 = this.getPrice(arcBarData.currentQuarter, this.currency, '-', 2);
				}
				else{
					arcBarData = this.salesOverview.saleMsgRes.salesVolumeDetail;
					this.arcBarData1 = this.getPrice(arcBarData.currentYear, '', '-', 2);
					this.arcBarData2 = this.getPrice(arcBarData.currentQuarter, '', '-', 2);
				}
				
				let year = arcBarData.yearPercentage/100;
				let Quarter = arcBarData.quarterPercentage/100;
				if(year > 1) year = 1;
				if(Quarter > 1) Quarter = 1;
				this.drawArcbar("arcbar1", 250, year, "#1890FF", arcBarData.yearPercentage + '%', '年度目标');
				this.drawArcbar("arcbar2", 250, Quarter, "#91CB74", arcBarData.quarterPercentage + '%', '季度目标');
			},
			selChange3(idx) {
				this.curSel3 = idx;
				
				let pieData = null;
				if(idx == 0){
					pieData = this.salesOverview.customerMsgRes.turnoverDetail;
				}
				else if(idx == 1){
					pieData = this.salesOverview.customerMsgRes.profitDetail;
				}
				else{
					pieData = this.salesOverview.customerMsgRes.salesVolumeDetail;
				}
				
				console.log('ddd')
				console.log(pieData)
				let pie1 = { data : pieData.customerTypeList };
				console.log(pie1)
				this.drawPie("pie1", [{ data : pieData.customerTypeList }]);
				this.drawPie("pie2", [{ data : pieData.customerList }]);
			},
			indexChangeEx(idx) {
				if (idx == -1) {
					this.selName = '总体数据';
					this.sellMoney = this.getPrice(this.chartData1.total, this.currency, '-', 0);
					this.profit = this.getPrice(this.chartData2.total, this.currency, '-', 0);
					console.log(this.chartData2)
					this.profitPer = this.getPrice(this.chartData2.total / this.chartData1.total * 100, '', '-', 2) + '%';
					this.sellVolume = this.getPrice(this.chartData3.total, '', '-', 0);
				} else {
					this.selName = this.chartData1.categories[idx] + '数据';
					this.sellMoney = this.getPrice(this.chartData1.series[0].data[idx], this.currency,
						'-', 0);
					this.profit = this.getPrice(this.chartData2.series[0].data[idx], this.currency, '-',
						0);
					this.profitPer = this.getPrice(this.chartData2.series[0].data[idx] / this.chartData1
						.series[0].data[idx] * 100, '', '-', 2) + '%';
					this.sellVolume = this.getPrice(this.chartData3.series[0].data[idx], '', '-', 0);
				}
			},
			onClickTabItem(e){
				if (this.tabCurrent != e.currentIndex) {
				    this.tabCurrent = e.currentIndex;
					if(this.tabCurrent == 0){
						this.drawChart1("chart1", this.chartData1);
						this.drawChart3("chart3", this.chartData3);
						
						this.indexChangeEx(-1);
					}
				}
			},
			getShowTime(time){
				if(this.curSel1 == 1){
					return time.replace('-', "\r\n");
				}
				else if(this.curSel1 == 2){
					return time.replace('-', "\r\n");
				}
				else{
					return time;
				}
			},
			getSum(arr) {
				let ret = 0;
				for (let i = 0; i < arr.length; ++i) {
					ret += arr[i];
				}
				return ret;
			},
			drawChart1(id, data) {
				const ctx = uni.createCanvasContext(id, this);
				uChartsInstance[id] = new uCharts({

					categories: data.categories,
					series: data.series,

					type: "column",
					context: ctx,

					width: uni.upx2px(700),
					height: uni.upx2px(550),
					background: "#FFFFFF",
					dataLabel: false,
					enableScroll: true,
					xAxis: {
						disableGrid: true,
						itemCount: 5,
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
							width: 20,
							linearType: "opacity",
							linearOpacity: 0.5
						},
						tooltip: {
							showBox: false,
						},
					}
				});
			},
			drawChart3(id, data) {
				const ctx = uni.createCanvasContext(id, this);
				uChartsInstance[id] = new uCharts({

					categories: data.categories,
					series: data.series,

					type: "mix",
					context: ctx,

					width: uni.upx2px(700),
					height: uni.upx2px(550),
					background: "#FFFFFF",
					dataLabel: false,
					enableScroll: true,
					xAxis: {
						disableGrid: true,
						itemCount: 5,
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
				});
			},
			drawArcbar(id, width, percent, color, title, subtitle) {

				let series = [{
					name: "",
					data: percent
				}];

				const ctx = uni.createCanvasContext(id, this);
				uChartsInstance[id] = new uCharts({
					type: "arcbar",
					context: ctx,
					width: uni.upx2px(width),
					height: uni.upx2px(width),
					series: series,
					animation: true,
					background: "#FFFFFF",
					color: [color],
					padding: undefined,
					title: {
						name: title,
						fontSize: 20,
						color: color
					},
					subtitle: {
						name: subtitle,
						fontSize: 10,
						color: "#666666"
					},
					extra: {
						arcbar: {
							type: "circle",
							width: 8,
							backgroundColor: "#E9E9E9",
							startAngle: 1.5,
							endAngle: 0.25,
							gap: 2
						}
					}
				});
			},
			drawPie(id, series) {
				const ctx = uni.createCanvasContext(id, this);
				uChartsInstance[id] = new uCharts({
					type: "pie",
					context: ctx,
					width: uni.upx2px(700),
					height: uni.upx2px(500),
					series: series,
					animation: true,
					background: "#FFFFFF",
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [5, 5, 5, 5],
					legend: {
						show: true,
						position: "right",
						lineHeight: 25
					},
					extra: {
						pie: {
							activeOpacity: 0.5,
							activeRadius: 10,
							offsetAngle: 0,
							labelWidth: 15,
							border: true,
							borderWidth: 3,
							borderColor: "#FFFFFF"
						}
					}
				});
			},
			tapColumn(e, id) {
				let chart = uChartsInstance[id];
				if (!chart) return;

				var index = uChartsInstance[e.target.id].getCurrentDataIndex(e);
				//console.log(index);
				this.indexChangeEx(index.index);
			},
			touchColumn(e, id) {
				let chart = uChartsInstance[id];
				if (!chart) return;
				chart.scrollStart(e);
				// chart.showToolTip(e, {
				// 	format: function(item, category) {
				// 		if (typeof item.data === 'object') {
				// 			return category + ' ' + item.name + ':' + item.data.value
				// 		} else {
				// 			return category + ' ' + item.name + ':' + item.data
				// 		}
				// 	}
				// });
				// chart.touchLegend(e)
				// {
				// }
			},
			moveColumn(e, id) {
				let chart = uChartsInstance[id];
				if (!chart) return;
				chart.scroll(e);
			},
			touchEndColumn(e, id) {
				let chart = uChartsInstance[id];
				if (!chart) return;
				chart.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				// chart.showToolTip(e, {
				// 	format: function (item, category) {
				// 		return category + ' ' + item.name + ':' + item.data 
				// 	}
				// });
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #f9f9f9;
		padding: 20rpx 15rpx;
		color: #4c4c4c;

		.mainTitle {
			background-color: #FFFFFF;
			padding: 20rpx;
			font-size: 30rpx;
			font-weight: bold;
			border-radius: 20rpx;
			display: flex;
			align-items: center;

			.img {
				width: 10rpx;
				height: 30rpx;
				background-color: #85dbd0;
				border-radius: 5rpx;
				margin-right: 20rpx;
			}

		}

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

			.main2 {
				width: 700rpx;
				height: 550rpx;
			}
		}
	}
</style>
