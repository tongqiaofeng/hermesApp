<template>
	<view class="details-container">
		<!-- 珠宝成品详情 -->
		<uni-swiper-dot :info="imgSrc" :current="current" mode="dot" :dotsStyles="dotsStyles">
			<swiper class="swiper-box" style="height: 750rpx" @change="swiperChange">
				<swiper-item v-for="(item, index) in imgSrc" :key="index">
					<view class="swiper-item" @click="imagePreview(index)">
						<image :src="item" mode="aspectFill" style="width: 100%; height: 750rpx">
						</image>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="img-title" v-if="role == 'admin' && jewelryDetails.designImg">
			<view class="title-left">
				<view class="img-line"></view>
				<text>设计稿图</text>
			</view>
			<view class="title-right">
				<checkbox-group @change="isShowChange">
					<label>
						<checkbox :value="isShow" v-model="isShow" color="#85dbd0"
							style="transform: scale(0.6);border-radius: 50%;" /><text
							style="margin-left: -6rpx;">是否显示</text>
					</label>
				</checkbox-group>
			</view>
		</view>
		<uni-swiper-dot v-if="role == 'admin' && jewelryDetails.designImg && isShow == '1'" :info="imgSrc2"
			:current="current2" mode="dot" :dotsStyles="dotsStyles">
			<swiper class="swiper-box" style="height: 700rpx" @change="swiperChange2">
				<swiper-item v-for="(item, index) in imgSrc2" :key="index">
					<view class="swiper-item" @click="imagePreview2(index)">
						<image :src="item" mode="aspectFill" style="width: 100%; height: 700rpx">
						</image>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="product-price">
			<text style="font-size: 22rpx;color: #85dbd0;" v-if="jewelryDetails.adviseSellPrice != 0">
				CNY<text style="font-size: 36rpx;">{{' ' + formatNumberRgx(jewelryDetails.adviseSellPrice)}}</text>
			</text>
			<text style="font-size: 22rpx;color: #85dbd0;" v-else>
				价格请咨询客服
			</text>
			<view class="product-name">
				<view class="name-one">
					<text style="flex: 1;">{{jewelryDetails.productName}}</text>
					<view style="margin-left: 20rpx;" v-if="role == 'admin'">
						<text>{{jewelryDetails.storageName == '' || jewelryDetails.storageName == null ? '' : jewelryDetails.storageName}}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="product-parameter" v-if="role == 'admin'">
			<view class="parameter">商品信息</view>
			<view class="parameter-line"></view>
			<view class="parameter-every" v-if="jewelryDetails.productNumber">
				<text>唯一编号</text>
				<text>{{jewelryDetails.productNumber}}</text>
			</view>
			<view class="parameter-every" v-if="jewelryDetails.designName">
				<text>设计稿名称</text>
				<text>{{jewelryDetails.designName}}</text>
			</view>
			<view class="parameter-every" v-if="jewelryDetails.designerName">
				<text>设计师</text>
				<text>{{jewelryDetails.designerName}}</text>
			</view>
			<view v-if="jewelryDetails.certs">
				<view v-if="jewelryDetails.certs.length > 0" class="parameter-every infoItem">
					<view>证书编号：</view>
					<view class="content">
						<view v-for="(cert, index) in jewelryDetails.certs" :key="index">
							<navigator :url="'./materialDetails?productNumber=' + cert">
								{{ cert }}
							</navigator>
						</view>
					</view>
				</view>
			</view>
			<view class="parameter-every" v-if="jewelryDetails.stockInTime">
				<text>入库时间</text>
				<text>{{jewelryDetails.stockInTime}}</text>
			</view>
			<view class="parameter-every" v-if="jewelryDetails.costPrice">
				<text>裸石成本</text>
				<view>
					<text
						style="color: #73d1c6;">{{jewelryDetails.currency + " " + formatNumberRgx(jewelryDetails.costPrice)}}</text>
				</view>
			</view>
			<view class="parameter-every" v-if="jewelryDetails.processCost">
				<text>加工费</text>
				<view>
					<text style="color: #73d1c6;">{{"CNY " + formatNumberRgx(jewelryDetails.processCost)}}</text>
				</view>
			</view>
			<view class="parameter-every" v-if="jewelryDetails.totalCnRate">
				<text>外币兑人民币汇率</text>
				<view>
					<text style="color: #73d1c6;">{{jewelryDetails.totalCnRate}}</text>
				</view>
			</view>
			<view class="parameter-every" v-if="jewelryDetails.totalCnPrice">
				<text>成本人民币金额</text>
				<view>
					<text style="color: #73d1c6;">{{"CNY " + formatNumberRgx(jewelryDetails.totalCnPrice)}}</text>
				</view>
			</view>
			<view class="parameter-every" v-if="jewelryDetails.totalHkRate">
				<text>港币兑人民币汇率</text>
				<view>
					<text style="color: #73d1c6;">{{jewelryDetails.totalHkRate}}</text>
				</view>
			</view>
			<view class="parameter-every" v-if="jewelryDetails.totalHkPrice">
				<text>成本港币金额</text>
				<view>
					<text style="color: #73d1c6;">{{"HKD " + formatNumberRgx(jewelryDetails.totalHkPrice)}}</text>
				</view>
			</view>
			<view class="parameter-every" v-if="jewelryDetails.lowestSellPrice">
				<text>最低销售价</text>
				<view>
					<text style="color: #73d1c6;">{{"CNY " + formatNumberRgx(jewelryDetails.lowestSellPrice)}}</text>
				</view>
			</view>
			<view class="parameter-every" v-if="jewelryDetails.adviceWholesalePrice">
				<text>建议批发价</text>
				<view>
					<text
						style="color: #73d1c6;">{{"CNY " + formatNumberRgx(jewelryDetails.adviceWholesalePrice)}}</text>
				</view>
			</view>
			<view class="parameter-every" v-if="jewelryDetails.tagPrice">
				<text>标签价</text>
				<view>
					<text style="color: #73d1c6;">{{"CNY " + formatNumberRgx(jewelryDetails.tagPrice)}}</text>
				</view>
			</view>
			<view class="parameter-every" v-if="jewelryDetails.saleCommission">
				<text>销售提成</text>
				<view>
					<text style="color: #73d1c6;">{{"CNY " + formatNumberRgx(jewelryDetails.saleCommission)}}</text>
				</view>
			</view>
			<view class="parameter-every" v-if="jewelryDetails.params">
				<view style="width: 110px;">参数</view>
				<text>{{jewelryDetails.params}}</text>
			</view>
			<view class="parameter-every" v-if="jewelryDetails.totalPriceNote">
				<view style="width: 110px;">成本备注</view>
				<view>{{jewelryDetails.totalPriceNote}}</view>
			</view>
			<view class="parameter-every" v-if="jewelryDetails.note">
				<view style="width: 110px;">产品备注</view>
				<view>{{jewelryDetails.note}}</view>
			</view>
		</view>
		<view class="product-parameter" v-if="jewelryDetails.state == 4 && role == 'admin'">
			<view class="parameter">销售信息</view>
			<view class="parameter-line"></view>
			<view class="parameter-every">
				<text>销售时间</text>
				<text>{{jewelryDetails.stockOutTime}}</text>
			</view>
			<view class="parameter-every">
				<text>发票号</text>
				<text>{{jewelryDetails.sellBillNumber}}</text>
			</view>
			<view class="parameter-every">
				<text>销售金额</text>
				<view>
					<text
						style="color: #73d1c6;">{{jewelryDetails.saleCurrency + ' ' + formatNumberRgx(jewelryDetails.saleMoney)}}</text>
				</view>
			</view>
			<view class="parameter-every">
				<text>销售港币金额</text>
				<view>
					<text style="color: #73d1c6;">{{'HKD ' + formatNumberRgx(jewelryDetails.sellTotalHkPrice)}}</text>
				</view>
			</view>
			<view class="parameter-every">
				<text>客户名称</text>
				<text>{{ jewelryDetails.customer}}</text>
			</view>
			<view class="parameter-every" v-if="jewelryDetails.saleCurrency == jewelryDetails.currency">
				<text>利润</text>
				<view>
					<text
						style="color: #73d1c6;">{{jewelryDetails.saleCurrency + ' ' + formatNumberRgx(costPrice(jewelryDetails.saleMoney, jewelryDetails.costPrice))}}</text>
				</view>
			</view>
		</view>
		<view class="product-parameter" v-if="jewelryDetails.materialList && role == 'admin'">
			<view class="parameter">原材料列表</view>
			<view class="parameter-line"></view>
			<view v-for="(item,index) in jewelryDetails.materialList" :key="index">
				<navigator class="parameter-every" :url="'./materialDetails?id=' + item.id" hover-class="none">
					<text>{{item.name}}</text>
					<text>{{item.chargeUnit == '粒' || item.chargeUnit == '件' ? item.number + item.chargeUnit : '数量' + item.number + ',' + item.weight + item.chargeUnit}}</text>
				</navigator>
			</view>
		</view>
		<view class="product-parameter" style="padding: 0 0 160rpx;">
			<view class="parameter" style="padding: 30rpx 40rpx 0rpx 40rpx">产品详情</view>
			<view class="parameter-line"></view>
			<view v-for="(item, index) in imgSrc3" :key="index" @click="imagePreview3(index)">
				<image style="vertical-align: bottom; width: 750rpx;" v-if="item" :src="item" mode="widthFix"></image>
			</view>
		</view>
		<view class="product-bottom">
			<view class="bottom-left">
				<view class="left-index" @click="goIndex">
					<image class="index-img" src="../static/imgs/details/index.png" mode="aspectFill"></image>
					<view class="index-font">首页</view>
				</view>
				<view class="left-collect" @click="isCollect">
					<image class="index-img" :src="jewelryDetails.myFavorite == 0 ? collect1 : collect2"
						mode="aspectFill">
					</image>
					<view class="index-font">{{jewelryDetails.myFavorite == 0 ? '收藏' : '已收藏'}}</view>
				</view>
			</view>
			<view class="bottom-right" @click="serviveClick">
				<image src="../static/imgs/details/service.png" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: this.$baseJewelleryUrl,
				role: uni.getStorageSync("role"),
				token: uni.getStorageSync("token"),
				jewelryDetails: {},
				imgSrc: [],
				imgSrc2: [],
				imgSrc3: [],
				dotsStyles: {
					width: 6,
					height: 6,
					backgroundColor: "#fff",
					border: "#fff",
					selectedBackgroundColor: "#b0edd5",
					selectedBorder: "#b0edd5",
				},
				current: 0,
				current2: 0,
				collect1: require("../static/imgs/details/collect.png"),
				collect2: require("../static/imgs/details/collect01.png"),

				isShow: "0",
				detailId: null,
				//设置默认的分享参数
				share: {
					title: 'PAULIANA 宝莉安娜高级珠宝',
					path: "/jewelryPackage/jewelryDetails?id=" + this.detailId,
					imageUrl: '',
					desc: '',
					content: ''
				},

			};
		},

		onLoad(option) {
			console.log("详情");
			console.log(option.id);
			this.detailId = option.id;
			this.getDetails();
		},
		onReady() {
			this.hidePageNavInWechatBrowser();
		},
		onPullDownRefresh() {
			uni.showLoading({
				title: '正在刷新'
			});
			this.getDetails();
			uni.stopPullDownRefresh();
		},
		// 分享好友
		onShareAppMessage(res) {
			this.share.path = "/jewelryPackage/jewelryDetails?id=" + this.detailId;
			return {
				title: this.share.title,
				path: this.share.path,
				imageUrl: this.share.imageUrl,
				desc: this.share.desc,
				content: this.share.content,
				success: (res) => {
					uni.showToast({
						title: "分享成功",
						icon: "none"
					})
				},
				fail: (res) => {
					uni.showToast({
						title: "分享失败",
						icon: "none"
					})
				}
			}
		},
		// 分享朋友圈
		onShareTimeline(res) {
			this.share.path = "/jewelryPackage/jewelryDetails?id=" + this.detailId;
			return {
				title: this.share.title,
				path: this.share.path,
				imageUrl: this.share.imageUrl,
				desc: this.share.desc,
				content: this.share.content,
				success: (res) => {
					uni.showToast({
						title: "分享成功",
						icon: "none"
					})
				},
				fail: (res) => {
					uni.showToast({
						title: "分享失败",
						icon: "none"
					})
				}
			}
		},
		methods: {
			// 是否显示内部图
			isShowChange(e) {
				console.log(e);
				if (this.isShow == "0") {
					this.isShow = "1";
				} else if (this.isShow == "1") {
					this.isShow = "0";
				}
			},
			// 指示点
			swiperChange(e) {
				this.current = e.detail.current;
			},
			swiperChange2(e) {
				this.current2 = e.detail.current;
			},
			//预览轮播图
			imagePreview(index) {
				//uniapp预览轮播图
				uni.previewImage({
					current: index, //预览图片的下标
					urls: this.imgSrc, //预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
				});
			},
			imagePreview2(index) {
				//uniapp预览轮播图
				uni.previewImage({
					current: index, //预览图片的下标
					urls: this.imgSrc2, //预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
				});
			},
			imagePreview3(index) {
				//uniapp预览轮播图
				uni.previewImage({
					current: index, //预览图片的下标
					urls: this.imgSrc3, //预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
				});
			},
			// 获取商品详情
			getDetails(id) {
				uni.showLoading({
					title: "加载中......",
				});
				uni.request({
					url: this.$baseJewelleryUrl + "/jewelleryInfo?id=" + this.detailId,
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync('token')
					},
					success: (res) => {
						uni.hideLoading();
						console.log("pppp");
						console.log(res);
						this.jewelryDetails = res.data.productInfo;

						uni.setNavigationBarTitle({
							title: this.jewelryDetails.productName
						});

						// 产品
						this.imgSrc = [];
						if (this.jewelryDetails.img != '' && this.jewelryDetails.img != null) {
							if (this.jewelryDetails.img.indexOf('|') == -1) {
								this.imgSrc.push(this.imgUrl + '/file/' + this.jewelryDetails.img)
							} else {
								let p = this.jewelryDetails.img.split("|");

								for (let i = 0; i < p.length; i++) {
									this.imgSrc.push(this.imgUrl + '/file/' + p[i].trim());
								};
							}
						}


						// 设计图
						this.imgSrc2 = [];
						if (this.jewelryDetails.designImg != '' && this.jewelryDetails.designImg != null) {
							if (this.jewelryDetails.designImg.indexOf('|') == -1) {
								this.imgSrc2.push(this.jewelryDetails.designImg)
							} else {
								let q = this.jewelryDetails.designImg.split("|");
								for (let i = 0; i < q.length; i++) {
									this.imgSrc2.push(q[i].trim());
								}
							}
						}

						// 详情图
						this.imgSrc3 = [];
						if (this.jewelryDetails.detailImg != '' && this.jewelryDetails.detailImg != null) {
							if (this.jewelryDetails.detailImg.indexOf('|') == -1) {
								this.imgSrc3.push(this.imgUrl + '/file/' + this.jewelryDetails.detailImg)
							} else {
								let f = this.jewelryDetails.detailImg.split("|");
								for (let i = 0; i < f.length; i++) {
									this.imgSrc3.push(this.imgUrl + '/file/' + f[i].trim());
								}
							}
						}

						//证书
						this.jewelryDetails.certs = [];
						let certs = [];
						if (this.jewelryDetails.certificateNumber.indexOf(",") > 0)
							certs = this.jewelryDetails.certificateNumber.split(",");
						else certs = this.jewelryDetails.certificateNumber.split("，");
						for (let i = 0; i < certs.length; ++i) {
							let tmp = certs[i].trim();
							if (tmp.length > 0) this.jewelryDetails.certs.push(tmp);
						}
					},
					fail: (err) => {
						uni.hideLoading();
						console.log(err);
					},
				});
			},
			// 返回首页
			goIndex() {
				uni.switchTab({
					url: "../pages/index/index"
				})
			},
			// 收藏
			isCollect() {
				if (uni.getStorageSync('token').length == 0) {
					uni.showToast({
						title: "请登录",
						icon: "none",
						success: () => {
							uni.switchTab({
								url: "../pages/mine/mine"
							})
						}
					});
				} else {
					console.log('添加与取消收藏');
					let list = [];
					list.push({
						id: this.jewelryDetails.id,
						type: 1
					});
					uni.request({
						method: "POST",
						url: this.$baseUrl + '/favoriteSave',
						data: {
							stockList: list
						},
						header: {
							token: uni.getStorageSync('token')
						},
						complete: (res) => {
							console.log('添加与取消收藏');
							console.log(res);

							if (this.checkBack(res, true) == false) return
							else {
								this.getDetails(this.jewelryDetails.id);
							};
						},
					})
				}
			},
			// 联系客服
			serviveClick() {
				uni.navigateTo({
					url: "../commonPackage/service/service"
				})
			},
		},
	};
</script>

<style lang="scss" scoped>
	.details-container {
		width: 100%;
		// height: 100vh;
		background-color: #f9f9f9;

		.img-title {
			padding: 20rpx 40rpx;
			margin-bottom: 10rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;

			.title-left {
				display: flex;
				align-items: center;

				.img-line {
					width: 6rpx;
					height: 26rpx;
					margin-right: 10rpx;
					background-color: #85dbd0;
					border-radius: 60px;
				}

				text {
					font-size: 28rpx;
					color: #c3c3c3;
				}
			}

			.title-right {
				display: flex;
				align-items: center;
				color: #c3c3c3;
				font-size: 28rpx;
			}
		}

		.uni-swiper__dots-nav {
			justify-content: flex-end;
		}

		.product-price {
			margin-top: 10rpx;
			padding: 20rpx 40rpx;
			text-align: left;
			background-color: #fff;

			.product-name {
				padding: 16rpx 20rpx 0 0;

				.name-one {
					display: flex;
					justify-content: space-between;
					// align-items: center;

					text {
						color: #303030;
						font-size: 30rpx;
					}
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

			.infoItem {
				.content {
					flex: 1;
					text-align: right;
					text-decoration: underline;
				}
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

		.product-bottom {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			padding: 10rpx 20rpx 20rpx 60rpx;
			display: flex;
			justify-content: space-between;
			background-color: #fff;
			border-top: 1px solid #f9f9f9;

			.bottom-left {
				display: flex;

				.index-img {
					width: 40rpx;
					height: 38rpx;
				}

				.index-font {
					margin-top: 10rpx;
					font-size: 20rpx;
				}

				.left-collect {
					margin-left: 60rpx;
					text-align: center;
				}
			}

			.bottom-right {
				width: fit-content;

				image {
					width: 451rpx;
					height: 80rpx;
					border-radius: 10rpx;
				}
			}

			.buy {

				.buy-button {
					padding: 20rpx 40rpx;
					background-color: #85dbd0;
					color: #fff;
					font-size: 26rpx;
					border-radius: 60rpx;
				}

				.buy-details {
					padding: 20rpx 20rpx 40rpx;
					border-top-left-radius: 30rpx;
					border-top-right-radius: 30rpx;
					background-color: #fff;

					.close {
						display: flex;
						justify-content: flex-end;

						image {
							width: 32rpx;
							height: 32rpx;
						}
					}

					.container {
						display: flex;
						justify-content: space-between;

						.buy-img {
							margin-right: 20rpx;

							image {
								width: 200rpx;
								height: 200rpx;
								border-radius: 30rpx;
							}
						}

						.buy-msg {
							padding: 20rpx 50rpx 20rpx 0;
							display: flex;
							flex-direction: column;
							justify-content: space-between;

							.name {
								font-size: 28rpx;
							}

							.price {
								color: #ff8b62;
							}
						}
					}

					.buy-number {
						display: flex;
						justify-content: space-between;
						margin: 40rpx 0;
						align-items: center;

						text {
							font-size: 28rpx;
						}
					}

					.buy-sure {
						width: 100%;
						height: 80rpx;
						line-height: 80rpx;
						background-color: #85dbd0;
						color: #FFFFFF;
						font-size: 26rpx;
						text-align: center;
						border-radius: 60rpx;
					}
				}
			}
		}
	}
</style>
