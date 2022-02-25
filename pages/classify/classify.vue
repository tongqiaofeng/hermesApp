<template>
	<view class="classify-container" v-if="isShow">
		<view class="letter-box" :style="{top: isTop ? 0 : topNum + 'px'}">
			<view class="letter-item" v-for="(item, index) in letterList" :key="index"
				:class="{ 'letter-item-active': index == currentIndex }" @click="clickLetter(index)">
				{{ item.name }}
			</view>
		</view>
		<view class="classify-main">
			<view v-if="haveData == 0" class="no-data">
				<image src="../../static/imgs/common/no.png" mode="aspectFill"></image>
				<text style="font-size: 30rpx">暂无数据~</text>
			</view>
			<view v-for="(item, index) in selectLetter" :key="index">
				<view class="main-title">
					<view class="title-left">
						<text class="left-one">{{ item.model }}</text>
						<text class="left-two">{{ "(共" + item.styleNum + "款)" }}</text>
					</view>
					<view class="title-right" @click="modelJump(item.model)">
						<text>查看详情</text>
						<image src="../../static/imgs/classify/right.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="main-container">
					<view v-for="(items, index2) in item.sizeList" :key="index2" class="size-every"
						@click="sizeJump(item.model, items.size)">
						<image class="size-image" :src="imgUrl + '/img' + items.pic" mode="aspectFill"></image>
						<view class="num-circle" :style="{
                'background-color': items.styleNum > 0 ? '#85dbd0' : '#f6f6f6',
                color: items.styleNum > 0 ? '#fff' : '#959595',
              }">
							{{ items.styleNum + "款" }}
						</view>
						<view class="size">
							{{ items.size }}
						</view>
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
				haveData: 1,
				imgUrl: this.$baseUrl,
				height: null,
				letterList: [],
				selectLetter: [],
				currentIndex: 0,

				isOther: 0,
				isTop: false,
				topNum: 0,
				isShow: false
			};
		},
		onLoad() {
			this.getModelSort();
			uni.getSystemInfo({
				success: (data) => {
					// 将其赋值给this
					console.log(data);
					this.topNum = data.windowTop;
				},
			});
		},
		onPullDownRefresh() {
			this.getModelSort();
			uni.stopPullDownRefresh();
		},
		onReady() {
			if (this.hidePageNavInWechatBrowser()) {
				this.isTop = true;
			}
		},
		methods: {
			// 获取款式分类
			getModelSort() {
				uni.showLoading({
					title: "加载中......",
				});
				uni.request({
					url: this.$baseUrl + "/modelSort",
					header: {
						"content-type": "application/json",
					},
					complete: (res) => {
						uni.hideLoading();
						console.log("款式分类");
						console.log(res);
						this.letterList = res.data;
						this.clickLetter(0);
						this.isShow = true;
					},
				});
			},
			// 侧边栏选择
			clickLetter(index) {
				this.currentIndex = index;
				this.selectLetter = this.letterList[this.currentIndex].list;
				console.log(this.selectLetter);
				if (this.selectLetter.length == 0) this.haveData = 0;
				else this.haveData = 1;

				if (this.letterList[this.currentIndex].name == "其他") {
					this.isOther = 1;
				} else {
					this.isOther = 0;
				}
			},
			// 包款跳转
			modelJump(model) {
				if (this.isOther == 1) model = "other";
				uni.navigateTo({
					url: "../../commonPackage/search/search?model=" + encodeURIComponent(JSON.stringify(model)) +
						"&type=0",
				});
			},
			// 尺寸跳转
			sizeJump(model, size) {
				console.log(model);
				console.log(size);
				if (this.isOther == 1) {
					model = size;
					size = "";
				}
				uni.navigateTo({
					url: "../../commonPackage/search/search?model=" +
						encodeURIComponent(JSON.stringify(model)) +
						"&size=" +
						encodeURIComponent(JSON.stringify(size)) + "&type=0",
				});
			},
		},
	};
</script>
/

<style lang="scss" scoped>
	.classify-container {
		width: 100%;
		background-color: #fff;
		display: flex;
		justify-content: space-between;

		.letter-box {
			width: 25vw;
			// height: 100%;
			position: fixed;
			// top: var(--window-top);
			left: 0;
			bottom: var(--window-bottom);
			background-color: #f6f6f6;
			overflow-y: scroll;

			.letter-item {
				height: 84rpx;
				margin: 0 auto;
				line-height: 84rpx;
				text-align: center;
				box-sizing: border-box;
				border-left: 10rpx solid #f6f6f6;
				border-right: 10rpx solid #f6f6f6;
				font-size: 28rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

		.classify-main {
			width: 75vw;
			position: absolute;
			right: 0;
			top: 0;

			.main-title {
				height: 84rpx;
				padding: 0 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.title-left {
					display: flex;
					align-items: center;

					.left-one {
						color: #000;
						font-size: 28rpx;
					}

					.left-two {
						color: #cacaca;
						font-size: 24rpx;
					}
				}

				.title-right {
					display: flex;
					align-items: center;

					text {
						color: #cacaca;
						font-size: 24rpx;
					}

					image {
						width: 32rpx;
						height: 32rpx;
						// padding-top: 2px;
					}
				}
			}

			.main-container {
				padding: 10rpx 30rpx 70rpx;
				margin-bottom: 30rpx;
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;

				.size-every {
					width: 32%;
					margin-bottom: 50rpx;
					position: relative;
					text-align: center;

					.size-image {
						width: 120rpx;
						height: 120rpx;
						margin-bottom: 20rpx;
						border-radius: 50%;
					}

					.num-circle {
						padding: 5rpx 10rpx;
						position: absolute;
						top: 0;
						right: 0;
						border-radius: 30rpx;
						border-bottom-left-radius: 0;
						font-size: 20rpx;
					}

					.size {
						color: #000;
						font-size: 26rpx;
						text-align: center;
					}
				}
			}
		}
	}

	.letter-item-active {
		background-color: #fff;
		border-left: 10rpx solid #85dbd0 !important;
		border-right: 10rpx solid #fff !important;
	}
</style>
