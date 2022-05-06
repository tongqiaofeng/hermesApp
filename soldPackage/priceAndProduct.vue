<template>
	<view class="return-price-product-container">
		<!-- 退货退款 -->
		<view class="addr-every">
			<text class="every-title">申请类型</text>
			<uni-data-picker style="flex: 1;" class="city-sel" popup-title="请选择申请类型" @change="typeChange"
				:localdata="typeList" v-model="typeSel">
			</uni-data-picker>
			<image src="../static/imgs/classify/right.png" mode="aspectFill"></image>
		</view>
		<view class="addr-every" v-if="typeSel == 0">
			<text class="every-title">收货状态</text>
			<uni-data-picker style="flex: 1;" class="city-sel" placeholder="点击选择收货状态" popup-title="请选择收货状态"
				:localdata="productStatusList" v-model="productStatus">
			</uni-data-picker>
			<image src="../static/imgs/classify/right.png" mode="aspectFill"></image>
		</view>
		<view class="addr-every">
			<text class="every-title">申请原因</text>
			<uni-data-picker style="flex: 1;" class="city-sel" placeholder="点击选择申请原因" popup-title="请选择申请原因"
				@change="reasonChange" :localdata="reasonList" v-model="reasonSel">
			</uni-data-picker>
			<image src="../static/imgs/classify/right.png" mode="aspectFill"></image>
		</view>
		<view class="applied-amount">
			<view class="applied-amount-title">申请金额</view>
			<view class="applied-amount-main">
				<view class="amount-main-left">
					<text>￥</text>
					<input type="text" v-model="paramsData.price" placeholder="请输入申请金额"
						placeholder-style="color: #c3c3c3;font-size: 26rpx;font-weight: normal;"
						:disabled="isUpdate == 0 ? true : false" :focus="isUpdate == 0 ? false : true" />
				</view>
				<view class="amount-main-right" @click="updateClick">
					<image src="../static/imgs/common/rewrite.png" mode="aspectFill"
						style="width: 32rpx;height: 32rpx;"></image>
					<text>修改金额</text>
				</view>
			</view>
			<view class="applied-amount-bottom" v-if="paramsData.price == 0 || paramsData.price == ''">
				请输入申请金额，本次最多可申请{{amountTotal}}元
			</view>
		</view>
		<view class="apply-for-instructions">
			<view class="instructions-title">
				<text>申请说明</text>
				<text class="num">您还可以输入{{170-insDetail.length}}字</text>
			</view>
			<view class="instructions-detail">
				<textarea placeholder="请您填写详细申请说明" placeholder-style="color: #c3c3c3;" maxlength="170"
					v-model="insDetail" />
			</view>
			<view class="instructions-imgs">
				<view class="imgs-upload" @click="uploadImgs">
					<image src="../static/imgs/common/camera.png" mode="aspectFill"></image>
					<text>上传图片</text>
				</view>
			</view>
		</view>
		<view class="addr-every" style="margin-top: 10rpx;line-height: 38px;">
			<text class="every-title">联系电话</text>
			<uni-easyinput style="flex: 1;" v-model="paramsData.phone" :inputBorder="false" placeholder="请输入联系电话"
				placeholder-style="color: #c3c3c3;font-size: 26rpx;font-weight: normal;" />
		</view>
		<view class="apply-button">
			<view class="button-self" @click="applySubmit">提交申请</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				paramsData: {},
				typeList: [{
					text: '我要退货退款',
					value: '1'
				}, {
					text: '我要退款(无需退货)',
					value: '0'
				}],
				typeSel: '',
				productStatusList: [{
					text: '未收到货',
					value: '1'
				}, {
					text: '已收到货',
					value: '0'
				}],
				productStatus: '',
				reasonList: [{
					text: '多拍、错拍、不想要',
					value: '多拍、错拍、不想要'
				}, {
					text: '不喜欢、效果不好',
					value: '不喜欢、效果不好'
				}, {
					text: '货物与描述不符',
					value: '货物与描述不符'
				}, {
					text: '大小/重量与商品描述不符',
					value: '大小/重量与商品描述不符'
				}, {
					text: '标签/批次/包装/成分等与商品描述不符',
					value: '标签/批次/包装/成分等与商品描述不符'
				}, {
					text: '质量问题',
					value: '质量问题'
				}, {
					text: '收到商品少件、破损或污渍',
					value: '收到商品少件、破损或污渍'
				}, {
					text: '商家发错货',
					value: '商家发错货'
				}, {
					text: '其他',
					value: '其他'
				}, ],
				reasonSel: '',

				amountTotal: 0,
				isUpdate: 0,

				insDetail: '',
				imgList: []
			}
		},
		onLoad(option) {
			console.log();
			this.amountTotal = JSON.parse(option.retParams).price;
			this.paramsData = JSON.parse(option.retParams);
			this.typeSel = option.type;
			if (this.typeSel == 0) {
				uni.setNavigationBarTitle({
					title: '申请退款'
				});
			}else{
				uni.setNavigationBarTitle({
					title: '申请退货退款'
				});
			}
		},
		methods: {
			// 申请类型
			typeChange(val) {
				console.log(val);
				if (this.typeSel == 0) {
					uni.setNavigationBarTitle({
						title: '申请退款'
					});
				}else{
					uni.setNavigationBarTitle({
						title: '申请退货退款'
					});
				}
			},
			// 申请原因
			reasonChange(val) {
				console.log(val)
			},
			// 点击修改
			updateClick() {
				this.isUpdate = 1;
			},
			// 上传图片
			uploadImgs() {
				uni.chooseImage({
					success: (res) => {
						console.log("成功", res);
						for (let item of res.tempFilePaths) {
							this.imgList.push({
								uri: item
							})
						}
						// this.imgList = res.tempFilePaths;

						uni.uploadFile({
							url: this.$baseFileUrl + "/upload", //post请求的地址
							fileType: "image",
							// filePath: tempFilePaths[0],
							files: this.imgList,
							name: "upload-images",
							success: (res) => {
								console.log('上传图片成功')
								console.log(res);
								// this.registerData.headPic = res.data.split("|")[0];
								// uni.showToast({
								// 	title: "头像上传成功",
								// 	icon: "none",
								// });
							},
							fail: (err) => {
								console.log('上传失败')
								console.log(err);
								// uni.showToast({
								// 	title: "头像上传失败",
								// });
							},
						});
					},
					fail: (err) => {
						console.log('失败');
						console.log(err);
					},
				});
			},
			// 提交申请
			applySubmit() {
				console.log(this.typeSel)
				console.log(this.productStatus)
				console.log(this.reasonSel)
				console.log(this.paramsData.price)
				console.log(this.insDetail)
				console.log(this.imgList)
				console.log(this.paramsData.phone)
				uni.request({
					url: this.$baseUrl + "/wechatRefundSave",
					method: "POST",
					header: {
						"content-type": "application/json",
						token: uni.getStorageSync('token')
					},
					data: {
						oderId: this.paramsData.orderId,
						stockId: this.paramsData.productId,
						pics: '',
						productStatus: this.productStatus,
						reason: this.reasonSel,
						refund: this.paramsData.price,
						total: this.amountTotal,
						type: this.typeSel,
						note: this.insDetail,
						phone: this.paramsData.phone
					},
					complete: (res) => {
						console.log('退换货');
						console.log(res);
						if (res.statusCode == 200) {
							uni.showToast({
								icon: "none",
								title: "申请成功",
								success: () => {
									uni.reLaunch({
										url: "../package/returnOrder"
									})
								}
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
	}
</script>

<style lang="scss" scoped>
	.return-price-product-container {
		height: 100vh;
		background-color: #f9f9f9;

		.addr-every {
			padding: 15rpx 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;

			.every-title {
				margin-right: 20rpx;
				font-size: 30rpx;
			}

			.city-sel {
				font-size: 26rpx;
			}

			image {
				width: 32rpx;
				height: 32rpx;
			}
		}

		.applied-amount {
			margin-top: 10rpx;
			padding: 20rpx;
			background-color: #fff;

			.applied-amount-title {
				font-size: 28rpx;
			}

			.applied-amount-main {
				margin-top: 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.amount-main-left {
					display: flex;
					align-items: center;
					font-size: 40rpx;
					font-weight: bold;
				}

				.amount-main-right {
					display: flex;
					align-items: center;
					font-size: 28rpx;
					color: #c3c3c3;
				}
			}

			.applied-amount-bottom {
				padding: 20rpx;
				margin-top: 20rpx;
				background-color: #f9f9f9;
				color: red;
				font-size: 26rpx;
			}
		}

		.apply-for-instructions {
			margin-top: 10rpx;
			padding: 20rpx;
			background-color: #fff;

			.instructions-title {
				display: flex;
				justify-content: space-between;
				font-size: 26rpx;

				.num {
					color: #c3c3c3;
				}
			}

			.instructions-detail {
				margin-top: 20rpx;
				font-size: 26rpx;
			}

			.instructions-imgs {
				display: flex;
				flex-wrap: wrap;

				.imgs-upload {
					width: 160rpx;
					height: 160rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					text-align: center;
					border: 1px dashed #c3c3c3;

					image {
						width: 64rpx;
						height: 64rpx;
						margin: 0 auto;
					}

					text {
						font-size: 22rpx;
						color: #aaa;
					}
				}
			}
		}

		.apply-button {
			padding: 100rpx 40rpx 20rpx;

			.button-self {
				height: 80rpx;
				line-height: 80rpx;
				font-size: 28rpx;
				background-color: #85dbd0;
				color: #fff;
				border-radius: 60rpx;
				text-align: center;
			}
		}
	}
</style>
<style lang="scss">
	.addr-every {

		.input-value {
			padding: 0 !important;
		}

		.selected-list {
			padding: 0 !important;
		}

		.input-value-border {
			border: none !important;
		}

		.input-arrow {
			width: 0 !important;
			height: 0 !important;
			border-left: none !important;
			border-bottom: none !important;
		}

		.placeholder {
			color: #c3c3c3 !important;
		}
	}
</style>
