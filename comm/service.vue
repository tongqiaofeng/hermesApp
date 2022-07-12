<template>
	<view>
		<view v-if="type == 0" class="userList" v-for="(user, index) in userList" :key="index">
			<view class="user" @tap="goToChat(user)">
				<image class="head" :src=" user.headPic ? baseFileUrl + '/file/' + user.headPic : '../static/imgs/mine/avatar.png' " mode="aspectFill"></image>
				<view class="name">{{ user.nick ? user.nick : "客服" + user.id }}</view>
			</view>
		</view>
		<view v-else class="service-container">
			<!-- 联系客服 -->
			<view class="" v-for="(item, index) in serviceMsg" :key="index">
				<view class="every-loc">
					{{ item.loc }}
				</view>
				<view class="msg-every" v-for="(items, index2) in dataFilter(item)" :key="index2">
					<view class="every-left">
						<image :src="imgSel(items)" mode="aspectFill"></image>
						<text class="font-one">{{ items.split(":")[1] }}</text>
					</view>
					<text class="copyButton" @click="copy(items)">复制</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				baseFileUrl: this.$baseFileUrl,
				userList: [],

				type: -1,

				img1: require("../static/imgs/service/WeChat.png"),
				img2: require("../static/imgs/service/WhatsApp.png"),
				img3: require("../static/imgs/service/Instagram.png"),
				serviceMsg: "",

				detail: null
			};
		},
		onLoad() {
			if (getApp().globalData.pageInItem) {
				this.detail = getApp().globalData.pageInItem;
				getApp().globalData.pageInItem = '';
			}
			let userId = getApp().globalData.userInfo.userId;
			if (userId == 19) {
				this.type = 1;
				this.getService();
			} else {
				this.getNewService();
			}
		},
		onShow() {},
		onReady() {
			this.hidePageNavInWechatBrowser();
		},
		methods: {
			dataFilter(item) {
				return item.contactMsg.split(/[\n]/);
			},
			// 获取联系方式
			getService() {
				uni.request({
					url: this.$baseUrl + "/wechat/api/contactGet?id=" + "0",
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync("token"),
					},
					complete: (res) => {
						console.log("联系方式");
						console.log(res);
						this.serviceMsg = res.data;
						this.type = 1;
					},
				});
			},
			getNewService() {
				uni.showLoading({
					title: "数据加载中...",
				});
				uni.request({
					method: "GET",
					url: this.$baseUrl + "/wechat/api/newContactGet",
					header: {
						"content-type": "application/json",
					},
					success: (res) => {
						let userList = res.data;
						if (userList) {
							this.type = 0;
							this.userList = res.data;
						} else {
							this.getService();
						}
					},
					complete: () => {
						uni.hideLoading();
					}
				});
			},
			// 复制
			copy(item) {
				console.log("复制");
				console.log(item);
				uni.setClipboardData({
					data: item.split(":")[1], //要被复制的内容
					success: () => {
						//复制成功的回调函数
						uni.showToast({
							//提示
							title: "复制成功",
							icon: "none",
						});
					},
				});
			},
			imgSel(item) {
				console.log("图片");
				console.log(item);
				let font = item.split(":")[0].trim();
				console.log(font);
				switch (font) {
					case "WeChat ID":
						return this.img1;
						break;
					case "WhatsApp":
						return this.img2;
						break;
					case "Instagram":
						return this.img3;
						break;
					default:
						break;
				}
			},
			goToChat(user) {
				if(this.detail)
					getApp().globalData.pageInItem = this.detail;
				uni.navigateTo({
					url: '../chat/chat?id=TopTime_' + user.id + '&name=' + user.nick,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
	};
</script>
<style lang="scss" scoped>
	.userList {
		.user {
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid #f0f0f0;
			padding: 20rpx;

			.head {
				width: 80rpx;
				height: 80rpx;
				margin: 0rpx 30rpx;
				border-radius: 80rpx;
			}

			.name {
				font-size: 30rpx;
			}
		}
	}

	.service-container {
		padding: 30rpx;
		padding-top: 0;

		.every-loc {
			padding-top: 30rpx;
			padding-bottom: 20rpx;
			font-size: 30rpx;
		}

		.msg-every {
			height: 88rpx;
			padding-right: 20rpx;
			margin-bottom: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #f9f9f9;
			border-radius: 20rpx;

			.every-left {
				display: flex;
				align-items: center;

				image {
					width: 56rpx;
					height: 56rpx;
					margin: 0 20rpx;
				}

				.font-one {
					font-size: 30rpx;
					color: #303030;
				}
			}

			.copyButton {
				margin-left: 30rpx;
				font-size: 26rpx;
				color: #85dbd0;
			}
		}
	}
</style>
