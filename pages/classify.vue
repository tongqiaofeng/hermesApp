<template>
	<view class="content">
		<view id="tab">
			<view class="tab">
				<view class="main-every" @click="classifySel(0)" :style="{
			      backgroundColor: isSel == 0 ? '#fff' : '#E8FBF9',
			      color: isSel == 0 ? '#000' : '#5AAFA4',
			    }">
					腕 表
				</view>
				<view class="line"></view>
				<view class="main-every" @click="classifySel(1)" :style="{
			      backgroundColor: isSel == 1 ? '#fff' : '#E8FBF9',
			      color: isSel == 1 ? '#000' : '#5AAFA4',
			    }">
					爱马仕
				</view>
				<view class="line"></view>
				<view class="main-every" @click="classifySel(2)" :style="{
			      backgroundColor: isSel == 2 ? '#fff' : '#E8FBF9',
			      color: isSel == 2 ? '#000' : '#5AAFA4',
			    }">
					珠 宝
				</view>
			</view>
		</view>


		<view v-if="isSel == 0" class="main" :style="{'height': height + 'px' }">
			<scroll-view scroll-y="true" class="leftScroll">
				<view class="letter-item" v-for="(item, index) in watchList" :key="index"
					:class="{ 'letter-item-active': index == curWatchIdx }" @click="clickWatch(index)">
					{{ item.brandName }}
				</view>
			</scroll-view>

			<scroll-view scroll-y="true" class="rightScroll" :scroll-top="scrollTop" @scroll="scrollToTop">
				<view v-if="watchList.length == 0" class="no-data">
					<image src="../static/imgs/common/no.png" mode="aspectFill"></image>
					<text style="font-size: 30rpx">暂无数据~</text>
				</view>
				<view v-else>
					<view class="main-title">
						<view class="title-left">
							<text class="left-one">{{ watchList[curWatchIdx].brandName }}</text>
							<text class="left-two">{{ "(共" +  watchList[curWatchIdx].styleNum + "枚)" }}</text>
						</view>
						<view class="title-right" @click="gotoWatchSearch(watchList[curWatchIdx].brandName, '')">
							<text>查看详情</text>
							<image src="../static/imgs/classify/right.png" mode="aspectFill"></image>
						</view>
					</view>
					<view class="main-container">
						<view v-for="(item, index2) in selectWatch" :key="index2" class="size-every"
							@click="gotoWatchSearch(watchList[curWatchIdx].brandName, item.seriesName)">
							<image class="size-image" :src="watchImgUrl  + item.pic.replace('\\', '/')"
								mode="aspectFill"></image>
							<view class="num-circle" :style="{
				          'background-color':
				            item.num > 0 ? '#85dbd0' : '#f6f6f6',
				          color: item.num > 0 ? '#fff' : '#959595',
				        }">
								{{ item.num + "枚" }}
							</view>
							<view class="size">
								{{ item.seriesName }}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>

		<view v-if="isSel == 1" class="main" :style="{'height': height + 'px' }">
			<scroll-view scroll-y="true" class="leftScroll">
				<view class="letter-item" v-for="(item, index) in letterList" :key="index"
					:class="{ 'letter-item-active': index == currentIndex }" @click="clickLetter(index)">
					{{ item.name }}
				</view>
			</scroll-view>

			<scroll-view scroll-y="true" class="rightScroll" :scroll-top="scrollTop" @scroll="scrollToTop">
				<view v-if="haveData == 0" class="no-data">
					<image src="../static/imgs/common/no.png" mode="aspectFill"></image>
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
							<image src="../static/imgs/classify/right.png" mode="aspectFill"></image>
						</view>
					</view>
					<view class="main-container">
						<view v-for="(items, index2) in item.sizeList" :key="index2" class="size-every"
							@click="sizeJump(item.model, items.size)">
							<image class="size-image" :src="imgUrl + '/img' + items.pic" mode="aspectFill"></image>
							<view class="num-circle" :style="{
				          'background-color':
				            items.styleNum > 0 ? '#85dbd0' : '#f6f6f6',
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
			</scroll-view>
		</view>

		<view v-if="isSel == 2" class="main" :style="{'height': height + 'px' }">
			<scroll-view scroll-y="true">
				<!-- 珠宝分类 -->
				<view class="jewelry-main">
					<view class="container-main-big" v-if="jewelleryModelList01.length > 0">
						<view class="big-every" :style="{
				        'background-image': 'url(' + imgUrl + '/img' + item.pic + ')',
				        'background-size': '100% 100%',
				      }" v-for="(item, index) in jewelleryModelList01" :key="index" @click="goSearch(item.name)">
							<view class="title">{{ item.name }}</view>
						</view>
					</view>
					<view class="jewelry-font">
						<view class="line"></view>
						<view class="font"> 更多分类 </view>
						<view class="line"></view>
					</view>
					<view class="container-main-small" v-if="jewelleryModelList02.length > 0">
						<view class="small-every" :style="{
				        'background-image': 'url(' + imgUrl + '/img' + item.pic + ')',
				        'background-size': '100% 100%',
				      }" v-for="(item, index) in jewelleryModelList02" :key="index" @click="goSearch(item.name)">
							<view class="title">{{ item.name }}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				haveData: 1,
				imgUrl: this.$baseUrl + "/wechat/api",
				watchImgUrl: this.$baseUrl + "/watch/api",
				height: 400,
				letterList: [],
				selectLetter: [],
				currentIndex: 0,
				watchList: [],
				selectWatch: [],
				curWatchIdx: 0,

				isOther: 0,
				topNum: 0,
				isShow: false,
				isSel: 0,

				scrollTop: 0,
				old: {
					scrollTop: 0,
				},

				jewelleryModelList01: [],
				jewelleryModelList02: [],
			};
		},
		onLoad() {
			this.getWatchSort();
			this.getModelSort();
			this.getJewelryClassify();
			uni.getSystemInfo({
				success: (data) => {
					// 将其赋值给this
					console.log("距离", data);
					this.topNum = data.windowTop + 64;
				},
			});
		},
		onShow() {
			if (getApp().globalData.g_chat)
				getApp().globalData.g_chat.updateReddot();
			let type = getApp().globalData.pageInItem;
			getApp().globalData.pageInItem = '';
		},
		onPullDownRefresh() {
			this.getWatchSort();
			this.getModelSort();
			this.getJewelryClassify();
			uni.stopPullDownRefresh();
		},
		onReady() {
			this.hidePageNavInWechatBrowser();

			const query = uni.createSelectorQuery().in(this);
			query.select('#tab').boundingClientRect(data => {
				this.height = uni.getSystemInfoSync().windowHeight - data.height - 1;
			}).exec();
		},
		methods: {
			getImgUrl(url) {
				return url.replace("%0", "/");
			},
			scrollToTop(e) {
				this.old.scrollTop = e.detail.scrollTop;
			},
			goTop() {
				this.scrollTop = this.old.scrollTop;
				this.$nextTick(() => {
					this.scrollTop = 0;
				});
			},
			// 选择查看分类
			classifySel(val) {
				this.isSel = val;
			},
			// 获取款式分类
			getModelSort() {
				uni.showLoading({
					title: "加载中......",
				});
				uni.request({
					url: this.$baseUrl + "/wechat/api/modelSort",
					header: {
						"content-type": "application/json",
					},
					complete: (res) => {
						uni.hideLoading();
						console.log("款式分类");
						console.log(res);
						this.letterList = res.data;
						this.clickLetter(0);
					},
				});
			},
			getWatchSort() {
				uni.showLoading({
					title: "加载中......",
				});
				uni.request({
					url: this.$baseUrl + "/watch/api/watchSort",
					header: {
						"content-type": "application/json",
					},
					complete: (res) => {
						uni.hideLoading();
						this.watchList = res.data;
						this.clickWatch(0);
						this.isShow = true;
					},
				});
			},
			// 侧边栏选择
			clickLetter(index) {
				this.goTop();
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
					url: "../comm/search?model=" +
						encodeURIComponent(JSON.stringify(model)) +
						"&type=爱马仕",
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
					url: "../comm/search?model=" +
						encodeURIComponent(JSON.stringify(model)) +
						"&size=" +
						encodeURIComponent(JSON.stringify(size)) +
						"&type=爱马仕",
				});
			},
			// 侧边栏选择
			clickWatch(index) {
				this.goTop();
				this.curWatchIdx = index;
				this.selectWatch = this.watchList[this.curWatchIdx].seriesList;
				if (this.selectWatch.length == 0) this.haveData = 0;
				else this.haveData = 1;
			},
			gotoWatchSearch(brand, series) {
				uni.navigateTo({
					url: "../comm/search?brand=" +
						encodeURIComponent(JSON.stringify(brand)) +
						"&series=" +
						encodeURIComponent(JSON.stringify(series)) +
						"&type=腕表",
				});
			},
			// 查询页
			goSearch(name) {
				uni.navigateTo({
					url: "../comm/search?tag=" + name + "&type=珠宝",
				});
			},
			// 英语
			englishSel(name) {
				switch (name) {
					case "戒指":
						return "Ring";
						break;
					case "项链":
						return "Necklace";
						break;
					case "耳环":
						return "Earring";
						break;
					case "胸针":
						return "Brooch";
						break;
					case "钻石":
						return "Diamond";
						break;
					case "祖母绿":
						return "Emerald";
						break;
					case "红宝石":
						return "Ruby";
						break;
					case "蓝宝石":
						return "Sapphire";
						break;
					case "坦桑石":
						return "Tanzanite";
						break;
					case "海蓝宝":
						return "Aquamarine";
						break;
					case "珍珠":
						return "Pearl";
						break;
					case "其他":
						return "Other";
						break;
					default:
						return "";
						break;
				}
			},
			// 获取珠宝成品分类列表
			getJewelryClassify() {
				uni.showLoading({
					title: "加载中...",
				});
				uni.request({
					url: this.$baseUrl + "/jewellery/api/jewelleryModelSort",
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync("token"),
					},
					complete: (res) => {
						console.log("珠宝分类");
						console.log(res);
						uni.hideLoading();
						let list = res.data;
						this.jewelleryModelList01 = list.slice(0, 4);
						this.jewelleryModelList02 = list.slice(4, 12);
						this.isShow = true;
					},
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		display: flex;
		flex-direction: column;

		.tab {
			margin: 20rpx;
			padding: 6rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #e8fbf9;
			border-radius: 30rpx;

			.main-every {
				padding: 14rpx 45rpx;
				font-size: 30rpx;
				font-weight: bold;
				border-radius: 26rpx;
			}

			.line {
				width: 2rpx;
				height: 40rpx;
				background-color: #d5f0ed;
			}
		}

		.main {
			display: flex;
			background-color: #f5fcfb;

			.leftScroll {
				width: 25vw;
				margin-top: 20rpx;

				.letter-item {
					margin: 0 auto;
					margin-bottom: 41rpx;
					text-align: center;
					box-sizing: border-box;
					border-left: 10rpx solid #f5fcfb;
					font-size: 24rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			.rightScroll {
				flex: 1;
				margin-top: 20rpx;
				background-color: #fff;

				.main-title {
					padding: 30rpx 20rpx;
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
						}
					}
				}

				.main-container {
			  padding: 10rpx 30rpx 0;
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

			.jewelry-main {
				padding: 16rpx 20rpx 10rpx;
				background-color: #fff;
				border-radius: 5rpx;

				.container-main-big {
					// display: flex;
					// justify-content: space-around;
					// flex-wrap: wrap;
					display: grid;
					justify-content: space-around;
					grid-template-columns: repeat(auto-fill, 320rpx);
					grid-gap: 20rpx;

					.big-every {
						height: 308rpx;
						border-radius: 15rpx;
						text-align: center;
						position: relative;

						.title {
							margin-top: 30rpx;
							position: absolute;
							left: 24rpx;
							bottom: 24rpx;
							font-size: 30rpx;
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

				.jewelry-font {
					margin: 29rpx 0;
					display: flex;
					justify-content: center;
					align-items: center;

					.line {
						width: 168rpx;
						height: 2rpx;
						background-color: #dee3e2;
					}

					.font {
		 			margin: 0 17rpx;
						font-size: 30rpx;
						font-weight: bold;
					}
				}

				.container-main-small {
					// display: flex;
					// justify-content: space-around;
					// flex-wrap: wrap;
					display: grid;
					justify-content: space-around;
					grid-template-columns: repeat(auto-fill, 149rpx);
					grid-gap: 22rpx;

					.small-every {
						height: 162rpx;
						border-radius: 10rpx;
						text-align: center;
						position: relative;

						.title {
							position: absolute;
							left: 6.5rpx;
							bottom: 8rpx;
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
		}
	}

	.letter-item-active {
		font-size: 28rpx !important;
		font-weight: bold;
		border-left: 6rpx solid #85dbd0 !important;
	}
</style>
