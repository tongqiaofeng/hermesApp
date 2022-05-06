<template>
	<view class="service-container">
		<!-- 联系客服 -->
		<view class="" v-for="(item,index) in serviceMsg" :key="index">
			<view class="every-loc">
				{{item.loc}}
			</view>
			<view class="msg-every" v-for="(items,index2) in dataFilter(item)" :key="index2">
				<view class="every-left">
					<image :src="imgSel(items)" mode="aspectFill"></image>
					<text class="font-one">{{items.split(":")[1]}}</text>
				</view>
				<text class="copyButton" @click="copy(items)">复制</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img1: require("../../static/imgs/service/WeChat.png"),
				img2: require("../../static/imgs/service/WhatsApp.png"),
				img3: require("../../static/imgs/service/Instagram.png"),
				id: "",
				serviceMsg: ""
			}
		},
		onLoad(option) {
			if (option.id) {
				this.id = option.id;
			} else {
				this.id = "";
			}

			this.getService();
		},
		methods: {
			dataFilter(item){
				return item.contactMsg.split(/[\n]/)
			},
			// 获取联系方式
			getService() {
				uni.request({
					url: this.$baseUrl + "/contactGet?id=" + this.id,
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync('token')
					},
					complete: (res) => {
						console.log('联系方式');
						console.log(res);
						this.serviceMsg = res.data;
					}
				})
			},
			// 复制
			copy(item) {
				console.log('复制')
				console.log(item)
				uni.setClipboardData({
					data: item.split(":")[1], //要被复制的内容
					success: () => { //复制成功的回调函数
						uni.showToast({ //提示
							title: "复制成功",
							icon: "none"
						})
					}
				});
			},
			imgSel(item) {
				console.log('图片')
				console.log(item)
				let font = item.split(":")[0].trim();
				console.log(font)
				switch (font) {
					case "WeChat ID":
						return this.img1
						break;
					case "WhatsApp":
						return this.img2
						break;
					case "Instagram":
						return this.img3
						break;
					default:
						break;
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.service-container {
		padding: 30rpx;
		padding-top: 0;
		
		.every-loc{
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
