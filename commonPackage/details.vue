<template>
	<view class="details-container">
		<!-- 包包详情 -->
		<view class="img-title" v-if="bagDetails.privateImg">
			<view class="title-left">
				<view class="img-line"></view>
				<text>商品展示图片</text>
			</view>
		</view>
		<uni-swiper-dot :info="imgSrc" :current="current" mode="dot" :dotsStyles="dotsStyles">
			<swiper class="swiper-box" style="height: 700rpx" @change="swiperChange">
				<swiper-item v-for="(item, index) in imgSrc" :key="index">
					<view class="swiper-item" @click="imagePreview(index)">
						<image :src="item" mode="aspectFill" style="width: 100%; height: 700rpx"></image>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="img-title" v-if="bagDetails.privateImg">
			<view class="title-left">
				<view class="img-line"></view>
				<text>内部图</text>
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
		<uni-swiper-dot v-if="bagDetails.privateImg && isShow == '1'" :info="imgSrc2" :current="current2" mode="dot"
			:dotsStyles="dotsStyles">
			<swiper class="swiper-box" style="height: 700rpx" @change="swiperChange2">
				<swiper-item v-for="(item, index) in imgSrc2" :key="index">
					<view class="swiper-item" @click="imagePreview2(index)">
						<image :src="item" mode="aspectFill" style="width: 100%; height: 700rpx"></image>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="product-price" v-if="role == 'admin'">
			<text style="font-size: 22rpx;">{{'HKD'}}<text
					style="font-size: 30rpx;">{{' ' + formatNumberRgx(bagDetails.hkdPriceIndi)}}</text></text>
			<view class="cny-money">
				{{'CNY'}}
				<text style="font-size: 30rpx;">{{' ' + formatNumberRgx(bagDetails.priceIndi)}}</text>
			</view>
		</view>
		<view class="product-price" v-else>
			<text style="font-size: 22rpx;">{{'HKD'}}<text
					style="font-size: 30rpx;">{{' ' + formatNumberRgx(bagDetails.hkdPriceIndi)}}</text></text>
		</view>
		<view class="product-name">
			<view class="name-one">
				<text style="flex: 1;">{{bagDetails.name}}</text>
				<view style="display: flex;margin-left: 20rpx;">
					<!-- bagDetails.stockLoc !== '海外' &&  -->
					<image v-if="role == 'admin'" :src="ensignReSel(bagDetails.stockLoc)" mode="aspectFill">
					</image>
					<text>{{bagDetails.stockLoc}}</text>
				</view>
			</view>
			<view class="name-two" v-if="bagDetails.stockStat">
				<text v-for="(item,index) in bagDetails.stockStat.split('|')" :key="index"
					:style="{'margin-right': item == '' ? 0 : '16rpx'}">
					{{item}}
				</text>
			</view>
		</view>
		<view class="product-parameter"
			v-if="bagDetails.createTime || bagDetails.cost || bagDetails.pricePeer || bagDetails.note">
			<view class="parameter">商品信息</view>
			<view class="parameter-line"></view>
			<view class="parameter-every" v-if="bagDetails.createTime">
				<text>入库时间</text>
				<text>{{bagDetails.createTime + " 【" + bagDetails.stockLoc + "】"}}</text>
			</view>
			<view class="parameter-every" v-if="bagDetails.cost">
				<text>成本价</text>
				<view>
					<text style="color: #73d1c6;">{{"HKD " + formatNumberRgx(bagDetails.hkdCost)}}</text>
					<text v-if="role == 'admin'"
						style="color: #ff8b62;padding-left: 20rpx;">{{"CNY " + formatNumberRgx(bagDetails.cost)}}</text>
				</view>
			</view>
			<view class="parameter-every" v-if="bagDetails.pricePeer && bagDetails.pricePeer != 0">
				<text>同行价</text>
				<view>
					<text style="color: #73d1c6;">{{"HKD " + formatNumberRgx(bagDetails.hkdPricePeer)}}</text>
					<text v-if="role == 'admin'"
						style="color: #ff8b62;padding-left: 20rpx;">{{"CNY " + formatNumberRgx(bagDetails.pricePeer)}}</text>
				</view>
			</view>
			<view class="parameter-every" v-if="bagDetails.note">
				<view style="width: 80px;">备注</view>
				<text>{{bagDetails.note}}</text>
			</view>
		</view>
		<view class="product-parameter"
			v-if="bagDetails.soldTime != '' || bagDetails.priceTran != 0 || bagDetails.customer != ''">
			<view class="parameter">销售信息</view>
			<view class="parameter-line"></view>
			<view class="parameter-every" v-if="bagDetails.soldTime">
				<text>销售时间</text>
				<text>{{bagDetails.soldTime}}</text>
			</view>
			<view class="parameter-every" v-if="bagDetails.priceTran">
				<text>销售金额</text>
				<view>
					<text style="color: #73d1c6;">{{"HKD " + formatNumberRgx(bagDetails.hkdPriceTran)}}</text>
					<text v-if="role == 'admin'"
						style="color: #ff8b62;padding-left: 20rpx;">{{"CNY " + formatNumberRgx(bagDetails.priceTran)}}</text>
				</view>
			</view>
			<view class="parameter-every" v-if="bagDetails.customer">
				<text>客户名称</text>
				<text>{{ bagDetails.customer}}</text>
			</view>
			<view class="parameter-every" v-if="bagDetails.priceTran">
				<text>利润</text>
				<view>
					<text
						style="color: #73d1c6;">{{"HKD " + formatNumberRgx(bagDetails.hkdPriceTran-bagDetails.hkdCost)}}</text>
					<text v-if="role == 'admin'"
						style="color: #ff8b62;padding-left: 20rpx;">{{"CNY " + formatNumberRgx(bagDetails.priceTran-bagDetails.cost)}}</text>
				</view>
			</view>
		</view>
		<view class="product-parameter" style="padding-bottom: 160rpx;">
			<view class="parameter">参数</view>
			<view class="parameter-line"></view>
			<view class="parameter-every">
				<text>货号</text>
				<text>{{bagDetails.productCode}}</text>
			</view>
			<view class="parameter-every">
				<text>包款</text>
				<text>{{bagDetails.model}}</text>
			</view>
			<view class="parameter-every">
				<text>大小</text>
				<text>{{bagDetails.size}}</text>
			</view>
			<view class="parameter-every">
				<text>刻度</text>
				<text>{{bagDetails.letter}}</text>
			</view>
			<view class="parameter-every">
				<text>材质</text>
				<text>{{bagDetails.leather}}</text>
			</view>
			<view class="parameter-every">
				<text>色号</text>
				<text>{{bagDetails.colorId}}</text>
			</view>
			<view class="parameter-every">
				<text>颜色</text>
				<text>{{bagDetails.color}}</text>
			</view>
		</view>
		<!-- <view class="product-comment">
			<view>{{commentText}}</view>
			<comment :comments="comments" @comment-like="commentLike" @send-comment="commentSend" v-model="commentText"
				@lower="lower" @reply="reply"></comment>
		</view> -->
		<view class="product-bottom">
			<view class="bottom-left">
				<view class="left-index" @click="goIndex">
					<image class="index-img" src="../static/imgs/details/index.png" mode="aspectFill"></image>
					<view class="index-font">首页</view>
				</view>
				<view class="left-collect" @click="isCollect">
					<image class="index-img" :src="bagDetails.myFavorite == 0 ? collect1 : collect2" mode="aspectFill">
					</image>
					<view class="index-font">{{bagDetails.myFavorite == 0 ? '收藏' : '已收藏'}}</view>
				</view>
			</view>
			<!-- <view class="bottom-right" @click="serviveClick">
				<image src="../static/imgs/details/service.png" mode="aspectFill"></image>
			</view> -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="buy">
				<view class="buy-button" @click="addCart">加入购物车</view>
			</view>
			<view class="buy">
				<view class="buy-button" @click="sureOrder">立即购买</view>
			</view>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	// import comment from "./comment.vue";
	export default {
		data() {
			return {
				role: uni.getStorageSync("role"),
				token: uni.getStorageSync("token"),
				bagDetails: {},
				imgSrc: [],
				imgSrc2: [],
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
					title: '包治百病 BZBB.COM',
					path: "/pages/index/details?id=" + this.detailId,
					imageUrl: '',
					desc: '',
					content: ''
				},

				buyAmount: 1,
				commentText: "",
				comments: [{
						id: 1, // 评论唯一标识id
						avatar: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Ffront%2F625%2Fw750h675%2F20181203%2FSpxg-hpfycet1340001.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632368686&t=d5b13d9d26b2d4e3c68869b7ebf9a0a2", // 头像地址
						nickname: "name#zzz", // 评论者姓名
						content: "我是评论。", // 评论
						addTime: "2021-07-02 16:32:07", // 评论时间
						isLike: "0", // 查看评论的用户是否点赞了该评论
						likeNums: 26, // 该评论的点赞数
						layer: 1, // 该评论所在的层级
						superNickname: null, // 上级评论的用户名
						superCommentId: null, // 上级评论的id
						children: [{
								id: 2,
								avatar: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20181223%2F20%2F1545567880-shRzoBCgMS.jpeg&refer=http%3A%2F%2Fimage.biaobaiju.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632368686&t=f13fdaeeea26a9418a8e1f9c4a9871cb",
								nickname: "程序猿2",
								content: "我是回复。",
								addTime: "2021-07-04 16:36:07",
								isLike: "0",
								likeNums: 23,
								layer: 2,
								superNickname: "name#zzz",
								superCommentId: 1,
							},
							{
								id: 3,
								avatar: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201412%2F29%2F20141229151653_HiM8B.thumb.700_0.jpeg&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632368686&t=61f92b50ef164aafbeb129dbdb18b369",
								nickname: "马老师",
								content: "我是回复的回复。",
								addTime: "2021-07-05 17:32:07",
								isLike: "1",
								likeNums: 22,
								layer: 3,
								superNickname: "程序猿2",
								superCommentId: 1,
							},
						],
					},
					{
						id: 4, // 评论唯一标识id
						avatar: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171221%2F2a14e6b09df846a1908379c06045ba96.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632637245&t=c19e2df2da655bef5167ce9cf53ff77e", // 头像地址
						nickname: "昵称超长常常常常常长常常常常常", // 评论者姓名
						content: "我是评论2222。", // 评论
						addTime: "2021-05-02 12:12:17", // 评论时间
						isLike: "0", // 查看评论的用户是否点赞了该评论
						likeNums: 23, // 该评论的点赞数
						layer: 1, // 该评论所在的层级
						superNickname: null, // 上级评论的用户名
						superCommentId: null, // 上级评论的id
						children: [],
					},
				],
			};
		},
		// components: {
		// 	comment,
		// },
		onLoad(option) {
			console.log("详情");
			console.log(option.id);
			this.detailId = option.id;
			this.getDetails(option.id);
		},
		onPullDownRefresh() {
			uni.showLoading({
				title: '正在刷新'
			});
			this.getDetails(this.detailId);
			uni.stopPullDownRefresh();
		},
		// 分享好友
		onShareAppMessage(res) {
			this.share.path = "/pages/index/details?id=" + this.detailId;
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
			this.share.path = "/pages/index/details?id=" + this.detailId;
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
			// 点赞
			commentLike(e) {
				console.log("返回点击的评论信息", e);
			},
			// 发表评论
			commentSend(e, r) {
				console.log("发送", e, r);
			},
			lower() {
				console.log("到底了");
			},
			// 回复评论
			reply(index, id, userNickName, layer, reply) {
				console.log(index, id, userNickName, layer, reply);
				// index: 回复的顶级评论的索引
				// id： 回复的顶级评论的id
				// ueserNickName: 上级评论的用户名
				// layer:  该回复所处的层级
				// reply： 回复评论的全部信息
			},
			// 添加购物车
			addCart() {
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
					uni.request({
						url: this.$baseUrl + "/shoppingCartAdd",
						method: "POST",
						header: {
							"content-type": "application/json",
							token: uni.getStorageSync('token')
						},
						data: {
							id: this.bagDetails.id,
							num: 1
						},
						success: (res) => {
							console.log('添加购物车');
							console.log(res);
							if (res.statusCode == 200) {
								uni.showToast({
									icon: "none",
									title: "添加成功"
								})
							} else {
								uni.showToast({
									icon: "none",
									title: res.data.message
								})
							}
						}
					})
				}
			},
			// 立即购买
			buyNow() {
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
					this.buyAmount = 1;
					this.$refs.buyPopup.open();
				}
			},
			// 确认
			sureOrder() {
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
					let list = [{
						id: this.bagDetails.id,
						imgSrc: this.imgSrc[0],
						name: encodeURIComponent(this.bagDetails.name),
						price: 1000,
						num: this.buyAmount,
						currency: 'HKD'
					}];
					console.log('跳转传参')
					console.log(JSON.stringify(list));
					uni.navigateTo({
						url: "../package/confirmAnOrder?productList=" + encodeURIComponent(JSON.stringify(list))
					})
				}
			},
			// 关闭
			closePopup() {
				this.$refs.buyPopup.close();
			},
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
			// 获取商品详情
			getDetails(id) {
				uni.showLoading({
					title: "加载中......",
				});
				uni.request({
					url: this.$baseFileUrl + "/stockInfo?id=" + id,
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync('token')
					},
					success: (res) => {
						uni.hideLoading();
						console.log("pppp");
						console.log(res);
						this.bagDetails = res.data;

						uni.setNavigationBarTitle({
							title: this.bagDetails.name
						});

						let p = res.data.pics.split("|");
						this.imgSrc = [];

						for (let i = 0; i < p.length - 1; i++) {
							this.imgSrc.push(p[i].trim());
						};

						this.imgSrc2 = [];
						if (res.data.privateImg !== "" && res.data.privateImg !== null) {
							let q = res.data.privateImg.split("|");
							for (let i = 0; i < q.length - 1; i++) {
								this.imgSrc2.push(q[i].trim());
							}
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
					list.push(this.bagDetails.id);
					uni.request({
						method: "POST",
						url: this.$baseUrl + '/favoriteSave',
						data: {
							stockIdList: list
						},
						header: {
							token: uni.getStorageSync('token')
						},
						complete: (res) => {
							console.log('添加与取消收藏');
							console.log(res);

							if (this.checkBack(res, true) == false) return
							else {
								this.getDetails(this.bagDetails.id);
							};
						},
					})
				}
			},
			// 联系客服
			serviveClick() {
				uni.navigateTo({
					url: "./service/service?id=" + this.bagDetails.id
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
			padding-top: 20rpx;
			padding-left: 40rpx;
			padding-right: 40rpx;
			margin-bottom: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

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
			padding: 26rpx 40rpx;
			display: flex;
			align-items: center;
			text-align: left;
			color: #fff;
			font-size: 30rpx;
			background: url(../static/imgs/details/back.png) no-repeat;
			background-size: 100% 100%;

			.cny-money {
				padding: 0 20rpx;
				margin-left: 10rpx;
				font-size: 22rpx;
				background-color: #fff;
				border-radius: 30rpx;
				color: #73d1c6;
			}
		}

		.product-name {
			padding: 16rpx 20rpx 16rpx 40rpx;
			background-color: #fff;

			.name-one {
				display: flex;
				justify-content: space-between;
				// align-items: center;

				text {
					color: #303030;
					font-size: 26rpx;
					font-weight: bold;
				}

				image {
					width: 42rpx;
					height: 27rpx;
					margin-top: 4rpx;
				}
			}

			.name-two {
				margin-top: 20rpx;
				color: #808080;
				font-size: 24rpx;

				text {
					margin-right: 16rpx;
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
