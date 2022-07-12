<template>
	<view class="details-container">
		<view v-if="detail.id">
			<view class="mainPrice">
				<view v-if="userType == 1 || userType == 0" class="priceItem">
					<view class="currency">HKD</view>
					<view class="price">{{formatNumberRgx(detail.totalHkPrice)}}</view>
				</view>
				<view v-if="userType == 2" class="priceItem">
					<view class="currency">{{detail.currency}}</view>
					<view class="price">{{formatNumberRgx(detail.money)}}</view>
				</view>
			</view>
			
			<view class="product-parameter">
				<view class="parameter">账单详情</view>
				<view class="parameter-line"></view>
				<view class="parameter-every">
					<text>账单日期</text>
					<text>{{getShowValue(detail.time)}}</text>
				</view>
				<view v-if="detail.money > 0 && userType == 1" class="parameter-every">
					<text>外币金额</text>
					<text>{{detail.money == 0 ? '' : detail.currency}} {{getShowValue(formatNumberRgx(detail.money))}}</text>
				</view>
				<view v-if="detail.money > 0 && userType == 2" class="parameter-every">
					<text>港币金额</text>
					<text>{{detail.totalHkPrice == 0 ? '' : 'HKD'}} {{getShowValue(formatNumberRgx(detail.totalHkPrice))}}</text>
				</view>
				<view v-if="detail.totalToHkRate" class="parameter-every">
					<text>汇率</text>
					<text>{{getShowValue(detail.totalToHkRate)}}</text>
				</view>
				<view v-if="detail.receiveType" class="parameter-every">
					<text>交易方式</text>
					<text>{{getShowValue(detail.receiveType)}}</text>
				</view>
				
				<view  v-if="detail.remark" class="parameter-every">
					<text style="width: 200rpx;">备注</text>
					<text style="flex: 1; text-align: right;">{{getShowValue(detail.remark)}}</text>
				</view>
				
				<view v-if="detail.stockList.length == 0 && detail.productDes != ''" class="parameter-every">
					<text style="width: 200rpx;">产品描述</text>
					<text style="flex: 1; text-align: right;">{{getShowValue(detail.productDes)}}</text>
				</view>
				
			</view>
			
			<view v-if="detail.stockList.length > 0" class="product-parameter" style="padding-bottom: 160rpx">
				<view class="parameter">产品列表</view>
				<view class="parameter-line"></view>
			
				<view class="parameter-every" style="color: #323232;">
					<text style="flex: 1;">货号</text>
					<text style="flex: 1; text-align: center;">外币</text>
					<text style="flex: 1; text-align: right;">港币</text>
				</view>
				
				<view class="parameter-line"></view>
			
				<view v-for="(bag, index) in detail.stockList" :key="index" class="parameter-every">
					<text style="flex: 1;">{{bag.productCode}}</text>
					<text style="flex: 1; text-align: center;">{{bag.money == 0 ? '' : detail.currency}} {{getShowValue(formatNumberRgx(bag.money))}}</text>
					<text style="flex: 1; text-align: right;">{{bag.totalHkPrice == 0 ? '' : 'HKD'}}  {{getShowValue(formatNumberRgx(bag.totalHkPrice))}}</text>
				</view>
				
				<view class="parameter-line"></view>
				
				<view class="parameter-every">
					<text style="width: 200rpx;">产品描述</text>
					<text style="flex: 1; text-align: right;">{{getShowValue(detail.productDes)}}</text>
				</view>
				
			</view>
		</view>
		
	</view>
</template>

<script>
	// import comment from "./comment.vue";
	export default {
		data() {
			return {
				token: uni.getStorageSync("token"),
				myUserId: uni.getStorageSync("userId"),
				userType:0,
				detailId:0,
				detail:{}
			};
		},
		// components: {
		// 	comment,
		// },
		onLoad(option) {
			this.userType = option.ut;
			this.detailId = option.id;
			this.getDetails(option.id);
		},
		onReady() {
			this.hidePageNavInWechatBrowser();
		},
		onPullDownRefresh() {
			uni.showLoading({
				title: "正在刷新",
			});
			this.getDetails(this.detailId);
			uni.stopPullDownRefresh();
		},
		// 分享好友
		methods: {
			// 获取商品详情
			getDetails(id) {
				uni.showLoading({
					title: "加载中......",
				});
				uni.request({
					url: this.$baseFileUrl + "/billInfo?id=" + id,
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync("token"),
					},
					success: (res) => {
						uni.hideLoading();
						this.detail = res.data;

						uni.setNavigationBarTitle({
							title: this.getTradeType(),
						});

						
					},
					fail: (err) => {
						uni.hideLoading();
						console.log(err);
					},
				});
			},
			getTradeType() {
				let gs = '';
				if(false) gs = 'TopTime';
				
			
				switch(this.detail.tradeType){
					case 0: return gs+'买入'; break;
					case 1: return gs+'卖出'; break;
					case 2: {
						/* if(this.detail.personId == this.myUserId)
							return '我向' + this.detail.payeeName + '转账';
						else if(this.detail.payeeId == this.myUserId)
							return this.personName + '向我转账';
						else */
							return this.detail.personName + '向' + this.detail.payeeName + '转账';
							
						return;
					}
					case 3: return '买入退款'; break;
					case 4: return '卖出退款'; break;
					case 5: return '其他收入'; break;
					case 6: return '其他支出'; break;
					default: return '/';	break;
				}
			},
			getShowValue(value){
				if(value == null || value == ''){
					return '/';
				}
				else{
					return value;
				}
			}
		},
	};
</script>

<style lang="scss" scoped>
	.details-container {
		//background-color: #f9f9f9;
		
		.mainPrice{
			height: 350rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			
			.priceItem{
				margin-top: 26rpx;
				display: flex;
				align-items: flex-end;
				
				.currency{
					font-size: 28rpx;
					margin: 0rpx 10rpx 10rpx 0rpx;
					color: #555555;
				}
				.price{
					font-size: 50rpx;
				}
			}
		}


		.product-parameter {
			margin-top: 20rpx;
			padding: 30rpx 40rpx;
			background-color: #fff;
			text-align: left;

			.parameter {
				font-size: 26rpx;
				font-weight: bold;
				color: #303030;
			}

			.parameter-line {
				height: 4rpx;
				margin-top: 30rpx;
				background-color: #f9f9f9;
				border-radius: 5px;
			}

			.parameter-every {
				margin-top: 40rpx;
				display: flex;
				justify-content: space-between;
				font-size: 28rpx;
				color: #c3c3c3;
			}
		}

		.product-comment {
			margin-top: 20rpx;
			padding-bottom: 160rpx;
			background-color: #fff;
		}
	}
</style>
