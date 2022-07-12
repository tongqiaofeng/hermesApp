<template>
	<view class="list">
		<view :class="['item', {'select': index == 0}]" v-for="(item,index) in list" :key="index">
			<view class="title">{{item.stockLocName}}</view>
			<view style="display: flex; justify-content: space-between;">
				
				<view class="value rightBorder">
					<view style="display: flex; align-items: center;">
						<image class="img" src="../static/imgs/report/num.png" mode="aspectFit"></image>
						<view class="text">库存数量</view>
					</view>
					<view class="num">{{item.stockNum}}</view>
				</view>
				
				<view class="value rightBorder">
					<view style="display: flex; align-items: center;">
						<image class="img" src="../static/imgs/report/price.png" mode="aspectFit"></image>
						<view class="text">金额统计</view>
					</view>
					<view class="num">{{getPrice(item.amount, '', '-', 0)}}</view>
				</view>
				
				<navigator class="value" :url="item.overstockNum == 0 || index == 0 ? '' : './stockList?stockLocId='+ item.stockLocId">
					<view style="display: flex; align-items: center;">
						<image class="img" src="../static/imgs/report/stock.png" mode="aspectFit"></image>
						<view class="text">积压数量</view>
					</view>
					<view class="num" style="color: #f9b004;">{{item.overstockNum == 0 ? '-' : item.overstockNum}}</view>
				</navigator>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				currency: getApp().globalData.userInfo.currency,
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
				uni.request({
					url: this.$baseFileUrl + "/overStockGoodsCensus",
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync("token"),
					},
					success: (res) => {
						uni.hideLoading();
						this.list = res.data;
						
						let all = {stockLocId: 0, stockLocName: "全部", amount: 0, stockNum: 0, overstockNum: 0};
						for(let i = 0; i < this.list.length; ++i){
							all.amount += this.list[i].amount;
							all.stockNum += this.list[i].stockNum;
							all.overstockNum += this.list[i].overstockNum;
						}
						if(this.list.length > 0){
							this.list.unshift(all);
						}
					},
					fail: (err) => {
						uni.hideLoading();
					},
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list{
		background-color: #f9f9f9;
		min-height: 100vh;
		padding: 24rpx 0;
		
		.select{
			border: 4rpx solid #85dbd0;
			text-align: center;
		}
		
		.item{
			color: #666666;
			background-color: #FFFFFF;
			
			padding:30rpx 32rpx;
			margin: 0rpx 24rpx 20rpx 24rpx;
			border-radius: 16rpx;
			
			.title{
				font-size: 28rpx;
				font-weight: bold;
			}
			
			.value{
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-top: 35rpx;
				
				.img{
					width: 28rpx;
					height: 28rpx;
					margin-right: 10rpx;
				}
				
				.text{
					font-size: 24rpx;
					margin-bottom: 2rpx;
				}
				
				.num{
					font-size: 30rpx;
					margin-top: 40rpx;
					font-weight: bold;
				}
			}
			
			.rightBorder{
				border-right: 1rpx solid #f9f9f9;
			}
			
			
			
			
		}
	}
	
</style>
