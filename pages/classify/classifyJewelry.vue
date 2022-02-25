<template>
	<view class="classify-jewelry-container" v-if="isShow">
		<!-- 珠宝分类 -->
		<view class="container-main-big" v-if="jewelleryModelList01.length > 0">
			<view class="big-every"
				:style="{'background-image': 'url(' + imgUrl + '/img' + item.pic + ')','background-size': '100% 100%'}"
				v-for="(item,index) in jewelleryModelList01" :key="index" @click="goSearch(item.name)">
				<view class="title">{{item.name}}</view>
				<view class="title-eng">{{englishSel(item.name)}}</view>
				<!-- <view class="num">{{item.num}}</view> -->
			</view>
		</view>
		<view class="container-main-small" v-if="jewelleryModelList02.length > 0">
			<view class="small-every"
				:style="{'background-image': 'url(' + imgUrl + '/img' + item.pic + ')','background-size': '100% 100%'}"
				v-for="(item,index) in jewelleryModelList02" :key="index" @click="goSearch(item.name)">
				<view class="title">{{item.name}}</view>
				<view class="title-eng">{{englishSel(item.name)}}</view>
				<!-- <view class="num">{{item.num}}</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: this.$baseUrl,
				jewelleryModelList01: [],
				jewelleryModelList02: [],
				isShow: false,
			}
		},
		onLoad() {
			this.getJewelryClassify();
		},
		onReady() {
			this.hidePageNavInWechatBrowser();
		},
		methods: {
			// 查询页
			goSearch(name){
				uni.navigateTo({
					url: "../../commonPackage/search/search?tag=" + name + "&type=1",
				})
			},
			// 英语
			englishSel(name) {
				switch (name) {
					case '戒指':
						return 'Ring';
						break;
					case '项链':
						return 'Necklace';
						break;
					case '耳环':
						return 'Earring';
						break;
					case '胸针':
						return 'Brooch';
						break;
					case '钻石':
						return 'Diamond';
						break;
					case '祖母绿':
						return 'Emerald';
						break;
					case '红宝石':
						return 'Ruby';
						break;
					case '蓝宝石':
						return 'Sapphire';
						break;
					case '坦桑石':
						return 'Tanzanite';
						break;
					case '海蓝宝':
						return 'Aquamarine';
						break;
					case '珍珠':
						return 'Pearl';
						break;
					case '其他':
						return 'Other';
						break;
					default:
						return "";
						break;
				}
			},
			// 获取珠宝成品分类列表
			getJewelryClassify() {
				uni.showLoading({
					title: '加载中...'
				})
				uni.request({
					url: this.$baseJewelleryUrl + '/jewelleryModelSort',
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync("token"),
					},
					complete: (res) => {
						console.log('珠宝分类');
						console.log(res);
						uni.hideLoading();
						let list = res.data;
						this.jewelleryModelList01 = list.slice(0, 4);
						this.jewelleryModelList02 = list.slice(4, 12);
						this.isShow = true;
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.classify-jewelry-container {
		// min-height: 100vh;
		padding: 40rpx;
		background-color: #f9f9f9;

		.container-main-big {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.big-every {
				width: 320rpx;
				height: 360rpx;
				margin-bottom: 30rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				border-radius: 30rpx;
				text-align: center;

				.title {
					margin-top: 30rpx;
					font-size: 36rpx;
					color: #fff;
				}

				.title-eng {
					margin-top: 5rpx;
					font-size: 28rpx;
					color: #d6d6d6;
				}

				.num {
					margin-top: 20rpx;
					font-size: 28rpx;
					color: #fff;
				}
			}
		}

		.container-main-small {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.small-every {
				width: 152rpx;
				height: 152rpx;
				// margin-right: 20rpx;
				margin-bottom: 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				border-radius: 15rpx;
				text-align: center;

				.title {
					font-size: 26rpx;
					color: #fff;
				}

				.title-eng {
					margin-top: 3rpx;
					font-size: 20rpx;
					color: #d6d6d6;
				}

				.num {
					margin-top: 10rpx;
					font-size: 20rpx;
					color: #fff;
				}
			}
		}
	}
</style>
