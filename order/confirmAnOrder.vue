<template>
	<view class="confirm-order-container">
		<!-- 确认订单 -->
		<view class="confirm-order-container-top" @click="shippingAddress">
			<view class="top-left" v-if="selAddress">
				<view class="left-top">
					<text class="default-sign" v-show="selAddress.isDefaultAddress == 1">默认</text>
					<text class="addr-name">{{ selAddress.name }}</text>
					<text class="addr-phone">{{ selAddress.phone }}</text>
				</view>
				<view class="left-bottom">
					{{ selAddress.area + selAddress.street }}
				</view>
			</view>
			<view class="top-left" v-else> 请选择收货地址 </view>
			<image class="top-right" src="../static/imgs/order/jiantou.png" mode="aspectFill"></image>
		</view>
		<view class="confirm-order-container-product">
			<view class="product-every" v-for="(item, index) in selList" :key="index">
				<view v-if="item.productCategory == 1" class="product-img">
					<image v-if="item.imgSrc" :src="item.imgSrc.trim()" mode="aspectFill"></image>
					<image v-else src="../static/imgs/common/nopic.jpg" mode="aspectFill"></image>
				</view>
				<view v-if="item.productCategory == 2" class="product-img">
					<image v-if="item.imgSrc" :src="imgUrl + '/file/small/' + item.imgSrc.trim()" mode="aspectFill">
					</image>
					<image v-else src="../static/imgs/common/nopic.jpg" mode="aspectFill"></image>
				</view>
				<view v-if="item.productCategory == 3" class="product-img">
					<image v-if="item.imgSrc" :src="watchUrl + '/file/small/' + item.imgSrc.trim()" mode="aspectFill">
					</image>
					<image v-else src="../static/imgs/common/nopic.jpg" mode="aspectFill"></image>
				</view>


				<view class="product-container">
					<view class="name">
						{{ decodeURIComponent(item.name) }}
					</view>
					<view class="product-price">
						<view class="price">
							<text style="font-size: 24rpx">{{ "CNY"
            }}<text style="font-size: 36rpx;font-weight: bold;">{{
              " " + formatNumberRgx(item.productAmount)
            }}</text></text>
						</view>
						<view class="price-num">
							<view class="num-button" @click="numChangeValue(0,index,item.productCategory)">-</view>
							<text class="num-input">{{item.num}}</text>
							<view class="num-button" @click="numChangeValue(1,index,item.productCategory)">+</view>
						</view>
					</view>
				</view>
			</view>
			<view class="delivery-type">
				<text>配送服务</text>
				<view class="type-right">
					<text>快递 免邮</text>
				</view>
			</view>
			<view class="delivery-remark">
				<view>订单备注 </view>
				<view class="remark-main" @click="addRemark">
					<view class="remark" :style="{color: remark ? '#000' : '#999'}">{{remark ? remark : '无备注'}}</view>
					<image style="width: 14rpx;height: 24rpx;" src="../static/imgs/order/jiantou.png" mode="aspectFill">
					</image>
					<uni-popup ref="remarkPopup" type="bottom">
						<view class="popup-container">
							<view class="popup-title">
								<text style="flex: 1;text-align: center;">订单备注</text>
								<uni-icons type="closeempty" size="20" @click="closePopup"></uni-icons>
							</view>
							<textarea :show-confirm-bar="false" class="remark-container"
								placeholder="选填,请先和商家协商一致,付款后商家可见" maxlength="200"
								placeholder-style="font-size: 28rpx;color: #c3c3c3;" v-model="remark"></textarea>
							<view class="button-sure" @click="closePopup">
								确定
							</view>
						</view>
					</uni-popup>
				</view>
			</view>
		</view>
		<view class="confirm-order-container-product">
			<view class="price-detail-title">
				价格明细
			</view>
			<view class="delivery-price">
				<text>商品总价</text>
				<text class="price-right" style="font-size: 22rpx">{{ "CNY"
          }}<text style="font-size: 30rpx">{{
            " " + formatNumberRgx(totalPrice)
          }}</text></text>
			</view>
			<view class="delivery-price">
				<text>积分</text>
				<navigator url="../my/integral" hover-class="none">
					<text class="price-right" style="font-size: 22rpx">
						减 {{integralPrice}}
					</text>
					<image style="width: 14rpx;height: 16rpx;margin-left: 10rpx;" src="../static/imgs/order/jiantou.png"
						mode="aspectFill">
					</image>
				</navigator>
			</view>
			<view class="delivery-price">
				<text>合计</text>
				<text class="price-right" style="font-size: 22rpx">{{ "CNY"
			    }}<text style="font-size: 30rpx">{{
			      " " + formatNumberRgx(endPrice)
			    }}</text></text>
			</view>
		</view>
		<view class="confirm-order-container-product">
			<view class="uni-form-item uni-column">
				<radio-group class="uni-list" @change="radioChange" v-model="tradeType">
					<label style="
			        margin-top: 20rpx;
			        display: flex;
			        justify-content: space-between;
			      " class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in radioItems" :key="index"
						@click="clickTradeType(index)">
						<view>
							<label class="label-2-text" style="display: flex; align-items: center" :for="item.name">
								<image :src="item.img" style="width: 30rpx; height: 28rpx; margin-right: 10rpx"
									mode="aspectFill">
								</image>
								<text style="font-size: 28rpx">{{ item.name }}</text>
							</label>
						</view>
						<view>
							<radio style="transform: scale(0.7)" :id="item.name" :value="item.value"
								:checked="item.checked"></radio>
						</view>
					</label>
				</radio-group>
			</view>
		</view>
		<view class="confirm-order-container-total">
			<text class="total-num">共{{ num }}件</text>
			<view class="total-price">
				<text>合计：</text>
				<text style="font-size: 22rpx; color: #ff8b62">{{ "CNY"
          }}<text style="font-size: 32rpx">{{
            " " + formatNumberRgx(endPrice)
          }}</text></text>
			</view>
			<view class="total-button" @click="createOrder">提交订单</view>
		</view>
		<uni-popup ref="usdtPopup" type="bottom">
			<view class="usdt-popup-container">
				<view class="usdt-title">
					<view class="title">
						数字货币支付
					</view>
					<view class="push">发送</view>
					<view class="price">
						<text>{{formatNumberRgx(totalUsPrice)}}</text>
						<text class="currency">USDT</text>
					</view>
				</view>
				<view class="usdt-every" v-for="item in usdtList" :key="item.id">
					<view class="every-name">
						{{item.name}}
					</view>
					<view class="every-account">
						<view class="account">
							{{item.accountNumber}}
						</view>
						<view class="button-copy" @click="copyOut(item.accountNumber)">
							复制
						</view>
					</view>
				</view>
				<view class="usdt-font">
					支付之后，请联系客服
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: this.$baseUrl + "/jewellery/api",
				watchUrl: this.$baseUrl + "/watch/api",
				totalPrice: 0,
				totalUsPrice: 0,
				selAddress: "",
				selList: [],
				verification: {},
				num: 0,

				// #ifdef MP-WEIXIN
				tradeType: 0,
				// #endif
				// #ifdef APP-PLUS
				tradeType: 1,
				// #endif
				radioItems: [
					// #ifdef MP-WEIXIN
					{
						name: "微信支付",
						value: "0",
						img: require("../static/imgs/pay/wx.png"),
						checked: true,
					},
					// #endif
					// #ifdef APP-PLUS
					{
						name: "支付宝支付",
						value: "1",
						img: require("../static/imgs/pay/zhifubao.png"),
						checked: true,
					},
					{
						name: "数字货币支付",
						value: "2",
						img: require("../static/imgs/pay/USDT.png"),
						checked: false,
					},
					// #endif
				],
				remark: "",
				integralPrice: 0,
				endPrice: 0,
				usdtList: [{
						id: 1,
						name: "TRC20",
						accountNumber: "TL7BvRcmZKvzDnhuNRVRH1inqReAX5Jhr5"
					},
					{
						id: 2,
						name: "ERC20",
						accountNumber: "0x9b2117d4a942c110c63857dd44f77436766428fc"
					},
					{
						id: 3,
						name: "HECO",
						accountNumber: "0x30cf1dfac257269883933c73fa470573708ce94d"
					},
					{
						id: 4,
						name: "BSC",
						accountNumber: "0x723caf8974b62299a5ef62de4bffee07e2426527"
					}
				]

			};
		},
		onShow() {
			console.log('选中地址信息');
			console.log(uni.getStorageSync('userAddress'))

			let addr = uni.getStorageSync("userAddress");
			if (addr !== undefined && addr) {
				this.selAddress = JSON.parse(decodeURIComponent(addr));
			}
		},
		onLoad(option) {
			console.log("传参");
			console.log(option);
			if (option.productList) {
				this.selList = JSON.parse(decodeURIComponent(option.productList));
				console.log(this.selList);

				for (let item of this.selList) {
					this.num += Number(item.num);
					this.totalPrice += Number(item.productAmount * item.num);
					this.totalUsPrice += Number(item.productAmountUs * item.num);
				}

				this.getIntegral();
			}
		},
		methods: {
			// 复制数字货币支付账号
			copyOut(account) {
				console.log("复制");
				uni.setClipboardData({
					data: account, //要被复制的内容
					success: () => {
						//复制成功的回调函数
						uni.showToast({
							//提示
							title: "复制成功，请转账支付",
							icon: "none",
							complete: () => {
								this.$refs.usdtPopup.close();
							}
						});
					},
				});
			},
			// 支付方式
			radioChange(e) {
				console.log(e);
				this.tradeType = e.target.value;
				if (this.tradeType == 2) {
					this.$refs.usdtPopup.open()
				}
			},
			clickTradeType(index) {
				this.radioItems[index].checked = !this.radioItems[index].checked;
				if (this.radioItems[index].value == 2 && this.radioItems[index].checked) {
					this.$refs.usdtPopup.open()
				}
			},
			// 积分抵扣
			getIntegral() {
				let num = uni.getStorageSync("totalIntegral");
				if (num > 0) {
					this.integralPrice = num / 100;
				}
				this.endPrice = this.totalPrice - this.integralPrice;
			},
			// 填写备注
			addRemark() {
				this.$refs.remarkPopup.open();
			},
			closePopup() {
				this.$refs.remarkPopup.close();
			},
			// 购买数量变化
			numChangeValue(sel, index, productCategory) {
				if (productCategory == 2) {
					if (sel == 0 && this.selList[index].num > 1) {
						this.selList[index].num -= 1;
					} else if (sel == 1) {
						this.selList[index].num += 1;
					}

					this.totalPrice = 0;
					this.totalUsPrice = 0;
					this.num = 0;
					for (let item of this.selList) {
						this.num += Number(item.num);
						this.totalPrice += Number(item.productAmount) * Number(item.num);
						this.totalUsPrice += Number(item.productAmountUs) * Number(item.num);
					}

					this.getIntegral();
				}
			},
			// 收货地址
			shippingAddress() {
				uni.navigateTo({
					url: "./addr/addressAdmin",
				});
			},
			// 生成支付订单
			createOrder() {
				if (this.selAddress) {
					// 传递参数
					// 商品id、数量、商品价格、交易金
					// 调用后端生成订单接口
					// 调用成功，打开支付页面
					let type = 1;
					// #ifdef MP-WEIXIN
					type = 1;
					// #endif

					// #ifdef APP-PLUS
					type = 3;
					// #endif

					uni.showLoading({
						title: "",
					});
					uni.request({
						url: this.$baseUrl + "/order/api/createOrder",
						method: "POST",
						data: {
							addressId: this.selAddress.id,
							detailList: this.selList,
							actualAmountTotal: this.totalPrice,
							actualAmountTotalUs: this.totalUsPrice,
							productAmountTotal: this.endPrice,
							productAmountTotalUs: this.totalUsPrice,
							remark: this.remark,
							tradeType: type,
						},
						header: {
							"content-type": "application/json",
							token: uni.getStorageSync("token"),
						},
						complete: (res) => {
							uni.hideLoading();
							console.log("生成订单");
							console.log(res);

							if (res.statusCode == 200) {
								this.verification = res.data;
								this.payOrder();
							} else {
								uni.showToast({
									icon: "none",
									title: res.data.status,
									duration: 2000,
								});
							}
						},
					});
				} else {
					uni.showToast({
						icon: "none",
						title: "请选择收货地址"
					})
				}

			},
			payOrder() {
				// #ifdef MP-WEIXIN
				console.log("微信小程序支付");

				uni.requestPayment({
					provider: "wxpay",
					timeStamp: this.verification.payMsg.timeStamp.toString(),
					nonceStr: this.verification.payMsg.nonceStr,
					package: this.verification.payMsg.package,
					signType: "RSA",
					paySign: this.verification.payMsg.paySign,
					success: (ret) => {
						console.log("success:");
						console.log(ret);

						uni.showToast({
							icon: "none",
							title: "支付成功",
							duration: 2000,
							success: () => {
								uni.reLaunch({
									url: "orderList",
								});
							}
						});
					},
					fail: (err) => {
						console.log("fail:");
						console.log(err);
						uni.showToast({
							icon: "none",
							title: "支付失败",
							duration: 2000,
						});
					},
				});
				// #endif

				// #ifdef APP-PLUS
				console.log("APP支付宝支付");
				uni.requestPayment({
					provider: "alipay",
					orderInfo: this.verification,
					success: (ret) => {
						console.log('success:');
						console.log(ret);

						uni.showToast({
							icon: "none",
							title: "支付成功",
							duration: 2000,
							success: () => {
								uni.reLaunch({
									url: "orderList",
								});
							}
						});
					},
					fail: (err) => {
						console.log('fail:');
						console.log(err);
						uni.showToast({
							icon: "none",
							title: "支付失败",
							duration: 2000,
						});
					}
				})

				// #endif
			},
		},
	};
</script>

<style scoped lang="scss">
	.confirm-order-container {
		min-height: 100vh;
		padding: 0 24rpx;
		padding-bottom: 160rpx;
		background-color: #f9f9f9;

		.confirm-order-container-top {
			padding: 40rpx 26rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;
			border-radius: 10rpx;

			.top-left {
				font-size: 28rpx;

				.left-top {
					.default-sign {
						padding: 2rpx 4rpx;
						margin-right: 6rpx;
						color: #fff;
						background-color: #85dbd0;
						border-radius: 10rpx;
						font-size: 20rpx;
					}

					.addr-name {
						margin-right: 9rpx;
						color: #000;
						font-size: 32rpx;
						font-weight: bold;
					}

					.addr-phone {
						font-size: 24rpx;
						color: #999999;
					}
				}

				.left-bottom {
					margin-top: 24rpx;
					font-size: 24rpx;
					color: #000;
				}
			}

			.top-right {
				width: 14rpx;
				height: 24rpx;
			}
		}

		.confirm-order-container-product {
			padding: 30rpx 20rpx 40rpx;
			margin-top: 20rpx;
			background-color: #fff;
			border-radius: 20rpx;

			.product-every {
				display: flex;
				margin-bottom: 40rpx;

				.product-img {
					margin-right: 20rpx;

					image {
						width: 180rpx;
						height: 180rpx;
						border-radius: 20rpx;
					}
				}

				.product-container {
					width: 100%;
					padding-bottom: 20rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.name {
						font-size: 26rpx;
						color: #000;
						text-align: left;
					}

					.product-price {
						display: flex;
						justify-content: space-between;

						.price {
							color: #ff8b62;
						}

						.price-num {
							display: flex;
							align-items: center;

							.num-button {
								font-size: 40rpx;
								cursor: pointer;
								color: #000;
							}

							.num-input {
								padding: 6rpx 26rpx;
								margin: 0 10rpx;
								border-radius: 6rpx;
								font-weight: bold;
								font-size: 24rpx;
								color: #000;
								background-color: #F4F7FB;
							}
						}
					}
				}
			}

			.delivery-type {
				margin-top: 40rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 26rpx;

				.type-right {
					display: flex;
					align-items: center;
				}
			}

			.delivery-remark {
				margin-top: 40rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 26rpx;

				.remark-main {
					display: flex;
					align-items: center;

					.remark {
						width: 65vw;
						margin-right: 10rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						text-align: right;
					}

					.popup-container {
						height: 70vh;
						padding: 40rpx 20rpx;
						border-top-left-radius: 30rpx;
						border-top-right-radius: 30rpx;
						background-color: #fff;
						position: relative;

						.popup-title {
							display: flex;
							color: #000;
							font-size: 32rpx;
						}

						.remark-container {
							width: inherit;
							margin-top: 60rpx;
							padding: 20rpx;
							background-color: #f9f9f9;
							font-size: 28rpx;
							color: #000;
							border-radius: 15rpx;
						}

						.button-sure {
							padding: 20rpx 0;
							background: linear-gradient(to right, #6bcda5, #68decf);
							border-radius: 60rpx;
							color: #fff;
							text-align: center;
							position: absolute;
							bottom: 60rpx;
							left: 40rpx;
							right: 40rpx;
						}
					}
				}

			}

			.price-detail-title {
				font-size: 28rpx;
				font-weight: bold;
			}

			.delivery-price {
				margin-top: 40rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 28rpx;

				.price-right {
					color: #ff8b62;
				}
			}
		}

		.confirm-order-container-total {
			height: 120rpx;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #fff;

			.total-num {
				color: #c3c3c3;
				font-size: 28rpx;
			}

			.total-price {
				margin-left: 20rpx;
				font-size: 28rpx;
			}

			.total-button {
				margin: 0 20rpx 0 60rpx;
				padding: 20rpx 40rpx;
				background: linear-gradient(to right, #6bcda5, #68decf);
				color: #fff;
				font-size: 26rpx;
				border-radius: 60rpx;
			}
		}

		.usdt-popup-container {
			padding: 60rpx 0 0;
			border-top-left-radius: 30rpx;
			border-top-right-radius: 30rpx;
			background-color: #fff;

			.usdt-title {
				text-align: center;

				.title {
					font-size: 32rpx;
					font-weight: bold;
					color: #000;
				}

				.push {
					margin-top: 40rpx;
					font-size: 24rpx;
					color: #999999;
				}

				.price {
					font-size: 40rpx;
					color: #FF7821;
					font-weight: bold;

					.currency {
						margin-left: 10rpx;
					}
				}
			}

			.usdt-every {
				margin: 0 30rpx;
				padding: 30rpx 20rpx;
				margin-top: 30rpx;
				background-color: #EAFAF8;
				border-radius: 20rpx;

				.every-name {
					font-size: 30rpx;
					font-weight: bold;
				}

				.every-account {
					margin-top: 20rpx;
					display: flex;
					justify-content: space-between;

					.account {
						flex: 1;
						word-wrap: break-word;
						word-break: break-all;
						text-align: left;
						font-size: 28rpx;
						color: #4B605D;
					}

					.button-copy {
						margin-left: 30rpx;
						font-size: 26rpx;
						color: #72D5C8;
					}
				}
			}

			.usdt-font {
				margin-top: 80rpx;
				padding: 37rpx 32rpx;
				background-color: #EAFAF8;
				font-size: 28rpx;
				color: #000;
			}
		}
	}
</style>
