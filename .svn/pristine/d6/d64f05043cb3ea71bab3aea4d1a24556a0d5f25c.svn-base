<template>
	<view class="list">
		
		<navigator class="item" v-for="(item,index) in list" :key="index" :url="'../minePackage/details?id=' + item.id">
			<!-- <image :src="item.pic" mode="aspectFill" class="img"></image> -->
			<easy-loadimage :image-src="item.pic" :scroll-top="scrollTop" width="166rpx" height="166rpx"  mode="aspectFill" class="img"></easy-loadimage>
			<view style="width: 463rpx; height: 166rpx; display: flex; flex-direction: column; justify-content: space-between;">
				<view class="name">{{item.name}}</view>
				<view class="stockNo">货号：{{item.productCode}}</view>
				<view class="time">入库时长：{{getDiffDay(new Date(), item.createTime)}}天</view>
				<view class="time">入库时间：{{item.createTime}}</view>
			</view>
		</navigator>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop:0,
				stockLocId:0,
				list: [],
			}
		},
		async onLoad(e) {
			await this.$onLaunched;
			this.stockLocId = e.stockLocId;
			this.getInfo();
		},
		onReady() {
			this.hidePageNavInWechatBrowser();
		},
		onPageScroll(e){
			this.scrollTop = e.scrollTop;
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
					url: this.$baseFileUrl + "/overStockSearchList?&page=1&pageNum=1000&stockLocId=" + this.stockLocId,
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync("token"),
					},
					success: (res) => {
						uni.hideLoading();
						this.list = res.data.list;
						
						setTimeout(() => {
							this.scrollTop ++;
						}, 500) 
					},
					fail: (err) => {
						uni.hideLoading();
					},
				});
			},
			getDiffDay(date_1, date_2) {
			  // 计算两个日期之间的差值
			  let totalDays,diffDate
			  let myDate_1 = Date.parse(date_1)
			  let myDate_2 = Date.parse(date_2)
			  // 将两个日期都转换为毫秒格式，然后做差
			  diffDate = Math.abs(myDate_1 - myDate_2) // 取相差毫秒数的绝对值
			 
			  totalDays = Math.floor(diffDate / (1000 * 3600 * 24)) // 向下取整
			  // console.log(totalDays)    
			 
			  return totalDays    // 相差的天数
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list{
		background-color: #f9f9f9;
		padding: 30rpx;
		min-height: 100vh;
		
		.item{
			display: flex;
			background-color: #FFFFFF;
			align-items: center;
			padding: 20rpx;
			border-radius: 16rpx;
			margin-bottom: 20rpx;
			
			.img{
				width: 166rpx;
				height: 166rpx;
				margin-right: 20rpx;
			}
			
			
			.name{
				font-size: 28rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			
			.stockNo{
				font-size: 26rpx;
				color: #999999;
			}
			
			.time{
				font-size: 22rpx;
				color: #999999;
			}
			
		}
	}
	
</style>
