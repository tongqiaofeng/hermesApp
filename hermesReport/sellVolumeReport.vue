<template>
	<view class="content">

		<view class="list">
			
			<view class="select">
				<view :class="['item', {'noneSel':index > curSel}]" v-for="(item, index) in selValue" :key="index" @click="selectChange(index)">
					<view >{{item}}</view>
				</view>
			</view>
			
			<view class="title">
				<view class="col1">图片</view>
				<view class="col2">商品属性</view>
				<view class="col3">销量</view>
			</view>
			
			<view class="item" v-for="(item, index) in list" :key="index">
				<image :src="item.pic" mode="aspectFill" class="img"></image>
				<view class="name">{{getShowName(item)}}</view>
				<view class="price">{{item.salesVolumes}}</view>
				<image :class="[{'top3' : index < 3}, {'top' : index >= 3}]" :src="'../static/imgs/report/' + (++index) + '.png'" mode="aspectFill"></image>
			</view>
				
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				selValue:['包款', '大小', '材质', '金属', '颜色'],
				curSel:4
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
			selectChange(sel){
				this.curSel = sel;
				this.getInfo();
			},
			// 获取商品详情
			getInfo() {
				uni.showLoading({
					title: "加载中...",
				});
				uni.request({
					url: this.$baseFileUrl + "/salesVolumesTopMsgGet?flag=" + this.curSel,
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync("token"),
					},
					success: (res) => {
						uni.hideLoading();
						this.list = res.data;
					},
					fail: (err) => {
						uni.hideLoading();
					},
				});
			},
			getShowName(item){
				switch(this.curSel){
					case 0:
					return item.model;
					break;
					
					case 1:
					return item.model + ' ' + item.size;
					break;
					
					case 2:
					return item.model + ' ' + item.size + ' ' + item.leather;
					break;
					
					case 3:
					return item.model + ' ' + item.size + ' ' + item.leather + ' ' + item.metal;
					break;
					
					case 4:
					return item.model + ' ' + item.size + ' ' + item.leather + ' ' + item.metal + ' ' + item.color;
					break;
					
					default:
					return '--';
					break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background: url(../static/imgs/report/profitBk.png) no-repeat;
		background-size: 750rpx 504rpx;
		padding-top: 310rpx;
		padding-bottom: 40rpx;
		background-color: #85dbd0;

		.list {
			margin: 0 24rpx;
			padding: 0rpx 30rpx 30rpx 20rpx;
			background-color: #FFFFFF;
			border-radius: 30rpx;
			
			.select{
				display: flex;
				justify-content: space-between;
				padding: 50rpx 0rpx 10rpx;
				
				.item{
					background-color: #85dbd0;
					border-radius: 20rpx;
					font-size: 24rpx;
					color: #FFFFFF;
					padding: 12rpx 22rpx;
					
					
				}
				
				.noneSel{
					background-color: #efefef;
					color: #999999;
				}
			}

			.title {
				display: flex;
				justify-content: space-between;
				font-size: 28rpx;
				font-weight: bold;
				padding: 50rpx 0rpx 40rpx;
				border-bottom: 1rpx solid #f9f9f9;
				
				.col1{
					width: 96rpx;
					margin-right: 24rpx;
				}
				.col2{
					
					flex: 1;
				}
				.col3{
					flex: 1;
					text-align: right;
				}
			}
			
			.item{
				display: flex;
				justify-content: space-between;
				font-size: 28rpx;
				align-items: center;
				padding: 24rpx 0 30rpx;
				border-bottom: 1rpx solid #f9f9f9;
				position: relative;
				
				.img{
					width: 96rpx;
					height: 96rpx;
					margin-right: 24rpx;
					background-color: #007AFF;
				}
				
				.name{
					flex: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				
				.price{
					margin-left: 40rpx;
					color: #f9b004;
					font-size: 40rpx;
				}
				
				.top3{
					position: absolute; 
					top:18rpx; 
					left: 6rpx; 
					width: 44rpx; 
					height: 54rpx;
				}
				
				.top{
					position: absolute;
					top:24rpx; 
					left: 6rpx; 
					width: 30rpx; 
					height: 36rpx;
				}
			}
		}

	}
</style>
