<template>
	<view class="content">

		<view class="list">
			<view class="title">
				<view class="col1">图片</view>
				<view class="col2">商品属性</view>
				<view class="col3">利润</view>
			</view>

			<navigator class="item" v-for="(item, index) in list" :key="index" :url="'../minePackage/details?id=' + item.id">
				<image :src="item.pic" mode="aspectFill" class="img"></image>
				<view class="name">{{item.name}}</view>
				<view class="price">{{ getPrice(item.profit, item.currency) }}</view>
				<image :class="[{'top3' : index < 3}, {'top' : index >= 3}]" :src="'../static/imgs/report/' + (++index) + '.png'" mode="aspectFill"></image>
			</navigator>
			
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
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
					url: this.$baseFileUrl + "/profitTopMsgGet",
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

			.title {
				display: flex;
				justify-content: space-between;
				font-size: 28rpx;
				font-weight: bold;
				padding: 50rpx 0rpx 40rpx;
				border-bottom: 1rpx solid #f9f9f9;

				.col1 {
					width: 96rpx;
					margin-right: 24rpx;
				}

				.col2 {

					flex: 1;
				}

				.col3 {
					flex: 1;
					text-align: right;
				}
			}

			.item {
				display: flex;
				justify-content: space-between;
				font-size: 28rpx;
				align-items: center;
				padding: 24rpx 0 30rpx;
				border-bottom: 1rpx solid #f9f9f9;
				position: relative;
				color: #565656;

				.img {
					width: 96rpx;
					height: 96rpx;
					margin-right: 24rpx;
				}

				.name {
					flex: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.price {
					margin-left: 20rpx;
				}

				.top3 {
					position: absolute;
					top: 18rpx;
					left: 6rpx;
					width: 44rpx;
					height: 54rpx;
				}

				.top {
					position: absolute;
					top: 24rpx;
					left: 6rpx;
					width: 30rpx;
					height: 36rpx;
				}
			}
		}

	}
</style>
