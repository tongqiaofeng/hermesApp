<template>
	<view class="index-container" v-if="isShow">
		<view class="index-slogan">
			<view style="font-size: 48rpx;">{{indexTitle}}</view>
			<view class="slogan-detail">{{ slogan }}</view>
		</view>
		<view class="index-top">
			<navigator url="../../commonPackage/search/search" hover-class="none">
				<view class="index-top-input"> 搜索商品 </view>
			</navigator>
		</view>
		<view class="index-type">
			<view class="type-every" v-for="(item, index) in modelList" :key="index" @click="modelCheck(item.model)">
				<view class="type-image">
					<image v-if="item.pic" :src="imgUrl + '/img' + item.pic" mode="aspectFill"></image>
				</view>
				<view class="type-name">
					{{ item.model }}
				</view>
			</view>
		</view>
		<view class="index-type" style="padding-top: 0;">
			<view class="type-every" v-for="(item, index) in tagList" :key="index" @click="labelCheck(item.name)">
				<view class="type-image" style="width: 100rpx;height: 100rpx;padding: 0;">
					<image v-if="item.pic" :src="imgUrl + '/img' + item.pic" mode="aspectFill"></image>
				</view>
				<view class="type-name">
					{{ item.name }}
				</view>
			</view>
		</view>
		<view v-if="haveData == 0" class="no-data">
			<image src="../../static/imgs/common/no.png" mode="aspectFill"></image>
			<text style="font-size: 30rpx">暂无数据~</text>
		</view>
		<view v-else class="index-main">
			<view class="main-every" v-for="(item, index) in bagOrJewelleryList" :key="index"
				@click="checkDetails(item)">
				<view class="every-image" v-if="item.type == 0">
					<image v-if="item.img" :src="item.img.trim()" mode="aspectFill"></image>
				</view>
				<view class="every-image" v-if="item.type == 1">
					<image v-if="item.img" :src="labelImgUrl + '/file/small/' + item.img.trim()" mode="aspectFill">
					</image>
				</view>
				<view class="every-main">
					<view class="main-model">{{ item.name }}</view>
					<view class="main-price" v-if="item.adviseSellPrice != 0"><text
							style="font-size: 22rpx">{{ item.currency }}</text>{{ " " + formatNumberRgx(item.adviseSellPrice) }}
					</view>
					<view class="main-price"	style="font-size: 24rpx" v-else>价格请咨询客服</view>
				</view>
			</view>
		</view>
		<view class="downloadApp" v-if="isMobile" @click="downloadApk">
			<image class="downloadApp-img" src="../../static/imgs/common/logo.png" mode="aspectFill"></image>
			<view class="downloadApp-font"> 下载APP </view>
			<navigator url="../../commonPackage/openWechat" hover-class="none" v-if="isWechat">
				<view class="downloadApp-font" style="margin-top: 20rpx;"> 打开小程序 </view>
			</navigator>
		</view>
		<view class="jump" v-if="isJump == 1" @click="cancelJump">
			<image src="../../static/imgs/common/jump.png" mode="aspectFill"></image>
			<view class="jump-top">
				<text style="margin-right: 5px">点击右上方的</text>
				<view class="jump-circle"></view>
				<view class="jump-circle"></view>
				<view class="jump-circle"></view>
				<text style="margin-left: 5px">按钮</text>
			</view>
			<view class="jump-bottom"> 选择在浏览器中打开 </view>
		</view>
		<view class="downloadSel" v-if="isJump == 2">
			<!-- <view class="sel-top">
				<image src="../../static/imgs/index/er.jpg" mode="aspectFill"></image>
				<view class="top-font"> 小程序：TopTime优选 </view>
			</view> --> 
			<view class="sel-bottom">
				<image src="../../static/imgs/index/iphone.png" mode="aspectFill"></image>
				<image src="../../static/imgs/index/android.png" mode="aspectFill"></image>
				<text @click="downloadClick">点击下载APP</text>
			</view>
			<view class="sel-close">
				<image src="../../static/imgs/index/close.png" mode="aspectFill" @click="cancelJump"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				haveData: 1,
				isShow: false,
				imgUrl: this.$baseUrl,
				labelImgUrl: this.$baseJewelleryUrl,
				page: 1,
				bagOrJewelleryList: [],
				modelList: [],
				tagList: [],
				haveMore: 0,

				slogan: "",
				indexTitle: "",
				//设置默认的分享参数
				share: {
					title: "PAULIANA 宝莉安娜高级珠宝",
					path: "/pages/index/index",
					imageUrl: "",
					desc: "",
					content: "",
				},
				isMobile: false,
				isWechat: false,
				isJump: 0,
			};
		},
		onShow() {
			if (window) {
				console.log("平台");
				this.isMobile = true;
				let ua = window.navigator.userAgent.toLowerCase();
				if (
					ua.match(/MicroMessenger/i) == "micromessenger" ||
					ua.match(/_SQ_/i) == "_sq_"
				) {
					this.isWechat = true;
				} else {
					this.isWechat = true;
				}
			} else {
				this.isMobile = false;
			}
		},
		// onShow
		onLoad() {
			this.getList();
		},
		onPullDownRefresh() {
			this.page = 1;
			this.bagOrJewelleryList = [];
			this.haveMore = 0;
			this.getList();
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			if (this.haveMore == 0) {
				this.page++;
				this.getList();
			}
		},
		onReady() {
			this.hidePageNavInWechatBrowser();
		},
		// 分享好友
		onShareAppMessage(res) {
			return {
				title: this.share.title,
				path: this.share.path,
				imageUrl: this.share.imageUrl,
				desc: this.share.desc,
				content: this.share.content,
				success: (res) => {
					uni.showToast({
						title: "分享成功",
						icon: "none",
					});
				},
				fail: (res) => {
					uni.showToast({
						title: "分享失败",
						icon: "none",
					});
				},
			};
		},
		// 分享朋友圈
		onShareTimeline(res) {
			return {
				title: this.share.title,
				path: this.share.path,
				imageUrl: this.share.imageUrl,
				desc: this.share.desc,
				content: this.share.content,
				success: (res) => {
					uni.showToast({
						title: "分享成功",
						icon: "none",
					});
				},
				fail: (res) => {
					uni.showToast({
						title: "分享失败",
						icon: "none",
					});
				},
			};
		},
		methods: {
			// 点击下载
			downloadApk() {
				let ua = window.navigator.userAgent.toLowerCase();
				if (
					ua.match(/MicroMessenger/i) == "micromessenger" ||
					ua.match(/_SQ_/i) == "_sq_"
				) {
					this.isJump = 1;
				} else {
					this.isJump = 2;
				}
			},
			// 下载app
			downloadClick() {
				this.isJump = 0;
				uni.showLoading({
					title: "APP后台下载中...",
				});
				setInterval(() => {
					uni.hideLoading();
				}, 1500);

				let type = uni.getSystemInfoSync().platform;
				let req = {
					type: type,
				};
				uni.request({
					url: this.$baseUrl + "/versionGet",
					data: req,
					complete: (res) => {
						console.log("下载");
						console.log(res);

						let list = res.data.url.split("/");
						let name = list[list.length - 1];
						console.log(name);

						if (this.browserIsIe()) {
							//假如是ie浏览器
							let elemIF = document.createElement("iframe");
							elemIF.src = res.data.url;
							elemIF.style.display = "none";
							document.body.appendChild(elemIF);
						} else {
							const a = document.createElement("a");
							// a.setAttribute('target', '_blank');
							a.setAttribute("href", res.data.url);
							a.setAttribute("download", name);
							a.click();
						}
					},
				});
			},
			//判断是否为ie浏览器
			browserIsIe() {
				if (!!window.ActiveXObject || "ActiveXObject" in window) return true;
				else return false;
			},
			// 取消在浏览器打开
			cancelJump() {
				this.isJump = 0;
			},
			// 查看该包款下的包包
			modelCheck(model) {
				console.log(model);
				uni.navigateTo({
					url: "../../commonPackage/search/search?model=" +
						encodeURIComponent(JSON.stringify(model)) +
						"&type=0",
				});
			},
			// 查看该标签下的珠宝
			labelCheck(label) {
				console.log(label);
				uni.navigateTo({
					url: "../../commonPackage/search/search?tag=" + label + "&type=1",
				})
			},
			// 查看包包详情
			checkDetails(item) {
				console.log(item);
				if (item.type == 0) {
					uni.navigateTo({
						url: "../../minePackage/details?id=" + item.id,
					});
				} else if (item.type == 1) {
					uni.navigateTo({
						url: "../../jewelryPackage/jewelryDetails?id=" + item.id,
					})
				}
			},
			// 获取数据列表
			getList() {
				uni.showLoading({
					title: "加载中......",
				});
				uni.request({
					url: this.$baseUrl + "/indexMsgGet",
					header: {
						"content-type": "application/json",
					},
					data: {
						page: this.page,
						pageNum: 10,
					},
					complete: (res) => {
						uni.hideLoading();

						console.log("首页数据");
						console.log(res);

						this.modelList = res.data.modelList;
						this.tagList = res.data.tagList;
						this.slogan = res.data.slogan;
						this.indexTitle = res.data.title;

						if (res.data.bagOrJewelleryList.length == 0) {
							this.haveMore = 1;
						} else {
							let list = this.bagOrJewelleryList.concat(res.data.bagOrJewelleryList);
							this.bagOrJewelleryList = list;
						}

						if (this.bagOrJewelleryList.length == 0) {
							this.haveData = 0;
							uni.showToast({
								icon: "none",
								title: "暂无数据",
							});
						} else {
							this.haveData = 1;
						}
						this.isShow = true;
					},
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.index-container {
		width: 100%;
		min-height: 100vh;
		background: url(../../static/imgs/index/indexBack.png) no-repeat;
		background-size: 100%;
		background-color: "#85dbd0";

		.index-slogan {
			padding: 0 20rpx;
			padding-top: 230rpx;
			text-align: center;
			color: #fff;

			.slogan-detail {
				font-size: 22rpx;
				font-style: oblique;
			}
		}

		.index-top {
			padding: 0 52rpx;
			padding-top: 100rpx;

			.index-top-input {
				height: 80rpx;
				padding-left: 30px;
				line-height: 80rpx;
				background-color: rgba(176, 237, 229, 0.36);
				border-radius: 30px;
				font-size: 28rpx;
				color: #f9f9f9;
			}
		}

		.index-type {
			padding: 0 52rpx;
			padding-top: 80rpx;
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;

			.type-every {
				width: 25%;
				text-align: center;

				.type-image {
					width: 80rpx;
					height: 80rpx;
					margin: 0 auto;
					padding: 10rpx;
					border-radius: 50%;
					background-color: #fff;

					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}

				.type-name {
					margin-top: 25rpx;
					margin-bottom: 25rpx;
					font-size: 24rpx;
					color: #f9f9f9;
				}
			}
		}

		.index-main {
			margin-top: 40rpx;
			padding: 0 20rpx;
			padding-top: 60rpx;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			background-color: #fff;
			border-top-left-radius: 30rpx;
			border-top-right-radius: 30rpx;

			.main-every {
				width: 344rpx;
				text-align: center;

				.every-image {
					height: 344rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: #fffcf7;
					border-top-left-radius: 10px;
					border-top-right-radius: 10px;

					image {
						// width: 230rpx;
						// height: 230rpx;
						width: 100%;
						height: 100%;
						border-top-left-radius: 10px;
						border-top-right-radius: 10px;
					}
				}

				.every-main {
					min-height: 118rpx;
					padding: 22rpx 20rpx 20rpx;
					margin-bottom: 30rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					text-align: left;
					border-bottom-left-radius: 10px;
					border-bottom-right-radius: 10px;
					border-top: 0;
					box-shadow: 0px -5px 0 0 #fffcf7, -10rpx 0px 20rpx 0 #f9f9f9,
						10rpx 0px 20rpx 0 #f9f9f9, 0px 20rpx 30rpx 0 #f9f9f9;

					.main-model {
						color: #000;
						font-size: 24rpx;
						font-weight: bold;
					}

					.main-price {
						margin-top: 20rpx;
						font-size: 30rpx;
						color: #ff8b62;
						font-weight: bold;
					}
				}
			}
		}

		.downloadApp {
			position: fixed;
			bottom: 120px;
			right: 40rpx;
			text-align: center;

			.downloadApp-img {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
			}

			.downloadApp-font {
				padding: 8rpx 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 24rpx;
				// background-color: #ff7f22;
				background-color: #85dbd0;
				border-radius: 30px;
				color: #fff;
			}
		}

		.jump {
			width: 100%;
			height: 100vh;
			background-color: rgba($color: #000000, $alpha: 0.7);
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			text-align: center;

			image {
				width: 481rpx;
				height: 352rpx;
				margin: 0 auto;
				margin-top: 150rpx;
				margin-right: 50rpx;
			}

			.jump-top {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 40rpx;
				font-size: 26rpx;
				color: #fff;

				.jump-circle {
					width: 5px;
					height: 5px;
					margin: 0 2px;
					border-radius: 50%;
					background-color: #fff;
				}
			}

			.jump-bottom {
				margin-top: 5px;
				font-size: 26rpx;
				color: #fff;
			}
		}

		.downloadSel {
			width: 100%;
			height: 100vh;
			background-color: rgba($color: #000000, $alpha: 0.7);
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			display: flex;
			flex-direction: column;
			justify-content: center;
			text-align: center;

			.sel-top {
				width: 462rpx;
				height: 232rpx;
				margin: 0 auto;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				text-align: center;
				background: url(../../static/imgs/index/back01.png) no-repeat;
				background-size: 100%;

				image {
					width: 150rpx;
					height: 150rpx;
					margin: 0 auto;
				}

				.top-font {
					font-size: 28rpx;
					font-weight: bold;
				}
			}

			.sel-bottom {
				width: 462rpx;
				height: 232rpx;
				margin: 0 auto;
				margin-top: 18rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				background: url(../../static/imgs/index/back02.png) no-repeat;
				background-size: 100%;

				image {
					width: 58rpx;
					height: 57rpx;
					margin-right: 20rpx;
				}

				text {
					font-weight: bold;
					font-size: 30rpx;
					color: #ff7822;
					border-bottom: 4rpx solid #ff7822;
				}
			}

			.sel-close {
				margin-top: 100rpx;

				image {
					width: 50rpx;
					height: 50rpx;
				}
			}
		}
	}
</style>
